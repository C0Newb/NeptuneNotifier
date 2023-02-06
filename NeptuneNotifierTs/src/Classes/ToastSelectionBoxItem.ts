/**
 * A selection box item (an item that the user can select from the drop down list).
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.toastselectionboxitem}
 */
export class ToastSelectionBoxItem {
    private _Content: string;
    private _Id: string;

    /** Gets the required string that is displayed on the selection item. */
    public get Content(): string {
        return this._Content;
    }
    /** Gets the required ID property used so that developers can retrieve user input once the app is activated. */
    public get Id(): string {
        return this._Id;
    }

    /**
     * Initializes a new instance of the `ToastSelectionBoxItem` class.
     * Constructs a new Toast SelectionBoxItem with the required elements.
     * @param id Developer-provided ID that the developer uses later to retrieve input when the Toast is interacted with.
     * @param content String that is displayed on the selection item. This is what the user sees.
     */
    constructor(id: string, content: string) {
        this._Content = content;
        this._Id = id;
    }
}