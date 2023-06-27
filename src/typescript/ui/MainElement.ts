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

    private playerWidth:number;

    private playerHeight:number;

    private oldPlayerWidth:number;

    private oldPlayerHeight:number;

    private resolutionLock:boolean = false;

    /**
     * Constructor
     * @param stormPlayer reference to the main player class
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-container__wrapper");
        this.hideGUITimeoutSeconds = stormPlayer.getGuiConfig().getGuiHideSeconds();
    }

    /**
     * Sets size for the player
     * @param width player width in pixels
     * @param height player height in pixels
     */
    public setSize(width: number, height: number) {

        if(this.resolutionLock){
            this.oldPlayerWidth = width;
            this.oldPlayerHeight = height;
            return;
        }

        this.subSetSize(width, height)

    }

    /**
     * Internal mechanism for resizing
     * @param width player width in pixels
     * @param height player height in pixels
     * @private
     */
    private subSetSize(width:number, height:number){

        this.htmlElement.style.maxWidth = width + "px";
        this.spContainer.getHtmlElement().style.height = height + "px";

        this.playerWidth = width;
        this.playerHeight = height;

        if (!this.stormPlayer.waitingRoom){
            if(!this.stormPlayer.getLibrary().isInitialized()){
                this.stormPlayer.getLibrary().getConfig().getSettings().getVideoConfig().setContainerWidth(width);
                this.stormPlayer.getLibrary().getConfig().getSettings().getVideoConfig().setContainerHeight(height);
            } else
                this.stormPlayer.getLibrary().setSize(width, height);
        }
    }

    /**
     * Sets width for the player
     * @param width player width in pixels
     */
    public setWidth(width: number) {

        if(this.resolutionLock){
            this.oldPlayerWidth = width;
            return;
        }

        this.subSetWidth(width);

    }

    /**
     * Internal mechanism for setting player width
     * @param width player width in pixels
     * @private
     */
    private subSetWidth(width:number){

        this.htmlElement.style.maxWidth = width + "px";

        this.playerWidth = width;

        if(!this.stormPlayer.getLibrary().isInitialized()) {
            this.stormPlayer.getLibrary().getConfig().getSettings().getVideoConfig().setContainerWidth(width);
        } else
            this.stormPlayer.getLibrary().setWidth(width);

        if(this.resolutionLock){
            this.oldPlayerWidth = width;
            return;
        }

    }

    /**
     * Internal mechanism for setting player height
     * @param height player width in pixels
     * @private
     */
    public setHeight(height:number){

        if(this.resolutionLock){
            this.oldPlayerHeight = height;
            return;
        }

        this.subSetHeight(height);
    }

    /**
     * Sets height for the player
     * @param height player height in pixels
     */
    private subSetHeight(height: number) {
        this.spContainer.getHtmlElement().style.height = height + "px";

        this.playerHeight = height;

        if(!this.stormPlayer.getLibrary().isInitialized()) {
            this.stormPlayer.getLibrary().getConfig().getSettings().getVideoConfig().setContainerWidth(height);
        } else
            this.stormPlayer.getLibrary().setHeight(height);

        if(this.resolutionLock){
            this.oldPlayerHeight = height;
            return;
        }

    }

    /**
     * Returns plauer width;
     */
    public getWidth():number {
        return this.stormPlayer.getLibrary().getWidth();
    }

    /**
     * Returns plauer height;
     */
    public getHeight():number {
        return this.stormPlayer.getLibrary().getHeight();
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

        this.stormPlayer.addEventListener(EventType.LIBRARY_INITIALIZED, function () {
            that.stormPlayer.getLibrary().addEventListener("videoPlay", function () {
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
                    if(element.matches('.sp-context-menu') || element.matches('.sp-context-menu li'))
                        return
                }

                const element = that.htmlElement;
                that.stormPlayer.dispatch(EventType.CONTEXT_MENU_SHOWN, {e, element});
            });

            window.addEventListener("click", function (e) {
                if (e.target !== null) {
                    const element = e.target as Element;
                    if(element.matches('.sp-context-menu') || element.matches('.sp-context-menu li'))
                        return
                }

                that.stormPlayer.dispatch(EventType.CONTEXT_MENU_HIDED);
            });
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

            that.oldPlayerWidth = that.playerWidth;
            that.oldPlayerHeight = that.playerHeight;

            if (!UserCapabilities.isMobile()) {

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
            that.playerWidth = that.oldPlayerWidth;
            that.playerHeight = that.oldPlayerHeight;

            that.subSetSize(that.playerWidth, that.playerHeight);

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
            this.subSetSize(window.innerWidth, window.innerHeight)
        }

    }
}