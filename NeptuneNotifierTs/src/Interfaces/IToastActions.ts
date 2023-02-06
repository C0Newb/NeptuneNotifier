import { ToastContextMenuItem } from "../Classes/ToastContextMenuItem";

/*
 * Actions to display on a Toast notification. One of {@link ToastActionsCustom} or {@link ToastActionsSnoozeAndDismiss}.
 * 
 * External MS doc: {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.IToastActions}
 */
export interface IToastActions {
    /** Gets custom context menu items, providing additional actions when the user right clicks the Toast notification. New in Anniversary Update */
    ContextMenuItems: ToastContextMenuItem[];
}