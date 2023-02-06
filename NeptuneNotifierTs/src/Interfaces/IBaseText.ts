/*
 * Defines the basic properties of a text element.
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.IBaseText}
 */
export interface IBaseText {
    /**
     * Gets or sets the target locale of the XML payload, specified as a BCP-47 language tags such as "en-US" or "fr-FR".
     * The locale specified here overrides any other specified locale, such as that in binding or visual.
     * 
     * If this value is a literal string, this attribute defaults to the user's UI language.
     * If this value is a string reference, this attribute defaults to the locale chosen by Windows Runtime in resolving the string. 
     */
    Language?: string;

    /** Gets or sets the text to display */
    Text: string;
}