using System;
using System.Diagnostics;
using System.IO;
using System.Runtime.InteropServices;
using Windows.Data.Xml.Dom;
using Windows.UI.Notifications;
using System.Windows.Forms;
using Microsoft.Win32;
using NotificationsExtensions.Toasts;
using NotificationsExtensions;
using static NeptuneNotifier.Notifications.NotificationIcon;

namespace NeptuneNotifier.Notifications {
    class Notification {
        private const String APP_NAME = "Neptune";
        private const String APP_ID = "Neptune.NotifierWin";

        private static ToastNotifier ToastNotifier = ToastNotificationManager.CreateToastNotifier(APP_ID);

        private static int LastNotificationId = -1;

        #region Notification Registration
        /// <summary>
        /// Registers the current running application with the COM server and creates a shortcut in the start menu to authorize notifications
        /// </summary>
        /// <param name="force">Register the application regardless if the Start Menu shortcut exists or not</param>
        public static void RegisterAppForNotificationSupport(bool force = false) {
            if (!File.Exists(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + "\\Microsoft\\Windows\\Start Menu\\Programs\\" + APP_NAME + ".lnk") || force) {
                string exePath = Process.GetCurrentProcess().MainModule.FileName;
                InstallShortcut(exePath);
                RegisterComServer(exePath);
            }
        }

        /// <summary>
        /// Registers the COM server for the running program
        /// </summary>
        /// <param name="exePath">The current path of the running program</param>
        private static void RegisterComServer(string exePath) {
            // We register the app process itself to start up when the notification is activated, but
            // other options like launching a background process instead that then decides to launch
            // the UI as needed.
            string guid = "{" + typeof(NotificationActivator).GUID + "}";

            using (RegistryKey key = RegistryKey.OpenBaseKey(Microsoft.Win32.RegistryHive.CurrentUser, RegistryView.Registry64)) {
                using (RegistryKey subkey = key.OpenSubKey(@"SOFTWARE\Classes\CLSID", true)) {
                    using (RegistryKey subkeyClsGuid = subkey.CreateSubKey(guid, true)) {
                        // Below breaks something
                        //subkeyClsGuid.SetValue(null, typeof(NotificationActivator).GUID);
                        //subkeyClsGuid.SetValue("AppID", APP_ID);
                        //subkeyClsGuid.SetValue("DisplayName", "Neptune Notification Handler");

                        using (RegistryKey subkeyLocalServer32 = subkeyClsGuid.CreateSubKey("LocalServer32")) {
                            subkeyLocalServer32.SetValue(null, exePath + " /ToastActivated");
                        }
                    }
                }
            }
        }

        /// <summary>
        /// Install the applications shortcut into the start menu for notification support
        /// </summary>
        /// <param name="shortcutPath">Were the shortcut is being saved</param>
        /// <param name="exePath">The current path of the running program</param>
        private static void InstallShortcut(string exePath) {
            IShellLinkW newShortcut = (IShellLinkW)new CShellLink();

            // Create a shortcut to the exe
            newShortcut.SetPath(exePath);

            // Open the shortcut property store, set the AppUserModelId property
            IPropertyStore newShortcutProperties = (IPropertyStore)newShortcut;

            PropVariantHelper varAppId = new PropVariantHelper();
            varAppId.SetValue(APP_ID);
            newShortcutProperties.SetValue(PROPERTYKEY.AppUserModel_ID, varAppId.Propvariant);

            PropVariantHelper varToastId = new PropVariantHelper {
                VarType = VarEnum.VT_CLSID
            };
            varToastId.SetValue(typeof(NotificationActivator).GUID);

            newShortcutProperties.SetValue(PROPERTYKEY.AppUserModel_ToastActivatorCLSID, varToastId.Propvariant);

            // Commit the shortcut to disk
            IPersistFile newShortcutSave = (IPersistFile)newShortcut;

            newShortcutSave.Save(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + "\\Microsoft\\Windows\\Start Menu\\Programs\\" + APP_NAME + ".lnk", true);
        }


        public static void UninstallShortcut() {
            File.Delete(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + "\\Microsoft\\Windows\\Start Menu\\Programs\\" + APP_NAME);
        }
        #endregion

