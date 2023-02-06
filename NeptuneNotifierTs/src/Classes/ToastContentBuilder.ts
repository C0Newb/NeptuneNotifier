import { AdaptiveImage } from './AdaptiveImage';
import { AdaptiveProgressBar } from './AdaptiveProgressBar';
import { AdaptiveText } from './AdaptiveText';
import { BadgeGlyphContent } from './BadgeGlyphContent';
import { BadgeNumericContent } from "./BadgeNumericContent";
import { ToastActionsCustom } from "./ToastActionsCustom";
import { ToastActivationOptions } from "./ToastActivationOptions";
import { ToastAudio } from './ToastAudio';
import { ToastButton } from "./ToastButton";
import { ToastButtonDismiss } from "./ToastButtonDismiss";
import { ToastButtonSnooze } from "./ToastButtonSnooze";
import { ToastContent } from "./ToastContent";
import { ToastGenericAppLogo } from './ToastGenericAppLogo';
import { ToastGenericAttributionText } from "./ToastGenericAttributionText";
import { ToastGenericHeroImage } from './ToastGenericHeroImage';
import { ToastHeader } from './ToastHeader';
import { ToastSelectionBox } from './ToastSelectionBox';
import { ToastSelectionBoxItem } from './ToastSelectionBoxItem';
import { ToastTextBox } from './ToastTextBox';

import { AdaptiveImageCrop, ToastGenericAppLogoCrop } from '../Enums/AdaptiveImageCrop';
import { AdaptiveTextAlign } from '../Enums/AdaptiveTextAlign';
import { AdaptiveTextStyle } from '../Enums/AdaptiveTextStyle';
import { ToastActivationType } from "../Enums/ToastActivationType";
import { ToastDuration } from "../Enums/ToastDuration";
import { ToastScenario } from "../Enums/ToastScenario";

import { IToastBindingGenericChild } from '../Interfaces/IToastBindingGenericChild';
import { IToastButton } from '../Interfaces/IToastButton';
import { IToastInput } from '../Interfaces/IToastInput';

/**
 * Builder class used to create ToastContent
 * 
 * 
 * Builds up a toast notification that will be processed and created by NeptuneNotifier.
 * 
 * @remarks
 * More info at {@link https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.toastcontentbuilder}
 */
export class ToastContentBuilder {
    _Content: ToastContent = new ToastContent()
    /**
     * Gets internal instance of ToastContent.
     * This is equivalent to the call to GetToastContent().
     */
    get Content(): ToastContent {
        return this._Content;
    };

    ActivationArguments: Map<string, boolean | number | string | undefined> = new Map();

    /**
     * Initializes a new instance of the {@link ToastContentBuilder} class.
     */
    constructor() { }


    // App logo
    /**
     * Override the app logo with custom image of choice that will be displayed on the toast.
     * @param appLogo {@link ToastGenericAppLogo} with custom image of choice that will be displayed on the toast.
     */
    public AddAppLogoOverride(appLogo: ToastGenericAppLogo): ToastContentBuilder {
        this._Content.Visual.BindingGeneric.AppLogoOverride = appLogo;
        return this;
    }
    /**
     * Creates {@link ToastGenericAppLogo} and overrides the app logo with custom image of choice that will be displayed on the toast.
     * @param appLogo The URI of the image. Can be from your application package, application data, or the internet. Internet images must be less than 200 KB in size.
     * @param hintCrop Specify how the image should be cropped.
     * @param alternateText A description of the image, for users of assistive technologies.
     * @param addImageQuery A value whether Windows is allowed to append a query string to the image URI supplied in the Tile notification.
     */
    public CreateAndAddAppLogoOverride(appLogo: string, hintCrop?: ToastGenericAppLogoCrop, alternateText?: string, addImageQuery?: string): ToastGenericAppLogo {
        let genericAppLogo = new ToastGenericAppLogo();
        genericAppLogo.Source = appLogo;
        genericAppLogo.HintCrop = (hintCrop !== undefined) ? hintCrop : ToastGenericAppLogoCrop.Default;

        this.AddAppLogoOverride(genericAppLogo);
        return genericAppLogo;
    }




    // Launch argument
    /**
     * Adds a key/value to the activation arguments that will be returned when the toast notification or its buttons are clicked.
     * @param key The key (for this value).
     * @param value The value itself. (For enums: Note that the enums are stored using their numeric value, so be aware that changing your enum number values might break existing activation of toasts currently in Action Center.)
     */
    public AddArgument(key: string, value?: boolean | number | string): ToastContentBuilder {
        this.ActivationArguments.set(key, value);
        return this;
    }


