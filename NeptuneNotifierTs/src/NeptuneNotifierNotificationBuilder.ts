import { ToastContentBuilder } from "./Classes/ToastContentBuilder";

/**
 * Builds up a toast notification that will be processed and created by NeptuneNotifier.
 * 
 * Toast XML generated using {@link NeptuneNotifierNotificationBuilder.ToastContentBuilder} (an instance of {@link ToastContentBuilder})
 */
export class NeptuneNotifierNotificationBuilder {
    /**
     * ToastNotification tag provided to Windows.
     * When the toast is activated/dismissed/etc this id will be used to distinguish which notification it is.
     */
    Id: string;

    /** How NeptuneNotifier will activate this application to inform it about a toast notification action */
    ActivationMethod: NeptuneNotifierActivationMethod;

    /** The HTTP URL, web socket address, or named pipe to be used to send data back this to application */
    ActivationMethodUri: string;


    /**
     * The {@link ToastContentBuilder} used to create the toast XML.
     */
    ToastContentBuilder: ToastContentBuilder = new ToastContentBuilder();


    /**
    * NeptuneNotifier ToastNotification builder (builds the toast data sent to NeptuneNotifier)
    * @param notificationId ToastNotification tag provided to Windows. When the toast is activated/dismissed/etc this id will be used to distinguish which notification it is.
    * @param activationMethod How NeptuneNotifier will activate this application to inform it about a toast notification action
    * @param activationMethodUri The HTTP URL, web socket address, or named pipe to be used to send data back this to application
    */
    constructor(notificationId: string, activationMethod: NeptuneNotifierActivationMethod, activationMethodUri: string) {
        this.Id = notificationId;
        this.ActivationMethod = activationMethod;
        this.ActivationMethodUri = activationMethodUri;
    }
}

/** How NeptuneNotifier will activate this application */
export enum NeptuneNotifierActivationMethod {
    None = 0,
    Pipe = 1,
    HTTP = 2,
    WebSocket = 3
};