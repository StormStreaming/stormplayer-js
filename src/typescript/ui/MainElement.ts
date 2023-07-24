import {GraphicElement} from "./GraphicElement";
import {WaitingRoom} from "./WaitingRoom";
import {StatBox} from "./StatBox";
import {StormPlayer} from "../StormPlayer";
import {VideoElement} from "./VideoElement";
import {LoaderElement} from "./LoaderElement";
import {ErrorElement} from "./ErrorElement";
import {BigPlayElement} from "./BigPlayElement";
import {HeaderElement} from "./HeaderElement";
import {ControlElement} from "./ControlElement";
import {EventType} from "../events/EventType";
import {UnmuteElement} from "./UnmuteElement";
import {UserCapabilities} from "../utilities/UserCapabilities";
import {ContextMenu} from "./ContextMenu";
import {Watermark} from "@app/typescript/ui/Watermark";

/**
 * Main graphical element
 */
export class MainElement extends GraphicElement {

    /**
     * Countdown element
     * @private
     */
    private watermark: Watermark;

    /**
     * Countdown element
     * @private
     */
    private waitingRoom: WaitingRoom;

    /**
     * StatBox element
     * @private
     */
    private statBox: StatBox;

    /**
     * StatBox element
     * @private
     */
    private contextMenu: ContextMenu;

    /**
     * Video element
     * @private
     */
    private videoElement: VideoElement;

    /**
     * Loader element
     * @private
     */
    private loaderElement: LoaderElement;

    /**
     * Error element
     * @private
     */
    private errorElement: ErrorElement;

    /**
     * Playback element
     * @private
     */
    private playbackElement: BigPlayElement;

    /**
     * Header element
     * @private
     */
    private headerElement: HeaderElement;

    /**
     * Control element (buttons)
     * @private
     */
    private controlElement: ControlElement;

    /**
     * Unmute element
     * @private
     */
    private unmuteElement: UnmuteElement;

    /**
     * Wrapper for the element
     * @private
     */
    private spContainer: GraphicElement;

    /**
     * Number of seconds after which GUI will be hidden if there is no user interaction
     * @private
     */
    private hideGUITimeoutSeconds: number;

    /**
     * Countdown element
     * @private
     */
    public isOpenMenu: boolean;

    /**
     * Timeout for hiding GUI
     * @private
     */
    private hideGUITimeout: ReturnType<typeof setTimeout>;

    /**
     * Fullscreen interval
     * @private
     */
    private fsInterval:any

    /**
     * Aspect ratio for the player;
     * @private
     */
    private aspectRatio:string = "none";

    /**
     * Player width in pixels
     * @private
     */
    private playerWidth:number;

    /**
     * Player height in pixels
     * @private
     */
    private playerHeight:number;

    /**
     * Stores player width for fullScreen time
     * @private
     */
    private copyPlayerWidth:number;

    /**
     * Stores player height for fullScreen time
     * @private
     */
    private copyPlayerHeight:number;


    private widthOrigValue:number | string;

    private heightOrigValue:number | string;

    /**
     * Whenever changes to resolution are locked due to FullScreen mode
     * @private
     */

    private resolutionLock:boolean = false;

    /**
     * Reference to the player parent container
     * @private
     */
    private parentContainer:HTMLElement | null;

    private resizeObserver:ResizeObserver;

