/*
 * Specify what person this toast is related to. For more info, see the My People documentation. New in Fall Creators Update.
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.ToastPeople}
 */
export class ToastPeople {

    /**
     * Gets or sets an email address that corresponds with a contact in the local Windows ContactStore.
     * Note that if {@link RemoteId} is specified, this property will be ignored.
     * 
     * For more info, see the My People documentation.
     */
    EmailAddress?: string;

    /**
     * Gets or sets a phone number that corresponds with a contact in the local Windows ContactStore.
     * Note that if {@link EmailAddress} is specified, this property will be ignored.
     * 
     * For more info, see the My People documentation.
     */
    PhoneNumber?: string;

    /**
     * Gets or sets a remote identifier that corresponds with the RemoteId you set on a Contact you created with the ContactStore APIs.
     * 
     * For more info, see the My People documentation.
     */
    RemoteId?: string;
}