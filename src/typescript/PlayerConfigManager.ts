import {StormTimeZone} from "@app/typescript/utilities/StormTimeZone";
import {StormPlayerConfig} from "@app/typescript/types/StormPlayerConfig";
import {StormPlayer} from "@app/typescript/StormPlayer";

/**
 * Object of this class contains all settings for the player
 */
export class PlayerConfigManager {

    /**
     * Reference to the initial configuration
     * @private
     */
    private currentRawConfig:StormPlayerConfig;

    /**
     * ID of a container
     * @private
     */
    private containerID: string;

    /**
     * Initial player initialWidth
     * @private
     */
    private initialWidth: number | string = "100%";

    /**
     * Initial player initialHeight
     * @private
     */
    private initialHeight: number | string = "100%";

    /**
     * Aspect ratio for the player
     * @private
     */
    private aspectRatio:string = "none";

    /**
     * Whenever big play button should be displayed at start or not
     * @private
     */
    private bigPlayButton: boolean = true;

    /**
     * Whenever showTimeline should be visible
     * @private
     */
    private showTimeline: boolean = false;

    /**
     * Main posterURL for the video
     * @private
     */
    private posterURL:string = null;

    /**
     * Whenever GUI should be hidden on no user interaction
     * @private
     */
    private autoGUIHide: boolean = true;

    /**
     * Number of seconds after which gui disappears if there is no user interaction
     * @private
     */
    private guiHideTime: number = 3;

    /**
     * Title for the video (visible in the upper-right corner)
     * @private
     */
    private title: string = null;

    /**
     * Subtitle for the video (visible in the upper-right corner, below the main title)
     * @private
     */
    private subtitle: string = null;

    /**
     * This message is displayed when the player is disconnected from the streaming server
     * @private
     */
    private serverDisconnectedText: string = "Disconnected from streaming server.";

    /**
     * This message is displayed when player fails to connect to a streaming server
     * @private
     */
    private serverConnectionFailedText: string = "Failed to connect to the streaming server.";

    /**
     * This message is displayed when device is not compatible with the player and video cannot be played
     * @private
     */
    private compatibilityErrorText: string = "Your device is not compatible with the available video source.";

    /**
     * This message is displayed when device is not compatible with the player and video cannot be played
     * @private
     */
    private incorrectProtocolVersionText: string = "Incorrect Storm Protocol Version.";

    /**
     * This message is displayed when device is not compatible with the player and video cannot be played
     * @private
     */
    private licenseErrorText: string = "Incorrect Storm Protocol Version.";

    /**
     * This message will be displayed if player requires SSL connection
     * @private
     */
    private noSSLErrorText: string = "This connection requires a secure SSL connection.";

    /**
     * This message will be displayed if an error occurs during playback
     * @private
     */
    private streamErrorText: string = "Error while playing the stream.";

    /**
     * This message will be displayed while awaiting for video start
     * @private
     */
    private awaitingStartText:string = "Waiting for the stream to start...";

    /**
     * This error will be displayed if no stream with given name was found on the streaming server
     * @private
     */
    private streamNotFoundText: string = "Stream with given name was not found.";

    /**
     * This message will be displayed if a stream has been closed
     * @private
     */
    private streamStopText: string = "The stream has ended.";

    /**
     * This message will be displayed if the library (player) is not compatible with given streaming server
     * @private
     */
    private incompatiblePlayerProtocolText: string = "This player version is not compatible with the provided streaming server.";

    /**
     * Text indicating a "Live" stream (upper-right corner)
     * @private
     */
    private liveText: string = "LIVE";

    /**
     * Text for button allowing to unmute the player (player will be muted automatically if in autostart mode)
     * @private
     */
    private unmuteText: string = "UNMUTE SOUND";

    /**
     * Position of a watermark
     * @private
     */
    private watermarkPosition:string = "bottom_right";

    /**
     * URL of a watermark
     * @private
     */
    private watermarkURL:string;

    /**
     * Text (translation) for remaining broadcast time
     * @private
     */
    private broadcastRemainingTimeText:string = "Remaining time"

    /**
     * Text (translation) for remaining broadcast time
     * @private
     */
    private broadcastStartTimeText:string = "Broadcasting will start at"

    /**
     * Time when broadcast will start
     * @private
     */
    private broadcastStartDate:string;

