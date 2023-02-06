/*
 * TextStacking specifies the vertical alignment of content.
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.AdaptiveSubgroupTextStacking}
 */
export enum AdaptiveSubgroupTextStacking {
    /** Renderer automatically selects the default vertical alignment */
    Default = 0,

    /** Vertical align to the top. */
    Top = 1,

    /** Vertical align to the center. */
    Center = 2,

    /** Vertical align to the bottom. */
    Bottom = 3,
}