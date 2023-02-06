using System;
using System.IO;
using System.Windows.Forms;

namespace NeptuneNotifier.Notifications {
    public class NotificationIcon {
        public NotificationIcon() {
            Id = NotificationIconType.Info;
            Location = @"C:\Windows\System32\SecurityAndMaintenance.png";
        }

        private NotificationIcon(NotificationIconType id, string location) { Location = location; Id = id; }
        public NotificationIcon(string location, bool isInfoIcon = true) {
            Location = location;
            Id = isInfoIcon? NotificationIconType.Icon : NotificationIconType.Info;
        }

        public string Location { get; set; }
        public NotificationIconType Id { get; set; }

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
