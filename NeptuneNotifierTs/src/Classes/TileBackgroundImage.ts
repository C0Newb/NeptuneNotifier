import { AdaptiveImageCrop } from "../Enums/AdaptiveImageCrop";
import { IBaseImage } from "../Interfaces/IBaseImage";

/*
 * A full-bleed background image that appears beneath the Tile content.
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.TileBackgroundImage}
 */
export class TileBackgroundImage implements IBaseImage {
    AddImageQuery?: boolean;
    AlternateText?: string;

    /**
     * Gets or sets the desired cropping of the image.
     * Previously for RTM: Did not exist, value will be ignored and background image will be displayed without any cropping.
     */
    HintCrop: AdaptiveImageCrop = AdaptiveImageCrop.Default;

    /**
     * Gets or sets a black overlay on the background image.
     * This value controls the opacity of the black overlay, with 0 being no overlay and 100 being completely black.
     * Defaults to 20.
     */
    HintOverlay: number = 20;

    Source: string = "C:\Windows\System32\SecurityAndMaintenance.png";

    constructor() { }
}