import {MainElement} from "./ui/MainElement";
import {LibraryManager} from "./LibraryManager";
import {StormLibrary} from "@stormstreaming/stormlibrary";
import {StormGUIConfigImpl} from "./StormGUIConfigImpl";
import {StormPlayerConfig} from "./types/StormPlayerConfig";
import {StormStreamConfig} from "@stormstreaming/stormlibrary";
import {EventDispatcher} from "./events/EventDispatcher";

/**
 * Main class for the player
 */
export class StormPlayer extends EventDispatcher {

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
    private playerConfig: StormGUIConfigImpl;

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
    private readonly origGUIConfig:StormPlayerConfig;

    /**
     * Original Library config
     * @private
     */
    private readonly origLibraryConfig:StormStreamConfig;

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

        this.origGUIConfig = playerConfig;
        this.origLibraryConfig = streamConfig;

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
        this.playerConfig = new StormGUIConfigImpl(this.origGUIConfig);

        if(this.playerConfig.getBroadcastCreateDate() != null){
            let startDate = new Date(this.playerConfig.getBroadcastStartDate());
            let createDate = new Date(this.playerConfig.getBroadcastCreateDate());

            if(startDate.getTime() - createDate.getTime() < 0)
                this.libraryManager.initialize(this.origLibraryConfig);
            else
                this.waitingRoom = true;

        } else {
            this.libraryManager.initialize(this.origLibraryConfig);
        }

        this.mainElement = new MainElement(this);
        document.getElementById(this.playerConfig.getContainerID()).appendChild(this.mainElement.getHtmlElement());

        if (!this.waitingRoom) {
            this.dispatchEvent("interfaceReady", {ref:this});
            this.setTitle(this.playerConfig.getTitle());
            this.setSubtitle(this.playerConfig.getSubtitle());
        }

        this.setSize(this.origGUIConfig.width, this.origGUIConfig.height);
        this.mainElement.setObserver();
        this.setStyle(this.origGUIConfig);

    }

    /**
     * Sets a libraryManager
     * @param setLibraryManager
     */
    public setLibraryManager() {
        this.libraryManager = new LibraryManager(this);
        this.libraryManager.initialize(this.origLibraryConfig)
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
            if(config.style.progressBar){
                if (config.style.progressBar.gradientColor1)
                    player.style.setProperty("--sp-first-progress-bar-color", config.style.progressBar.gradientColor1);

                if (config.style.progressBar.gradientColor2)
                    player.style.setProperty("--sp-second-progress-bar-color", config.style.progressBar.gradientColor2);
            }
            if(config.style.cuePoint){
                if (config.style.cuePoint.gradientColor1)
                    player.style.setProperty("--sp-first-cue-point-color", config.style.cuePoint.gradientColor1);

                if (config.style.cuePoint.gradientColor2)
                    player.style.setProperty("--sp-second-cue-point-color", config.style.cuePoint.gradientColor2);
            }
            if(config.style.text){
                if (config.style.text.titleColor)
                    player.style.setProperty("--sp-text-title-color", config.style.text.titleColor);
                if (config.style.text.subtitleColor)
                    player.style.setProperty("--sp-text-desc-color", config.style.text.subtitleColor);
                if (config.style.text.errorColor)
                    player.style.setProperty("--sp-text-error-color", config.style.text.errorColor);

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
    public getPlayerConfig(): StormGUIConfigImpl {
        return this.playerConfig;
    }

    /**
     * Returns GUI configuration object
     */
    public getOrigLibraryConfig(): StormStreamConfig {
        return this.origLibraryConfig;
    }

    /**
     * Returns GUI configuration object
     */
    public getOrigGUIConfig(): StormPlayerConfig {
        return this.origGUIConfig;
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
     * Destroys the player, removing HTML element and related StormLibrary
     */
    public destroy(): void {
        this.mainElement.remove();
        if(this.getLibrary() != null)
            this.getLibrary().destroy();
    }
}
