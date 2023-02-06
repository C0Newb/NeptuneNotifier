/**
 * The amount of time the Toast should display.
 * 
 * External MS doc: {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.toastduration}
 */
export enum ToastDuration {
    /** Default value. Toast appears for a short while and then goes into Action Center */
    Short = 0,
    /** Toast stays on-screen for longer, and then goes in Action Center. */
    Long = 1,
}