        /// <summary>
        /// Sends a notification to the action center
        /// </summary>
        /// <param name="title">Notification title</param>
        /// <param name="message">Notification contents</param>
        /// <param name="icon">The notification icon</param>
        /// <param name="activeArgs">The argument that get's passed to the handler when the notification is clicked</param>
        private static void NewToast(string title, string message, NotificationIcon icon, int id = -1, string activeArgs = "action=default") {
            if (id < 0) {
                LastNotificationId++;
                id = LastNotificationId;
            }

            ToastContent content = new ToastContent() {
                Scenario = ToastScenario.Default,
                Launch = id + ":" + activeArgs, // Later we can split this 
                Visual = new ToastVisual {
                    BindingGeneric = new ToastBindingGeneric {
                        AppLogoOverride = new ToastGenericAppLogo {
                            HintCrop = ToastGenericAppLogoCrop.Circle,
                            Source = icon.Location
                        },
                        Children = {
                            new AdaptiveText {
                                Text = title,
                            },
                            new AdaptiveText {
                               Text = message,
                            }
                        },
                        Attribution = new ToastGenericAttributionText()
                    }
                }
            };

            if (icon.Id == NotificationIconType.Icon || icon.Id == NotificationIconType.Info)
                content.Visual.BindingGeneric.Attribution.Text = "Info";
            else if (icon.Id == NotificationIconType.Alert)
                content.Visual.BindingGeneric.Attribution.Text = "Alert";
            else if (icon.Id == NotificationIconType.Error)
                content.Visual.BindingGeneric.Attribution.Text = "Error";
            else
                content.Visual.BindingGeneric.Attribution.Text = "Info";


            XmlDocument toastXml = new XmlDocument();
            /*toastXml.LoadXml(@"<toast launch='" + activeArgs + "'>" +
    "<visual>" +
        "<binding template='ToastGeneric'>" +
            "<text>" + title + "</text>" +
            "<text>" + message + "</text>" +
            "<image placement='appLogoOverride' src='" + icon.location + "'/>" +
        "</binding>" +
    "</visual>" +
"</toast>");*/
            toastXml.LoadXml(content.GetContent());

            // Create the toast and attach event listeners
            ToastNotification toast = new ToastNotification(toastXml);
            toast.Activated += Toast_Activated;
            toast.Dismissed += Toast_Dismissed;
            toast.Failed += Toast_Failed;
            toast.ExpiresOnReboot = true;
            toast.Tag = id.ToString();
            // Show the toast. Be sure to specify the AppUserModelId on your application's shortcut!
            ToastNotifier.Show(toast);
        }


        public static void ClearHistory() {
            ToastNotificationManager.History.Clear();
        }


        /// <summary>
        /// Display a notification if supported or a balloon tip
        /// </summary>
        /// <param name="title">The title of the notification</param>
        /// <param name="message">The message of the notification</param>
        /// <param name="useIcon">The icon of the notification, info or warning/error</param>
        /// <param name="action">The argument that get's passed to the handler when the notification is clicked</param>
        public static void Show(string title, string message, NotificationIcon useIcon = null, int id = -1, string action = "action=default") {
            if (useIcon == null)
                useIcon = NotificationIcon.Info;

            if (Environment.OSVersion.Version < new Version("6.2.0.0") && TrayIcon.icon != null) // Doesn't even know toast notifications exist (or tray icon set)
            {
                TrayIcon.icon.BalloonTipIcon = useIcon.ToToolTipIcon();
                TrayIcon.icon.BalloonTipTitle = title;
                TrayIcon.icon.BalloonTipText = message;
                TrayIcon.icon.BalloonTipClicked += Icon_BalloonTipClicked;
                TrayIcon.icon.BalloonTipClosed += Icon_BalloonTipClosed;
                TrayIcon.icon.ShowBalloonTip(3);
            } else if (Environment.OSVersion.Version >= new Version("6.2.0.0")) // Can use toast notifications
                NewToast(title, message, useIcon, id, action);
            else
                MessageBox.Show(message, APP_NAME + " - " + title, MessageBoxButtons.OKCancel, useIcon.ToMessageBoxImage());
        }



