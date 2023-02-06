import { IToastInput } from "../Interfaces/IToastInput";

/*
 * 
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.ToastTextBox}
 */
export class ToastTextBox implements IToastInput {
    /** Gets or sets the initial text to place in the text box. Leave this null for a blank text box. */
    DefaultInput?: string;
    /** Gets the required ID property so that developers can retrieve user input once the app is activated. */
    Id: string;
    /** Gets or sets placeholder text to be displayed on the text box when the user hasn't typed any text yet. */
    PlaceholderContent?: string;
    /** Gets or sets title text to display above the text box. */
    Title?: string;

    /**
     * Initializes a new instance of the ToastTextBox class. A new Toast TextBox input control with the required elements.
     * @param id Developer-provided ID that the developer uses later to retrieve input when the Toast is interacted with.
     */
    constructor(id: string) {
        this.Id = id;
    }
}