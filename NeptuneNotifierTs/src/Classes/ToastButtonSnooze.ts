import { IToastButton } from "../Interfaces/IToastButton";

/**
 * A button that the user can click on a Toast notification.
 * 
 * External MS doc: {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.toastbuttonsnooze}
 */
export class ToastButtonSnooze implements IToastButton {
    /**
     * Gets custom text displayed on the button that overrides the default localized "Snooze" text.
     */
    CustomContent: string | undefined;

    HintActionId: string | undefined;
    ImageUri: string | undefined;

    /**
     * Gets or sets the ID of an existing ToastSelectionBox in order to allow the user to pick a custom snooze time.
     * Optional.
     * 
     * The ID's of the ToastSelectionBoxItems inside the selection box must represent the snooze interval in minutes.
     * For example, if the user selects an item that has an ID of "120", then the notification will be snoozed for 2 hours.
     * 
     * When the user clicks this button, if you specified a SelectionBoxId, the system will parse the ID of the selected item and snooze by that amount of minutes.
     * If you didn't specify a SelectionBoxId, the system will snooze by the default system snooze time.
     */
    SelectionBoxId: string | undefined;

    /**
     * Initializes a new instance of the `ToastButtonSnooze` class.
     * Initializes a system-handled snooze button that displays your text on the button and automatically handles snoozing.
     * 
     * @param content The text you want displayed on the button. (Optional)
     */
    constructor(customContent: string | undefined) {
        this.CustomContent = customContent;
    }
}