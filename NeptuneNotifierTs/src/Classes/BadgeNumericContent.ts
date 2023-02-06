import { create } from "xmlbuilder2";
import { INotificationContent } from "../Interfaces/INotificationContent";
import { Utilities } from "../Utilities";

/*
 * Notification content object to display a number on a Tile's badge
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.BadgeNumericContent}
 */
export class BadgeNumericContent implements INotificationContent {
    /** Gets or sets the number that will appear on the badge. If the number is 0, the badge will be removed. */
    Number: number;

    /**
     * Initializes a new instance of the {@link BadgeGlyphContent} class. Constructor to create a glyph badge content object with a glyph.
     * @param glyph The glyph to be displayed on the badge.
     */
    constructor(number?: number) {
        this.Number = (number)? number : 1;
    }

    GetContent(): string {
        return Utilities.FromXMLDocumentToXMLString(this.GetXml());
    }

    GetXml(): XMLDocument | string {
        let xml = create({
            badge: {
                '@value': this.Number
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