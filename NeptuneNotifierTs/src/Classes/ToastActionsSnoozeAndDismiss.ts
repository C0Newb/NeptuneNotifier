import { IToastActions } from "../Interfaces/IToastActions";
import { ToastContextMenuItem } from "./ToastContextMenuItem";

/*
 * Automatically constructs a selection box for snooze intervals, and snooze/dismiss buttons, all automatically localized, and snoozing logic is automatically handled by the system.
 * 
 * External MS doc: {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.ToastActionsSnoozeAndDismiss}
 */
export class ToastActionsSnoozeAndDismiss implements IToastActions {
    /**
     * Gets custom context menu items, providing additional actions when the user right clicks the Toast notification.
     * 
     * You can only have up to 5 items. New in Anniversary Update
     */
    ContextMenuItems: ToastContextMenuItem[] = [];

    /*get ContextMenuItems(): ToastContextMenuItem[] {
        return this._ContextMenuItems;
    }
    set ContextMenuItems(items: ToastContextMenuItem[]) {
        if (items.length > 5)
            items = items.slice(0, 4);
        this._ContextMenuItems = items;
    }*/
}