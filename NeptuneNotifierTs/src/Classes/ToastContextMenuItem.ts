import { ToastActivationType } from "../Enums/ToastActivationType";
import { ToastActivationOptions } from "./ToastActivationOptions";

/*
 * A Toast context menu item.
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.ToastContextMenuItem}
 */
export class ToastContextMenuItem {
    /** Gets or sets additional options relating to activation of the toast context menu item. New in Creators Update */
    ActivationOptions?: ToastActivationOptions;

    /** Gets or sets what type of activation this menu item will use when clicked. Defaults to Foreground. */
    ActivationType: ToastActivationType = ToastActivationType.Foreground;

    private _Arguments: string;
    /** Gets app-defined string of arguments that the app can later retrieve once it is activated when the user clicks the menu item. Required */
    get Arguments(): string {
        return this._Arguments;
    };

    private _Content: string;
    /** Gets the text to display on the menu item. Required */
    get Content(): string {
        return this._Content;
    };

    /**
     * Gets or sets an identifier used in telemetry to identify your category of action.
     * This should be something like "TurnOff" or "ManageSettings".
     * 
     * In the upcoming toast telemetry dashboard in Dev Center, you will be able to view how frequently your actions are being clicked.
     */
    HintActionId?: string;

    /**
     * Initializes a new instance of the {@link ToastContextMenuItem} class. A Toast context menu item with the required properties.
     * @param content The text to display on the menu item.
     * @param menuArguments App-defined string of arguments that the app can later retrieve once it is activated when the user clicks the menu item.
     */
    constructor(content: string, menuArguments: string) {
        this._Content = content;
        this._Arguments = menuArguments;
    }
}