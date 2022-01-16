import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {VideoElement} from "./VideoElement";
import {LoaderElement} from "./LoaderElement";
import {ErrorElement} from "./ErrorElement";
import {BigPlayElement} from "./BigPlayElement";
import {HeaderElement} from "./HeaderElement";
import {ControlElement} from "./ControlElement";
import {EventType} from "../events/EventType";
import {UnmuteElement} from "./UnmuteElement";

/**
 * Main graphical element
 */
export class MainElement extends GraphicElement {

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
     * Timeout for hiding GUI
     * @private
     */
    private hideGUITimeout: ReturnType<typeof setTimeout>;

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
        this.htmlElement.style.maxWidth = width + "px";
        this.spContainer.getHtmlElement().style.height = height + "px";
        this.stormPlayer.getLibrary().setSize(width, height);
    }

    /**
     * Sets width for the player
     * @param width player width in pixels
     */
    public setWidth(width: number) {
        this.htmlElement.style.maxWidth = width + "px";
        this.stormPlayer.getLibrary().setWidth(width);
    }

    /**
     * Sets height for the player
     * @param height player height in pixels
     */
    public setHeight(height: number) {
        this.spContainer.getHtmlElement().style.height = height + "px";
        this.stormPlayer.getLibrary().setHeight(height);
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
     * Draw graphics for the element
     * @protected
     */
    protected override draw(): void {
        super.draw();

        this.spContainer = new GraphicElement(this.stormPlayer, "sp-container");
        this.htmlElement.appendChild(this.spContainer.getHtmlElement());

        this.videoElement = new VideoElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.videoElement.getHtmlElement());

        this.loaderElement = new LoaderElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.loaderElement.getHtmlElement());

        this.errorElement = new ErrorElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.errorElement.getHtmlElement());

        this.playbackElement = new BigPlayElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.playbackElement.getHtmlElement());

        this.headerElement = new HeaderElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.headerElement.getHtmlElement());

        this.unmuteElement = new UnmuteElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.unmuteElement.getHtmlElement());

        this.controlElement = new ControlElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.controlElement.getHtmlElement());
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

        this.htmlElement.addEventListener("mouseenter", function () {
            if (that.hideGUITimeout) clearTimeout(that.hideGUITimeout);
            that.stormPlayer.dispatch(EventType.GUI_SHOWN);
        });

        this.htmlElement.addEventListener("mouseleave", function () {
            if (that.hideGUITimeout) clearTimeout(that.hideGUITimeout);
            if (that.stormPlayer.getLibrary().isPlaying())
                that.stormPlayer.dispatch(EventType.GUI_HIDED);
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

        this.stormPlayer.addEventListener(EventType.GUI_SHOWN, function () {
            that.spContainer.getHtmlElement().classList.remove("sp-container__disablecursor");
        });

        this.stormPlayer.addEventListener(EventType.GUI_HIDED, function () {
            that.spContainer.getHtmlElement().classList.add("sp-container__disablecursor");
        });

        this.stormPlayer.addEventListener(EventType.FULLSCREEN_ENTERED, function () {

            spContainerElement.classList.add("sp-fullscreen");

            const docElmWithBrowsersFullScreenFunctions = spContainerElement as HTMLElement & {
                mozRequestFullScreen(): Promise<void>;
                webkitRequestFullscreen(): Promise<void>;
                msRequestFullscreen(): Promise<void>;
            };

            if (docElmWithBrowsersFullScreenFunctions.requestFullscreen){
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

            //let newWidth = document.querySelector('.box').clientWidth;
            //console.log(newWidth)

        });

        this.stormPlayer.addEventListener(EventType.FULLSCREEN_EXITED, function () {

            spContainerElement.classList.remove("sp-fullscreen");

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
}
