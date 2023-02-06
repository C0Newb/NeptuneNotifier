import { IToastBindingGenericChild } from "../Interfaces/IToastBindingGenericChild";
import { ToastGenericAppLogo } from "./ToastGenericAppLogo";
import { ToastGenericAttributionText } from "./ToastGenericAttributionText";
import { ToastGenericHeroImage } from "./ToastGenericHeroImage";
import { ToastShouldTapImage } from "./ToastShouldTapImage";

/*
 * Specifies content you want to appear in a My People shoulder tap notification.
 * 
 * For more info, see the My People notifications documentation. New in Fall Creators Update.
 * 
 * External MS doc: {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.ToastBindingShoulderTap}
 */
export class ToastBindingShoulderTap {
    /**
     * Gets or sets a value whether Windows is allowed to append a query string to the image URI supplied in the Toast notification.
     * Use this attribute if your server hosts images and can handle query strings, either by retrieving an image variant based on the query strings or by ignoring the query string and returning the image as specified without the query string.
     * 
     * This query string specifies scale, contrast setting, and language.
     */
    AddImageQuery?: boolean;

    /** Gets or sets a default base URI that is combined with relative URIs in image source attributes. */
    BaseUri?: string;

    /**
     * Gets or sets an optional hero image (a visually impactful image displayed on the Toast notification).
     * On devices without the Anniversary Update, the hero image will simply be ignored.
     */
    Image?: ToastShouldTapImage;

    /**
     * Gets or sets the target locale of the XML payload, specified as a BCP-47 language tags such as "en-US" or "fr-FR".
     * The locale specified here overrides any other specified locale, such as that in binding or visual.
     * 
     * If this value is a literal string, this attribute defaults to the user's UI language.
     * If this value is a string reference, this attribute defaults to the locale chosen by Windows Runtime in resolving the string. 
     */
    Language?: string;
}