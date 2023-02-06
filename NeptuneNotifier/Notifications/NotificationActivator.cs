using System;
using System.Runtime.InteropServices;

namespace NeptuneNotifier.Notifications {
    [ClassInterface(ClassInterfaceType.None)]
    [ComSourceInterfaces(typeof(INotificationActivationCallback))]
    [Guid("F170F382-168C-4F5F-8720-F54D540232B3"), ComVisible(true)] // Set to your application (assembly)'s GUID
    public class NotificationActivator : INotificationActivationCallback {
        /// <summary>
        /// This is called when a notification is activated
        /// </summary>
        public void Activate(string appUserModelId, string invokedArgs, NOTIFICATION_USER_INPUT_DATA[] data, uint dataCount) {
            Program.ToastActivated(appUserModelId, new NotificationEventArgs(invokedArgs) {
                Action = NotificationEventArgs.NotificationAction.Activated,
                COMActivated = true,
            });
        }

        /// <summary>
        /// Run this once on application first start
        /// </summary>
        public static void Initialize() {
            regService = new RegistrationServices();

            cookie = regService.RegisterTypeForComClients(
                typeof(NotificationActivator),
                RegistrationClassContext.LocalServer,
                RegistrationConnectionType.MultipleUse);
        }
        public static void Uninitialize() {
            if (cookie != -1 && regService != null)
                regService.UnregisterTypeForComClients(cookie);
        }

        private static int cookie = -1;
        private static RegistrationServices regService = null;
    }
}
