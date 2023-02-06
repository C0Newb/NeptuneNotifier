/**
 * Specifies the scenario, controlling behaviors about the Toast.
 *  
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.toastscenario}
 */
export enum ToastScenario {
    /** The normal Toast behavior. The Toast appears for a short duration, and then automatically dismisses into Action Center. */
    Default = 0,
    /** Causes the Toast to stay on-screen and expanded until the user takes action. Also causes a looping alarm sound to be selected by default. */
    Alarm = 1,
    /** Causes the Toast to stay on-screen and expanded until the user takes action (on Mobile this expands to full screen). Also causes a looping incoming call sound to be selected by default. */
    Reminder = 2,
    /** Causes the Toast to stay on-screen and expanded until the user takes action. */
    IncomingCall = 3,
}