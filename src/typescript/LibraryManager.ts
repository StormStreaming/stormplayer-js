import {StormPlayer} from "./StormPlayer";
import {EventType} from "./events/EventType";
import {StormLibrary, StormStreamConfig} from "@stormstreaming/stormlibrary";
import {VideoConfig} from "@stormstreaming/stormlibrary/dist/types/types/VideoConfig";

/**
 * Class responsible for managing StormLibrary instance
 */
export class LibraryManager {

    /**
     * Reference to the player
     * @private
     */
    private stormPlayer: StormPlayer;

    /**
     * A configuration object for the library
     * @private
     */
    private config: StormStreamConfig;

    /**
     * The StormLibrary Instance
     * @private
     */
    private library: StormLibrary;

    /**
     * Timeout for checking resolution;
     * @private
     */
    private resolutionTimeout:number;

    /**
     * Whenever we are in FS mode or not
     * @private
     */
    private isFullScreenMode:boolean = false;

    /**
     * Current player width
     * @private
     */
    private currWidth:number | string = 0;

    /**
     * Current player height
     * @private
     */
    private currHeight:number | string = 0;

    /**
     * Events registered with this object
     * @private
     */
    private libraryEvents: any = {}

    /**
     * Constructor for the LibraryManager
     *
     * @param config a config for the library
     * @param stormPlayer a reference to the main player class
     */
    constructor(stormPlayer: StormPlayer) {
        this.stormPlayer = stormPlayer;
    }

    public initialize(config: StormStreamConfig):void {

        this.config = config;

        if(typeof this.config.settings.video != "undefined") {

            this.config.settings.video.containerID = this.stormPlayer.getInstanceName() + "_video";
            this.config.settings.video.width = this.stormPlayer.getPlayerConfig().getWidth();
            this.config.settings.video.height = this.stormPlayer.getPlayerConfig().getHeight();

        } else {

            let video:VideoConfig = {
                containerID: this.stormPlayer.getInstanceName() + "_video",
                width: this.stormPlayer.getPlayerConfig().getWidth(),
                height: this.stormPlayer.getPlayerConfig().getHeight(),
            };

            this.config.settings.video = video;

        }

        this.currWidth = this.stormPlayer.getPlayerConfig().getWidth();
        this.currHeight = this.stormPlayer.getPlayerConfig().getHeight();

        this.attachListeners();

    }

    /**
     * Returns library config
     */
    public getConfig(): StormStreamConfig {
        return this.config;
    }

    /**
     * Returns library instance
     */
    public getLibrary(): StormLibrary {
        return this.library;
    }

    /**
     * Initializes the library
     */
    public initializeLibrary(): void {

        const that:LibraryManager = this;

        this.library = new StormLibrary(this.config);
        this.stormPlayer.dispatch(EventType.LIBRARY_CREATED);
        this.library.initialize();
        this.stormPlayer.dispatch(EventType.LIBRARY_INITIALIZED);

        for (const key in this.libraryEvents) {
            if (this.libraryEvents.hasOwnProperty(key)) {
                this.libraryEvents[key].listeners.forEach(function(element:any){
                    that.library.addEventListener(key,element)
                });
            }
        }

    }

    public addEventListener(event: any, callback: any): boolean {

        // Check if the callback is not a function
        if (typeof callback !== 'function') {
            console.error(`The listener callback must be a function, the given type is ${typeof callback}`);
            return false;
        }
        // Check if the event is not a string
        if (typeof event !== 'string') {
            console.error(`The event name must be a string, the given type is ${typeof event}`);
            return false;
        }

        // Create the event if not exists
        if (this.libraryEvents[event] === undefined) {
            this.libraryEvents[event] = {
                listeners: []
            }
        }

        this.libraryEvents[event].listeners.push(callback);

        if(this.getLibrary() != null)
            this.library.addEventListener(event, callback);

        return true;

    }

    /**
     * Removes event from the player
     * @param event event name
     * @param callback callback function previously registered (can be null for inline function)
     */
    public removeEventListener(event: string | number, callback: any = null): boolean {

        if(callback == null)
            this.libraryEvents[event].listeners = null

        if (this.libraryEvents[event] === undefined) {
            console.error(`This event: ${event} does not exist`);
            return false;
        }

        this.libraryEvents[event].listeners = this.libraryEvents[event].listeners.filter((listener: any) => {
            return listener.toString() !== callback.toString();
        });

        if(this.getLibrary() != null)
            if (typeof event === "string")
                this.library.removeEventListener(event, callback);

    }

    /**
     * Attaches basic events to both the player & the library
     * @private
     */
    private attachListeners(): void {

        const that:LibraryManager = this;

        // when gui is ready, let's create an instance of the library
        this.stormPlayer.addEventListener(EventType.GUI_INITIALIZED, function () {
            that.initializeLibrary();
        });

        // when library is created
        this.stormPlayer.addEventListener(EventType.LIBRARY_CREATED, function () {
            that.getLibrary().addEventListener("videoElementCreated", function () {
                document
                    .querySelector("#" + that.stormPlayer.getInstanceName()+"_video" + " video")
                    .classList.add("sp-video");
            });
        });

        // library is now ready to register events
        this.stormPlayer.addEventListener(EventType.LIBRARY_INITIALIZED, function () {

            // when play is clicked
            that.stormPlayer.addEventListener(EventType.PLAY_CLICKED, function () {
                that.getLibrary().play();
            });

            // when pause is cliked
            that.stormPlayer.addEventListener(EventType.PAUSE_CLICKED, function () {
                that.getLibrary().pause();
            });

            // when mute is clicked
            that.stormPlayer.addEventListener(EventType.MUTE_CLICKED, function () {
                that.getLibrary().mute();
            });

            // when mute is clicked again/or unmute button is clicked
            that.stormPlayer.addEventListener(EventType.UNMUTE_CLICKED, function () {
                that.getLibrary().unmute();
            });

            // when toggle play button is clicked (works as pause/play)
            that.stormPlayer.addEventListener(EventType.TOGGLE_CLICKED, function () {
                that.getLibrary().togglePlay();
            });

            // when volume is changed
            that.stormPlayer.addEventListener(EventType.VOLUME_CHANGED, function (e: any) {
                that.getLibrary().setVolume(e.volume);
            });

            // when video quality is changed
            that.stormPlayer.addEventListener(EventType.QUALITY_CHANGED, function (e: any) {
                that.getLibrary().setQuality(e.label);
            });

            // when user clicks on progress bar or uses thumb to seek
            that.stormPlayer.addEventListener(EventType.SEEK_SETTED, function (e: any) {
                that.getLibrary().seek(e.seekToTime);
            });

            // when user enters full-screen mode
            that.stormPlayer.addEventListener(EventType.FULLSCREEN_ENTERED, function () {
                that.isFullScreenMode = true;

                if(that.resolutionTimeout != null)
                    clearInterval(that.resolutionTimeout);

                // @ts-ignore
                that.resolutionTimeout = setInterval(function(){
                    that.checkResolution();
                },100);

            });


        });
    }

    public checkResolution():void{

        if(this.isFullScreenMode) {

            let newWidth = window.screen.width;
            let newHeight = window.screen.height;

            if(this.currWidth == newWidth && this.currHeight == newHeight){

                if(this.resolutionTimeout != null)
                    clearInterval(this.resolutionTimeout);

                this.getLibrary().setSize(window.innerWidth, window.innerHeight);

            } else {

                this.currWidth = newWidth;
                this.currHeight = newHeight;

            }

        }
    }

    public destroy():void{
        if(this.library != null){
            this.library.destroy();
        }
    }

}
