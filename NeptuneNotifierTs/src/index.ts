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

// Microsoft.ToolKit.UWP.Notifications
import {AdaptiveGroup} from "./Classes/AdaptiveGroup"
import {AdaptiveImage} from "./Classes/AdaptiveImage"
import {AdaptiveProgressBar} from "./Classes/AdaptiveProgressBar"
import {AdaptiveSubgroup} from "./Classes/AdaptiveSubgroup"
import {AdaptiveText} from "./Classes/AdaptiveText"
import {BadgeGlyphContent} from "./Classes/BadgeGlyphContent"
import {BadgeNumericContent} from "./Classes/BadgeNumericContent"
import {TileBackgroundImage} from "./Classes/TileBackgroundImage"
import {TileBasicImage} from "./Classes/TileBasicImage"
import {TilePeekImage} from "./Classes/TilePeekImage"
import {ToastActionsCustom} from "./Classes/ToastActionsCustom"
import {ToastActionsSnoozeAndDismiss} from "./Classes/ToastActionsSnoozeAndDismiss"
import {ToastActivationOptions} from "./Classes/ToastActivationOptions"
import {ToastAudio} from "./Classes/ToastAudio"
import {ToastBindingGeneric} from "./Classes/ToastBindingGeneric"
import {ToastBindingShoulderTap} from "./Classes/ToastBindingShoulderTap"
import {ToastButton} from "./Classes/ToastButton"
import {ToastButtonDismiss} from "./Classes/ToastButtonDismiss"
import {ToastButtonSnooze} from "./Classes/ToastButtonSnooze"
import {ToastContent} from "./Classes/ToastContent"
import {ToastContentBuilder} from "./Classes/ToastContentBuilder"
import {ToastContextMenuItem} from "./Classes/ToastContextMenuItem"
import {ToastGenericAppLogo} from "./Classes/ToastGenericAppLogo"
import {ToastGenericAttributionText} from "./Classes/ToastGenericAttributionText"
import {ToastGenericHeroImage} from "./Classes/ToastGenericHeroImage"
import {ToastHeader} from "./Classes/ToastHeader"
import {ToastPeople} from "./Classes/ToastPeople"
import {ToastSelectionBox} from "./Classes/ToastSelectionBox"
import {ToastSelectionBoxItem} from "./Classes/ToastSelectionBoxItem"
import {ToastShouldTapImage} from "./Classes/ToastShouldTapImage"
import {ToastSpriteSheet} from "./Classes/ToastSpriteSheet"
import {ToastTextBox} from "./Classes/ToastTextBox"
import { ToastVisual } from "./Classes/ToastVisual"

import {AdaptiveImageAlign} from "./Enums/AdaptiveImageAlign"
import {AdaptiveImageCrop, ToastGenericAppLogoCrop} from "./Enums/AdaptiveImageCrop"
import {AdaptiveSubgroupTextStacking} from "./Enums/AdaptiveSubgroupTextStacking"
import {AdaptiveTextAlign} from "./Enums/AdaptiveTextAlign"
import {AdaptiveTextStyle} from "./Enums/AdaptiveTextStyle"
import {BadgeGlyphValue} from "./Enums/BadgeGlyphValue"
import {ToastActivationType} from "./Enums/ToastActivationType"
import {ToastAfterActivationBehavior} from "./Enums/ToastAfterActivationBehavior"
import {ToastDuration} from "./Enums/ToastDuration"
import { ToastScenario } from "./Enums/ToastScenario"

import {IAdaptiveChild} from "./Interfaces/IAdaptiveChild"
import {IAdaptiveSubgroupChild} from "./Interfaces/IAdaptiveSubgroupChild"
import {IBaseImage} from "./Interfaces/IBaseImage"
import {IBaseText} from "./Interfaces/IBaseText"
import {INotificationContent} from "./Interfaces/INotificationContent"
import {ITitleBindingContentAdaptiveChild} from "./Interfaces/ITitleBindingContentAdaptiveChild"
import {IToastActions} from "./Interfaces/IToastActions"
import {IToastBindingGenericChild} from "./Interfaces/IToastBindingGenericChild"
import {IToastButton} from "./Interfaces/IToastButton"
import { IToastInput } from "./Interfaces/IToastInput"

// Special
import {NeptuneNotifierNotificationBuilder} from "./NeptuneNotifierNotificationBuilder"
import {Utilities} from "./Utilities"