        #region Notification Handling Events
        private static void Toast_Failed(ToastNotification sender, ToastFailedEventArgs args) {
            string reason = "";
            string moreDetails = "";
            switch (ToastNotifier.Setting) {
                case NotificationSetting.Enabled:
                    Console.Error.WriteLine("Notification failed to send." + Environment.NewLine
                        + "Unknown error: " + args.ErrorCode.Message);
                    break;

                case NotificationSetting.DisabledForApplication:
                    reason = "DisabledForApplication";
                    moreDetails = "Enable notifications for " + APP_NAME + " inside the Settings app -> System -> Notifications & actions -> Get notifications from these senders";
                    break;

                case NotificationSetting.DisabledForUser:
                    reason = "DisabledForUser";
                    moreDetails = "Notifications are disabled system wide. Enable them inside the Settings app -> System -> Notifications & actions -> Get notifications from apps and other senders.";
                    break;

                case NotificationSetting.DisabledByGroupPolicy:
                    reason = "DisabledByGroupPolicy";
                    moreDetails = "Notifications are disabled by your organization (via group policy). View more information inside the Settings app -> System -> Notifications & actions";
                    // Can check registry here...
                    break;

                case NotificationSetting.DisabledByManifest:
                    reason = "DisabledByManifest";
                    break;
            }
            Program.ToastActivated(APP_ID, new NotificationEventArgs(sender, reason, moreDetails));
        }
        private static void Toast_Dismissed(ToastNotification sender, ToastDismissedEventArgs args) {
            Program.ToastActivated(APP_ID, new NotificationEventArgs(sender, args));
        }
        private static void Toast_Activated(ToastNotification sender, object args) {
            if (!Program.AllowCOMActivation) {
                if (args.GetType() == typeof(ToastActivatedEventArgs))
                    Program.ToastActivated(APP_ID, new NotificationEventArgs(sender, (ToastActivatedEventArgs)args));
                else
                    Program.ToastActivated(APP_ID, new NotificationEventArgs(sender, args.ToString()));
            }
        }


        // tray icon (<Win 8)
        private static void Icon_BalloonTipClosed(object sender, EventArgs e) {
            NotificationEventArgs notificationEventArgs = new NotificationEventArgs() {
                Action = NotificationEventArgs.NotificationAction.Activated,
            };

            Program.ToastActivated(APP_ID, notificationEventArgs);
        }
        private static void Icon_BalloonTipClicked(object sender, EventArgs e) {
            NotificationEventArgs notificationEventArgs = new NotificationEventArgs() {
                Action = NotificationEventArgs.NotificationAction.Dismissed,
                DismissalReason = ToastDismissalReason.UserCanceled,
            };
            Program.ToastActivated(APP_ID, notificationEventArgs);
        }
        #endregion
    }


    /// <summary>
    /// Notification activation arguments
    /// </summary>
    public class NotificationEventArgs {
        // This is inside the activated args
        public Windows.Foundation.Collections.ValueSet UserInput;

        public NotificationAction Action = NotificationAction.Unknown;
        public ToastDismissalReason DismissalReason;
        public string ErrorDetails;

        public bool COMActivated = false;

        public int NotificationId;
        public string LaunchArguments;


        public NotificationEventArgs() { }
        
        public NotificationEventArgs(ToastNotification sender, string arguments) {
            GetId(arguments.ToString());
            if (NotificationId == -1) { int.TryParse(sender.Tag, out NotificationId); }

            Action = NotificationAction.Activated;
            LaunchArguments = arguments;
        }
        public NotificationEventArgs(ToastNotification sender, ToastActivatedEventArgs arguments) {
            GetId(arguments.Arguments.ToString());
            if (NotificationId == -1) { int.TryParse(sender.Tag, out NotificationId); }

            Action = NotificationAction.Activated;
            UserInput = arguments.UserInput;
        }

        public NotificationEventArgs(ToastNotification sender, ToastDismissedEventArgs args) {
            string arguments = sender.Content.ChildNodes[1].Attributes.GetNamedItem("launch").InnerText;
            GetId(arguments);
            if (NotificationId == -1) { int.TryParse(sender.Tag, out NotificationId); }

            Action = NotificationAction.Dismissed;
            DismissalReason = args.Reason;
        }

        public NotificationEventArgs(ToastNotification sender, string reason = "", string moreDetails = "") {
            string arguments = sender.Content.GetElementsByTagName("toast")[0].Attributes.GetNamedItem("launch").ToString();
            GetId(arguments);
            if (NotificationId == -1) { int.TryParse(sender.Tag, out NotificationId); }

            if (reason != "") {
                ErrorDetails = reason;
                Console.Error.WriteLine("Notifications are disabled (" + reason + ").");
                if (moreDetails != "") {
                    Console.Error.WriteLine(moreDetails);
                    ErrorDetails += Environment.NewLine + moreDetails;
                }
            }
            Action = NotificationAction.Error;
        }

        public NotificationEventArgs(string arguments) {
            GetId(arguments);
        }


        private void GetId(string arguments) {
            try {
                string[] split = arguments.Split(':');
                if (split.Length >= 2) {
                    LaunchArguments = arguments.Split(':')[1];
                    NotificationId = int.Parse(arguments.Split(':')[0]);
                } else {
                    LaunchArguments = arguments;
                    NotificationId = -1;
                }
            } catch (FormatException) {
                NotificationId = -1;
            } catch (Exception) { }
        }


        /// <summary>
        /// How the notification was activated
        /// </summary>
        public enum NotificationAction {
            Unknown = 0,
            Activated = 1,
            Dismissed = 2,
            Error = 3,
        }
    }
}