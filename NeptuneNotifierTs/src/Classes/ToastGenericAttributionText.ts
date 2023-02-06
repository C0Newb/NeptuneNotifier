import { IBaseText } from "../Interfaces/IBaseText";

/*
 * Defines an attribution text element to be displayed on the Toast notification.
 * 
 * External MS doc: {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.ToastGenericAttributionText}
 */
export class ToastGenericAttributionText implements IBaseText {
    Language?: string;
    Text: string = "";

    /*
     * Initializes a new instance of the {@link ToastGenericAttributionText} class.
     * An attribution text element to be displayed on the Toast notification.
     */
    constructor() { }
}