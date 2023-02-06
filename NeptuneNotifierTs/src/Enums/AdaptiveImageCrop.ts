/*
 * Specify the desired cropping of the image.
 * 
 * External MS doc: {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.AdaptiveImageCrop}
 */
export enum AdaptiveImageCrop {
    /** Default value, cropping behavior determined by renderer. */
    Default = 0,
    /** Image is not cropped. */
    None = 1,
    /** Image is cropped to a circle shape. */
    Circle = 2,
}

/*
 * Specify the desired cropping of the image.
 * 
 * External MS doc: {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.ToastGenericAppLogoCrop}
 */
export enum ToastGenericAppLogoCrop {
    /** Default value, cropping behavior determined by renderer. */
    Default = 0,
    /** Image is not cropped. */
    None = 1,
    /** Image is cropped to a circle shape. */
    Circle = 2,
}