/*
export {
    AdaptiveGroup,
    AdaptiveImage,
    AdaptiveProgressBar,
    AdaptiveSubgroup,
    AdaptiveText,
    BadgeGlyphContent,
    BadgeNumericContent,
    TileBackgroundImage,
    TileBasicImage,
    TilePeekImage,
    ToastActionsCustom,
    ToastActionsSnoozeAndDismiss,
    ToastActivationOptions,
    ToastAudio,
    ToastBindingGeneric,
    ToastBindingShoulderTap,
    ToastButton,
    ToastButtonDismiss,
    ToastButtonSnooze,
    ToastContent,
    ToastContentBuilder,
    ToastContextMenuItem,
    ToastGenericAppLogoCrop,
    ToastGenericAppLogo,
    ToastGenericAttributionText,
    ToastGenericHeroImage,
    ToastHeader,
    ToastPeople,
    ToastSelectionBox,
    ToastSelectionBoxItem,
    ToastShouldTapImage,
    ToastSpriteSheet,
    ToastTextBox,
    ToastVisual,
    AdaptiveImageAlign,
    AdaptiveImageCrop,
    AdaptiveSubgroupTextStacking,
    AdaptiveTextAlign,
    AdaptiveTextStyle,
    BadgeGlyphValue,
    ToastActivationType,
    ToastAfterActivationBehavior,
    ToastDuration,
    ToastScenario,
    IAdaptiveChild,
    IAdaptiveSubgroupChild,
    IBaseImage,
    IBaseText,
    INotificationContent,
    ITitleBindingContentAdaptiveChild,
    IToastActions,
    IToastBindingGenericChild,
    IToastButton,
    IToastInput,
    NeptuneNotifierNotificationBuilder,
    Utilities,
}
*/

module.exports = {
    AdaptiveGroup: AdaptiveGroup,
    AdaptiveImage: AdaptiveImage,
    AdaptiveProgressBar: AdaptiveProgressBar,
    AdaptiveSubgroup: AdaptiveSubgroup,
    AdaptiveText: AdaptiveText,
    BadgeGlyphContent: BadgeGlyphContent,
    BadgeNumericContent: BadgeNumericContent,
    TileBackgroundImage: TileBackgroundImage,
    TileBasicImage: TileBasicImage,
    TilePeekImage: TilePeekImage,
    ToastActionsCustom: ToastActionsCustom,
    ToastActionsSnoozeAndDismiss: ToastActionsSnoozeAndDismiss,
    ToastActivationOptions: ToastActivationOptions,
    ToastAudio: ToastAudio,
    ToastBindingGeneric: ToastBindingGeneric,
    ToastBindingShoulderTap: ToastBindingShoulderTap,
    ToastButton: ToastButton,
    ToastButtonDismiss: ToastButtonDismiss,
    ToastButtonSnooze: ToastButtonSnooze,
    ToastContent: ToastContent,
    ToastContentBuilder: ToastContentBuilder,
    ToastContextMenuItem: ToastContextMenuItem,
    ToastGenericAppLogoCrop: ToastGenericAppLogoCrop,
    ToastGenericAppLogo: ToastGenericAppLogo,
    ToastGenericAttributionText: ToastGenericAttributionText,
    ToastGenericHeroImage: ToastGenericHeroImage,
    ToastHeader: ToastHeader,
    ToastPeople: ToastPeople,
    ToastSelectionBox: ToastSelectionBox,
    ToastSelectionBoxItem: ToastSelectionBoxItem,
    ToastShouldTapImage: ToastShouldTapImage,
    ToastSpriteSheet: ToastSpriteSheet,
    ToastTextBox: ToastTextBox,
    ToastVisual: ToastVisual,
    AdaptiveImageAlign: AdaptiveImageAlign,
    AdaptiveImageCrop: AdaptiveImageCrop,
    AdaptiveSubgroupTextStacking: AdaptiveSubgroupTextStacking,
    AdaptiveTextAlign: AdaptiveTextAlign,
    AdaptiveTextStyle: AdaptiveTextStyle,
    BadgeGlyphValue: BadgeGlyphValue,
    ToastActivationType: ToastActivationType,
    ToastAfterActivationBehavior: ToastAfterActivationBehavior,
    ToastDuration: ToastDuration,
    ToastScenario: ToastScenario,
    //IAdaptiveChild: IAdaptiveChild,
    //IAdaptiveSubgroupChild: IAdaptiveSubgroupChild,
    //IBaseImage: IBaseImage,
    //IBaseText: IBaseText,
    //INotificationContent: INotificationContent,
    //ITitleBindingContentAdaptiveChild: ITitleBindingContentAdaptiveChild,
    //IToastActions: IToastActions,
    //IToastBindingGenericChild: IToastBindingGenericChild,
    //IToastButton: IToastButton,
    //IToastInput: IToastInput,

    Utilities: Utilities,
    NeptuneNotifierNotificationBuilder: NeptuneNotifierNotificationBuilder,
}