import { IToastInput } from "../Interfaces/IToastInput";
import { ToastSelectionBoxItem } from "./ToastSelectionBoxItem";

/**
 * A selection box control, which lets users pick from a dropdown list of options.
 *
 * External MS doc: {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.ToastSelectionBox}
 */
export class ToastSelectionBox implements IToastInput {
    /** Gets the required ID property used so that developers can retrieve user input once the app is activated. */
    public Id: string;

    /** Gets the selection items that the user can pick from in this SelectionBox. Only 5 items can be added. */
    public Items: ToastSelectionBoxItem[];


    /**
     * Gets or sets which item is selected by default, and refers to the Id property of {@link ToastSelectionBoxItem}.
     * If you do not provide this, the default selection will be empty (user sees nothing).
     */
    public DefaultSelectionBoxItemId?: string;

    /** Gets or sets title text to display above the SelectionBox. */
    public Title?: string;

    /**
     * Initializes a new instance of the ToastSelectionBox class. A Toast SelectionBox input control with the required elements.
     * @param id Developer-provided ID that the developer uses later to retrieve input when the Toast is interacted with.
     * @param choices Developer-provided selection items that the user can pick from in this SelectionBox. Only 5 items can be added.
     */
    constructor(id: string, choices?: ToastSelectionBoxItem[]) {
        this.Id = id;
        this.Items = (choices !== undefined)? choices : [];
    }
}