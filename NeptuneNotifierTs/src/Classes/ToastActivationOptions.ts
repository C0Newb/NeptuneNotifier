import { ToastAfterActivationBehavior } from "../Enums/ToastAfterActivationBehavior";

/**
 * New in Creators Update: Additional options relating to activation.
 *
 * External MS doc: {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.toastactivationoptions}
 */
export class ToastActivationOptions {
    /**
     * Gets or sets the behavior that the toast should use when the user invokes this action.
     * Note that this option only works on `ToastButton` and `ToastContextMenuItem`.
     * Desktop-only, supported in builds 16251 or higher.
     * New in Fall Creators Update
     */
    public AfterActivationBehavior: ToastAfterActivationBehavior = ToastAfterActivationBehavior.Default;

    /**
     * Gets or sets the target PFN if you are using `Protocol`.
     * You can optionally specify, so that regardless of whether multiple apps are registered to handle the same protocol uri, your desired app will always be launched.
     */
    public ProtocolActivationTargetApplication: string = "";

    constructor() { }
}