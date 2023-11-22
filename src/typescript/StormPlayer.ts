import {MainElement} from "./ui/MainElement";
import {LibraryManager} from "./LibraryManager";
import {StormLibrary} from "@stormstreaming/stormlibrary";
import {StormPlayerConfigImpl} from "./StormPlayerConfigImpl";
import {StormPlayerConfig} from "./types/StormPlayerConfig";
import {StormStreamConfig} from "@stormstreaming/stormlibrary";
import {EventDispatcher} from "./events/EventDispatcher";
import {VERSION} from "rollup";
import {WaitingRoom} from "@app/typescript/ui/WaitingRoom";

/**
 * Main class for the player
 */
export class StormPlayer extends EventDispatcher {

    /**
     * Version
     * @private
     */
    private static VERSION:string = "4.0.0";

    /**
     * Static variable for assigning IDs to the player
     * @private
     */
    private static NEXT_PLAYER_ID:number = 0;

    /**
     * Player ID
     * @private
     */
    private readonly id:number;

    /**
     * Video container identifier for StormPlayer library video injection
     * @private
     */
    private readonly instanceName: string;

    /**
     * Player GUI configuration
     * @private
     */
    private playerConfig: StormPlayerConfigImpl;

    /**
     * Main HTML element of the GUI
     * @private
     */
    private mainElement: MainElement;

    /**
     * This object manages StormLibrary
     * @private
     */
    private libraryManager: LibraryManager;

    /**
     * Original GUI config
     * @private
     */
    private rawPlayerConfig:StormPlayerConfig;

    /**
     * Original Library config
     * @private
     */
    private rawStreamConfig:StormStreamConfig;

    /**
     * Whenever player was started or not
     * @private
     */
    private started:boolean = false;

    /**
     * Whenever player was started or not
     * @private
     */
    public waitingRoom:boolean = false;

    /**
     * Constructor for the player
     *
     * @param playerConfig
     * @param streamConfig
     * @param cuepoints
     */
    constructor(playerConfig: StormPlayerConfig, streamConfig: StormStreamConfig, wait:boolean = false) {
        super();

        if(typeof window === 'undefined' || !window.document || !window.document.createElement)
            return;

        this.rawPlayerConfig = playerConfig;
        this.rawStreamConfig = streamConfig;

        this.id = StormPlayer.NEXT_PLAYER_ID;
        this.instanceName = "stormPlayer-"+this.id;
        this.libraryManager = new LibraryManager(this);

        StormPlayer.NEXT_PLAYER_ID++;

        if(!wait == true)
            this.initialize();

    }

    /**
     * Initializes the player (will be called by constructor onstartup)
     */
    public initialize(){

        if(this.started)
            return;

        this.started = true;
        this.playerConfig = new StormPlayerConfigImpl(this.rawPlayerConfig);

        if(this.playerConfig.getBroadcastCreateDate() != null){
            if(!WaitingRoom.isWaitingApplicable(this.playerConfig.getBroadcastStartDate(), this.playerConfig.getWaitingRoomTimeZone()))
                this.libraryManager.initialize(this.rawStreamConfig);
            else
                this.waitingRoom = true;
        } else {
            this.libraryManager.initialize(this.rawStreamConfig);
        }


        this.mainElement = new MainElement(this);
        document.getElementById(this.playerConfig.getContainerID()).appendChild(this.mainElement.getHtmlElement());

        if (!this.waitingRoom) {
            this.dispatchEvent("interfaceReady", {ref:this});
            this.setTitle(this.playerConfig.getTitle());
            this.setSubtitle(this.playerConfig.getSubtitle());
        }

        if (this.waitingRoom) {
            this.waitingRoomResize();
            window.addEventListener('resize', this.waitingRoomResize)
        }

        this.setSize(this.rawPlayerConfig.width, this.rawPlayerConfig.height);
        this.mainElement.setObserver();
        this.setStyle(this.rawPlayerConfig);

        this.addEventListener("playerConfigUpdated", (event)=>{
            this.setStyle(this.rawPlayerConfig);
        });

    }

