/*
 * Text style controls font size, weight, and opacity.
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.AdaptiveTextStyle}
 */
export enum AdaptiveTextStyle {
    /**	Style is determined by the renderer. */
    Default = 0,
    /**	Default value. Paragraph font size, normal weight and opacity. */
    Caption = 1,
    /**	Same as Caption but with subtle opacity. */
    CaptionSubtle = 2,
    /**	H5 font size. */
    Body = 3,
    /**	Same as Body but with subtle opacity. */
    BodySubtle = 4,
    /**	H5 font size, bold weight. Essentially the bold version of Body. */
    Base = 5,
    /**	Same as Base but with subtle opacity. */
    BaseSubtle = 6,
    /**	H4 font size. */
    Subtitle = 7,
    /**	Same as Subtitle but with subtle opacity. */
    SubtitleSubtle = 8,
    /**	H3 font size. */
    Title = 9,
    /**	Same as Title but with subtle opacity. */
    TitleSubtle = 10,
    /**	Same as Title but with top/bottom padding removed. */
    TitleNumeral = 11,
    /**	H2 font size. */
    Subheader = 12,
    /**	Same as Subheader but with subtle opacity. */
    SubheaderSubtle = 13,
    /**	Same as Subheader but with top/bottom padding removed. */
    SubheaderNumeral = 14,
    /**	H1 font size. */
    Header = 15,
    /**	Same as Header but with subtle opacity. */
    HeaderSubtle = 16,
    /**	Same as Header but with top/bottom padding removed. */
    HeaderNumeral = 17,
}