﻿using System;
using System.Runtime.InteropServices;

namespace Notifier {
    [ClassInterface(ClassInterfaceType.None)]
    [ComSourceInterfaces(typeof(INotificationActivationCallback))]
    [Guid("0c0e16cc-9ad4-4792-89fe-ae9563fd165e"), ComVisible(true)] // Set to your application (assembly)'s GUID
    public class NotificationActivator : INotificationActivationCallback {
        private static Action<string, NotificationEventArgs> ActivatedFunction;

        /// <summary>
        /// This is called when a notification is activated
        /// </summary>
        public void Activate(string appUserModelId, string invokedArgs, NOTIFICATION_USER_INPUT_DATA[] data, uint dataCount) {
            if (ActivatedFunction != null) {
                ActivatedFunction(appUserModelId, new NotificationEventArgs(invokedArgs) {
                    Action = NotificationEventArgs.NotificationAction.Activated,
                    COMActivated = true,
                });
            }
        }

        /// <summary>
        /// Calls the initialized activator method
        /// </summary>
        public static void Activate(string appUserModelId, NotificationEventArgs args) {
            if (ActivatedFunction != null) {
                ActivatedFunction(appUserModelId, args);
            }
        }

        /// <summary>
        /// Run this once on application first start
        /// </summary>
        public static void Initialize(Action<string, NotificationEventArgs> action) {
            ActivatedFunction = action;

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
