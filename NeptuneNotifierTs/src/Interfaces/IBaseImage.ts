/**
 * Contains the base properties that an image needs. 
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.ibaseimage}
 */
export interface IBaseImage{
    /**
     * Gets or sets a value whether Windows should append a query string to the image URI supplied in the Tile notification.
     * Use this attribute if your server hosts images and can handle query strings, either by retrieving an image variant based on the query strings or by ignoring the query string and returning the image as specified without the query string.
     * This query string specifies scale, contrast setting, and language.
     */
    AddImageQuery?: boolean;

    /** Gets or sets a description of the image, for users of assistive technologies. */
    AlternateText?: string;

    /**
     * Gets or sets the URI of the image. Can be from your application package, application data, or the internet.
     * Internet images must be less than 200 KB in size.
     */
    Source: string;
}