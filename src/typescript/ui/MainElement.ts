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
     * Fullscreen interval
     * @private
     */
    private fsInterval:any

    private playerWidth:number;

    private playerHeight:number;

    private oldPlayerWidth:number;

    private oldPlayerHeight:number;

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

        this.playerWidth = width;
        this.playerHeight = height;

        if(!this.stormPlayer.getLibrary().isInitialized()){
            this.stormPlayer.getLibrary().getConfig().getSettings().getVideoConfig().setContainerWidth(width);
            this.stormPlayer.getLibrary().getConfig().getSettings().getVideoConfig().setContainerHeight(height);
        } else {
            this.stormPlayer.getLibrary().setSize(width, height);
        }
    }

    /**
     * Sets width for the player
     * @param width player width in pixels
     */
    public setWidth(width: number) {
        this.htmlElement.style.maxWidth = width + "px";

        this.playerWidth = width;

        if(!this.stormPlayer.getLibrary().isInitialized()) {
            this.stormPlayer.getLibrary().getConfig().getSettings().getVideoConfig().setContainerWidth(width);
        } else
            this.stormPlayer.getLibrary().setWidth(width);
    }

    /**
     * Sets height for the player
     * @param height player height in pixels
     */
    public setHeight(height: number) {
        this.spContainer.getHtmlElement().style.height = height + "px";

        this.playerHeight = height;

        if(!this.stormPlayer.getLibrary().isInitialized()) {
            this.stormPlayer.getLibrary().getConfig().getSettings().getVideoConfig().setContainerWidth(height);
        } else
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

            that.oldPlayerWidth = that.playerWidth;
            that.oldPlayerHeight = that.playerHeight;

            if (!that.isMobile()) {

                try {
                    const docElmWithBrowsersFullScreenFunctions = spContainerElement as HTMLElement & {
                        mozRequestFullScreen(): Promise<void>;
                        webkitRequestFullscreen(): Promise<void>;
                        msRequestFullscreen(): Promise<void>;
                    };

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

            if (!that.isMobile()) {

                that.setSize(that.oldPlayerWidth, that.oldPlayerHeight);

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

                that.setSize(that.oldPlayerWidth, that.oldPlayerHeight);

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

    private updateResolution():void {

        if((this.playerWidth != window.innerWidth) || (this.playerHeight != window.innerHeight)){
            this.setSize(window.innerWidth, window.innerHeight)
        }

    }

    /**
     * Method checks if player is running on mobile device
     * @private
     */
    private isMobile():boolean{
        let check = false;
        // @ts-ignore
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }

}