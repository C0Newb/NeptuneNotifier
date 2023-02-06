using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Windows.Data.Xml.Dom;
using Notifier;
using Microsoft.Toolkit.Uwp.Notifications;
using System.IO;

namespace NotifierConsole {
    internal class Program {
        [DllImport("kernel32.dll")]
        static extern IntPtr GetConsoleWindow();

        [DllImport("user32.dll")]
        static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

        [DllImport("user32.dll", EntryPoint = "SetForegroundWindow")]
        public static extern bool SetForegroundWindow(IntPtr hWnd);
        [DllImport("user32.dll")]
        public static extern int SetWindowLong(IntPtr window, int index, int value);
        [DllImport("user32.dll")]
        public static extern int GetWindowLong(IntPtr window, int index);

        [DllImport("kernel32.dll", SetLastError = true)]
        static extern bool AttachConsole(uint dwProcessId);

        const uint ATTACH_PARENT_PROCESS = 0x0ffffffff;  // default value if not specifing a process ID
        const int GWL_EXSTYLE = -20;
        const int WS_EX_TOOLWINDOW = 0x00000080;
        const int WS_EX_APPWINDOW = 0x00040000;

        const int SW_HIDE = 0;
        const int SW_SHOW = 5;


        // Just a simple prompt, we push a notification after every enter key press
        private static bool Interactive = false;


        private static Config Config = new Config("NeptuneConfig.json");

        public static bool AllowCOMActivation = true;


