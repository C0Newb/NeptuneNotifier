import { AdaptiveTextStyle } from "../Enums/AdaptiveTextStyle";
import { IAdaptiveChild } from "../Interfaces/IAdaptiveChild";
import { IAdaptiveSubgroupChild } from "../Interfaces/IAdaptiveSubgroupChild";
import { ITitleBindingContentAdaptiveChild } from "../Interfaces/ITitleBindingContentAdaptiveChild";
import { IToastBindingGenericChild } from "../Interfaces/IToastBindingGenericChild";
import { AdaptiveSubgroup } from "../Classes/AdaptiveSubgroup"
import { AdaptiveTextAlign } from "../Enums/AdaptiveTextAlign";

/*
 * An adaptive text element
 * 
 * External MS doc: {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.AdaptiveText}
 */
export class AdaptiveText implements IAdaptiveChild, IAdaptiveSubgroupChild, ITitleBindingContentAdaptiveChild, IToastBindingGenericChild {
    /**
     * Gets or sets the horizontal alignment of the text.
     * 
     * Note that for Toast, this property will only take effect if the text is inside an {@link AdaptiveSubgroup}.
     */
    HintAlign: AdaptiveTextAlign = AdaptiveTextAlign.Default;

    /**
     * Gets or sets the maximum number of lines the text element is allowed to display.
     * 
     * For Tiles, this is infinity by default.
     * For Toasts, top-level text elements will have varying max line amounts (and in the Anniversary Update you can change the max lines).
     * Text on a Toast inside an AdaptiveSubgroup will behave identically to Tiles (default to infinity).
     */
    HintMaxLines?: number;


    /**
     * Gets or sets the minimum number of lines the text element must display.
     * 
     * Note that for Toast, this property will only take effect if the text is inside an export class {@link AdaptiveSubgroup}.
     */
    HintMinLines?: number;

    /**
     * Gets or sets the style that controls the text's font size, weight, and opacity.
     * 
     * Note that for Toast, the style will only take effect if the text is inside an {@link AdaptiveSubgroup}.
     */
    HintStyle: AdaptiveTextStyle = AdaptiveTextStyle.Default;

    /**
     * Gets or sets a value whether text wrapping is enabled.
     * 
     * For Tiles, this is false by default.
     * For Toasts, this is true on top-level text elements, and false inside an {@link AdaptiveSubgroup}.
     * Note that for Toast, setting wrap will only take effect if the text is inside an {@link AdaptiveSubgroup} (you can use HintMaxLines = 1 to prevent top-level text elements from wrapping).
     * 
     */
    HintWrap?: boolean = false;

    /**
     * Gets or sets the target locale of the XML payload, specified as a BCP-47 language tags such as "en-US" or "fr-FR".
     * The locale specified here overrides any other specified locale, such as that in binding or visual.
     * 
     * If this value is a literal string, this attribute defaults to the user's UI language.
     * If this value is a string reference, this attribute defaults to the locale chosen by Windows Runtime in resolving the string.
     */
    Language?: string;

    /** Gets or sets the text to display. Data binding support added in Creators Update, only works for toast top-level text elements. */
    Text: string = "";

    constructor() { }

    /**
     * Returns the value of the Text property.
     * @return The value of the Text property.
     */
    public ToString(): string {
        return this.Text;
    }
}