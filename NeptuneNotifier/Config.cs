using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NotifierConsole {
    /// <summary>
    /// Basic configuration file, used to store tracked notifications
    /// </summary>
    public class Config {
        private string ConfigName = "NeptuneConfig.json";

        /// <summary>
        /// List of tracked notifications
        /// </summary>
        public List<NeptuneNotification> Notifications = new List<NeptuneNotification>(0);



        /// <summary>
        /// Creates a new Config instance
        /// </summary>
        /// <param name="configName">Configuration file name</param>
        public Config(string configName) {
            ConfigName = Path.GetDirectoryName(Process.GetCurrentProcess().MainModule.FileName) + "\\" + configName;
        }

        
        public void AddNotification(NeptuneNotification notification) {
            Notifications.Add(notification);
            notification.Show();
        }



        /// <summary>
        /// Rename the config file
        /// </summary>
        public void Rename(string newName) {
            newName = Path.GetDirectoryName(Process.GetCurrentProcess().MainModule.FileName) + "\\" + newName;
            File.Move(ConfigName, newName);
            this.ConfigName = newName;
        }

        /// <summary>
        /// Deletes the config
        /// </summary>
        public void Delete() {
            File.Delete(ConfigName);
        }

        /// <summary>
        /// Writes the config to file (JSON)
        /// </summary>
        public void Save() {
            File.WriteAllText(ConfigName, ToString());
        }

        /// <summary>
        /// Loads the config from file (JSON)
        /// </summary>
        public void Load() {
            if (!File.Exists(ConfigName))
                Save();

            string contents = File.ReadAllText(this.ConfigName, Encoding.UTF8);
            Config contentsDeserialized = JsonConvert.DeserializeObject<Config>(contents);
            var sourceProps = typeof(Config).GetProperties().Where(x => x.CanRead).ToList();
            var destProps = typeof(Config).GetProperties().Where(x => x.CanWrite).ToList();

            foreach (var sourceProp in sourceProps) {
                if (destProps.Any(x => x.Name == sourceProp.Name)) {
                    var p = destProps.First(x => x.Name == sourceProp.Name);
                    if (p.CanWrite) { // check if the property can be set or no.
                        p.SetValue(this, sourceProp.GetValue(contentsDeserialized, null), null);
                    }
                }

            }
        }

        /// <returns>Stringified JSON representing this config</returns>
        override public string ToString() {
            return JsonConvert.SerializeObject(this).ToString();
        }
    }
}