    /**
     * Time when player was created in reference to the broadcastStartDate
     * @private
     */
    private broadcastCreateDate:string;

    /**
     * Poster image (in the background) for waiting room
     * @private
     */
    private waitingRoomPoster:string;

    /**
     * Timezone
     * @private
     */
    private waitingRoomTimeZone:StormTimeZone = "UTC";

    /**
     * Translation for WaitingRoom - days
     * @private
     */
    private timeDaysText:string = "days"

    /**
     * Translation for WaitingRoom - hours
     * @private
     */
    private timeHoursText:string = "hours"

    /**
     * Translation for WaitingRoom - minutes
     * @private
     */
    private timeMinutesText:string = "minutes"

    /**
     * Translation for WaitingRoom - seconds
     * @private
     */
    private timeSecondsText:string = "seconds"

    /**
     * Use native FullScreen mode on mobile
     * @private
     */
    private nativeMobileGUI: boolean = true;

    private loaderColor:string = null;
    private progressBarGradientColor1:string = null;
    private progressBarGradientColor2:string = null;
    private waitingRoomRingColor1:string = null;
    private waitingRoomRingColor2:string = null;
    private cuePointColor1:string = null;
    private cuePointColor2:string = null;
    private unmuteBGColor:string = null;
    private unmutePRColor:string = null;
    private iconPrimaryColor:string = null;
    private iconSecondaryColor:string = null;
    private iconActiveColor:string = null;
    private iconErrorColor:string = null;
    private backgroundColor:string = null;
    private titleColor:string = null;
    private subtitleColor:string = null;
    private errorColor:string = null;
    private fontRegular:string = null;
    private fontBold:string = null;
    private borderRadius:string = null;
    private stromPlayer:StormPlayer;

    /**
     * Constructor
     * @param initialPlayerConfig
     */
    constructor(stromPlayer:StormPlayer, initialPlayerConfig: StormPlayerConfig) {

        this.stromPlayer = stromPlayer;

        if (!initialPlayerConfig.containerID)
            throw new Error("containerID is not defined in initialPlayerConfig");

        this.containerID = initialPlayerConfig.containerID;
        this.overwriteConfig(initialPlayerConfig);

    }

    //-------------------------------------------------------------------------------//
    // OVERWRITE
    //-------------------------------------------------------------------------------//

    public overwriteConfig(rawGUIConfig:StormPlayerConfig):void{

        this.currentRawConfig = rawGUIConfig;

        this.overwriteGeneral(rawGUIConfig);
        this.overwriteInterface(rawGUIConfig);
        this.overwriteWatermark(rawGUIConfig);
        this.overwriteTranslations(rawGUIConfig);
        this.overwriteWaitingRoom(rawGUIConfig);
        this.overwriteStyles(rawGUIConfig);

    }

    private overwriteGeneral(rawGUIConfig:StormPlayerConfig):void {
        this.title = rawGUIConfig.title ?? this.title;
        this.subtitle = rawGUIConfig.subtitle ?? this.subtitle;
        this.initialWidth = rawGUIConfig.width ?? this.initialWidth;
        this.initialHeight = rawGUIConfig.height ?? this.initialHeight;
        this.posterURL = rawGUIConfig.posterURL ?? this.posterURL;
        this.aspectRatio = rawGUIConfig.aspectRatio ?? this.aspectRatio;

    }

    private overwriteInterface(rawGUIConfig:StormPlayerConfig):void {
        if (rawGUIConfig.interface) {
            this.autoGUIHide = rawGUIConfig.interface.autoGUIHide ?? this.autoGUIHide;
            this.guiHideTime = rawGUIConfig.interface.autoGUIHideTime ?? this.guiHideTime;
            this.bigPlayButton = rawGUIConfig.interface.showBigPlayBTN ?? this.bigPlayButton;
            this.nativeMobileGUI = rawGUIConfig.interface.nativeMobileGUI ?? this.nativeMobileGUI;
            this.showTimeline = rawGUIConfig.interface.showTimeline ?? this.showTimeline;
        }
    }

    private overwriteWatermark(rawGUIConfig:StormPlayerConfig):void {
        if (rawGUIConfig.style?.watermark) {
            this.watermarkURL = rawGUIConfig.style.watermark.imgURL ?? this.watermarkURL;
            this.watermarkPosition = rawGUIConfig.style.watermark.position ?? this.watermarkPosition;
        }
    }