    // Attribution text
    /**
     * Add an Attribution Text to be displayed on the toast.
     * @param text Text to be displayed as Attribution Text
     * @param language The target locale of the XML payload, specified as a BCP-47 language tags such as "en-US" or "fr-FR".
     */
    public AddAttributionText(text: string, language?: string): ToastContentBuilder {
        let attributionText = new ToastGenericAttributionText();
        attributionText.Text = text;
        attributionText.Language = language;
        this._Content.Visual.BindingGeneric.Attribution = attributionText;
        return this;
    }


    // Audio
    /**
     * Set custom audio to go along with the toast.
     * @param audio The {@link ToastAudio} to set.
     */
    public AddAudio(audio: ToastAudio): ToastContentBuilder {
        this._Content.Audio = audio;
        return this;
    }
    /**
     * Creates ands sets the custom audio to go along with the toast.
     * @param src The media file to play in place of the default sound.
     * @return Newly created {@link ToastAudio}
     */
    public CreateAndAddAudio(src: URL): ToastAudio {
        let audio = new ToastAudio();
        audio.Src = src;
        this.AddAudio(audio);
        return audio;
    }

    // Buttons
    /**
     * Add a button to the current toast.
     * @param button An instance of class that implement {@link IToastButton} for the button that will be used on the toast.
     */
    public AddButton(button: IToastButton): ToastContentBuilder {
        if (this._Content.Actions == undefined)
            this._Content.Actions = new ToastActionsCustom();
        if (this._Content.Actions instanceof ToastActionsCustom)
            this._Content.Actions.Buttons.push(button);
        return this;
    }
    /**
     * Add a button to the current toast.
     * @param content Text to display on the button.
     * @param activationType Type of activation this button will use when clicked. Defaults to Foreground.
     * @param buttonArguments App-defined string of arguments that the app can later retrieve once it is activated when the user clicks the button.
     * @param imageUri Optional image icon for the button to display (required for buttons adjacent to inputs like quick reply).
     */
    public CreateAndAddButton(content: string, activationType: ToastActivationType, buttonArguments: string, imageUri?: string): ToastContentBuilder {
        let btn = new ToastButton(content, buttonArguments);
        btn.ActivationType = activationType;
        btn.ImageUri = imageUri;
        return this.AddButton(btn);
    }
    /**
     * Add an button to the toast that will be display to the right of the input text box, achieving a quick reply scenario.
     * @param textBoxId ID of an existing {@link ToastTextBox} in order to have this button display to the right of the input, achieving a quick reply scenario.
     * @param content Text to display on the button.
     * @param activationType Type of activation this button will use when clicked. Defaults to Foreground.
     * @param buttonArguments App-defined string of arguments that the app can later retrieve once it is activated when the user clicks the button.
     * @param imageUri Optional image icon for the button to display (required for buttons adjacent to inputs like quick reply).
     */
    public CreateAndAddTextBoxButton(textBoxId: string, content: string, activationType: ToastActivationType, buttonArguments: string, imageUri?: string): ToastContentBuilder {
        let btn = new ToastButton(content, buttonArguments);
        btn.ActivationType = activationType;
        btn.TextBoxId = textBoxId;
        btn.ImageUri = imageUri;
        return this.AddButton(btn);
    }



    // Combo box
    /**
     * Add a combo box / drop-down menu that contain options for user to select.
     * @param comboBox Combo box / drop-down menu that contain options for user to select.
     */
    public AddComboBox(comboBox: ToastSelectionBox): ToastContentBuilder {
        this.AddToastInput(comboBox);
        return this;
    }
    /**
     * Create and then add a combo box / drop-down menu that contain options for user to select.
     * @param id Required ID property used so that developers can retrieve user input once the app is activated.
     * @param choices Either {@link ToastSelectionBoxItem}[] or Map<id: string, content: string> that will be converted to {@link ToastSelectionBoxItem}[]
     * @param defaultSelectionBoxItemId Sets which item is selected by default, and refers to the Id property of {@link ToastSelectionBoxItem}. If you do not provide this or null, the default selection will be empty (user sees nothing).
     * @param title Title text to display above the Combo Box.
     * @return Newly created {@link ToastSelectionBox}
     */
    public CreateAndAddComboBox(id: string, choices: ToastSelectionBoxItem[] | Map<string, string>, defaultSelectionBoxItemId?: string, title?: string): ToastSelectionBox {
        let comboBox: ToastSelectionBox;

        if (choices instanceof Map) {
            let newChoices: ToastSelectionBoxItem[] = [];
            choices.forEach((id, content) => {
                newChoices.push(new ToastSelectionBoxItem(id, content));
            });
            comboBox = new ToastSelectionBox(id, newChoices);
        } else {
            comboBox = new ToastSelectionBox(id, choices);
        }

        comboBox.DefaultSelectionBoxItemId = defaultSelectionBoxItemId;
        comboBox.Title = title;
        this.AddComboBox(comboBox);
        return comboBox
    }


