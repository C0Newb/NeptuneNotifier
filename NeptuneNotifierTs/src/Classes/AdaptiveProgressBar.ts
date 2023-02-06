import { IToastBindingGenericChild } from "../Interfaces/IToastBindingGenericChild";

/*
 * New in Creators Update: A progress bar. Only supported on toasts on Desktop, build 15007 or newer.
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.AdaptiveProgressBar}
 */
export class AdaptiveProgressBar implements IToastBindingGenericChild {
    Status?: string;
    Title?: string;
    /** Gets or sets the value of the progress bar. Supports data binding. Defaults to 0. */
    Value: number = 0;
    /** Gets or sets an optional string to be displayed instead of the default percentage string. If this isn't provided, something like "70%" will be displayed. */
    ValueStringOverride?: string;

    constructor() { }
}