    private overwriteTranslations(rawGUIConfig:StormPlayerConfig):void {
        if (rawGUIConfig.translations) {
            this.broadcastRemainingTimeText = rawGUIConfig.translations.broadcastRemainingTime ?? this.broadcastRemainingTimeText;
            this.broadcastStartTimeText = rawGUIConfig.translations.broadcastStartTime ?? this.broadcastStartTimeText;
            this.timeDaysText = rawGUIConfig.translations.timeDays ?? this.timeDaysText;
            this.timeHoursText = rawGUIConfig.translations.timeHours ?? this.timeHoursText;
            this.timeMinutesText = rawGUIConfig.translations.timeMinutes ?? this.timeMinutesText;
            this.timeSecondsText = rawGUIConfig.translations.timeSeconds ?? this.timeSecondsText;
            this.unmuteText = rawGUIConfig.translations.unmute ?? this.unmuteText;
            this.serverDisconnectedText = rawGUIConfig.translations.disconnected ?? this.serverDisconnectedText;
            this.awaitingStartText = rawGUIConfig.translations.awaitingStart ?? this.awaitingStartText;
            this.serverConnectionFailedText = rawGUIConfig.translations.connectionFailed ?? this.serverConnectionFailedText;
            this.compatibilityErrorText = rawGUIConfig.translations.compatibilityError ?? this.compatibilityErrorText;
            this.noSSLErrorText = rawGUIConfig.translations.noSSLError ?? this.noSSLErrorText;
            this.streamErrorText = rawGUIConfig.translations.streamError ?? this.streamErrorText;
            this.streamNotFoundText = rawGUIConfig.translations.streamNotFound ?? this.streamNotFoundText;
            this.streamStopText = rawGUIConfig.translations.streamStop ?? this.streamStopText;
            this.liveText = rawGUIConfig.translations.live ?? this.liveText;
        }
    }

    private overwriteWaitingRoom(rawGUIConfig:StormPlayerConfig):void {
        if (rawGUIConfig.waitingRoom) {
            this.broadcastCreateDate = rawGUIConfig.waitingRoom.createTime ?? this.broadcastCreateDate;
            this.broadcastStartDate = rawGUIConfig.waitingRoom.startTime ?? this.broadcastStartDate;
            this.waitingRoomPoster = rawGUIConfig.waitingRoom.posterURL ?? this.waitingRoomPoster;
            this.waitingRoomTimeZone = rawGUIConfig.waitingRoom.timeZone ?? this.waitingRoomTimeZone;
        }
    }

    private overwriteStyles(rawGUIConfig:StormPlayerConfig):void {
        if(rawGUIConfig.style){

            this.loaderColor = rawGUIConfig.style.loaderColor ?? this.loaderColor;

            if(rawGUIConfig.style?.progressBar){
                this.progressBarGradientColor1 = rawGUIConfig.style.progressBar.gradientColor1 ?? this.progressBarGradientColor1;
                this.progressBarGradientColor2 = rawGUIConfig.style.progressBar.gradientColor2 ?? this.progressBarGradientColor2;
            }

            if(rawGUIConfig.style?.waitingRoomRings){
                this.waitingRoomRingColor1 = rawGUIConfig.style.waitingRoomRings.gradientColor1 ?? this.waitingRoomRingColor1;
                this.waitingRoomRingColor2 = rawGUIConfig.style.waitingRoomRings.gradientColor2 ?? this.waitingRoomRingColor2;
            }

            if(rawGUIConfig.style?.cuePoint){
                this.cuePointColor1 = rawGUIConfig.style.cuePoint.gradientColor1 ?? this.cuePointColor1;
                this.cuePointColor2 = rawGUIConfig.style.cuePoint.gradientColor2 ?? this.cuePointColor2;
            }

            if(rawGUIConfig.style?.unmuteLabel){
                this.unmuteBGColor = rawGUIConfig.style.unmuteLabel.backgroundColor ?? this.unmuteBGColor;
                this.unmutePRColor = rawGUIConfig.style.unmuteLabel.primaryColor ?? this.unmutePRColor;
            }

            if(rawGUIConfig.style?.icons){
                this.iconPrimaryColor = rawGUIConfig.style.icons.primaryColor ?? this.iconPrimaryColor;
                this.iconSecondaryColor = rawGUIConfig.style.icons.secondaryColor ?? this.iconSecondaryColor;
                this.iconActiveColor = rawGUIConfig.style.icons.activeColor ?? this.iconActiveColor;
                this.iconErrorColor = rawGUIConfig.style.icons.errorColor ?? this.iconErrorColor;
            }

            this.backgroundColor = rawGUIConfig.style.backgroundColor ?? this.backgroundColor;

            if(rawGUIConfig.style?.text){
                this.titleColor = rawGUIConfig.style.text.titleColor ?? this.titleColor;
                this.subtitleColor = rawGUIConfig.style.text.subtitleColor ?? this.subtitleColor;
                this.errorColor = rawGUIConfig.style.text.errorColor ?? this.errorColor;
            }

            this.borderRadius = rawGUIConfig.style.borderRadius ?? this.borderRadius;
        }
    }

