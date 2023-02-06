import { IToastActions } from "../Interfaces/IToastActions";
import { IToastButton } from "../Interfaces/IToastButton";
import { IToastInput } from "../Interfaces/IToastInput";
import { ToastContextMenuItem } from "./ToastContextMenuItem";

/*
 * Automatically constructs a selection box for snooze intervals, and snooze/dismiss buttons, all automatically localized, and snoozing logic is automatically handled by the system.
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.ToastActionsSnoozeAndDismiss}
 */
export class ToastActionsCustom implements IToastActions {
    private _ContextMenuItems: ToastContextMenuItem[] = [];
    private _Buttons: IToastButton[] = [];
    private _Inputs: IToastInput[] = [];

    /**
     * Gets buttons displayed after all the inputs (or adjacent to inputs if used as quick reply buttons).
     * 
     * Only up to 5 buttons can be added (or fewer if you are also including context menu items). After that, an exception is thrown.
     * 
     * You can add {@link ToastButton}, {@link ToastButtonSnooze}, or {@link ToastButtonDismiss}
     * 
     * @throws {RangeError} When too many buttons are added
     */
    public get Buttons(): IToastButton[] {
        return this._Buttons;
    }
    public set Buttons(items: IToastButton[]) {
        if (items.length > 5 - this._ContextMenuItems.length)
            throw RangeError("Too many buttons are being added.");
            //items = items.slice(0, 4-this._ContextMenuItems.length);
        this._Buttons = items;
    }

    /**
     * Gets custom context menu items, providing additional actions when the user right clicks the Toast notification.
     * 
     * You can only have up to 5 buttons and context menu items combined.
     * Thus, if you have one context menu item, you can only have four buttons, etc.
     * 
     * New in Anniversary Update.
     */
    public get ContextMenuItems(): ToastContextMenuItem[] {
        return this._ContextMenuItems;
    }
    public set ContextMenuItems(items: ToastContextMenuItem[]) {
        if (items.length > 5 - this._ContextMenuItems.length)
            throw RangeError("Too many context menu items are being added.");
        this._ContextMenuItems = items;
    }

    /**
     * Gets inputs like {@link ToastTextBox} and {@link ToastSelectionBox}.
     * 
     * Only up to 5 inputs can be added; after that, an exception is thrown.
     */
    public get Inputs(): IToastInput[] {
        return this._Inputs;
    }
    public set Inputs(items: IToastInput[]) {
        if (items.length > 5)
            throw RangeError("Too many inputs are being added.");
        this._Inputs = items;
    }
}