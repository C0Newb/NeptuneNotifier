/*
 * The types of glyphs that can be placed on a badge.
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.BadgeGlyphValue}
 */
export enum BadgeGlyphValue {
    /** No glyph. If there is a numeric badge, or a glyph currently on the badge, it will be removed. */
    None = 0,
    /** A glyph representing application activity. */
    Activity = 1,
    /** A glyph representing an alert. */
    Alert = 2,
    /** A glyph representing an alarm. */
    Alarm = 3,
    /** A glyph representing availability status. */
    Available = 4,
    /** A glyph representing away status */
    Away = 5,
    /** A glyph representing busy status. */
    Busy = 6,
    /** A glyph representing that a new message is available. */
    NewMessage = 7,
    /** A glyph representing that media is paused. */
    Paused = 8,
    /** A glyph representing that media is playing. */
    Playing = 9,
    /** A glyph representing unavailable status. */
    Unavailable = 10,
    /** A glyph representing an error. */
    Error = 11,
    /** A glyph representing attention status. */
    Attention = 12,
}