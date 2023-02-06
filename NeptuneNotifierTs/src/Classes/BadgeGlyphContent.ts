import { BadgeGlyphValue } from "../Enums/BadgeGlyphValue";
import { INotificationContent } from "../Interfaces/INotificationContent";
import { Utilities } from "../Utilities";

import { create } from "xmlbuilder2";

/*
 * Notification content object to display a glyph on a Tile's badge.
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.BadgeGlyphContent}
 */
export class BadgeGlyphContent implements INotificationContent {
    /** Gets or sets the glyph to be displayed on the badge. */
    Glyph: BadgeGlyphValue;

    /**
     * Initializes a new instance of the {@link BadgeGlyphContent} class. Constructor to create a glyph badge content object with a glyph.
     * @param glyph The glyph to be displayed on the badge.
     */
    constructor(glyph?: BadgeGlyphValue) {
        this.Glyph = (glyph !== undefined)? glyph : BadgeGlyphValue.NewMessage;
    }

    GetContent(): string {
        return Utilities.FromXMLDocumentToXMLString(this.GetXml());
    }

    GetXml(): XMLDocument | string {
        let xml = create({
            badge: {
                '@value': Utilities.ToCamelCase(BadgeGlyphValue[this.Glyph])
            }
        }).end({ headless: true });
        return Utilities.FromXmlStringToXMLDocument(xml);
    }

    /**
     * Retrieves the notification XML content as a string.
     * @returns The notification XML content as a string.
     */
    ToString(): string {
        return this.GetContent();
    }
}