import { ToastActivationType } from "../Enums/ToastActivationType";
import { ToastActivationOptions } from "./ToastActivationOptions";

/**
 * Defines a visual header for the toast notification.
 * 
 * External MS doc: {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.toastheader}
 */
export class ToastHeader {
    /** Gets or sets additional options relating to activation of the toast header. New in Creators Update */
    ActivationOptions: ToastActivationOptions = new ToastActivationOptions();

    /** Gets or sets the type of activation this header will use when clicked. Defaults to Foreground. Note that only Foreground and Protocol are supported. */
    ActivationType: ToastActivationType = ToastActivationType.Foreground;

    /** Gets or sets a developer-defined string of arguments that is returned to the app when the user clicks this header. Cannot be null. */
    Arguments: string;

    /**
     * Gets or sets a developer-created identifier that uniquely identifies this header.
     * If two notifications have the same header id, they will be displayed underneath the same header in Action Center.
     * Cannot be null.
     */
    Id: string;

    /** Gets or sets a title for the header. Cannot be null. */
    Title: string;

    /**
     * Initializes a new instance of the ToastHeader class. Constructs a toast header with all the required properties.
     * @param id A developer-created identifier that uniquely identifies this header. If two notifications have the same header id, they will be displayed underneath the same header in Action Center.
     * @param title A title for the header.
     * @param headerArguments A developer-defined string of arguments that is returned to the app when the user clicks this header.
     */
    constructor(id: string, title: string, headerArguments: string) {
        this.Id = id;
        this.Title = title;
        this.Arguments = headerArguments;
    }
}