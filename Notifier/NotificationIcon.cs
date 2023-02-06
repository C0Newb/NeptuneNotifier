using System;
using System.IO;
using System.Windows.Forms;

namespace Notifier {
    public class NotificationIcon {
        public string Location { get; set; }
        public NotificationIconType Id { get; set; }

        public string Description { get; set; }

        public NotificationIcon() {
            Id = NotificationIconType.Info;
            Location = @"C:\Windows\System32\SecurityAndMaintenance.png";
        }

        private NotificationIcon(NotificationIconType id, string location) { Location = location; Id = id; }
        public NotificationIcon(string location, bool isInfoIcon = true) {
            if (File.Exists(location)) {
                Location = location;
                Id = isInfoIcon ? NotificationIconType.Icon : NotificationIconType.Info;
            } else {
                Id = NotificationIconType.Info;
                Location = @"C:\Windows\System32\SecurityAndMaintenance.png";
            }
        }

        public NotificationIcon FromString(string icon) {
            switch (icon.ToLower()) {
                case "alert":
                    Id = NotificationIconType.Alert;
                    Location = @"C:\Windows\System32\SecurityAndMaintenance_Alert.png";
                    Description = "Alert";

                    break;

                case "error":
                    Id = NotificationIconType.Error;
                    Location = @"C:\Windows\System32\SecurityAndMaintenance_Error.png";
                    Description = "Error";
                    break;

                default:
                    Id = NotificationIconType.Info;
                    Location = @"C:\Windows\System32\SecurityAndMaintenance.png";
                    Description = "Info";
                    break;
            }

            return this;
        }

        public ToolTipIcon ToToolTipIcon() {
            if (Id == NotificationIconType.Icon || Id == NotificationIconType.Info)
                return ToolTipIcon.Info;
            else if (Id == NotificationIconType.Alert)
                return ToolTipIcon.Warning;
            else if (Id == NotificationIconType.Error)
                return ToolTipIcon.Error;
            else
                return ToolTipIcon.None;
        }

        public MessageBoxIcon ToMessageBoxImage() {
            if (Id == NotificationIconType.Icon || Id == NotificationIconType.Info)
                return MessageBoxIcon.Information;
            else if (Id == NotificationIconType.Alert)
                return MessageBoxIcon.Warning;
            else if (Id == NotificationIconType.Error)
                return MessageBoxIcon.Error;
            else
                return MessageBoxIcon.None;
        }

        public static NotificationIcon Info { get => new NotificationIcon(NotificationIconType.Info, @"C:\Windows\System32\SecurityAndMaintenance.png"); }
        public static NotificationIcon Alert { get => new NotificationIcon(NotificationIconType.Alert, @"C:\Windows\System32\SecurityAndMaintenance_Alert.png"); }
        public static NotificationIcon Error { get => new NotificationIcon(NotificationIconType.Error, @"C:\Windows\System32\SecurityAndMaintenance_Error.png"); }
        public static NotificationIcon None { get => new NotificationIcon(0, null); }

        public enum NotificationIconType {
            Icon = 1,
            Info = 2,
            Alert = 3,
            Error = 4,
            None = 0,
        };
    }
}
