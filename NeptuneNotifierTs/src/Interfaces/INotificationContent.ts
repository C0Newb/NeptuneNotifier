/*
 * Base notification content interface to retrieve notification XML as a string.
 * 
 * External MS doc: {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.INotificationContent}
 */
export interface INotificationContent {
    /**
     * Retrieves the notification XML content as a string.
     * @returns The notification XML content as a string.
     */
    GetContent(): string;

    /**
     * Retrieves the notification XML content as an XML document.
     * 
     * Returns string is NOT in TypeScript
     * @return The notification XML content as a WinRT XML document.
     */
    GetXml(): XMLDocument | string;
}