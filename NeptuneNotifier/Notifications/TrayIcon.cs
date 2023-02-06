using System;
using System.Windows.Forms;

namespace NeptuneNotifier.Notifications {
    class TrayIcon {

        public static NotifyIcon icon = new NotifyIcon {
            Visible = true
        };

        public static NotifyIcon Setup(EventHandler doubleClick, EventHandler quit) {
            MenuItem trayIconMenuQuit = new MenuItem {
                Text = "Quit"
            };
            trayIconMenuQuit.Click += quit;

            ContextMenu trayIconMenu = new ContextMenu();

            trayIconMenu.MenuItems.AddRange(new MenuItem[] { trayIconMenuQuit });

            icon.DoubleClick += doubleClick;
            icon.ContextMenu = trayIconMenu;

            return icon;
        }
    }
}
