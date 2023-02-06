import { IToastButton } from "../Interfaces/IToastButton";

/**
 * A button that, when clicked, is interpreted as a "dismiss" by the system, and the Toast is dismissed just like if the user swiped the Toast away.
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.toastbuttondismiss}
 */
export class ToastButtonDismiss implements IToastButton {
    /**
     * Gets custom text displayed on the button that overrides the default localized "Dismiss" text.
     */
    CustomContent: string | undefined;

    HintActionId: string | undefined;
    ImageUri: string | undefined;

    /**
     * Initializes a new instance of the `ToastButtonDismiss` class.
     * Constructs a system-handled dismiss button that displays your text on the button.
     * 
     * @param content The text you want displayed on the button. (Optional)
     */
    constructor(customContent: string | undefined) {
        this.CustomContent = customContent;
    }
}