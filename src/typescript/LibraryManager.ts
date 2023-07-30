import {StormPlayer} from "./StormPlayer";
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
        this.stormPlayer.dispatchEvent("libraryCreated",{ref:this.stormPlayer, library:this.library});

        // libraryReady
        this.library.addEventListener("libraryReady", function(event){
            that.stormPlayer.dispatchEvent("libraryReady", {ref:that.stormPlayer, mode:event.mode})
        },false)

        // libraryConnected
        this.library.addEventListener("libraryConnected", function(event){
            that.stormPlayer.dispatchEvent("libraryConnected", {ref:that.stormPlayer, mode:event.mode, serverURL:event.serverURL})
        },false)

        // libraryDisconnected
        this.library.addEventListener("libraryDisconnected", function(event){
            that.stormPlayer.dispatchEvent("libraryDisconnected", {ref:that.stormPlayer, mode:event.mode, serverURL:event.serverURL})
        },false)

        // libraryConnectionFailed
        this.library.addEventListener("libraryConnectionFailed", function(event){
            that.stormPlayer.dispatchEvent("libraryConnectionFailed", {ref:that.stormPlayer, mode:event.mode, serverURL:event.serverURL})
        },false)

        // allConnectionsFailed
        this.library.addEventListener("allConnectionsFailed", function(event){
            that.stormPlayer.dispatchEvent("allConnectionsFailed", {ref:that.stormPlayer, mode:event.mode})
        },false)

        // interactionRequired
        this.library.addEventListener("interactionRequired", function(event){
            that.stormPlayer.dispatchEvent("interactionRequired", {ref:that.stormPlayer, mode:event.mode})
        },false)

        // compatibilityError
        this.library.addEventListener("compatibilityError", function(event){
            that.stormPlayer.dispatchEvent("compatibilityError", {ref:that.stormPlayer, message:event.message})
        },false)

        // playbackInitiated
        this.library.addEventListener("playbackInitiated", function(event){
            that.stormPlayer.dispatchEvent("playbackInitiated", {ref:that.stormPlayer, mode:event.mode, streamKey:event.streamKey})
        },false)

        // streamBuffering
        this.library.addEventListener("streamBuffering", function(event){
            that.stormPlayer.dispatchEvent("streamBuffering", {ref:that.stormPlayer, mode:event.mode, streamKey:event.streamKey})
        },false)

        // playbackStarted
        this.library.addEventListener("playbackStarted", function(event){
            that.stormPlayer.dispatchEvent("playbackStarted", {ref:that.stormPlayer, mode:event.mode, streamKey:event.streamKey})
        },false)

        // playbackPaused
        this.library.addEventListener("playbackPaused", function(event){
            that.stormPlayer.dispatchEvent("playbackPaused", {ref:that.stormPlayer, mode:event.mode, streamKey:event.streamKey})
        },false)

        // playbackStopped
        this.library.addEventListener("playbackStopped", function(event){
            that.stormPlayer.dispatchEvent("playbackStopped", {ref:that.stormPlayer, mode:event.mode, streamKey:event.streamKey})
        },false)

        // playbackError
        this.library.addEventListener("playbackError", function(event){
            that.stormPlayer.dispatchEvent("playbackError", {ref:that.stormPlayer, mode:event.mode, streamKey:event.streamKey})
        },false)

        // playbackProgress
        this.library.addEventListener("playbackProgress", function(event){
            that.stormPlayer.dispatchEvent("playbackProgress", {
                ref:that.stormPlayer,
                mode:event.mode,
                streamKey:event.streamKey,
                playbackDuration:event.playbackDuration,
                playbackStartTime:event.playbackStartTime,
                streamStartTime:event.streamStartTime,
                streamDuration:event.streamDuration,
                dvrCacheSize:event.dvrCacheSize
            })
        },false)

        // streamNotFound
        this.library.addEventListener("streamNotFound", function(event){
            that.stormPlayer.dispatchEvent("streamNotFound", {ref:that.stormPlayer, mode:event.mode, streamKey:event.streamKey})
        },false)

        // newStreamSourceAdded
        this.library.addEventListener("newStreamSourceAdded", function(event){
            that.stormPlayer.dispatchEvent("newStreamSourceAdded", {ref:that.stormPlayer, mode:event.mode, streamKey:event.streamKey})
        },false)

        // metadataReceived
        this.library.addEventListener("metadataReceived", function(event){
            that.stormPlayer.dispatchEvent("metadataReceived", {ref:that.stormPlayer, mode:event.mode, streamKey:event.streamKey, metadata:event.metadata})
        },false)

        // volumeChanged
        this.library.addEventListener("volumeChanged", function(event){
            that.stormPlayer.dispatchEvent("volumeChanged", {ref:that.stormPlayer, mode:event.mode, volume:event.volume, muted:event.muted, invokedBy:event.invokedBy})
        },false)

        // videoElementCreated
        this.library.addEventListener("videoElementCreated", function(event){
            that.stormPlayer.dispatchEvent("videoElementCreated", {ref:that.stormPlayer, videoElement:event.videoElement})
        },false)

        // SSLError
        this.library.addEventListener("SSLError", function(event){
            that.stormPlayer.dispatchEvent("SSLError", {ref:that.stormPlayer, mode:event.mode})
        },false)

        // incompatibleProtocol
        this.library.addEventListener("incompatibleProtocol", function(event){
            that.stormPlayer.dispatchEvent("incompatibleProtocol", {ref:that.stormPlayer, mode:event.mode, clientProtocolVer:event.clientProtocolVer, serverProtocolVersion:event.serverProtocolVersion})
        },false)

        // incompatibleProtocol
        this.library.addEventListener("licenseError", function(event){
            that.stormPlayer.dispatchEvent("licenseError", {ref:that.stormPlayer})
        },false)

        this.library.initialize();
        this.stormPlayer.dispatchEvent("libraryInitialized",{ref:this.stormPlayer, library:this.library});


    }

    /**
     * Attaches basic events to both the player & the library
     * @private
     */
    private attachListeners(): void {

        const that:LibraryManager = this;

        // when gui is ready, let's create an instance of the library
        this.stormPlayer.addEventListener("interfaceReady", function(event){
           that.initializeLibrary();
        });

        this.stormPlayer.addEventListener("videoElementCreated", function(event){
            document.querySelector("#" + that.stormPlayer.getInstanceName()+"_video" + " video").classList.add("sp-video");
        })

        // library is now ready to register events
        this.stormPlayer.addEventListener("libraryInitialized", function () {

            // when play is clicked
            that.stormPlayer.addEventListener("playClicked", function () {
                that.getLibrary().play();
            });

            // when pause is cliked
            that.stormPlayer.addEventListener("pauseClicked", function () {
                that.getLibrary().pause();
            });

            // when mute is clicked
            that.stormPlayer.addEventListener("muteClicked", function () {
                that.getLibrary().mute();
            });

            // when mute is clicked again/or unmute button is clicked
            that.stormPlayer.addEventListener("unmuteClicked", function () {
                that.getLibrary().unmute();
            });

            // when toggle play button is clicked (works as pause/play)
            that.stormPlayer.addEventListener("videoClicked", function () {
                that.getLibrary().togglePlay();
            });

            // when volume is changed
            that.stormPlayer.addEventListener("volumeSet", function (event) {
                that.getLibrary().setVolume(event.volume);
            });

            // when video quality is changed
            that.stormPlayer.addEventListener("qualityChanged", function (event) {
                that.getLibrary().setQuality(event.label);
            });

            // when user clicks on progress bar or uses thumb to seek
            that.stormPlayer.addEventListener("seekSet", function (event) {
                that.getLibrary().seek(event.time);
            });

            // when user enters full-screen mode
            that.stormPlayer.addEventListener("fullscreenEntered", function () {
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