    //-------------------------------------------------------------------------------//
    // OVERWRITE - END
    //-------------------------------------------------------------------------------//

    //-------------------------------------------------------------------------------//
    // MATCH
    //-------------------------------------------------------------------------------//

    public matchConfig(rawGUIConfig:StormPlayerConfig):void {

        this.matchGeneral(rawGUIConfig);
        this.matchInterface(rawGUIConfig);
        this.matchWatermark(rawGUIConfig);
        this.matchTranslations(rawGUIConfig)
        this.matchWaitingRoom(rawGUIConfig);
        this.matchStyles(rawGUIConfig);

        this.setStyle();

    }

    private matchGeneral(rawGUIConfig:StormPlayerConfig):void {

        // width is out
        // height is out
        // containerID is out

        this.title = this.currentRawConfig?.title ?? rawGUIConfig.title ?? this.title;
        this.subtitle = this.currentRawConfig?.subtitle ?? rawGUIConfig.subtitle ?? this.subtitle;
        this.posterURL = this.currentRawConfig?.posterURL ?? rawGUIConfig.posterURL ?? this.posterURL;
        this.aspectRatio = this.currentRawConfig?.aspectRatio ?? rawGUIConfig.aspectRatio ?? this.aspectRatio;

    }

    private matchInterface(rawGUIConfig:StormPlayerConfig):void {
        if (rawGUIConfig.interface) {
            this.autoGUIHide = this.currentRawConfig?.interface?.autoGUIHide ?? rawGUIConfig.interface.autoGUIHide ?? this.autoGUIHide;
            this.guiHideTime = this.currentRawConfig?.interface?.autoGUIHideTime ?? rawGUIConfig.interface.autoGUIHideTime ?? this.guiHideTime;
            this.bigPlayButton = this.currentRawConfig?.interface?.showBigPlayBTN ?? rawGUIConfig.interface.showBigPlayBTN ?? this.bigPlayButton;
            this.nativeMobileGUI = this.currentRawConfig?.interface?.nativeMobileGUI ?? rawGUIConfig.interface.nativeMobileGUI ?? this.nativeMobileGUI;
            this.showTimeline = this.currentRawConfig?.interface?.showTimeline ?? rawGUIConfig.interface.showTimeline ?? this.showTimeline;
        }
    }

    private matchWatermark(rawGUIConfig:StormPlayerConfig):void {
        if (rawGUIConfig.style?.watermark) {
            this.watermarkURL = this.currentRawConfig?.style?.watermark?.imgURL ?? rawGUIConfig.style.watermark.imgURL ?? this.watermarkURL;
            this.watermarkPosition = this.currentRawConfig?.style?.watermark?.position ?? rawGUIConfig.style.watermark.position ?? this.watermarkPosition;
        }
    }

