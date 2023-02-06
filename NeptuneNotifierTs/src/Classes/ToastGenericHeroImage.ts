import { IBaseImage } from "../Interfaces/IBaseImage";

/*
 * A hero image for the Toast notification.
 * 
 * External MS doc: {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.ToastGenericHeroImage}
 */
export class ToastGenericHeroImage implements IBaseImage {
    AddImageQuery?: boolean;
    AlternateText?: string;
    Source: string = "C:\Windows\System32\SecurityAndMaintenance.png";

    /** Initializes a new instance of the {@link ToastGenericHeroImage} class. A hero image for the Toast notification. */
    constructor() { }
}