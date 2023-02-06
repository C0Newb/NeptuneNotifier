import { ToastActivationType } from "../Enums/ToastActivationType";
import { ToastDuration } from "../Enums/ToastDuration";
import { ToastScenario } from "../Enums/ToastScenario";
import { INotificationContent } from "../Interfaces/INotificationContent";
import { IToastActions } from "../Interfaces/IToastActions";
import { IToastButton } from "../Interfaces/IToastButton";
import { Utilities } from "../Utilities";
import { ToastActivationOptions } from "./ToastActivationOptions";
import { ToastAudio } from "./ToastAudio";
import { ToastHeader } from "./ToastHeader";
import { ToastPeople } from "./ToastPeople";
import { ToastVisual } from "./ToastVisual";

/*
 * Base Toast element, which contains at least a visual element.
 * 
 * @remarks
 * More info at  {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.ToastContent}
 */
export class ToastContent implements INotificationContent {
    /**
     * Gets custom context menu items, providing additional actions when the user right clicks the Toast notification.
     * 
     * New in Anniversary Update
     */
    Actions?: IToastActions;

    /*
     * Gets or sets additional options relating to activation of the toast notification.
     * 
     * Requires Creators Updated
     */
    ActivationOptions?: ToastActivationOptions;

    /**
     * Gets or sets what activation type will be used when the user clicks the body of this Toast.
     */
    ActivationType: ToastActivationType = ToastActivationType.Foreground;

    /**
     * Gets a dictionary where you can assign additional properties.
     */
    readonly AdditionalProperties: Map<string, string> = new Map();

    /** Gets or sets custom audio options. */
    Audio?: ToastAudio;

    /**
     * Gets or sets an optional custom time to use for the notification's timestamp, visible within Action Center.
     * 
     * If provided, this date/time will be used on the notification instead of the date/time that the notification was received.
     * Requires Creators Update
     */
    DisplayTimestamp?: Date;

    /**
     * Gets or sets the amount of time the Toast should display.
     * 
     * You typically should use the Scenario attribute instead, which impacts how long a Toast stays on screen.
     */
    Duration?: ToastDuration;

    /**
     * Gets or sets an optional header for the toast notification.
     * 
     * Requires Creators Update.
     */
    Header?: ToastHeader;

    /** Gets or sets the person that this toast is related to. For more info, see the My People documentation. New in Fall Creators Update. */
    HintPeople?: ToastPeople;

    /**
     * Gets or sets an identifier used in telemetry to identify your category of toast notification.
     * This should be something like "NewMessage", "AppointmentReminder", "Promo30Off", or "PleaseRate".
     * 
     * In the upcoming toast telemetry dashboard in Dev Center, you will be able to view activation info filtered by toast identifier.
     */
    HintToastId?: string;


    /**
     * Gets or sets a string that is passed to the application when it is activated by the Toast. The format and contents of this string are defined by the app for its own use.
     * 
     * When the user taps or clicks the Toast to launch its associated app, the launch string provides the context to the app that allows it to show the user a view relevant to the Toast content, rather than launching in its default way.
     */
    Launch?: string;

    /**
     * Gets or sets the scenario, to make the Toast behave like an alarm, reminder, or more.
     */
    Scenario?: ToastScenario;

    /**
     * Gets or sets the visual element (Required).
     */
    Visual: ToastVisual = new ToastVisual();


    constructor() { }


    GetContent(): string {
        return Utilities.FromXMLDocumentToXMLString(this.GetXml());
    }

    GetXml(): XMLDocument {
        throw new Error("Method not implemented.");
    }

    /**
     * Retrieves the notification XML content as a string.
     * @returns The notification XML content as a string.
     */
    ToString(): string {
        return this.GetContent();
    }
}