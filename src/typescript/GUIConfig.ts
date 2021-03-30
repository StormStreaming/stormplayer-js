export class GUIConfig
{

    private containerID : string;
    private width : number;
    private height : number;

    private bigPlaybackButton : boolean = true;
    private guiHideSeconds : number = 3;
    private title : string = null;
    private subtitle : string = null;
    private unmuteText : string = 'UNMUTE SOUND';
    private playerDisconnectedText : string = 'Disconnected from stream server.';
    private serversFailedText : string = 'Failed to connect to the stream server.';
    private compatibilityErrorText : string = 'Your device is not compatible with the available video source.';
    private noSSLErrorText : string = 'This connection requires an SSL layer.';
    private videoErrorText : string = 'Disconnected from stream server.';
    private videoNotFoundText : string = 'Stream with given name was not found.';

    constructor(guiConfig : any) {
        if(!guiConfig.containerID)
            throw new Error("containerID is not defined in guiConfig");

        if(!guiConfig.width)
            throw new Error("width is not defined in guiConfig");

        if(!guiConfig.height)
            throw new Error("height is not defined in guiConfig");

        this.containerID = guiConfig.containerID;
        this.width = guiConfig.width;
        this.height = guiConfig.height;

        if(guiConfig.bigPlaybackButton)
            this.bigPlaybackButton = guiConfig.bigPlaybackButton;

        if(guiConfig.guiHideSeconds)
            this.guiHideSeconds = guiConfig.guiHideSeconds;

        if(guiConfig.title)
            this.title = guiConfig.title;

        if(guiConfig.subtitle)
            this.subtitle = guiConfig.subtitle;

        if(guiConfig.unmuteText)
            this.unmuteText = guiConfig.unmuteText;

        if(guiConfig.playerDisconnectedText)
            this.playerDisconnectedText = guiConfig.playerDisconnectedText;

        if(guiConfig.serversFailedText)
            this.serversFailedText = guiConfig.serversFailedText;

        if(guiConfig.compatibilityErrorText)
            this.compatibilityErrorText = guiConfig.compatibilityErrorText;

        if(guiConfig.noSSLErrorText)
            this.noSSLErrorText = guiConfig.noSSLErrorText;

        if(guiConfig.videoErrorText)
            this.videoErrorText = guiConfig.videoErrorText;

        if(guiConfig.videoNotFoundText)
            this.videoNotFoundText = guiConfig.videoNotFoundText;
    }

    public isBigPlaybackButton(): boolean {
        return this.bigPlaybackButton;
    }

    public setBigPlaybackButton(value: boolean) {
        this.bigPlaybackButton = value;
    }

    public getContainerID(): string {
        return this.containerID;
    }

    public setGuiHideSeconds(value: number) {
        this.guiHideSeconds = value;
    }

    public getGuiHideSeconds(): number {
        return this.guiHideSeconds;
    }

    public setContainerID(value: string) {
        this.containerID = value;
    }

    public getWitdth(): number {
        return this.width;
    }

    public setWidth(value: number) {
        this.width = value;
    }

    public getHeight(): number {
        return this.height;
    }

    public setHeight(value: number) {
        this.height = value;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(value: string) {
        this.title = value;
    }

    public getSubtitle(): string {
        return this.subtitle;
    }

    public setSubtitle(value: string) {
        this.subtitle = value;
    }

    public getUnmuteText(): string {
        return this.unmuteText;
    }

    public setUnmuteText(value: string) {
        this.unmuteText = value;
    }

    public getPlayerDisconnectedText(): string {
        return this.playerDisconnectedText;
    }

    public setPlayerDisconnectedText(value: string) {
        this.playerDisconnectedText = value;
    }

    public getServersFailedText(): string {
        return this.serversFailedText;
    }

    public setServersFailedText(value: string) {
        this.serversFailedText = value;
    }

    public getCompatibilityErrorText(): string {
        return this.compatibilityErrorText;
    }

    public setCompatibilityErrorText(value: string) {
        this.compatibilityErrorText = value;
    }

    public getNoSSLErrorText(): string {
        return this.noSSLErrorText;
    }

    public setNoSSLErrorText(value: string) {
        this.noSSLErrorText = value;
    }

    public getVideoErrorText(): string {
        return this.videoErrorText;
    }

    public setVideoErrorText(value: string) {
        this.videoErrorText = value;
    }

    public getVideoNotFoundText(): string {
        return this.videoNotFoundText;
    }

    public setVideoNotFoundText(value: string) {
        this.videoNotFoundText = value;
    }
}