    private waitingRoomResize = (): void => {

        if (!this.waitingRoom)
            window.removeEventListener('resize', this.waitingRoomResize)

        if(this.mainElement.getHtmlElement().clientWidth < 600)
            this.mainElement.getHtmlElement().querySelector<HTMLElement>('.countdown-container').style.transform = `scale(${this.mainElement.getHtmlElement().clientWidth/600})`
        else
            this.mainElement.getHtmlElement().querySelector<HTMLElement>('.countdown-container').style.transform = `scale(1)`
    }

    /**
     * Sets a libraryManager
     * @param setLibraryManager
     */
    public setLibraryManager() {
        this.libraryManager = new LibraryManager(this);
        this.libraryManager.initialize(this.rawStreamConfig)
    }

    /**
     * Adds a new cuePoint to the timeline
     * @param label label for this cuepoint
     * @param time time in unixtime format for where to attach this cuePoint
     */
    public addCuePoint(label: string, time: number): void {
        this.dispatchEvent("cuePointAdded", {ref:this, label: label, time: time});
    }

    /**
     * Removes a cuePoint from given time
     * @param time
     */
    public removeCuePoint(time: number): void {
        this.dispatchEvent("cuePointRemoved", {ref:this, time: time});
    }

    /**
     * Returns StormLibrary instance that this player uses
     */
    public getLibrary(): StormLibrary {
        return this.libraryManager.getLibrary();
    }

    /**
     * Returns id of this player instance
     */
    public getInstanceID(): number {
        return this.id;
    }

    /**
     * Pushes new configuration for the stream
     * @param streamConfig
     */
    public setStreamConfig(streamConfig: StormStreamConfig):void {

        if(this.getRawPlayerConfig().demoMode)
            return;

        streamConfig.settings.video = this.rawStreamConfig.settings.video;
        this.rawStreamConfig = streamConfig;
        if(this.libraryManager != null){
            this.libraryManager.setStreamConfig(streamConfig);
        }

        this.dispatchEvent("streamConfigUpdated", {ref:this});
    }

    /**
     * Pushes new configuration for the player
     * @param playerConfig
     */
    public setPlayerConfig(newPlayerConfig: StormPlayerConfig):void {

        if(this.playerConfig != null){

            this.rawPlayerConfig = newPlayerConfig;
            this.playerConfig.updateConfig(newPlayerConfig);

            this.dispatchEvent("playerConfigUpdated", {ref:this});

        }

    }

    /**
     * Returns id of this player instance
     */
    public getInstanceName(): string {
        return this.instanceName;
    }

    /**
     * Returns main HTML element for this player
     */
    public getMainElement(): MainElement {
        return this.mainElement;
    }

    /**
     * Sets new main element
     * @param element
     */
    public setMainElement(element:MainElement){
        this.mainElement = element;
    }

    /**
     * Resizes the player
     * @param width new player width in pixels
     * @param height new player height in pixels
     */
    public setSize(width: number | string, height: number | string): void {
        this.mainElement.setSize(width, height);
    }

    /**
     * Changes player width
     * @param width new player width in pixels
     */
    public setWidth(width: number | string): void {
        this.mainElement.setWidth(width);
    }

    /**
     * Changes player height
     * @param height new player height in pixels
     */
    public setHeight(height: number | string): void {
        this.mainElement.setHeight(height);
    }

