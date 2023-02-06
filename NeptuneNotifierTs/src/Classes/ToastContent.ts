import { ToastActivationType } from "../Enums/ToastActivationType";
import { ToastDuration } from "../Enums/ToastDuration";
import { ToastScenario } from "../Enums/ToastScenario";
import { INotificationContent } from "../Interfaces/INotificationContent";
import { IToastActions } from "../Interfaces/IToastActions";
import { IToastButton } from "../Interfaces/IToastButton";
import { ToastActivationOptions } from "./ToastActivationOptions";
import { ToastAudio } from "./ToastAudio";
import { ToastHeader } from "./ToastHeader";
import { ToastPeople } from "./ToastPeople";
import { ToastVisual } from "./ToastVisual";

/*
 * Base Toast element, which contains at least a visual element.
 * 
 * External MS doc: {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.ToastContent}
 */
export class ToastContent implements INotificationContent {
    /**
     * Gets custom context menu items, providing additional actions when the user right clicks the Toast notification.
     * 
     * New in Anniversary Update
     */
    Actions?: IToastActions[];

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

    AdditionalProperties: Map<string, string>

    Audio?: ToastAudio;
    DisplayTimestamp?: Date;
    Duration?: ToastDuration;

    Header?: ToastHeader;

    /** Gets or sets the person that this toast is related to. For more info, see the My People documentation. New in Fall Creators Update. */
    HintPeople?: ToastPeople;

    HintToastId?: string;

    Launch?: string;

    Scenario?: ToastScenario;

    Visual: ToastVisual = new ToastVisual();


    constructor() { }


    GetContent(): string {
        throw new Error("Method not implemented.");
    }
    GetXml(): XMLDocument {
        throw new Error("Method not implemented.");
    }
}