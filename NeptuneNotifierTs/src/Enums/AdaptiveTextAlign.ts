/*
 * Controls the horizontal alignment of text.
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.AdaptiveTextAlign}
 */
export enum AdaptiveTextAlign {
    /** Alignment is automatically determined by */
    Default = 0,
    /** The system automatically decides the alignment based on the language and culture. */
    Auto = 1,
    /** Horizontally align the text to the left. */
    Left = 2,
    /** Horizontally align the text in the center. */
    Center = 3,
    /** Horizontally align the text to the right. */
    Right = 4,
}