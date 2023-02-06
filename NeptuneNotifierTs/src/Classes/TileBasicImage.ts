import { IBaseImage } from "../Interfaces/IBaseImage";

/*
 * An image used on various special templates for the Title.
 * 
 * External MS doc: {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.TileBasicImage}
 */
export class TileBasicImage implements IBaseImage {
    AddImageQuery?: boolean;
    AlternateText?: string;
    Source: string = "C:\Windows\System32\SecurityAndMaintenance.png";

    constructor() { }
}