import { IAdaptiveChild } from "../Interfaces/IAdaptiveChild";
import { ITitleBindingContentAdaptiveChild } from "../Interfaces/ITitleBindingContentAdaptiveChild";
import { IToastBindingGenericChild } from "../Interfaces/IToastBindingGenericChild";
import { AdaptiveSubgroup } from "./AdaptiveSubgroup";

/*
 * Groups semantically identify that the content in the group must either be displayed as a whole, or not displayed if it cannot fit.
 * Groups also allow creating multiple columns.
 * 
 * Supported on Tiles since RTM.
 * Supported on Toasts since Anniversary Update.
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.AdaptiveGroup}
 */
export class AdaptiveGroup implements IAdaptiveChild, ITitleBindingContentAdaptiveChild, IToastBindingGenericChild {
    /**
     * Gets the only valid children of groups are AdaptiveSubgroup.
     * Each subgroup is displayed as a separate vertical column.
     * 
     * Note that you must include at least one subgroup in your group, otherwise an InvalidOperationException will be thrown when you try to retrieve the XML for the notification.
     */
    Children: AdaptiveSubgroup[] = [];

    constructor() { }
}