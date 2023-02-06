import { AdaptiveImageAlign } from "../Enums/AdaptiveImageAlign";
import { AdaptiveImageCrop } from "../Enums/AdaptiveImageCrop";
import { IAdaptiveChild } from "../Interfaces/IAdaptiveChild";
import { IAdaptiveSubgroupChild } from "../Interfaces/IAdaptiveSubgroupChild";
import { IBaseImage } from "../Interfaces/IBaseImage";
import { ITitleBindingContentAdaptiveChild } from "../Interfaces/ITitleBindingContentAdaptiveChild";
import { IToastBindingGenericChild } from "../Interfaces/IToastBindingGenericChild";

/**
 * An inline image.
 * 
 * External MS doc: {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.adaptiveimage}
 */
export class AdaptiveImage implements IAdaptiveChild, IAdaptiveSubgroupChild, IBaseImage, ITitleBindingContentAdaptiveChild, IToastBindingGenericChild {
    AddImageQuery?: boolean;
    AlternateText?: string;

    /** Gets or sets the horizontal alignment of the image. For Toast, this is only supported when inside an {@link AdaptiveSubgroup}. */
    HintAlign: AdaptiveImageAlign = AdaptiveImageAlign.Default;

    /** 
     *  Gets or sets the desired cropping of the image.
     *  Supported on Tiles since RTM. Supported on Toast since Anniversary Update.
     */
    HintCrop: AdaptiveImageCrop = AdaptiveImageCrop.Default;

    /** 
     *  Gets or sets a value whether a margin is removed.
     *  Images have an 8px margin around them.
     *  You can remove this margin by setting this property to true.
     *  Supported on Tiles since RTM. Supported on Toast since Anniversary Update.
     */
    HintRemoveMargin?: boolean;

    Source: string = "C:\Windows\System32\SecurityAndMaintenance.png";

    constructor() { }

    /**
     * Returns the image's source string.
     * @return The image's source string
     */
    public ToString(): string {
        return this.Source;
    }
}