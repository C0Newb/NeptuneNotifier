/**
 * Specifies the horizontal alignment for an image.
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.AdaptiveImageAlign}
 */
export enum AdaptiveImageAlign {
    /** Default value, alignment behavior determined by renderer. */
    Default = 0,
    /** Image stretches to fill available width (and potentially available height too, depending on where the image is). */
    Stretch = 1,
    /** Align the image to the left, displaying the image at its native resolution. */
    Left = 2,
    /** Align the image in the center horizontally, displaying the image at its native resolution. */
    Center = 3,
    /** Align the image in the right, displaying the image at its native resolution. */
    Right = 4,
};