    private matchTranslations(rawGUIConfig:StormPlayerConfig):void {
        if (rawGUIConfig.translations) {

            this.broadcastRemainingTimeText = this.currentRawConfig?.translations?.broadcastRemainingTime ?? rawGUIConfig.translations.broadcastRemainingTime ?? this.broadcastRemainingTimeText;
            this.broadcastStartTimeText = this.currentRawConfig?.translations?.broadcastStartTime ?? rawGUIConfig.translations.broadcastStartTime ?? this.broadcastStartTimeText;
            this.timeDaysText = this.currentRawConfig?.translations?.timeDays ?? rawGUIConfig.translations.timeDays ?? this.timeDaysText;
            this.timeHoursText = this.currentRawConfig?.translations?.timeHours ?? rawGUIConfig.translations.timeHours ?? this.timeHoursText;
            this.timeMinutesText = this.currentRawConfig?.translations?.timeMinutes ?? rawGUIConfig.translations.timeMinutes ?? this.timeMinutesText;
            this.timeSecondsText = this.currentRawConfig?.translations?.timeSeconds ?? rawGUIConfig.translations.timeSeconds ?? this.timeSecondsText;
            this.unmuteText = this.currentRawConfig?.translations?.unmute ??rawGUIConfig.translations.unmute ?? this.unmuteText;
            this.serverDisconnectedText = this.currentRawConfig?.translations?.disconnected ?? rawGUIConfig.translations.disconnected ?? this.serverDisconnectedText;
            this.awaitingStartText = this.currentRawConfig?.translations?.awaitingStart ?? rawGUIConfig.translations.awaitingStart ?? this.awaitingStartText;
            this.serverConnectionFailedText = this.currentRawConfig?.translations?.connectionFailed ?? rawGUIConfig.translations.connectionFailed ?? this.serverConnectionFailedText;
            this.compatibilityErrorText = this.currentRawConfig?.translations?.compatibilityError ?? rawGUIConfig.translations.compatibilityError ?? this.compatibilityErrorText;
            this.noSSLErrorText = this.currentRawConfig?.translations?.noSSLError ?? rawGUIConfig.translations.noSSLError ?? this.noSSLErrorText;
            this.streamErrorText = this.currentRawConfig?.translations?.streamError ?? rawGUIConfig.translations.streamError ?? this.streamErrorText;
            this.streamNotFoundText = this.currentRawConfig?.translations?.streamNotFound ??rawGUIConfig.translations.streamNotFound ?? this.streamNotFoundText;
            this.streamStopText = this.currentRawConfig?.translations?.streamStop ?? rawGUIConfig.translations.streamStop ?? this.streamStopText;
            this.liveText = rawGUIConfig.translations.live ?? this.liveText;
        }
    }

    private matchWaitingRoom(rawGUIConfig:StormPlayerConfig):void {
        if (rawGUIConfig.waitingRoom) {
            this.broadcastCreateDate = this.currentRawConfig?.waitingRoom?.createTime ?? rawGUIConfig.waitingRoom.createTime ?? this.broadcastCreateDate;
            this.broadcastStartDate = this.currentRawConfig?.waitingRoom?.startTime ?? rawGUIConfig.waitingRoom.startTime ?? this.broadcastStartDate;
            this.waitingRoomPoster = this.currentRawConfig?.waitingRoom?.posterURL ??rawGUIConfig.waitingRoom?.posterURL ?? this.waitingRoomPoster;
            this.waitingRoomTimeZone = this.currentRawConfig?.waitingRoom?.timeZone ?? rawGUIConfig.waitingRoom.timeZone ?? this.waitingRoomTimeZone;
        }
    }

