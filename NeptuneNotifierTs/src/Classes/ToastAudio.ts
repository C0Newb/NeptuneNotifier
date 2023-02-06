/**
 * Specify audio to be played when the Toast notification is received.
 *
 * External MS doc: {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.toastaudio}
 */
export class ToastAudio {
    /** Gets or sets a value indicating whether sound should repeat as long as the Toast is shown; false to play only once (default). */
    public Loop: boolean = false;
    /** Gets or sets a value indicating whether sound is muted; false to allow the Toast notification sound to play (default). */
    public Silent: boolean = false;
    /** Gets or sets the media file to play in place of the default sound. */
    public Src: URL = new URL("C:\Windows\Media\tada.wav");

    constructor() { }
}