    /**
     * Constructor
     * @param stormPlayer reference to the main player class
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-container__wrapper stormPlayer");

        this.parentContainer = document.getElementById(stormPlayer.getPlayerConfig().getContainerID());

        this.getHtmlElement().setAttribute("id",stormPlayer.getInstanceName())
        this.aspectRatio = stormPlayer.getPlayerConfig().getAspectRatio();

        this.hideGUITimeoutSeconds = stormPlayer.getPlayerConfig().getGuiHideSeconds();

        this.resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                this.setSize(this.widthOrigValue, this.heightOrigValue);
            }});

        this.resizeObserver.observe(this.parentContainer);

    }

    /**
     * Sets size for the player
     * @param width player width in pixels
     * @param height player height in pixels
     */
    public setSize(width: number | string, height: number | string) {

        let widthValue:number = 0;
        let heightValue:number = 0;
        let isWidthInPixels:boolean = true;
        let isHeightInPixels:boolean = true;

        let finalPlayerWidth = 640;
        let finalPlayerHeight = 360;


        // width
        if (typeof width === "number") {

            widthValue = width;
            isWidthInPixels = true;

        } else if (typeof width === "string") {
            if (width.toLowerCase().endsWith('px')) {

                widthValue = parseInt(width);
                isWidthInPixels = true;

            } else if (width.toLowerCase().endsWith('%')) {

                widthValue = parseInt(width);
                isWidthInPixels = false;

            }
        }  else
            throw new Error("Unknown value for parameter \"width\" - it must be a number or a string! ")

        // height
        if (typeof height === "number") {

            heightValue = height;
            isHeightInPixels = true;

        } else if (typeof height === "string") {
            if (height.toLowerCase().endsWith('px')) {

                heightValue = parseInt(height);
                isHeightInPixels = true;

            } else if (height.toLowerCase().endsWith('%')) {

                heightValue = parseInt(height);
                isHeightInPixels = false;

            }
        }  else
            throw new Error("Unknown value for parameter \"width\" - it must be a number or a string! ")


        if(this.aspectRatio == "none"){

            if(isWidthInPixels){
                finalPlayerWidth = widthValue;
            } else {
                if(this.parentContainer != null)
                    finalPlayerWidth = (this.parentContainer?.getBoundingClientRect().width*widthValue/100);

            }

            if(isHeightInPixels){
                finalPlayerHeight = heightValue;
            } else {
                if(this.parentContainer != null)
                    finalPlayerHeight = (this.parentContainer?.getBoundingClientRect().height*heightValue/100);

            }

        } else {

            let aspectWRatio:number = Number(this.aspectRatio.split(":")[0]);
            let aspectHRatio:number = Number(this.aspectRatio.split(":")[1]);

            if(isWidthInPixels){
                finalPlayerWidth = widthValue;
            } else {
                if(this.parentContainer != null)
                    finalPlayerWidth = (this.parentContainer?.getBoundingClientRect().width*widthValue/100);

            }

            finalPlayerHeight = finalPlayerWidth * aspectHRatio / aspectWRatio;

        }

        this.widthOrigValue = width;
        this.heightOrigValue = height;

        if(this.resolutionLock){
            this.copyPlayerWidth = finalPlayerWidth;
            this.copyPlayerHeight = finalPlayerHeight;
            return;
        }

        this.calculateSize(finalPlayerWidth, finalPlayerHeight)

    }

    /**
     * Sets width for the player
     * @param width player width in pixels
     */
    public setWidth(width: number | string) {
       this.setSize(width, this.heightOrigValue);
    }

    /**
     * Internal mechanism for setting player height
     * @param height player width in pixels
     * @private
     */
    public setHeight(height:number | string){
      this.setSize(this.widthOrigValue, height);
    }

    /**
     * Internal mechanism for resizing
     * @param width player width in pixels
     * @param height player height in pixels
     * @private
     */
    private calculateSize(width:number, height:number){

        this.htmlElement.style.maxWidth = width + "px";
        this.spContainer.getHtmlElement().style.height = height + "px";

        this.playerWidth = width;
        this.playerHeight = height;

        if (!this.stormPlayer.waitingRoom){
            if(!this.stormPlayer.getLibrary().isInitialized()){
                this.stormPlayer.getLibrary().getConfig().getSettings().getVideoConfig().setVideoWidthValue(width);
                this.stormPlayer.getLibrary().getConfig().getSettings().getVideoConfig().setIfVideoWidthInPixels(true);
                this.stormPlayer.getLibrary().getConfig().getSettings().getVideoConfig().setVideoHeightValue(height);
                this.stormPlayer.getLibrary().getConfig().getSettings().getVideoConfig().setIfVideoHeightInPixels(true);
            } else
                this.stormPlayer.getLibrary().setSize(width, height);
        }
    }

    /**
     * Returns plauer width;
     */
    public getWidth():number {
        return this.playerWidth;
    }

    /**
     * Returns plauer height;
     */
    public getHeight():number {
        return this.playerHeight;
    }

    /**
     * Returns header element (top row with title/subtitle)
     */
    public getHeaderElement(): HeaderElement {
        return this.headerElement;
    }

    /**
     * Adds waiting screen
     */
    public createWaitingRoom() {
        this.waitingRoom = new WaitingRoom(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.waitingRoom.getHtmlElement());
    }

    /**
     * Adds player
     */
    public createPlayer() {

        const waitingRoom = this.htmlElement.querySelector('.sp-waiting-room');
        this.stormPlayer.waitingRoom = false;

        if(waitingRoom){
            waitingRoom.remove();
        }

        this.videoElement = new VideoElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.videoElement.getHtmlElement());