    private matchStyles(rawGUIConfig:StormPlayerConfig):void {
        if(rawGUIConfig.style){

            this.loaderColor = this.currentRawConfig?.style?.loaderColor ?? rawGUIConfig.style.loaderColor ?? this.loaderColor;

            if(rawGUIConfig.style?.progressBar){
                this.progressBarGradientColor1 = this.currentRawConfig?.style?.progressBar?.gradientColor1 ?? rawGUIConfig.style.progressBar.gradientColor1 ?? this.progressBarGradientColor1;
                this.progressBarGradientColor2 = this.currentRawConfig?.style?.progressBar?.gradientColor2 ?? rawGUIConfig.style.progressBar.gradientColor2 ?? this.progressBarGradientColor2;
            }

            if(rawGUIConfig.style?.waitingRoomRings){
                this.waitingRoomRingColor1 = this.currentRawConfig?.style?.waitingRoomRings?.gradientColor1 ?? rawGUIConfig.style.waitingRoomRings.gradientColor1 ?? this.waitingRoomRingColor1;
                this.waitingRoomRingColor2 = this.currentRawConfig?.style?.waitingRoomRings?.gradientColor2 ?? rawGUIConfig.style.waitingRoomRings.gradientColor2 ?? this.waitingRoomRingColor2;
            }

            if(rawGUIConfig.style?.cuePoint){
                this.cuePointColor1 = this.currentRawConfig?.style?.cuePoint?.gradientColor1 ?? rawGUIConfig.style.cuePoint.gradientColor1 ?? this.cuePointColor1;
                this.cuePointColor2 = this.currentRawConfig?.style?.cuePoint?.gradientColor2 ?? rawGUIConfig.style.cuePoint.gradientColor2 ?? this.cuePointColor2;
            }

            if(rawGUIConfig.style?.unmuteLabel){
                this.unmuteBGColor = this.currentRawConfig?.style?.unmuteLabel?.backgroundColor ?? rawGUIConfig.style.unmuteLabel.backgroundColor ?? this.unmuteBGColor;
                this.unmutePRColor = this.currentRawConfig?.style?.unmuteLabel?.primaryColor ?? rawGUIConfig.style.unmuteLabel.primaryColor ?? this.unmutePRColor;
            }

            if(rawGUIConfig.style?.icons){
                this.iconPrimaryColor = this.currentRawConfig?.style?.icons?.primaryColor ?? rawGUIConfig.style.icons.primaryColor ?? this.iconPrimaryColor;
                this.iconSecondaryColor = this.currentRawConfig?.style?.icons?.secondaryColor ?? rawGUIConfig.style.icons.secondaryColor ?? this.iconSecondaryColor;
                this.iconActiveColor = this.currentRawConfig?.style?.icons?.activeColor ?? rawGUIConfig.style.icons.activeColor ?? this.iconActiveColor;
                this.iconErrorColor = this.currentRawConfig?.style?.icons?.errorColor ?? rawGUIConfig.style.icons.errorColor ?? this.iconErrorColor;
            }

            this.backgroundColor = this.currentRawConfig?.style?.backgroundColor ?? rawGUIConfig.style.backgroundColor ?? this.backgroundColor;

            if(rawGUIConfig.style?.text){
                this.titleColor = this.currentRawConfig?.style?.text?.titleColor ?? rawGUIConfig.style.text.titleColor ?? this.titleColor;
                this.subtitleColor = this.currentRawConfig?.style?.text?.subtitleColor ?? rawGUIConfig.style.text.subtitleColor ?? this.subtitleColor;
                this.errorColor = this.currentRawConfig?.style?.text?.errorColor ?? rawGUIConfig.style.text.errorColor ?? this.errorColor;
            }

            this.borderRadius = this.currentRawConfig?.style?.borderRadius ?? rawGUIConfig.style.borderRadius ?? this.borderRadius;
        }
    }

    //-------------------------------------------------------------------------------//
    // MATCH - END
    //-------------------------------------------------------------------------------//

    //-------------------------------------------------------------------------------//
    // STYLES
    //-------------------------------------------------------------------------------//
    /**
     * Changes player styles
     * @param styles new player styles
     */
    public setStyle(): void {

        const player = this.stromPlayer.getMainElement().getPlayerElement();

        if(this.loaderColor != null) player.style.setProperty("--sp-loader-color", this.loaderColor);

        if(this.progressBarGradientColor1 != null) player.style.setProperty("--sp-first-progress-bar-color", this.progressBarGradientColor1);
        if(this.progressBarGradientColor2 != null) player.style.setProperty("--sp-second-progress-bar-color", this.progressBarGradientColor2);

        if(this.waitingRoomRingColor1 != null) player.style.setProperty("--sp-first-waiting-ring-color", this.waitingRoomRingColor1);
        if(this.waitingRoomRingColor2 != null) player.style.setProperty("--sp-second-waiting-ring-color", this.waitingRoomRingColor2);

        if(this.cuePointColor1 != null) player.style.setProperty("--sp-first-cue-point-color", this.cuePointColor1);
        if(this.cuePointColor2 != null) player.style.setProperty("--sp-second-cue-point-color", this.cuePointColor2);

        if(this.unmuteBGColor != null) player.style.setProperty("--sp-unmute-label-bg-color", this.unmuteBGColor);
        if(this.unmutePRColor != null) player.style.setProperty("--sp-unmute-label-primary-color", this.unmutePRColor);

        if(this.iconPrimaryColor != null) player.style.setProperty("--sp-icons-primary-color", this.iconPrimaryColor);
        if(this.iconSecondaryColor != null) player.style.setProperty("--sp-icons-secondary-color", this.iconSecondaryColor);
        if(this.iconActiveColor != null) player.style.setProperty("--sp-icons-active-color", this.iconActiveColor);
        if(this.iconErrorColor != null) player.style.setProperty("--sp-icons-error-color", this.iconErrorColor);

        if(this.backgroundColor != null) player.style.setProperty("--sp-background-color", this.backgroundColor);

        if(this.titleColor != null) player.style.setProperty("--sp-text-title-color", this.titleColor);
        if(this.subtitleColor != null) player.style.setProperty("--sp-text-desc-color", this.subtitleColor);
        if(this.errorColor != null) player.style.setProperty("--sp-text-error-color", this.errorColor);

        if(this.fontRegular != null) player.style.setProperty("--sp-font-regular", this.fontRegular);
        if(this.fontBold != null) player.style.setProperty("--sp-font-bold", this.fontBold);

        if(this.borderRadius != null) player.style.setProperty("--sp-border-radius", this.borderRadius);

    }

