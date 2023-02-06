/**
 * One of `ToastButton`, `ToastButtonSnooze`, or `ToastButtonDismiss`.
 *
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.itoastbutton}
 */
export interface IToastButton {
    /**
     * Gets or sets an identifier used in telemetry to identify your category of action.
     * This should be something like "Delete", "Reply", or "Archive".
     * In the upcoming toast telemetry dashboard in Dev Center, you will be able to view how frequently your actions are being clicked.
     */
    HintActionId: string | undefined;
    /** Gets or sets an optional image icon for the button to display (required for buttons adjacent to inputs like quick reply). */
    ImageUri: string | undefined;
}