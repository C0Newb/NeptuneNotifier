/*
 *      _  _ 
 *     | \| |
 *     | .` |
 *     |_|\_|eptune
 *
 * 		Capstone Project 2022
 * 
 *      NeptuneNotifier - Custom link with C# NeptuneNotifier application
 *      Notification data builder
 */

// -- //

// Enums
import { ToastActivationType } from "./Enums/ToastActivationType";
import { ToastAfterActivationBehavior } from "./Enums/ToastAfterActivationBehavior";
import { ToastDuration } from "./Enums/ToastDuration";
import { ToastScenario } from "./Enums/ToastScenario";

// Buttons
import { ToastButton } from "./Classes/ToastButton";
import { ToastButtonDismiss } from "./Classes/ToastButtonDismiss";
import { ToastButtonSnooze } from "./Classes/ToastButtonSnooze";


// Misc/support
import { ToastActivationOptions } from "./Classes/ToastActivationOptions";
import { IToastButton } from './Interfaces/IToastButton';
import { ToastAudio } from './Classes/ToastAudio';
import { ToastSelectionBoxItem } from './Classes/ToastSelectionBoxItem';
import { ToastSelectionBox } from './Classes/ToastSelectionBox';
import { ToastHeader } from './Classes/ToastHeader';
import { ToastGenericHeroImage } from './Classes/ToastGenericHeroImage';
import { AdaptiveImage } from './Classes/AdaptiveImage';
import { AdaptiveImageCrop, ToastGenericAppLogoCrop } from './Enums/AdaptiveImageCrop';
import { ToastTextBox } from './Classes/ToastTextBox';
import { AdaptiveProgressBar } from './Classes/AdaptiveProgressBar';
import { ToastGenericAppLogo } from './Classes/ToastGenericAppLogo';
import { AdaptiveText } from './Classes/AdaptiveText';
import { AdaptiveTextStyle } from './Enums/AdaptiveTextStyle';
import { AdaptiveTextAlign } from './Enums/AdaptiveTextAlign';
import { IToastInput } from './Interfaces/IToastInput';
import { IToastBindingGenericChild } from './Interfaces/IToastBindingGenericChild';
import { BadgeGlyphContent } from './Classes/BadgeGlyphContent';
import { BadgeNumericContent } from "./Classes/BadgeNumericContent";


/**
 * Builds up a toast notification that will be processed and created by NeptuneNotifier.
 * 
 * This DOES NOT create the same XML data as Microsoft's ToastContentBuilder (https://learn.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.notifications.toastcontentbuilder)
 * 
 * Rather, this builds a string (JSON) that is sent to the NeptuneNotifier application via command arguments.
 * NeptuneNotifier then processes that and uses ToastContentBuilder to build the ToastNotification XML.
 */
class ToastContentBuilder {
    /**
     * ToastNotification tag provided to Windows.
     * When the toast is activated/dismissed/etc this id will be used to distinguish which notification it is.
     */
    Id: string;

    /** How NeptuneNotifier will activate this application to inform it about a toast notification action */
    ActivationMethod: NeptuneNotifierActivationMethod;

    /** The HTTP URL, web socket address, or named pipe to be used to send data back this to application */
    ActivationMethodUri: string;


    LaunchArguments?: string;
    ActivationType: ToastActivationType = ToastActivationType.Foreground;
    ActivationArguments: Map<string, boolean | number | string | undefined> = new Map();

    // Elements
    AttributionText?: string;
    AttributionTextLanguage?: string;
    AppLogoOverride?: ToastGenericAppLogo;
    Audio?: ToastAudio;
    SelectionBox?: ToastSelectionBox;
    CustomTimeStamp?: Date;
    Header?: ToastHeader;
    HeroImage?: ToastGenericHeroImage;
    InlineImage?: AdaptiveImage;
    TextBox?: ToastTextBox;
    ProgressBar?: AdaptiveProgressBar;
    Text: AdaptiveText[] = []; // Can only have up to 4.

