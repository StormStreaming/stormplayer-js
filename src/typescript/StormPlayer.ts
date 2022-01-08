import {Dispatcher} from "./events/Dispatcher";
import {MainElement} from "./ui/MainElement";
import {EventType} from "./events/EventType";
import {LibraryManager} from "./LibraryManager";
import {StormLibrary} from "@stormstreaming/stormlibrary";
import {StormGUIConfigImpl} from "./StormGUIConfigImpl";
import {StormPlayerConfig} from "./types/StormPlayerConfig";

/**
 * Main class for the player
 */
export class StormPlayer extends Dispatcher {

    /**
     * Static variable for assigning IDs to the player
     * @private
     */
    private static NEXT_PLAYER_ID:number = 0;

    /**
     * Video container identifier for StormPlayer library video injection
     * @private
     */
    private instanceID: string;

    /**
     * Player GUI configuration
     * @private
     */
    private readonly guiConfig: StormGUIConfigImpl;

    /**
     * Main HTML element of the GUI
     * @private
     */
    private readonly mainElement: MainElement;

    /**
     * This object manages StormLibrary
     * @private
     */
    private readonly libraryManager: LibraryManager;

    /**
     * Constructor for the player
     *
     * @param guiConfig
     * @param stormLibraryConfig
     * @param cuepoints
     */
    constructor(guiConfig: StormPlayerConfig, stormLibraryConfig: any) {
        super();

        this.instanceID = "StormPlayer-"+ StormPlayer.NEXT_PLAYER_ID;
        StormPlayer.NEXT_PLAYER_ID++;

        this.guiConfig = new StormGUIConfigImpl(guiConfig);
        this.libraryManager = new LibraryManager(stormLibraryConfig, this);
        this.mainElement = new MainElement(this);

        document.getElementById(this.guiConfig.getContainerID()).appendChild(this.mainElement.getHtmlElement());

        this.dispatch(EventType.GUI_INITIALIZED);
        this.setSize(guiConfig.width, guiConfig.height);
        this.setTitle(this.guiConfig.getTitle());
        this.setSubtitle(this.guiConfig.getSubtitle());

        let self:StormPlayer = this;

        //this.addEventListener(EventType.LIBRARY_INITIALIZED, function () {
          //  for (let i = 0; i < cuepoints.length; i++) {
            //    self.addCuePoint(cuepoints[i].title, cuepoints[i].time);
           // }
        //});
    }

    /**
     * Adds a new cuePoint to the timeline
     * @param title title for this cuepoint
     * @param time time in unixtime format for where to attach this cuePoint
     */
    public addCuePoint(title: string, time: number): void {
        this.dispatch(EventType.CUEPOINT_ADDED, {title: title, time: time});
    }

    /**
     * Removes a cuePoint from given time
     * @param time
     */
    public removeCuePoint(time: number): void {
        this.dispatch(EventType.CUEPOINT_REMOVED, {time: time});
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
    public getInstanceID(): string {
        return this.instanceID;
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
    public setSize(width: number, height: number): void {
        this.mainElement.setSize(width, height);
    }

    /**
     * Changes player width
     * @param width new player width in pixels
     */
    public setWidth(width: number): void {
        this.mainElement.setWidth(width);
    }

    /**
     * Changes player height
     * @param height new player height in pixels
     */
    public setHeight(height: number): void {
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
        if (!this.mainElement.getHeaderElement()) {
            return;
        }

        this.guiConfig.setTitle(title);
        this.mainElement.getHeaderElement().setTitle(title);
    }

    /**
     * Sets a subtitle visible in the upper-right corner of the player (below the main title)
     * @param subtitle
     */
    public setSubtitle(subtitle: string): void {
        if (!this.mainElement.getHeaderElement()) {
            return;
        }

        this.guiConfig.setSubtitle(subtitle);
        this.mainElement.getHeaderElement().setSubtitle(subtitle);
    }

    /**
     * Returns GUI configuration object
     */
    public getGuiConfig(): StormGUIConfigImpl {
        return this.guiConfig;
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
        this.getLibrary().destroy();
    }
}
