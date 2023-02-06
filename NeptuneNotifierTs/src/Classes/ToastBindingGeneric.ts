import { IToastBindingGenericChild } from "../Interfaces/IToastBindingGenericChild";
import { ToastGenericAppLogo } from "./ToastGenericAppLogo";
import { ToastGenericAttributionText } from "./ToastGenericAttributionText";
import { ToastGenericHeroImage } from "./ToastGenericHeroImage";

/*
 * Generic Toast binding, where you provide text, images, and other visual elements for your Toast notification.
 * 
 * External MS doc: {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.ToastBindingGeneric}
 */
export class ToastBindingGeneric {
    /**
     * Gets or sets a value whether Windows is allowed to append a query string to the image URI supplied in the Toast notification.
     * Use this attribute if your server hosts images and can handle query strings, either by retrieving an image variant based on the query strings or by ignoring the query string and returning the image as specified without the query string.
     * 
     * This query string specifies scale, contrast setting, and language.
     */
    AddImageQuery?: boolean;

    /** Gets or sets an optional override of the logo displayed on the Toast notification. */
    AppLogoOverride?: ToastGenericAppLogo;

    /**
     * Gets or sets an optional text element that is displayed as attribution text.
     * 
     * On devices without the Anniversary Update, this text will appear as if it's another AdaptiveText element at the end of your Children list.
     */
    Attribution?: ToastGenericAttributionText;

    /** Gets or sets a default base URI that is combined with relative URIs in image source attributes. */
    BaseUri?: string;

    /**
     * Gets the contents of the body of the Toast, which can include {@link AdaptiveText}, {@link AdaptiveImage}, and {@link AdaptiveGroup} (added in Anniversary Update).
     * 
     * Also, {@link AdaptiveText} elements must come before any other elements.
     * 
     * If an {@link AdaptiveText} element is placed after any other element, an exception will be thrown when you try to retrieve the Toast XML content.
     * 
     * And finally, certain {@link AdaptiveText} properties like {@link HintStyle} aren't supported on the root children text elements, and only work inside an {@link AdaptiveGroup}.
     * If you use {@link AdaptiveGroup} on devices without the Anniversary Update, the group content will simply be dropped.
     */
    Children: IToastBindingGenericChild[] = [];

    /**
     * Gets or sets an optional hero image (a visually impactful image displayed on the Toast notification).
     * On devices without the Anniversary Update, the hero image will simply be ignored.
     */
    HeroImage?: ToastGenericHeroImage;

    /**
     * Gets or sets the target locale of the XML payload, specified as a BCP-47 language tags such as "en-US" or "fr-FR".
     * The locale specified here overrides any other specified locale, such as that in binding or visual.
     * 
     * If this value is a literal string, this attribute defaults to the user's UI language.
     * If this value is a string reference, this attribute defaults to the locale chosen by Windows Runtime in resolving the string. 
     */
    Language?: string;
}