import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {VideoElement} from "./VideoElement";
import {LoaderElement} from "./LoaderElement";
import {ErrorElement} from "./ErrorElement";
import {PlaybackElement} from "./PlaybackElement";
import {HeaderElement} from "./HeaderElement";
import {ControlElement} from "./ControlElement";
import {EventType} from "../events/EventType";
import {UnmuteElement} from "./UnmuteElement";

export class MainElement extends GraphicElement {

    /*
    Main GUI elements
    */
    private videoElement : VideoElement;
    private loaderElement : LoaderElement;
    private errorElement : ErrorElement;
    private playbackElement : PlaybackElement;
    private headerElement : HeaderElement;
    private controlElement : ControlElement;
    private unmuteElement : UnmuteElement;

    /*
    All MainElement objects will be added to this wrapper
     */
    private spContainer: GraphicElement;

    /*
    Hide GUI timer
     */
    private hideGUITimeoutSeconds : number;
    private hideGUITimeout : ReturnType<typeof setTimeout>;

    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, 'sp-container__wrapper');
        this.hideGUITimeoutSeconds = stormPlayer.getGuiConfig().getGuiHideSeconds();
    }

    public setSize(width : number, height : number){
        this.htmlElement.style.maxWidth = width+'px';
        this.spContainer.getHtmlElement().style.height = height+'px';
    }

    public getHeaderElement() : HeaderElement{
        return this.headerElement;
    }

    protected draw() : void{
        super.draw();

        /*
        Creating wrapper
         */
        this.spContainer = new GraphicElement(this.stormPlayer, "sp-container");
        this.htmlElement.appendChild(this.spContainer.getHtmlElement());

        /*
        Adding elements to a wrapper
         */
        this.videoElement = new VideoElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.videoElement.getHtmlElement());

        this.loaderElement = new LoaderElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.loaderElement.getHtmlElement());

        this.errorElement = new ErrorElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.errorElement.getHtmlElement());

        this.playbackElement = new PlaybackElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.playbackElement.getHtmlElement());

        this.headerElement = new HeaderElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.headerElement.getHtmlElement());

        this.unmuteElement = new UnmuteElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.unmuteElement.getHtmlElement());

        this.controlElement = new ControlElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.controlElement.getHtmlElement());

    }


    protected attachListeners(): void {
        let that = this;
        let spContainerElement = this.spContainer.getHtmlElement();

        /*
        Hide GUI events
         */

        this.stormPlayer.addListener(EventType.LIBRARY_INITIALIZED, function() {
            that.stormPlayer.getLibrary().addEventListener("videoPlay", function () {
                if (!that.hideGUITimeout) {
                    that.hideGUITimeout = setTimeout(function () {
                        if (that.stormPlayer.getLibrary().isPlaying())
                            that.stormPlayer.dispatch(EventType.GUI_HIDED);
                    }, that.hideGUITimeoutSeconds * 1000);
                }
            });
        });

        this.htmlElement.addEventListener("mouseenter", function(){
            if(that.hideGUITimeout)
                clearTimeout(that.hideGUITimeout);
            that.stormPlayer.dispatch(EventType.GUI_SHOWN);
        });

        this.htmlElement.addEventListener("mouseleave", function(){
            if(that.hideGUITimeout)
                clearTimeout(that.hideGUITimeout);
            if(that.stormPlayer.getLibrary().isPlaying())
                that.stormPlayer.dispatch(EventType.GUI_HIDED);
        });

        this.htmlElement.addEventListener("mousemove", function(){
            if(that.hideGUITimeout)
                clearTimeout(that.hideGUITimeout);
            that.stormPlayer.dispatch(EventType.GUI_SHOWN);

            that.hideGUITimeout = setTimeout(function(){
                if(that.stormPlayer.getLibrary().isPlaying())
                    that.stormPlayer.dispatch(EventType.GUI_HIDED);
            },that.hideGUITimeoutSeconds*1000);
        });

        /*
        Turn off cursor after hiding GUI
         */

        this.stormPlayer.addListener(EventType.GUI_SHOWN, function(){
            that.spContainer.getHtmlElement().classList.remove('sp-container__disablecursor');
        });

        this.stormPlayer.addListener(EventType.GUI_HIDED, function(){
            that.spContainer.getHtmlElement().classList.add('sp-container__disablecursor');
        });

        /*
        Fullscreen events
         */

        this.stormPlayer.addListener(EventType.FULLSCREEN_ENTERED, function(){
            spContainerElement.classList.add('sp-fullscreen');

            const docElmWithBrowsersFullScreenFunctions = spContainerElement as HTMLElement & {
                mozRequestFullScreen(): Promise<void>;
                webkitRequestFullscreen(): Promise<void>;
                msRequestFullscreen(): Promise<void>;
            };

            if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
                docElmWithBrowsersFullScreenFunctions.requestFullscreen();
            } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
                docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
            } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
            } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
                docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
            }

        });

        this.stormPlayer.addListener(EventType.FULLSCREEN_EXITED, function(){
            spContainerElement.classList.remove('sp-fullscreen');

            const docWithBrowsersExitFunctions = document as Document & {
                mozCancelFullScreen(): Promise<void>;
                webkitExitFullscreen(): Promise<void>;
                msExitFullscreen(): Promise<void>;
            };
            if (docWithBrowsersExitFunctions.exitFullscreen) {
                docWithBrowsersExitFunctions.exitFullscreen();
            } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) { /* Firefox */
                docWithBrowsersExitFunctions.mozCancelFullScreen();
            } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                docWithBrowsersExitFunctions.webkitExitFullscreen();
            } else if (docWithBrowsersExitFunctions.msExitFullscreen) { /* IE/Edge */
                docWithBrowsersExitFunctions.msExitFullscreen();
            }
        });


        document.addEventListener('fullscreenchange', function(){

            // @ts-ignore: Unreachable code error
            if(document.webkitIsFullScreen === false || document.mozFullScreen === false || document.msFullscreenElement === false)
                that.stormPlayer.dispatch(EventType.FULLSCREEN_EXITED);

        }, false);

        document.addEventListener('mozfullscreenchange', function(){
            // @ts-ignore: Unreachable code error
            if(document.webkitIsFullScreen === false || document.mozFullScreen === false || document.msFullscreenElement === false)
                that.stormPlayer.dispatch(EventType.FULLSCREEN_EXITED);
        }, false);

        document.addEventListener('MSFullscreenChange', function(){
            // @ts-ignore: Unreachable code error
            if(document.webkitIsFullScreen === false || document.mozFullScreen === false || document.msFullscreenElement === false)
                that.stormPlayer.dispatch(EventType.FULLSCREEN_EXITED);
        }, false);

        document.addEventListener('webkitfullscreenchange', function(){
            // @ts-ignore: Unreachable code error
            if(document.webkitIsFullScreen === false || document.mozFullScreen === false || document.msFullscreenElement === false)
                that.stormPlayer.dispatch(EventType.FULLSCREEN_EXITED);
        }, false);

    }

}