    /**
     * Changes player styles
     * @param styles new player styles
     */
    public setStyle(config: any): void {

        const player = this.mainElement.getPlayerElement();

        if(config.style) {

            if (config.style.loaderColor)
                player.style.setProperty("--sp-loader-color", config.style.loaderColor);

            if(config.style.progressBar){
                if (config.style.progressBar.gradientColor1)
                    player.style.setProperty("--sp-first-progress-bar-color", config.style.progressBar.gradientColor1);
                if (config.style.progressBar.gradientColor2)
                    player.style.setProperty("--sp-second-progress-bar-color", config.style.progressBar.gradientColor2);
            }

            if(config.style.waitingRoomRings){
                if (config.style.waitingRoomRings.gradientColor1)
                    player.style.setProperty("--sp-first-waiting-ring-color", config.style.waitingRoomRings.gradientColor1);
                if (config.style.waitingRoomRings.gradientColor2)
                    player.style.setProperty("--sp-second-waiting-ring-color", config.style.waitingRoomRings.gradientColor2);
            }

            if(config.style.cuePoint){
                if (config.style.cuePoint.gradientColor1)
                    player.style.setProperty("--sp-first-cue-point-color", config.style.cuePoint.gradientColor1);
                if (config.style.cuePoint.gradientColor2)
                    player.style.setProperty("--sp-second-cue-point-color", config.style.cuePoint.gradientColor2);
            }

            if(config.style.unmuteLabel){
                if (config.style.unmuteLabel.backgroundColor )
                    player.style.setProperty("--sp-unmute-label-bg-color", config.style.unmuteLabel.backgroundColor);
                if (config.style.unmuteLabel.primaryColor)
                    player.style.setProperty("--sp-unmute-label-primary-color", config.style.unmuteLabel.primaryColor);
            }

            if(config.style.icons){

                if (config.style.icons.primaryColor)
                    player.style.setProperty("--sp-icons-primary-color", config.style.icons.primaryColor);
                if (config.style.icons.secondaryColor)
                    player.style.setProperty("--sp-icons-secondary-color", config.style.icons.secondaryColor);
                if (config.style.icons.activeColor)
                    player.style.setProperty("--sp-icons-active-color", config.style.icons.activeColor);
                if (config.style.icons.errorColor)
                    player.style.setProperty("--sp-icons-error-color", config.style.icons.errorColor);
            }

            if (config.style.backgroundColor)
                player.style.setProperty("--sp-background-color", config.style.backgroundColor);

            if(config.style.text) {
                if (config.style.text.titleColor)
                    player.style.setProperty("--sp-text-title-color", config.style.text.titleColor);
                if (config.style.text.subtitleColor)
                    player.style.setProperty("--sp-text-desc-color", config.style.text.subtitleColor);
                if (config.style.text.errorColor)
                    player.style.setProperty("--sp-text-error-color", config.style.text.errorColor);
            }

            if(config.style.font) {
                if (config.style.font.fontRegular)
                    player.style.setProperty("--sp-font-regular", config.style.font.fontRegular);
                if (config.style.font.fontBold)
                    player.style.setProperty("--sp-font-bold", config.style.font.fontBold);
            }

            if (config.style.borderRadius != undefined){
                player.style.setProperty("--sp-border-radius", config.style.borderRadius);
            }
        }
    }

    /**
     * Returns plauer width;
     */
    public getWidth():number {
        return this.mainElement.getWidth();
    }

    /**
     * Returns plauer height;
     */
    public getHeight():number {
        return this.mainElement.getHeight();
    }

    /**
     * Sets a title visible in the upper-right corner of the player
     * @param title new title
     */
    public setTitle(title: string): void {

        if (!this.mainElement.getHeaderElement())
            return;

        this.playerConfig.setTitle(title);
        this.mainElement.getHeaderElement().setTitle(title);
    }

    /**
     * Sets a subtitle visible in the upper-right corner of the player (below the main title)
     * @param subtitle
     */
    public setSubtitle(subtitle: string): void {
        if (!this.mainElement.getHeaderElement())
            return;

        this.playerConfig.setSubtitle(subtitle);
        this.mainElement.getHeaderElement().setSubtitle(subtitle);
    }

    /**
     * Returns GUI configuration object
     */
    public getPlayerConfig(): StormPlayerConfigImpl {
        return this.playerConfig;
    }

    /**
     * Returns GUI configuration object
     */
    public getRawStreamConfig(): StormStreamConfig {
        return this.rawStreamConfig;
    }

    /**
     * Returns GUI configuration object
     */
    public getRawPlayerConfig(): StormPlayerConfig {
        return this.rawPlayerConfig;
    }

    /**
     * Returns Library Manager
     */
    public getLibraryManager(): LibraryManager {
        return this.libraryManager;
    }

    /**
     * Returns whenever device is of touch-type (smartphone, tablet etc.)
     */
    public isTouchDevice(): boolean {
        return (
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            //@ts-ignore - property in the modern browsers to detect touch device in >IE10
            navigator.msMaxTouchPoints > 0
        );
    }

    /**
     * Returns player version
     */
    public getVersion(): string {
        return StormPlayer.VERSION;
    }

    /**
     * Destroys the player, removing HTML element and related StormLibrary
     */
    public destroy(): void {
        if(this.getLibrary() != null)
            this.getLibrary().destroy();

        this.deleteAllEventListeners();
        this.mainElement.remove();
    }
}