    // Time stamp
    /**
     * Add custom time stamp on the toast to override the time display on the toast.
     * @param dateTime Custom Time to be displayed on the toast
     */
    public AddCustomTimeStamp(dateTime: Date): ToastContentBuilder {
        this._Content.DisplayTimestamp = dateTime;
        return this;
    }


    // Header
    /**
     * Add a {@link ToastHeader} to the toast.
     * @param header Visual header for the toast notification.
     */
    public AddHeader(header: ToastHeader): ToastContentBuilder {
        this._Content.Header = header;
        return this;
    }
    /**
     * Create and adds a {@link ToastHeader} to a toast.
     * @param id A developer-created identifier that uniquely identifies this header. If two notifications have the same header id, they will be displayed underneath the same header in Action Center.
     * @param title A title for the header.
     * @param headerArguments A developer-defined string of arguments that is returned to the app when the user clicks this header.
     * @return Newly created {@link ToastHeader}
     */
    public CreateAndAddHeader(id: string, title: string, headerArguments: string | Map<string, string>): ToastHeader {
        if (headerArguments instanceof Map) {
            let newArguments = "";
            let separator = "";
            headerArguments.forEach((aId, aContent) => {
                newArguments += `${aId}=${aContent}${separator}`;
                separator = "&amp;";
            });
            headerArguments = newArguments;
        }
        let header = new ToastHeader(id, title, headerArguments);
        this.AddHeader(header);
        return header;
    };


    // Hero image
    /**
     * Add a hero image to the toast.
     * @param heroImage Hero image to add to the toast.
     */
    public AddHeroImage(heroImage: ToastGenericHeroImage): ToastContentBuilder {
        this._Content.Visual.BindingGeneric.HeroImage = heroImage;
        return this;
    }
    /**
     * Creates and adds a {@link ToastGenericHeroImage} to the toast.
     * @param uri The URI of the image. Can be from your application package, application data, or the internet. Internet images must be less than 200 KB in size.
     * @param alternateText A description of the image, for users of assistive technologies.
     * @param addImageQuery A value whether Windows is allowed to append a query string to the image URI supplied in the Tile notification.
     * @return Newly created {@link ToastGenericHeroImage}
     */
    public CreateAndAddHeroImage(uri: string, alternateText: string, addImageQuery?: boolean): ToastGenericHeroImage {
        let heroImage = new ToastGenericHeroImage();
        heroImage.Source = uri;
        heroImage.AlternateText = alternateText;
        heroImage.AddImageQuery = addImageQuery;
        this.AddHeroImage(heroImage);
        return heroImage;
    };


    // Inline image
    /**
     * Add an image inline with other toast content.
     * @param inlineImage The image to add inline with other toast content
     */
    public AddInlineImage(inlineImage: AdaptiveImage): ToastContentBuilder {
        this.AddVisualChild(inlineImage);
        return this;
    };
    /**
     * Add an image inline with other toast content.
     * @param uri The URI of the image. Can be from your application package, application data, or the internet. Internet images must be less than 200 KB in size.
     * @param alternateText A description of the image, for users of assistive technologies.
     * @param addImageQuery A value whether Windows is allowed to append a query string to the image URI supplied in the Tile notification.
     * @param hintCrop A value whether a margin is removed. images have an 8px margin around them.
     * @param hintRemoveMargin This property is not used. Setting this has no impact.
     * @return Newly created {@link AdaptiveImage}
     */
    public CreateAndAddInlineImage(uri: string, alternateText: string, addImageQuery?: boolean, hintCrop?: AdaptiveImageCrop, hintRemoveMargin?: boolean): AdaptiveImage {
        let inlineImage = new AdaptiveImage();
        inlineImage.Source = uri;
        inlineImage.AddImageQuery = addImageQuery;
        inlineImage.HintCrop = (hintCrop !== undefined) ? hintCrop : AdaptiveImageCrop.Default;
        inlineImage.HintRemoveMargin = hintRemoveMargin;
        return inlineImage;
    }


