/**
 * Specifies the behavior that the toast should use when the user takes action on the toast.
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.toastafteractivationbehavior}
 */
export enum ToastAfterActivationBehavior {
    /** Default behavior. The toast will be dismissed when the user takes action on the toast. */
    Default = 0,
    /**
     * After the user clicks a button on your toast, the notification will remain present, in a "pending update" visual state.
     * You should immediately update your toast from a background task so that the user does not see this "pending update" visual state for too long. */
    PendingUpdate = 1,
}