        /*
            /ToastActivated: Used by the Windows to tell us we're processing a toast notification
            /Interactive: Show console and allow user to interact

            
            /ClearHistory: Clears all notification history
            /Delete <notificationId>: Deletes a notification

            /Title <title>: Title of the notification
            /Message <message>: Contents of the notification
            /Icon <uri>: Path to notification image (can be path (such as "C:\Windows\System32\SecurityAndMaintenance.png"), or info, alert, error).
            /TextBox [hint text]: Adds a textbox to the notification (hint text is the text label for the notification)
            /Buttons <buttonName1,buttonName2>: Adds one or more buttons to the notification (max 3). The button name is used for which was activated

            /ToastXMLBase64 <toast notification XML encoded as base64>: Custom XML, this is the toast we display          
         */
        static void Main(string[] args) {

            XmlDocument test = new XmlDocument();
            BadgeGlyphContent a = new BadgeGlyphContent(BadgeGlyphValue.NewMessage);
            string b = a.GetContent();
            string c = a.ToString();
            test = a.GetXml();
            string d = test.GetXml();



            ShowWindow(GetConsoleWindow(), SW_HIDE);

            foreach (string s in args)
                Console.WriteLine(s);

            string title;
            string message;
            NotificationIcon icon;
            bool hasTextbox;
            string textboxHint = "";
            string[] buttonNames;


            ToastContentBuilder toastContentBuilder = new ToastContentBuilder();
            XmlDocument toastXml = new XmlDocument();

            Config.Load();


            for (int i = 0; i<args.Length; i++) {
                string arg = args[i].ToLower();

                if (arg.Equals("/interactive",StringComparison.CurrentCultureIgnoreCase)) {
                    Interactive = true;
                }
                if (arg.Equals("/toastActivated", StringComparison.CurrentCultureIgnoreCase)) {
                    AllowCOMActivation = true;
                }

                // Toast style
                if (arg.Equals("/title", StringComparison.CurrentCultureIgnoreCase)) {
                    // next arg is title
                    title = args[i+1];
                    toastContentBuilder.AddText(title, AdaptiveTextStyle.Title);
                    i++;
                } else if (arg.Equals("/message", StringComparison.CurrentCultureIgnoreCase)) {
                    message = args[i+1];
                    toastContentBuilder.AddText(message, AdaptiveTextStyle.Default);
                    i++;
                } else if (arg.Equals("/icon", StringComparison.CurrentCultureIgnoreCase)) {
                    string iconArg = args[i+1].ToLower();
                    if (iconArg == "alert" || iconArg == "error" || iconArg == "info") {
                        icon = new NotificationIcon().FromString(iconArg);
                    } else {
                        icon = new NotificationIcon(args[i+1]);
                    }
                    toastContentBuilder.AddAppLogoOverride(new Uri(icon.Location), ToastGenericAppLogoCrop.Default, icon.Description);
                    i++;
                } else if (arg.Equals("/textBox", StringComparison.CurrentCultureIgnoreCase)) {
                    hasTextbox = true;
                    if (!args[i+1].StartsWith("/")) {
                        textboxHint = args[i++];
                        i++;
                    }
                    toastContentBuilder.AddInputTextBox("textBox", (textboxHint.Length == 0)? "" : textboxHint);
                } else if (arg.Equals("/buttons", StringComparison.CurrentCultureIgnoreCase)) {
                    buttonNames = args[i+1].Split(',');
                    foreach (string buttonName in buttonNames) {
                        toastContentBuilder.AddButton(buttonName, ToastActivationType.Foreground, buttonName.ToLower());
                    }
                    i++;
                } else if (arg == "/toastxml" || arg.Equals("/toastxmlbase64", StringComparison.CurrentCultureIgnoreCase)) {
                    var base64EncodedBytes = System.Convert.FromBase64String(args[i+1]);
                    string xml = System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
                    toastXml.LoadXml(xml);
                    i++;
                }
            }

            if (toastXml.ChildNodes.Count == 0) {
                toastContentBuilder.SetToastScenario(ToastScenario.Default);
                toastContentBuilder.AddAttributionText("--NeptuneNotifier--");

                toastXml = toastContentBuilder.GetToastContent().GetXml();
            }

            toastXml.LoadXml("<toast launch=\"action=openThread&amp;threadId=92187\"><visual><binding template=\"ToastGeneric\"><text hint-maxLines=\"1\">Jill Bender</text><text>Check out where we camped last weekend! It was incredible, wish you could have come on the backpacking trip!</text><image placement=\"appLogoOverride\" hint-crop=\"circle\" src=\"https://unsplash.it/64?image=1027\"/><image placement=\"hero\" src=\"https://unsplash.it/360/180?image=1043\"/></binding></visual><actions><input id=\"textBox\" type=\"text\" placeHolderContent=\"reply\"/><action content=\"Send\" imageUri=\"Assets/Icons/send.png\" hint-inputId=\"textBox\" activationType=\"background\" arguments=\"action=reply&amp;threadId=92187\"/></actions></toast>");


            Notification.RegisterAppForNotificationSupport(true); // Setup notification support
            Notifier.NotificationActivator.Initialize(ToastActivated); // Initialize


            if (Interactive) {
                ShowWindow(GetConsoleWindow(), SW_SHOW);

                Console.WriteLine("Press ESC to exit. Any key to send notification");
                int notificationId = 0;
                while (true) {
                    Console.WriteLine("wait...");
                    ConsoleKeyInfo key = Console.ReadKey();
                    if (key.Key == ConsoleKey.Escape)
                        break;
                    Config.AddNotification(new NeptuneNotification(toastXml));
                    //Notification.Show("NeptuneNotifier Test", "This is just a test... Id: " + notificationId, NotificationIcon.Info);
                    notificationId++;
                }
            }

#if DEBUG
            ShowWindow(GetConsoleWindow(), SW_SHOW);
            Console.ReadLine();
#endif

            Notifier.NotificationActivator.Uninitialize();
        }

        public static void ToastActivated(string appUserModelId, NotificationEventArgs eventArgs) {
            if (eventArgs.Action == NotificationEventArgs.NotificationAction.Activated) {
                if (eventArgs.COMActivated && !AllowCOMActivation)
                    return;

                string[] args = eventArgs.LaunchArguments.Split(',');
                string action = "";
                for (int i = 0; i < args.Length; i++) {
                    string current = args[i];
                    if (current.StartsWith("action")) {
                        action = current.Substring(7);
                        break;
                    }
                }

                Console.WriteLine("Notification activated... details as follows");
                Console.WriteLine("appUserModeId: " + appUserModelId);
                Console.WriteLine("invokedArgs: " + eventArgs.LaunchArguments);

                switch (action) {
                    case "debugActive":
                        Console.WriteLine("Activated");
                        break;

                    default:
                        break;
                }
            } else if (eventArgs.Action == NotificationEventArgs.NotificationAction.Dismissed && eventArgs.DismissalReason != Windows.UI.Notifications.ToastDismissalReason.TimedOut) {
                Console.WriteLine("Notification dismissed, reason: " + eventArgs.DismissalReason);
            }

#if DEBUG
            ShowWindow(GetConsoleWindow(), SW_SHOW);
            Console.ReadLine();
#endif
        }
    }
}
