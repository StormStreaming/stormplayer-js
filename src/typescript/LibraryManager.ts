import {StormPlayer} from "./StormPlayer";
import {StormLibrary, StormStreamConfig} from "@stormstreaming/stormlibrary";
import {VideoConfig} from "@stormstreaming/stormlibrary/dist/types/types/VideoConfig";
import {UserCapabilities} from "@app/typescript/utilities/UserCapabilities";
import {StormPlayerConfig} from "@app/typescript/types/StormPlayerConfig";

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

    private isLibraryReady:boolean = false;

    /**
     * Reference to the newst video element
     * @private
     */
    private videoElement:HTMLVideoElement | undefined;

    private hadAutostart:boolean = false;

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

            this.hadAutostart = this.config.settings.autoStart;
            this.config.settings.autoStart = false;
            this.config.settings.video.containerID = this.stormPlayer.getInstanceName() + "_video";
            this.config.settings.video.width = this.stormPlayer.getPlayerConfigManager().getWidth();
            this.config.settings.video.height = this.stormPlayer.getPlayerConfigManager().getHeight();

        } else {

            let video:VideoConfig = {
                containerID: this.stormPlayer.getInstanceName() + "_video",
                width: this.stormPlayer.getPlayerConfigManager().getWidth(),
                height: this.stormPlayer.getPlayerConfigManager().getHeight(),
            };

            this.config.settings.video = video;

        }

        this.currWidth = this.stormPlayer.getPlayerConfigManager().getWidth();
        this.currHeight = this.stormPlayer.getPlayerConfigManager().getHeight();

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

    public setStreamConfig(streamConfig: StormStreamConfig):void {
        this.config = streamConfig;
        if(this.library != null){
            this.library.setStreamConfig(streamConfig);
        }
    }

    /**
     * Initializes the library
     */
    public initializeLibrary(): void {

        const that:LibraryManager = this;

        this.library = new StormLibrary(this.config);
        this.library.getLogger().info(this, "Attaching StormPlayer v. "+this.stormPlayer.getVersion())
        this.library.getLogger().setPlayerID(this.stormPlayer.getInstanceID());

        this.stormPlayer.dispatchEvent("libraryCreate",{ref:this.stormPlayer, library:this.library});

        // libraryReady
        this.library.addEventListener("playerCoreReady", function(event){
            that.stormPlayer.dispatchEvent("playerCoreReady", {ref:that.stormPlayer})
        },false)

        // libraryConnected
        this.library.addEventListener("serverConnectionInitiate", function(event){
            that.stormPlayer.dispatchEvent("serverConnectionInitiate", {ref:that.stormPlayer, serverURL:event.serverURL})
        },false)

        // libraryConnected
        this.library.addEventListener("serverConnect", function(event){
            that.stormPlayer.dispatchEvent("serverConnect", {ref:that.stormPlayer, serverURL:event.serverURL})
        },false)

        // libraryDisconnected
        this.library.addEventListener("serverDisconnect", function(event){
            that.stormPlayer.dispatchEvent("serverDisconnect", {ref:that.stormPlayer, serverURL:event.serverURL, restart:event.restart})
        },false)

        // libraryConnectionFailed
        this.library.addEventListener("serverConnectionError", function(event){
            that.stormPlayer.dispatchEvent("serverConnectionError", {ref:that.stormPlayer, serverURL:event.serverURL, restart:event.restart})
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
        this.library.addEventListener("playbackInitiate", function(event){
            that.stormPlayer.dispatchEvent("playbackInitiate", {ref:that.stormPlayer, streamKey:event.streamKey})
        },false)

        // streamBuffering
        this.library.addEventListener("bufferingStart", function(event){
            that.stormPlayer.dispatchEvent("bufferingStart", {ref:that.stormPlayer, mode:event.mode})
        },false)

        // streamBuffering
        this.library.addEventListener("bufferingComplete", function(event){
            that.stormPlayer.dispatchEvent("bufferingComplete", {ref:that.stormPlayer, mode:event.mode})
        },false)

        this.library.addEventListener("authorizationComplete", function(event){
            that.stormPlayer.dispatchEvent("authorizationComplete", {ref:that.stormPlayer})
        }, false)

        this.library.addEventListener("authorizationError", function(event){
            that.stormPlayer.dispatchEvent("authorizationError", {ref:that.stormPlayer})
        }, false)

        // playbackStarted
        this.library.addEventListener("playbackStart", function(event){
            that.stormPlayer.dispatchEvent("playbackStart", {ref:that.stormPlayer, mode:event.mode, streamKey:event.streamKey})
        },false)

        // playbackPaused
        this.library.addEventListener("playbackPause", function(event){
            that.stormPlayer.dispatchEvent("playbackPause", {ref:that.stormPlayer, mode:event.mode, streamKey:event.streamKey})
        },false)

        // playbackStopped
        this.library.addEventListener("playbackStop", function(event){
            that.stormPlayer.dispatchEvent("playbackStop", {ref:that.stormPlayer, mode:event.mode, streamKey:event.streamKey})
        },false)

        // streamEnd
        this.library.addEventListener("streamStop", function(event){
            that.stormPlayer.dispatchEvent("streamEnd", {ref:that.stormPlayer, streamKey:event.streamKey})
        },false)




        // playbackError
        this.library.addEventListener("playbackError", function(event){
            that.stormPlayer.dispatchEvent("playbackError", {ref:that.stormPlayer, mode:event.mode, streamKey:event.streamKey})
        },false)

        // playbackProgress
        this.library.addEventListener("playbackProgress", function(event){
            that.stormPlayer.dispatchEvent("playbackProgress", {
                ref:that.stormPlayer,
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
            that.stormPlayer.dispatchEvent("streamNotFound", {ref:that.stormPlayer, streamKey:event.streamKey})
        },false)

        // newStreamSourceAdded
        this.library.addEventListener("newStreamSourceAdded", function(event){
            that.stormPlayer.dispatchEvent("newStreamSourceAdded", {ref:that.stormPlayer, mode:event.mode, streamKey:event.streamKey})
        },false)

        // metadataReceived
        this.library.addEventListener("metadataReceived", function(event){
            that.stormPlayer.dispatchEvent("metadataReceived", {ref:that.stormPlayer, metadata:event.metadata})
        },false)

        // volumeChanged
        this.library.addEventListener("volumeChange", function(event){
            that.stormPlayer.dispatchEvent("volumeChange", {ref:that.stormPlayer, mode:event.mode, volume:event.volume, muted:event.muted, invokedBy:event.invokedBy})
        },false)

        // videoElementCreated
        this.library.addEventListener("videoElementCreate", function(event){
            that.videoElement = event.videoElement;
            that.stormPlayer.dispatchEvent("videoElementCreate", {ref:that.stormPlayer, videoElement:event.videoElement})
        },false)

        // SSLError
        this.library.addEventListener("SSLError", function(event){
            that.stormPlayer.dispatchEvent("SSLError", {ref:that.stormPlayer, mode:event.mode})
        },false)

        // incompatibleProtocol
        this.library.addEventListener("incompatibleProtocol", function(event){
            that.stormPlayer.dispatchEvent("incompatibleProtocol", {ref:that.stormPlayer, clientProtocolVer:event.clientProtocolVer, serverProtocolVersion:event.serverProtocolVersion})
        },false)

        // invalid license
        this.library.addEventListener("invalidLicense", function(event){
            that.stormPlayer.dispatchEvent("invalidLicense", {ref:that.stormPlayer})
        },false)

        // state
        this.library.addEventListener("streamStateChange", function(event){
            that.stormPlayer.dispatchEvent("streamStateChange", {ref:that.stormPlayer, streamKey:event.streamKey, state:event.state})
        },false)

        this.library.addEventListener("optionalStreamData", function (event){

            if(event.optData != null){

                let newTheme:StormPlayerConfig = null;
                let posterURL:string = "";

                // title
                if(event.optData.title != null)
                    that.stormPlayer.setTitle(event.optData.title);
                else
                    that.stormPlayer.setTitle("");

                // subtitle
                if(event.optData.subtitle != null)
                    that.stormPlayer.setSubtitle(event.optData.subtitle);
                else
                    that.stormPlayer.setSubtitle("");

                // thumbnail
                if(event.optData.thumbnail != null){
                    const sizeName:string = event.optData.thumbnail.sizeName;
                    for(let i:number=0;i<event.optData.thumbnail.thumbs.length;i++){
                        if(event.optData.thumbnail.thumbs[i].sizeName == sizeName){
                            posterURL = event.optData.thumbnail.thumbs[i].storageFile.path;
                            break;
                        }
                    }
                }

                // theme (styles, languages, interface)
                if(event.optData.theme != null){
                    if(event.optData.theme != null){

                        switch(typeof event.optData.theme){
                            case "string":
                                newTheme = JSON.parse(event.optData.theme) as StormPlayerConfig;
                                break;
                            case "object":
                                newTheme = event.optData.theme as StormPlayerConfig;
                                break;
                        }
                        newTheme.posterURL = posterURL;
                    }
                }

                if(event.optData.countdown != null){

                    let splashScreenURL:string = null;

                    newTheme.waitingRoom = {createTime:event.optData.countdown.createTime, startTime:event.optData.countdown.startTime, timeZone: event.optData.countdown.timezone } ;

                    if(event.optData.splashscreen != null) {
                        const sizeName: string = event.optData.splashscreen.sizeName;
                        if (event.optData.splashscreen.thumbs != null) {
                            for (let i: number = 0; i < event.optData.splashscreen.thumbs.length; i++) {
                                if (event.optData.thumbnail.thumbs[i].sizeName == sizeName) {
                                    splashScreenURL = event.optData.splashscreen.thumbs[i].storageFile.path;
                                    break;
                                }
                            }
                        }
                    }

                    if(splashScreenURL != null){
                        newTheme.waitingRoom.posterURL = splashScreenURL;
                    }
                }

                that.stormPlayer.getPlayerConfigManager().matchConfig(newTheme);
                that.stormPlayer.dispatchEvent("playerConfigUpdate",{ref:that.stormPlayer});

                // najpierw musimy się dowiedzieć czy tam miał być autostart w ogóle
                let wasAutoStartDefined = false;
                let initialAutoStartValue = false;

                if(that.stormPlayer.getRawStreamConfig()?.settings?.autoStart != undefined){
                    wasAutoStartDefined = true;
                    initialAutoStartValue = that.stormPlayer.getRawStreamConfig().settings.autoStart;
                }

                if(!wasAutoStartDefined){

                    if(newTheme.settings != null){
                        if(newTheme.settings.autoStart != null){

                            if(newTheme.settings.autoStart == true){

                                if(!that.stormPlayer.getLibrary().getIfUnmuted())
                                    that.stormPlayer.getLibrary().mute();

                                that.stormPlayer.dispatchEvent("volumeChange", {
                                    ref: that.stormPlayer,
                                    mode: "",
                                    volume: that.stormPlayer.getLibrary().getVolume(),
                                    muted: that.stormPlayer.getLibrary().isMute(),
                                    invokedBy: "browser"
                                })

                                that.stormPlayer.getLibrary().getStreamConfig().getSettings().setAutoStart(true);

                            } else {
                                that.stormPlayer.getLibrary().unmute();
                            }

                        }
                    }

                }

            }

        });

        this.library.addEventListener("fullScreenExit", () => {
            this.stormPlayer.dispatchEvent("fullscreenExit",{ref:this.stormPlayer});
        })

        this.library.initialize();
        this.stormPlayer.dispatchEvent("libraryInitialize",{ref:this.stormPlayer, library:this.library});

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

        this.stormPlayer.addEventListener("videoElementCreate", function(event){
            document.querySelector("#" + that.stormPlayer.getInstanceName()+"_video" + " video").classList.add("sp-video");
        })


        // library is now ready to register events
        this.stormPlayer.addEventListener("libraryInitialize", function () {

            this.isLibraryReady = true;

            // when play is clicked
            that.stormPlayer.addEventListener("playClick", function () {
                that.getLibrary().play();
            });

            // when pause is cliked
            that.stormPlayer.addEventListener("pauseClick", function () {
                that.getLibrary().pause();
            });

            // when mute is clicked
            that.stormPlayer.addEventListener("muteClick", function () {
                that.getLibrary().mute();
            });

            // when mute is clicked again/or unmute button is clicked
            that.stormPlayer.addEventListener("unmuteClick", function () {
                that.getLibrary().unmute();
            });

            // when toggle play button is clicked (works as pause/play)
            that.stormPlayer.addEventListener("videoClick", function () {
                that.getLibrary().togglePlay();
            });

            // when volume is changed
            that.stormPlayer.addEventListener("volumeSet", function (event) {
                that.getLibrary().setVolume(event.volume);
            });

            // when video quality is changed
            that.stormPlayer.addEventListener("sourceChange", function (event) {
                if(that.stormPlayer.getRawPlayerConfig().demoMode != true)
                    that.getLibrary().playSource(event.newSource);
            });

            // when user clicks on progress bar or uses thumb to seek
            that.stormPlayer.addEventListener("seekSet", function (event) {
                that.getLibrary().seek(event.time);
            });

            // when user enters full-screen mode
            that.stormPlayer.addEventListener("fullscreenEnter", function () {
                that.isFullScreenMode = true;


                if(UserCapabilities.isMobile() && that.stormPlayer.getPlayerConfigManager().getIfNativeMobileGUI()){
                    that.library.getVideoElement().setAttribute("controls","true");
                }

                if(that.resolutionTimeout != null)
                    clearInterval(that.resolutionTimeout);

                // @ts-ignore
                that.resolutionTimeout = setInterval(function(){
                    that.checkResolution();
                },100);

            });

            // when user enters full-screen mode
            that.stormPlayer.addEventListener("fullscreenExit", function () {
                that.isFullScreenMode = false

                if(UserCapabilities.isMobile() && that.stormPlayer.getPlayerConfigManager().getIfNativeMobileGUI())
                    that.library.getVideoElement().removeAttribute("controls");

            });

        });

        this.stormPlayer.addEventListener("playerConfigUpdate", () => {


        });

    }

    /**
     * Returs reference to the Video Element
     */
    public getVideoElement():HTMLVideoElement | null {
        return this.videoElement;
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