    //-------------------------------------------------------------------------------//
    // STYLES - END
    //-------------------------------------------------------------------------------//

    /**
     * Sets text warning about incompatible protocols attached to the player
     * @param value new message for incompatible protocol
     */
    public setIncompatiblePlayerProtocolText(value: string): void {
        this.incompatiblePlayerProtocolText = value;
    }

    /**
     * Returns message warning about incompatible protocols attached to the player
     */
    public getIncompatiblePlayerProtocolText(): string {
        return this.incompatiblePlayerProtocolText;
    }

    /**
     * Sets whenever showTimeline should be visible (true) or not (false)
     * @param value
     */
    public setTimeline(value: boolean): void {
        this.showTimeline = value;
    }

    /**
     * Returns whenever showTimeline is visible
     */
    public getTimeline(): boolean {
        return this.showTimeline;
    }

    /**
     * Sets text for "live" in the upper-right corner
     * @param value text for "live"
     */
    public setLiveText(value: string): void {
        this.liveText = value;
    }

    /**
     * Returns text for "live"
     */
    public getLiveText(): string {
        return this.liveText;
    }

    /**
     * Sets message for when video stops
     * @param value text for "videoStop"
     */
    public setVideoStopText(value: string): void {
        this.streamStopText = value;
    }

    /**
     * Returns message for video stop
     */
    public getVideoStopText(): string {
        return this.streamStopText;
    }

    /**
     * Returns true/false whenever big play button is visible
     */
    public isBigPlayButton(): boolean {
        return this.bigPlayButton;
    }

    /**
     * Sets whenever big play button should be visible
     * @param value true of false
     */
    public setBigPlaybackButton(value: boolean) {
        this.bigPlayButton = value;
    }

    /**
     * Returns HTML container ID for the player
     */
    public getContainerID(): string {
        return this.containerID;
    }

    /**
     * Sets number of seconds when GUI should be hidden if there is no user interaction
     * @param value number of seconds
     */
    public setGuiHideSeconds(value: number) {
        this.guiHideTime = value;
    }

    /**
     * Returns number of seconds when GUI will be hidden if there is no user interaction
     */
    public getGuiHideSeconds(): number {
        return this.guiHideTime;
    }

    public getIfAutoGUIHide():boolean {
        return this.autoGUIHide;
    }

    /**
     * Sets container ID for the player
     * @param value
     */
    public setContainerID(value: string) {
        this.containerID = value;
    }

    /**
     * Returns the initial player initialWidth
     */
    public getWidth(): number | string {
        return this.initialWidth;
    }

    /**
     * Sets the initial player initialWidth
     * @param value initialWidth in pixels
     */
    public setWidth(value: number | string) {
        this.initialWidth = value;
    }

    /**
     * Return the initial player initialHeight
     */
    public getHeight(): number | string {
        return this.initialHeight;
    }

    /**
     * Sets the initial player initialHeight
     * @param value hight in pixels
     */
    public setHeight(value: number | string) {
        this.initialHeight = value;
    }

    /**
     * Returns title
     */
    public getTitle(): string {
        return this.title;
    }