    // Text box
    /**
     * Add an input text box that the user can type into.
     * @param textBox The input text box to be added that the user can type into.
     */
    public AddInputTextBox(textBox: ToastTextBox): ToastContentBuilder {
        this.AddToastInput(textBox);
        return this;
    }
    /**
     * Add an input text box that the user can type into.
     * 
     * Same as {@link AddInputTextBox}
     * @param textBox The input text box to be added that the user can type into.
     */
    public AddTextBox(textBox: ToastTextBox): ToastContentBuilder {
        return this.AddInputTextBox(textBox);
    }
    /**
     * Creates and add an {@link ToastTextBox} that the user can type into.
     * @param id Required ID property so that developers can retrieve user input once the app is activated.
     * @param placeHolderContent Placeholder text to be displayed on the text box when the user hasn't typed any text yet.
     * @param title Title text to display above the text box.
     * @param defaultInput Initial text to place in the text box. Leave this null for a blank text box
     */
    public CreateAndAddInputTextBox(id: string, placeHolderContent?: string, title?: string, defaultInput?: string): ToastTextBox {
        let textBox = new ToastTextBox(id);
        textBox.PlaceholderContent = placeHolderContent;
        textBox.Title = title;
        textBox.DefaultInput = defaultInput;
        this.AddInputTextBox(textBox);
        return textBox;
    }
    /**
     * Creates and add an {@link ToastTextBox} that the user can type into.
     * 
     * Same as {@link CreateAndAddInputTextBox}
     * @param id Required ID property so that developers can retrieve user input once the app is activated.
     * @param placeHolderContent Placeholder text to be displayed on the text box when the user hasn't typed any text yet.
     * @param title Title text to display above the text box.
     * @param defaultInput Initial text to place in the text box. Leave this null for a blank text box
     */
    public CreateAndAddTextBox(id: string, placeHolderContent?: string, title?: string, defaultInput?: string): ToastTextBox {
        return this.CreateAndAddInputTextBox(id, placeHolderContent, title, defaultInput);
    }


    // Progress bar
    /**
     * Add a progress bar to the toast.
     * @param progressBar The progress bar to add to the toast.
     */
    public AddProgressBar(progressBar: AdaptiveProgressBar): ToastContentBuilder {
        this.AddVisualChild(progressBar);
        return this;
    };
    /**
     * Creates and adds a {@link AdaptiveProgressBar} to the toast.
     * @param title Title of the progress bar.
     * @param value Value of the progress bar. Default is 0
     * @param isIndeterminate [Not used] Determine if the progress bar value should be indeterminate. Default to false.
     * @param valueStringOverride An optional string to be displayed instead of the default percentage string. If this isn't provided, something like "70%" will be displayed.
     * @param status A status string which is displayed underneath the progress bar. This string should reflect the status of the operation, like "Downloading..." or "Installing...". Default to empty.
     * @return Newly created {@link AdaptiveProgressBar}
     */
    public CreateAndAddProgressBar(title?: string, value: number = 0, isIndeterminate: boolean | undefined = false, valueStringOverride?: string, status?: string): ToastContentBuilder {
        let progressBar = new AdaptiveProgressBar();
        progressBar.Title = title;
        progressBar.ValueStringOverride = valueStringOverride;
        progressBar.Status = status;
        this.AddProgressBar(progressBar);
        return this;
    };


    // Text
    /**
     * Adds a {@link AdaptiveText} to the toast.
     * 
     * You can only add up to 4 lines.
     * 
     * @remarks More info at {@link https://docs.microsoft.com/en-us/windows/uwp/design/shell/tiles-and-notifications/adaptive-interactive-toasts#text-elements}
     * @throws {RangeError} Throws when attempting to add/reserve more than 4 lines on a single toast.
     * 
     * @param textBox
     */
    public AddText(textBox: AdaptiveText): ToastContentBuilder {
        if (this._Content.Visual.BindingGeneric.Children.length >= 4)
            throw new RangeError("Cannot add anymore lines of text to the toast. Max lines: 4.");
        this.AddVisualChild(textBox);
        return this;
    };
    /**
     * Creates a {@AdaptiveText} and adds the text to the toast.
     * 
     * @remarks More info at {@link https://docs.microsoft.com/en-us/windows/uwp/design/shell/tiles-and-notifications/adaptive-interactive-toasts#text-elements}
     * @throws {ArgumentOutOfRangeException} Throws when `hintMaxLines` value is larger than 2.
     * @param text Custom text to display on the tile.
     * @param hintStyle This property is not used. Setting this has no effect.
     * @param hintWrap This property is not used. Setting this has no effect. If you need to disable wrapping, set hintMaxLines to 1.
     * @param hintMaxLines The maximum number of lines the text element is allowed to display.
     * @param hintMinLines hintMinLines is not used. Setting this has no effect.
     * @param hintAlign hintAlign is not used. Setting this has no effect.
     * @param language The target locale of the XML payload, specified as a BCP-47 language tags such as "en-US" or "fr-FR". The locale specified here overrides any other specified locale, such as that in binding or visual.
     */
    public CreateAndAddText(text: string, hintStyle: AdaptiveTextStyle = AdaptiveTextStyle.Default, hintWrap?: boolean, hintMaxLines?: number, hintMinLines?: number, hintAlign: AdaptiveTextAlign = AdaptiveTextAlign.Default, language?: string): AdaptiveText {
        let newText = new AdaptiveText();
        newText.Text = text;
        newText.HintStyle = hintStyle;
        newText.HintWrap = hintWrap;
        newText.HintMaxLines = hintMaxLines;
        newText.HintMinLines = hintMinLines;
        newText.HintAlign = hintAlign;
        newText.Language = language;
        this.AddText(newText);
        return newText;
    }


