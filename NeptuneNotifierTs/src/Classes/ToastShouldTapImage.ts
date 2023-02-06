import { IBaseImage } from "../Interfaces/IBaseImage";
import { ToastSpriteSheet } from "./ToastSpriteSheet";

/*
 * Specifies the image to be displayed on a My People shoulder tap notification. New in Fall Creators Update.
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.ToastShouldTapImage}
 */
export class ToastShouldTapImage implements IBaseImage {
    AddImageQuery?: boolean;
    AlternateText?: string;
    Source: string = "C:\Windows\System32\SecurityAndMaintenance.png";

    /** Gets or sets an optional sprite sheet that can be used instead of the image to display an animated sprite sheet. */
    SpriteSheet?: ToastSpriteSheet;
}