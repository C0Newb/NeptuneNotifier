import { ToastActivationType } from "../Enums/ToastActivationType";
import { ToastActivationOptions } from "../Classes/ToastActivationOptions";
import { IToastButton } from "../Interfaces/IToastButton";

/**
 * A button that the user can click on a Toast notification.
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.toastbutton}
 */
export class ToastButton implements IToastButton {
    /** Gets or sets additional options relating to activation of the toast button. New in Creators Update */
    ActivationOptions: ToastActivationOptions | undefined;

    /** Gets or sets what type of activation this button will use when clicked. Defaults to Foreground. */
    ActivationType: ToastActivationType = ToastActivationType.Foreground;

    /**
     * Gets app-defined string of arguments that the app can later retrieve once it is activated when the user clicks the button.
     * Required.
     */
    Arguments: string = "";

    /**
     * Gets the text to display on the button.
     * Required.
     */
    Content: string = "";

    HintActionId: string | undefined;
    ImageUri: string | undefined;

    /** Gets or sets the ID of an existing `ToastTextBox` in order to have this button display to the right of the input, achieving a quick reply scenario */
    TextBoxId: string | undefined;

    /**
     * Initializes a new instance of the `ToastButton` class.
     * @param content The text to display on the button.
     * @param buttonArguments App-defined string of arguments that the app can later retrieve once it is activated when the user clicks the button.
     */
    constructor(content: string = "Default", buttonArguments: string = "btnDefault") {
        this.Content = content;
        this.Arguments = buttonArguments;
    }
}