    Input?: IToastInput;
    VisualChildren: IToastBindingGenericChild[] = [];


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


    // App logo
    /**
     * Override the app logo with custom image of choice that will be displayed on the toast.
     * @param appLogo {@link ToastGenericAppLogo} with custom image of choice that will be displayed on the toast.
     */
    public AddAppLogoOverride(appLogo: ToastGenericAppLogo): ToastContentBuilder {
        this.AppLogoOverride = appLogo;
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
        genericAppLogo.HintCrop = (hintCrop !== undefined)? hintCrop : ToastGenericAppLogoCrop.Default;

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
        this.AttributionText = text;
        this.AttributionTextLanguage = language;
        return this;
    }


    // Audio
    /**
     * Set custom audio to go along with the toast.
     * @param audio The {@link ToastAudio} to set.
     */
    public AddAudio(audio: ToastAudio): ToastContentBuilder {
        this.Audio = audio;
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
        this.SelectionBox = comboBox;
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
        this.CustomTimeStamp = dateTime;
        return this;
    }


    // Header
    /**
     * Add a {@link ToastHeader} to the toast.
     * @param header Visual header for the toast notification.
     */
    public AddHeader(header: ToastHeader): ToastContentBuilder {
        this.Header = header;
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
        this.HeroImage = heroImage;
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
        this.HeroImage = heroImage;
        return heroImage;
    };


    // Inline image
    /**
     * Add an image inline with other toast content.
     * @param inlineImage The image to add inline with other toast content
     */
    public AddInlineImage(inlineImage: AdaptiveImage): ToastContentBuilder {
        this.InlineImage = inlineImage;
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
        inlineImage.HintCrop = (hintCrop !== undefined)? hintCrop : AdaptiveImageCrop.Default;
        inlineImage.HintRemoveMargin = hintRemoveMargin;
        return inlineImage;
    }


    // Text box
    /**
     * Add an input text box that the user can type into.
     * @param textBox The input text box to be added that the user can type into.
     */
    public AddInputTextBox(textBox: ToastTextBox): ToastContentBuilder {
        this.TextBox = textBox;
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
        this.ProgressBar = progressBar;
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
        if (this.Text.length >= 4)
            throw new RangeError("Cannot add anymore lines of text to the toast. Max lines: 4.");
        this.Text.push(textBox);
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
        this.LaunchArguments = launchArgs;
        this.ActivationType = activationType;
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
        this.Input = input;
        return this;
    }


    // Visual
    /**
     * Add a visual element to the toast
     * @param child An instance of a class that implement {@link IToastBindingGenericChild}.
     */
    public AddVisualChild(child: IToastBindingGenericChild): ToastContentBuilder {
        this.VisualChildren.push(child);
        return this;
    }


    // Schedule
    public Schedule(): ToastContentBuilder {

        return this;
    };


    // Duration
    /**
     * Sets the amount of time the Toast should display. You typically should use the Scenario attribute instead, which impacts how long a Toast stays on screen.
     * @param toastDuration
     */
    public SetToastDuration(toastDuration: ToastDuration) {

    }


    // Scenario
    /**
     * Sets the scenario, to make the Toast behave like an alarm, reminder, or more.
     * @param scenario - Scenario to be used for the toast's behavior
     */
    public SetToastScenario(scenario: ToastScenario) {

    }
}




/** How NeptuneNotifier will activate this application */
enum NeptuneNotifierActivationMethod {
    None = 0,
    Pipe = 1,
    HTTP = 2,
    WebSocket = 3
};


module.exports = {
    ToastContentBuilder,
    NeptuneNotifierActivationMethod,


    BadgeGlyphContent,
    BadgeNumericContent,

    // Buttons
    ToastButton,
    ToastButtonSnooze,
    ToastButtonDismiss,

    // Enums
    ToastActivationType,
    ToastAfterActivationBehavior,
    ToastDuration,
    ToastScenario,

    // Misc
    ToastActivationOptions,
}