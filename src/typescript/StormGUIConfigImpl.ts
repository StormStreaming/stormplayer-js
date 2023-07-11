/**
 * Object of this class contains all settings for the player
 */
export class StormGUIConfigImpl {

    /**
     * ID of a container
     * @private
     */
    private containerID: string;

    /**
     * Initial player width
     * @private
     */
    private width: number;

    /**
     * Initial player height
     * @private
     */
    private height: number;

    /**
     * Whenever big play button should be displayed at start or not
     * @private
     */
    private bigPlaybackButton: boolean = true;

    /**
     * Whenever timeline should be visible
     * @private
     */
    private timeline: boolean = true;

    /**
     * Number of seconds after which gui disappears if there is no user interaction
     * @private
     */
    private guiHideSeconds: number = 3;

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
    private playerDisconnectedText: string = "Disconnected from streaming server.";

    /**
     * This message is displayed when player fails to connect to a streaming server
     * @private
     */
    private serversFailedText: string = "Failed to connect to the streaming server.";

    /**
     * This message is displayed when device is not compatible with the player and video cannot be played
     * @private
     */
    private compatibilityErrorText: string = "Your device is not compatible with the available video source.";

    /**
     * This message will be displayed if player requires SSL connection
     * @private
     */
    private noSSLErrorText: string = "This connection requires a secure SSL connection";

    /**
     * This message will be displayed if an error occurs during playback
     * @private
     */
    private streamErrorText: string = "Error while playing video";

    /**
     * This error will be displayed if no stream with given name was found on the streaming server
     * @private
     */
    private streamNotFoundText: string = "Stream with given name was not found";

    /**
     * This message will be displayed if a stream has been closed
     * @private
     */
    private streamStopText: string = "The stream has ended";

    /**
     * This message will be displayed if the library (player) is not compatible with given streaming server
     * @private
     */
    private incompatiblePlayerProtocolText: string = "This player version is not compatible with the provided streaming server";

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
    private watermarkPosition:string = "bottom_left";

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
    private broadcastStartTimeText:string = "Broadcasting will start at ${START_DATE}"

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
     * Constructor
     * @param guiConfig
     */
    constructor(guiConfig: any) {
        if (!guiConfig.containerID)
            throw new Error("containerID is not defined in guiConfig");

        if (!guiConfig.width)
            throw new Error("width is not defined in guiConfig");

        if (!guiConfig.height)
            throw new Error("height is not defined in guiConfig");

        this.containerID = guiConfig.containerID;
        this.width = guiConfig.width;
        this.height = guiConfig.height;

        if (typeof guiConfig.timeline != "undefined")
            this.timeline = guiConfig.timeline;

        if (typeof guiConfig.bigPlaybackButton != "undefined")
            this.bigPlaybackButton = guiConfig.bigPlaybackButton;

        if (guiConfig.guiHideSeconds)
            this.guiHideSeconds = guiConfig.guiHideSeconds;

        if (guiConfig.title) this.title = guiConfig.title;

        if (guiConfig.subtitle) this.subtitle = guiConfig.subtitle;

        if(guiConfig.style){
            if(guiConfig.style.watermark){
                if(guiConfig.style.watermark.imgURL)
                    this.watermarkURL = guiConfig.style.watermark.imgURL;

                if(guiConfig.style.watermark.position)
                    this.watermarkPosition = guiConfig.style.watermark.position;
            }
        }

        if(guiConfig.translations){
            if(guiConfig.translations.broadcastRemainingTime)
                this.broadcastRemainingTimeText = guiConfig.translations.broadcastRemainingTime;

            if(guiConfig.translations.broadcastStartTime)
                this.broadcastStartTimeText = guiConfig.translations.broadcastStartTime;

            if(guiConfig.translations.timeDays)
                this.timeDaysText = guiConfig.translations.timeDays;

            if(guiConfig.translations.timeHours)
                this.timeHoursText = guiConfig.translations.timeHours;

            if(guiConfig.translations.timeMinutes)
                this.timeMinutesText = guiConfig.translations.timeMinutes;

            if(guiConfig.translations.timeSeconds)
                this.timeSecondsText = guiConfig.translations.timeSeconds;

            if(guiConfig.translations.unmuteText)
                this.unmuteText = guiConfig.translations.unmuteText;

            if (guiConfig.translations.disconnected)
                this.playerDisconnectedText = guiConfig.translations.disconnected;

            if (guiConfig.translations.serversFailed)
                this.serversFailedText = guiConfig.translations.serversFailed;

            if (guiConfig.translations.compatibilityError)
                this.compatibilityErrorText = guiConfig.translations.compatibilityError;

            if (guiConfig.translations.noSSLError)
                this.noSSLErrorText = guiConfig.noSSLError;

            if (guiConfig.translations.streamError)
                this.streamErrorText = guiConfig.streamError;

            if (guiConfig.translations.streamNotFound)
                this.streamNotFoundText = guiConfig.translations.streamNotFound;

            if (guiConfig.translations.streamStop)
                this.streamStopText = guiConfig.translations.streamStop;

            if (guiConfig.live)
                this.liveText = guiConfig.translations.live;


        }

        if(guiConfig.waitingRoom){
            if(guiConfig.waitingRoom.startDate)
                this.broadcastStartDate = guiConfig.waitingRoom.startDate;

            if(guiConfig.waitingRoom.createDate)
                this.broadcastCreateDate = guiConfig.waitingRoom.createDate;

            if(guiConfig.waitingRoom.poster)
                this.waitingRoomPoster = guiConfig.waitingRoom.poster;
        }

    }

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
     * Sets whenever timeline should be visible (true) or not (false)
     * @param value
     */
    public setTimeline(value: boolean): void {
        this.timeline = value;
    }

    /**
     * Returns whenever timeline is visible
     */
    public getTimeline(): boolean {
        return this.timeline;
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
    public isBigPlaybackButton(): boolean {
        return this.bigPlaybackButton;
    }

    /**
     * Sets whenever big play button should be visible
     * @param value true of false
     */
    public setBigPlaybackButton(value: boolean) {
        this.bigPlaybackButton = value;
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
        this.guiHideSeconds = value;
    }

    /**
     * Returns number of seconds when GUI will be hidden if there is no user interaction
     */
    public getGuiHideSeconds(): number {
        return this.guiHideSeconds;
    }

    /**
     * Sets container ID for the player
     * @param value
     */
    public setContainerID(value: string) {
        this.containerID = value;
    }

    /**
     * Returns the initial player width
     */
    public getWidth(): number {
        return this.width;
    }

    /**
     * Sets the initial player width
     * @param value width in pixels
     */
    public setWidth(value: number) {
        this.width = value;
    }

    /**
     * Return the initial player height
     */
    public getHeight(): number {
        return this.height;
    }

    /**
     * Sets the initial player height
     * @param value hight in pixels
     */
    public setHeight(value: number) {
        this.height = value;
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
        return this.playerDisconnectedText;
    }

    /**
     * Sets a message for when player gets disconnected from a server
     * @param value
     */
    public setPlayerDisconnectedText(value: string) {
        this.playerDisconnectedText = value;
    }

    /**
     * Returns the message for when the player fails to connect to a server
     */
    public getServersFailedText(): string {
        return this.serversFailedText;
    }

    /**
     * Sets a message for when the player fails to connect to a server
     * @param value
     */
    public setServersFailedText(value: string) {
        this.serversFailedText = value;
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


}
