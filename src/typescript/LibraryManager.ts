import {StormPlayer} from "./StormPlayer";
import {EventType} from "./events/EventType";
import {StormLibraryConfig, StormLibrary} from "@stormstreaming/stormlibrary";

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
    private config: StormLibraryConfig;

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
    private currWidth:number = 0;

    /**
     * Current player height
     * @private
     */
    private currHeight:number = 0;

    /**
     * Constructor for the LibraryManager
     *
     * @param config a config for the library
     * @param stormPlayer a reference to the main player class
     */
    constructor(config: StormLibraryConfig, stormPlayer: StormPlayer) {
        this.stormPlayer = stormPlayer;

        this.config = config;

        this.config.settings.video.containerID = stormPlayer.getInstanceID();
        this.config.settings.video.width = stormPlayer.getGuiConfig().getWitdth();
        this.config.settings.video.height = stormPlayer.getGuiConfig().getHeight();

        this.currWidth = stormPlayer.getGuiConfig().getWitdth();
        this.currHeight = stormPlayer.getGuiConfig().getWitdth();

        this.attachListeners();
    }

    /**
     * Returns library config
     */
    public getConfig(): StormLibraryConfig {
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
        this.library = new StormLibrary(this.config);
        this.stormPlayer.dispatch(EventType.LIBRARY_CREATED);
        this.library.initialize();
        this.stormPlayer.dispatch(EventType.LIBRARY_INITIALIZED);
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
            that.getLibrary().addEventListener("videoObjectCreation", function () {
                document
                    .querySelector("#" + that.stormPlayer.getInstanceID() + " video")
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

            // when user escapes full-screen mode
            that.stormPlayer.addEventListener(EventType.FULLSCREEN_EXITED, function () {
                that.isFullScreenMode = false;
                that.getLibrary().setSize(that.getConfig().settings.video.width, that.getConfig().settings.video.height);
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

                this.getLibrary().setSize(window.screen.width, window.screen.height);

            } else {

                this.currWidth = newWidth;
                this.currHeight = newHeight;

            }

        }
    }

}
