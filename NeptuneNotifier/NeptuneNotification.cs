using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.Data.Xml.Dom;

namespace NotifierConsole {
    public class NeptuneNotification {
        /// <summary>
        /// Notification id given by Windows
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// How we tell the Neptune application the notification has been activated
        /// </summary>
        public NotificationActivationMethod ActivationMethod { get; set; }

        /// <summary>
        /// Can be a named pipe or web address
        /// </summary>
        public string ActivationURI { get; set; } = "";


        private XmlDocument ToastXml;

        public NeptuneNotification(XmlDocument toastXml) {
            ToastXml = toastXml;
        }

        public void Delete() {
            Notifier.Notification.DeleteNotification(Id);
        }
        public void Show() {
            string actionArgs = "ActivationMethod=" + ActivationMethod + ",ActivationURI=" + Convert.ToBase64String(Encoding.UTF8.GetBytes(ActivationURI));
            Notifier.Notification.NewToast(ToastXml, Id, actionArgs);
        }
    }


    public enum NotificationActivationMethod {
        None = 0,
        Pipe = 1,
        HTTP = 2,
        WebSocket = 3,
    }
}