    /**
     * Sets the title for the player
     * @param value new title
     */
    public setTitle(value: string) {
        this.title = value;
    }

    /**
     * Returns the subtitle
     */
    public getSubtitle(): string {
        return this.subtitle;
    }

    /**
     * Sets the subtitle for the player
     * @param value new subtitle
     */
    public setSubtitle(value: string) {
        this.subtitle = value;
    }

    /**
     * Returns label for unmute button
     */
    public getUnmuteText(): string {
        return this.unmuteText;
    }

    /**
     * Sets label for unmute button
     * @param value label for unmute button
     */
    public setUnmuteText(value: string) {
        this.unmuteText = value;
    }

    /**
     * Returns the message for when player gets disconnected from a server
     */
    public getPlayerDisconnectedText(): string {
        return this.serverDisconnectedText;
    }

    /**
     * Sets a message for when player gets disconnected from a server
     * @param value
     */
    public setPlayerDisconnectedText(value: string) {
        this.serverDisconnectedText = value;
    }

    /**
     * Returns the message for when the player fails to connect to a server
     */
    public getServersFailedText(): string {
        return this.serverConnectionFailedText;
    }

    /**
     * Sets a message for when the player fails to connect to a server
     * @param value
     */
    public setServersFailedText(value: string) {
        this.serverConnectionFailedText = value;
    }

    /**
     * Returns the message for when the device is not compatible with the player
     */
    public getCompatibilityErrorText(): string {
        return this.compatibilityErrorText;
    }

    /**
     * Sets a message for when the device is not compatible with the player
     * @param value
     */
    public setCompatibilityErrorText(value: string) {
        this.compatibilityErrorText = value;
    }

    /**
     * Gets the message for non-ssl connection (if required by the player)
     */
    public getNoSSLErrorText(): string {
        return this.noSSLErrorText;
    }

    /**
     * Gets the message for non-ssl connection (if required by the player)
     */
    public getLicenseErrorText(): string {
        return this.licenseErrorText;
    }

    /**
     * Sets a message for non-ssl connection (if required by the player)
     * @param value
     */
    public setNoSSLErrorText(value: string) {
        this.noSSLErrorText = value;
    }

    /**
     * Returns the message for an error while playing a video
     */
    public getVideoErrorText(): string {
        return this.streamErrorText;
    }

    public getIncorrectProtocolVersionText():string {
        return this.incorrectProtocolVersionText;
    }

    /**
     * Sets a message for an error while playing a video
     * @param value
     */
    public setVideoErrorText(value: string) {
        this.streamErrorText = value;
    }

    /**
     * Gets the message for no video found
     */
    public getVideoNotFoundText(): string {
        return this.streamNotFoundText;
    }

    /**
     * Sets a message for no video found
     * @param value
     */
    public setVideoNotFoundText(value: string) {
        this.streamNotFoundText = value;
    }

    /**
     * Returns watermark position
     */
    public getWatermarkPosition():string {
        return this.watermarkPosition;
    }

    public getWaitingRoomTimeZone():StormTimeZone {
        return this.waitingRoomTimeZone;
    }

    /**
     * Returns watermark URL
     */
    public getWatermarkURL():string {
        return this.watermarkURL;
    }

    public getBroadcastStartDate():string {
        return this.broadcastStartDate;
    }

    public getBroadcastCreateDate():string {
        return this.broadcastCreateDate;
    }

    public getBroadcastRemainingTimeText():string {
        return this.broadcastRemainingTimeText;
    }

    public getBroadcastStartTimeText():string {
        return this.broadcastStartTimeText;
    }

    public getTimeDaysText():string {
        return this.timeDaysText;
    }

    public getTimeHoursText():string {
        return this.timeHoursText;
    }

    public getTimeMinutesText():string {
        return this.timeMinutesText;
    }

    public getTimeSecondsText():string {
        return this.timeSecondsText;
    }

    public getAwaitingText():string {
        return this.awaitingStartText;
    }

    public getAspectRatio():string {
        return this.aspectRatio;
    }

    public getIfNativeMobileGUI():boolean {
        return this.nativeMobileGUI;
    }

    public getPosterURL():string {
        return this.posterURL;
    }

    public setPoster(poserURL:string):void {
        this.posterURL = poserURL;
    }


}
