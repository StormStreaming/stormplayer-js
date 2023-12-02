import {MainElement} from "./ui/MainElement";
import {LibraryManager} from "./LibraryManager";
import {StormLibrary} from "@stormstreaming/stormlibrary";
import {StormPlayerConfig} from "./types/StormPlayerConfig";
import {StormStreamConfig} from "@stormstreaming/stormlibrary";
import {EventDispatcher} from "./events/EventDispatcher";
import {WaitingRoom} from "@app/typescript/ui/WaitingRoom";
import {PlayerConfigManager} from "@app/typescript/PlayerConfigManager";

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
    private playerConfig: PlayerConfigManager;

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
        this.playerConfig = new PlayerConfigManager(this, this.rawPlayerConfig);

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

        this.playerConfig.setStyle();

        this.addEventListener("playerConfigUpdated", (event)=>{
            this.playerConfig.setStyle();
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
        this.dispatchEvent("cuePointAdd", {ref:this, label: label, time: time});
    }

    /**
     * Removes a cuePoint from given time
     * @param time
     */
    public removeCuePoint(time: number): void {
        this.dispatchEvent("cuePointRemove", {ref:this, time: time});
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
            this.playerConfig.overwriteConfig(newPlayerConfig);

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
     * Returns GUI configuration
     */
    public getPlayerConfigManager(): PlayerConfigManager {
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
