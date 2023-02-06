/*
 * Specifies a sprite sheet. New in Fall Creators Update.
 * 
 * External MS doc: {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.ToastSpriteSheet}
 */

export class ToastSpriteSheet {
    private _Fps?: number;
    private _FrameHeight?: number;



    /**
     * Gets or sets the frames per second at which to animate the sprite sheet.
     * Required value that must be greater than 0 but no larger than 120.
     */
    get Fps(): number | undefined {
        return this._Fps;
    }
    set Fps(number: number | undefined) {
        if (typeof number === "undefined") {
            this._Fps = undefined;
            return;
        } else if (number <= 0)
            number = 1;
        else if (number > 120)
            number = 120;
        this._Fps = number;
    }

    /**
     * Gets or sets the frame-height of the sprite sheet. Required value that must be greater than 0.
     */
    get FrameHeight(): number | undefined {
        return this._FrameHeight;
    }
    set FrameHeight(number: number | undefined) {
        if (typeof number === "undefined") {
            this._FrameHeight = undefined;
            return;
        } else if (number <= 0)
            number = 1;
        this._FrameHeight = number;
    }

    /**
     * Gets or sets the URI of the sprite sheet (Required).
     * 
     * Can be from your application package, application data, or the internet.
     * Internet sources must obey the toast image size restrictions.
     */
    Source: string = "C:\Windows\System32\SecurityAndMaintenance.png";

    /** Gets or sets the starting frame of the sprite sheet. If not specified, it will start at frame zero. */
    StartingFrame?: number;

    constructor() { }
}