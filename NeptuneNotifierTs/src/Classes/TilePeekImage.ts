import { AdaptiveImageCrop } from "../Enums/AdaptiveImageCrop";
import { IBaseImage } from "../Interfaces/IBaseImage";

/*
 * A peek image that animates in from the top of the Tile
 * 
 * External MS doc: {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.TilePeekImage}
 */
export class TilePeekImage implements IBaseImage {
    AddImageQuery?: boolean;
    AlternateText?: string;

    /**
     * Gets or sets the desired cropping of the image.
     * Previously for RTM: Did not exist, value will be ignored and background image will be displayed without any cropping.
     */
    HintCrop: AdaptiveImageCrop = AdaptiveImageCrop.Default;

    /**
      * Gets or sets a black overlay on the peek image.
      * This value controls the opacity of the black overlay, with 0 being no overlay and 100 being completely black.
      * Defaults to 0.
      * Previously for RTM: Did not exist, value will be ignored and peek image will be displayed with 0 overlay.
     */
    HintOverlay: number = 0;

    Source: string = "C:\Windows\System32\SecurityAndMaintenance.png";

    constructor() { }
}