        this.loaderElement = new LoaderElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.loaderElement.getHtmlElement());

        if (!this.stormPlayer.getOrigGUIConfig().demoMode) {
            this.errorElement = new ErrorElement(this.stormPlayer);
            this.spContainer.getHtmlElement().appendChild(this.errorElement.getHtmlElement());
        }

        this.playbackElement = new BigPlayElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.playbackElement.getHtmlElement());

        this.headerElement = new HeaderElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.headerElement.getHtmlElement());

        this.unmuteElement = new UnmuteElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.unmuteElement.getHtmlElement());

        this.controlElement = new ControlElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.controlElement.getHtmlElement());

        this.statBox = new StatBox(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.statBox.getHtmlElement());

        this.contextMenu = new ContextMenu(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.contextMenu.getHtmlElement());

        this.watermark = new Watermark(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.watermark.getHtmlElement());

    }


    /**
     * Draw graphics for the element
     * @protected
     */
    protected override draw(): void {
        super.draw();

        this.spContainer = new GraphicElement(this.stormPlayer, "sp-container");
        this.htmlElement.appendChild(this.spContainer.getHtmlElement());

        if (this.stormPlayer.waitingRoom) {
            this.createWaitingRoom();
        } else {
            this.createPlayer();
        }
    }

    /**
     * Attaches listeners to the element
     * @protected
     */
    protected override attachListeners(): void {
        let that = this;
        let spContainerElement = this.spContainer.getHtmlElement();

        if(this.stormPlayer.getPlayerConfig().getIfAutoGUIHide()) {
            this.stormPlayer.addEventListener(EventType.LIBRARY_INITIALIZED, function () {
                    that.stormPlayer.getLibrary().addEventListener("playbackStarted", function () {
                        if (!that.hideGUITimeout) {
                            that.hideGUITimeout = setTimeout(function () {
                                if (that.stormPlayer.getLibrary().isPlaying())
                                    that.stormPlayer.dispatch(EventType.GUI_HIDED);
                            }, that.hideGUITimeoutSeconds * 1000);
                        }
                    });
                }
            );

            if (UserCapabilities.isMobile()) {
                this.htmlElement.addEventListener("touchstart", function () {
                    if (that.hideGUITimeout) clearTimeout(that.hideGUITimeout);
                    that.stormPlayer.dispatch(EventType.GUI_SHOWN);

                    that.hideGUITimeout = setTimeout(function () {
                        if (that.stormPlayer.getLibrary().isPlaying())
                            (that.stormPlayer as any).dispatch(EventType.GUI_HIDED);
                    }, that.hideGUITimeoutSeconds * 1000);

                });

                this.htmlElement.addEventListener("touchmove", function () {

                    if (that.hideGUITimeout)
                        clearTimeout(that.hideGUITimeout);

                    that.stormPlayer.dispatch(EventType.GUI_SHOWN);

                    that.hideGUITimeout = setTimeout(function () {
                        if (that.stormPlayer.getLibrary().isPlaying())
                            (that.stormPlayer as any).dispatch(EventType.GUI_HIDED);
                    }, that.hideGUITimeoutSeconds * 1000);

                });

            } else {
                this.htmlElement.addEventListener("mouseenter", function () {
                    if (that.hideGUITimeout) clearTimeout(that.hideGUITimeout);
                    that.stormPlayer.dispatch(EventType.GUI_SHOWN);
                });

                this.htmlElement.addEventListener("mousemove", function () {

                    if (that.hideGUITimeout)
                        clearTimeout(that.hideGUITimeout);

                    that.stormPlayer.dispatch(EventType.GUI_SHOWN);

                    that.hideGUITimeout = setTimeout(function () {
                        if (that.stormPlayer.getLibrary().isPlaying())
                            (that.stormPlayer as any).dispatch(EventType.GUI_HIDED);
                    }, that.hideGUITimeoutSeconds * 1000);

                });

                this.htmlElement.addEventListener("mouseleave", function () {
                    if (that.hideGUITimeout) clearTimeout(that.hideGUITimeout);
                    if (!that.stormPlayer.waitingRoom) {
                        if (that.stormPlayer.getLibrary().isPlaying())
                            that.stormPlayer.dispatch(EventType.GUI_HIDED);
                    }

                });

                that.htmlElement.addEventListener("contextmenu", function (e) {
                    e.preventDefault();

                    if (e.target !== null) {
                        const element = e.target as Element;
                        if (element.matches('.sp-context-menu') || element.matches('.sp-context-menu li'))
                            return
                    }

                    const element = that.htmlElement;
                    that.stormPlayer.dispatch(EventType.CONTEXT_MENU_SHOWN, {e, element});
                });

                window.addEventListener("click", function (e) {
                    if (e.target !== null) {
                        const element = e.target as Element;
                        if (element.matches('.sp-context-menu') || element.matches('.sp-context-menu li'))
                            return
                    }

                    that.stormPlayer.dispatch(EventType.CONTEXT_MENU_HIDED);
                });
            }
        }

        this.stormPlayer.addEventListener(EventType.GUI_SHOWN, function () {
            that.spContainer.getHtmlElement().classList.remove("sp-container__disablecursor");
        });

        this.stormPlayer.addEventListener(EventType.GUI_HIDED, function () {
            that.spContainer.getHtmlElement().classList.add("sp-container__disablecursor");
        });

        this.stormPlayer.addEventListener(EventType.FULLSCREEN_ENTERED, function () {

            spContainerElement.classList.add("sp-fullscreen");

            that.resolutionLock = true;

            that.copyPlayerWidth = that.playerWidth;
            that.copyPlayerHeight = that.playerHeight;

            if (!UserCapabilities.isMobile() || that.stormPlayer.getPlayerConfig().getIfNativeMobileGUI()) {

                try {
                    const docElmWithBrowsersFullScreenFunctions = spContainerElement as HTMLElement & {
                        mozRequestFullScreen(): Promise<void>;
                        webkitRequestFullscreen(): Promise<void>;
                        msRequestFullscreen(): Promise<void>;
                    };

                    if(that.fsInterval != null)
                        clearInterval(that.fsInterval);

                    that.fsInterval = setInterval(function(){
                        that.updateResolution();
                    },100)

                    if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
                        docElmWithBrowsersFullScreenFunctions.requestFullscreen();
                    } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) {
                        docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
                    } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) {
                        /* Chrome, Safari and Opera */
                        docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
                    } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) {
                        /* IE/Edge */
                        docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
                    }
                } catch(error:any){
                    // nothing
                }

            } else {


                that.htmlElement.classList.add("fs-mode");
                document.body.classList.add("fs-body-fix");

                if(that.fsInterval != null)
                    clearInterval(that.fsInterval);

                that.fsInterval = setInterval(function(){
                    that.updateResolution();
                },100)

            }

        });

        this.stormPlayer.addEventListener(EventType.FULLSCREEN_EXITED, function () {

            spContainerElement.classList.remove("sp-fullscreen");

            if (!UserCapabilities.isMobile()) {

                if(that.fsInterval != null)
                    clearInterval(that.fsInterval);


                try {
                    const docWithBrowsersExitFunctions = document as Document & {
                        mozCancelFullScreen(): Promise<void>;
                        webkitExitFullscreen(): Promise<void>;
                        msExitFullscreen(): Promise<void>;
                    };

                    if (docWithBrowsersExitFunctions.exitFullscreen) {
                        docWithBrowsersExitFunctions.exitFullscreen();
                    } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) {
                        /* Firefox */
                        docWithBrowsersExitFunctions.mozCancelFullScreen();
                    } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) {
                        /* Chrome, Safari and Opera */
                        docWithBrowsersExitFunctions.webkitExitFullscreen();
                    } else if (docWithBrowsersExitFunctions.msExitFullscreen) {
                        /* IE/Edge */
                        docWithBrowsersExitFunctions.msExitFullscreen();
                    }
                } catch(error:any){
                    // nothing
                }


            } else {

                that.htmlElement.classList.remove("fs-mode");
                document.body.classList.remove("fs-body-fix");

                if(that.fsInterval != null)
                    clearInterval(that.fsInterval);

            }

            that.resolutionLock = false;
            that.playerWidth = that.copyPlayerWidth;
            that.playerHeight = that.copyPlayerHeight;

            that.calculateSize(that.playerWidth, that.playerHeight);

        });

        document.addEventListener("fullscreenchange", function () {
            if (document.webkitIsFullScreen === false || document.mozFullScreen === false || document.msFullscreenElement === false)
                that.stormPlayer .dispatch(EventType.FULLSCREEN_EXITED);

        }, false);


        document.addEventListener("mozfullscreenchange", function () {
            if (document.webkitIsFullScreen === false || document.mozFullScreen === false || document.msFullscreenElement === false)
                that.stormPlayer.dispatch(EventType.FULLSCREEN_EXITED);
        }, false);

        document.addEventListener("MSFullscreenChange", function () {
            if (document.webkitIsFullScreen === false || document.mozFullScreen === false || document.msFullscreenElement === false)
                that.stormPlayer.dispatch(EventType.FULLSCREEN_EXITED);
        }, false);

        document.addEventListener("webkitfullscreenchange", function () {
            if (document.webkitIsFullScreen === false || document.mozFullScreen === false || document.msFullscreenElement === false)
                that.stormPlayer.dispatch(EventType.FULLSCREEN_EXITED);
        }, false);

    }

    private updateResolution():void {

        if((this.playerWidth != window.innerWidth) || (this.playerHeight != window.innerHeight)){
            this.calculateSize(window.innerWidth, window.innerHeight)
        }

    }

    /**
     * Returns the reference to the player HTML element
     */
    public getPlayerElement():HTMLElement | null {
        return this.getHtmlElement();
    }

    public getParentContainer():HTMLElement | null {
        return this.parentContainer;
    }

}