import { ToastGenericAppLogoCrop } from "../Enums/AdaptiveImageCrop";
import { IBaseImage } from "../Interfaces/IBaseImage";

/*
 * The logo that is displayed on your Toast notification.
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.ToastGenericAppLogo}
 */
export class ToastGenericAppLogo implements IBaseImage {
    AddImageQuery?: boolean;
    AlternateText?: string;

    /**
     * Gets or sets the desired cropping of the image.
     * Previously for RTM: Did not exist, value will be ignored and background image will be displayed without any cropping.
     */
    HintCrop: ToastGenericAppLogoCrop = ToastGenericAppLogoCrop.Default;

    Source: string = "C:\Windows\System32\SecurityAndMaintenance.png";

    constructor() { }
}