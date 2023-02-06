/**
 * Decides the type of activation that will be used when the user interacts with the Toast notification.
 * 
 * External MS doc: {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.toastactivationtype}
 */
export enum ToastActivationType {
    /** Default value. Your foreground app is launched. */
    Foreground = 0,
    /**
     * Your corresponding background task (assuming you set everything up) is triggered,
     * and you can execute code in the background (like sending the user's quick reply message) without interrupting the user.
     */
    Background = 1,
    /** Launch a different app using protocol activation */
    Protocol = 2
};