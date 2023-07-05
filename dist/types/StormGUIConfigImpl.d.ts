export declare class StormGUIConfigImpl {
    private containerID;
    private width;
    private height;
    private bigPlaybackButton;
    private timeline;
    private guiHideSeconds;
    private title;
    private subtitle;
    private playerDisconnectedText;
    private serversFailedText;
    private compatibilityErrorText;
    private noSSLErrorText;
    private videoErrorText;
    private videoNotFoundText;
    private videoStopText;
    private incompatiblePlayerProtocolText;
    private liveText;
    private unmuteText;
    private watermarkPosition;
    private watermarkURL;
    private broadcastRemainingTimeText;
    private broadcastStartTimeText;
    private broadcastStartDate;
    private broadcastCreateDate;
    private waitingRoomPoster;
    private timeDaysText;
    private timeHoursText;
    private timeMinutesText;
    private timeSecondsText;
    constructor(guiConfig: any);
    setIncompatiblePlayerProtocolText(value: string): void;
    getIncompatiblePlayerProtocolText(): string;
    setTimeline(value: boolean): void;
    getTimeline(): boolean;
    setLiveText(value: string): void;
    getLiveText(): string;
    setVideoStopText(value: string): void;
    getVideoStopText(): string;
    isBigPlaybackButton(): boolean;
    setBigPlaybackButton(value: boolean): void;
    getContainerID(): string;
    setGuiHideSeconds(value: number): void;
    getGuiHideSeconds(): number;
    setContainerID(value: string): void;
    getWidth(): number;
    setWidth(value: number): void;
    getHeight(): number;
    setHeight(value: number): void;
    getTitle(): string;
    setTitle(value: string): void;
    getSubtitle(): string;
    setSubtitle(value: string): void;
    getUnmuteText(): string;
    setUnmuteText(value: string): void;
    getPlayerDisconnectedText(): string;
    setPlayerDisconnectedText(value: string): void;
    getServersFailedText(): string;
    setServersFailedText(value: string): void;
    getCompatibilityErrorText(): string;
    setCompatibilityErrorText(value: string): void;
    getNoSSLErrorText(): string;
    setNoSSLErrorText(value: string): void;
    getVideoErrorText(): string;
    setVideoErrorText(value: string): void;
    getVideoNotFoundText(): string;
    setVideoNotFoundText(value: string): void;
    getWatermarkPosition(): string;
    getWatermarkURL(): string;
    getBroadcastStartDate(): string;
    getBroadcastCreateDate(): string;
    getBroadcastRemainingTimeText(): string;
    getBroadcastStartTimeText(): string;
    getTimeDaysText(): string;
    getTimeHoursText(): string;
    getTimeMinutesText(): string;
    getTimeSecondsText(): string;
}
