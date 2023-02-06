import { AdaptiveSubgroupTextStacking } from "../Enums/AdaptiveSubgroupTextStacking";
import { IAdaptiveSubgroupChild } from "../Interfaces/IAdaptiveSubgroupChild";

/**
 * Subgroups are vertical columns that can contain text and images. Supported on Tiles since RTM. Supported on Toasts since Anniversary Update.
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.adptivesubgroup}
 */
export class AdaptiveSubgroup {
    /** Gets a list of Children. {@link AdaptiveText} and {@link AdaptiveImage} are valid children of subgroups. */
    Children: IAdaptiveSubgroupChild[] = [];

    /** Gets or sets the vertical alignment of this subgroup's content. */
    HintTextStacking: AdaptiveSubgroupTextStacking = AdaptiveSubgroupTextStacking.Default;

    /** Gets or sets the width of this subgroup column by specifying the weight, relative to the other subgroups. */
    HintWeight?: number;

    constructor() { }
}