    // Activation info
    /**
     * Instead of this method, for foreground/background activation, it is suggested to use {@link AddArgument} and optionally {@link SetBackgroundActivation}.
     * For protocol activation, you should use {@link SetProtocolActivation}.
     * Add info that can be used by the application when the app was activated/launched by the toast.
     * @param launchArgs Custom app-defined launch arguments to be passed along on toast activation
     * @param activationType Set the activation type that will be used when the user click on this toast. Default is {@link ToastActivationType.Foreground}
     */
    public AddToastActivationInfo(launchArgs: string, activationType: ToastActivationType = ToastActivationType.Foreground): ToastContentBuilder {
        this._Content.Launch = launchArgs;
        this._Content.ActivationType = activationType;
        return this;
    }


    // Input
    /**
     * Add an input option to the Toast.
     * 
     * Called internally by the {@link AddInputTextBox} and {@link AddComboBox}
     * @param input An instance of a class that implement {@link IToastInput} that will be used on the toast.
     */
    public AddToastInput(input: IToastInput): ToastContentBuilder {
        if (this._Content.Actions == undefined)
            this._Content.Actions = new ToastActionsCustom();
        if (this._Content.Actions instanceof ToastActionsCustom)
            this._Content.Actions.Inputs.push(input);
        return this;
    }


    // Visual
    /**
     * Add a visual element to the toast
     * @param child An instance of a class that implement {@link IToastBindingGenericChild}.
     */
    public AddVisualChild(child: IToastBindingGenericChild): ToastContentBuilder {
        this._Content.Visual.BindingGeneric.Children.push(child);
        return this;
    }


    // Schedule
    /**
     * Schedules the notification.
     * 
     * NOT IMPLEMENETED. Must be done by NeptuneNotifier itself
     * @param deliveryTime The date and time that Windows should display the toast notification. This time must be in the future.
     */
    public Schedule(deliveryTime: Date): ToastContentBuilder {
        throw new Error("Not implemented");
        return this;
    };


    // Background activation
    /**
     * Configures the toast notification to use background activation when the toast body is clicked.
     */
    public SetBackgroundActivation(): ToastContentBuilder {
        this._Content.ActivationType = ToastActivationType.Background;
        return this;
    }


    // Protocol activation
    /**
     * Configures the toast notification to launch the specified url when the toast body is clicked.
     * @param uri The protocol to launch.
     * @param targetApplicationPfn New in Creators Update: The target PFN, so that regardless of whether multiple apps are registered to handle the same protocol uri, your desired app will always be launched.
     */
    public SetProtocolActivation(uri: string, targetApplicationPfn: string): ToastContentBuilder {
        this._Content.ActivationType = ToastActivationType.Protocol
        let activationOptions = new ToastActivationOptions();
        activationOptions.ProtocolActivationTargetApplication = targetApplicationPfn;
        this._Content.ActivationOptions = activationOptions;
        return this;
    }


    // Duration
    /**
     * Sets the amount of time the Toast should display. You typically should use the Scenario attribute instead, which impacts how long a Toast stays on screen.
     * @param toastDuration Duration of the toast
     */
    public SetToastDuration(toastDuration: ToastDuration): ToastContentBuilder {
        this._Content.Duration = toastDuration;
        return this;
    }


    // Scenario
    /**
     * Sets the scenario, to make the Toast behave like an alarm, reminder, or more.
     * @param scenario Scenario to be used for the toast's behavior
     */
    public SetToastScenario(scenario: ToastScenario): ToastContentBuilder {
        this._Content.Scenario = scenario;
        return this;
    }
}