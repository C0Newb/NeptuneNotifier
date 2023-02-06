import { ToastBindingGeneric } from "./ToastBindingGeneric";
import { ToastBindingShoulderTap } from "./ToastBindingShoulderTap";

/*
 * Defines the visual aspects of a Toast notification.
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.ToastVisual}
 */
export class ToastVisual {
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
     * Gets or sets the generic Toast binding, which can be rendered on all devices.
     * 
     * This binding is required and cannot be null.
     */
    BindingGeneric: ToastBindingGeneric = new ToastBindingGeneric();

    /**
     * Gets or sets a binding for shoulder tap notifications, which integrate with My People.
     * 
     * See the My People documentation for more info. New in Fall Creators Update.
     */
    BindingShoulderTap?: ToastBindingShoulderTap;

    /**
     * Gets or sets the target locale of the XML payload, specified as a BCP-47 language tags such as "en-US" or "fr-FR".
     * The locale specified here overrides any other specified locale, such as that in binding or visual.
     * 
     * If this value is a literal string, this attribute defaults to the user's UI language.
     * If this value is a string reference, this attribute defaults to the locale chosen by Windows Runtime in resolving the string. 
     */
    Language?: string;
}