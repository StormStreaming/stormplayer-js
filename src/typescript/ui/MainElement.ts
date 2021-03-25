import {GraphicElement} from "./GraphicElement";
import {StormPlayerGUI} from "../StormPlayerGUI";
import {VideoElement} from "./VideoElement";
import {LoaderElement} from "./LoaderElement";
import {ErrorElement} from "./ErrorElement";
import {PlaybackElement} from "./PlaybackElement";
import {HeaderElement} from "./HeaderElement";
import {ControlElement} from "./ControlElement";
import {EventType} from "../events/EventType";

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

    /*
    All MainElement objects will be added to this wrapper
     */
    private spContainer: GraphicElement;

    /*
    Hide GUI timer
     */
    private hideGUITimeoutSeconds : number = 3;
    private hideGUITimeout : ReturnType<typeof setTimeout>;

    constructor(stormPlayerGUI: StormPlayerGUI) {
        super(stormPlayerGUI, 'sp-container__wrapper');
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
        this.spContainer = new GraphicElement(this.stormPlayerGUI, "sp-container");
        this.htmlElement.appendChild(this.spContainer.getHtmlElement());

        /*
        Adding elements to a wrapper
         */
        this.videoElement = new VideoElement(this.stormPlayerGUI);
        this.spContainer.getHtmlElement().appendChild(this.videoElement.getHtmlElement());

        this.loaderElement = new LoaderElement(this.stormPlayerGUI);
        this.spContainer.getHtmlElement().appendChild(this.loaderElement.getHtmlElement());

        this.errorElement = new ErrorElement(this.stormPlayerGUI);
        this.spContainer.getHtmlElement().appendChild(this.errorElement.getHtmlElement());

        this.playbackElement = new PlaybackElement(this.stormPlayerGUI);
        this.spContainer.getHtmlElement().appendChild(this.playbackElement.getHtmlElement());

        this.headerElement = new HeaderElement(this.stormPlayerGUI);
        this.spContainer.getHtmlElement().appendChild(this.headerElement.getHtmlElement());

        this.controlElement = new ControlElement(this.stormPlayerGUI);
        this.spContainer.getHtmlElement().appendChild(this.controlElement.getHtmlElement());

    }


    protected attachListeners(): void {
        let that = this;
        let spContainerElement = this.spContainer.getHtmlElement();

        this.htmlElement.addEventListener("mouseenter", function(){
            if(that.hideGUITimeout)
                clearTimeout(that.hideGUITimeout);
            that.stormPlayerGUI.dispatch(EventType.GUI_SHOW);
        });

        this.htmlElement.addEventListener("mouseleave", function(){
            if(that.hideGUITimeout)
                clearTimeout(that.hideGUITimeout);
            if(that.stormPlayerGUI.getStormPlayerLibrary().isPlaying())
                that.stormPlayerGUI.dispatch(EventType.GUI_HIDE);
        });

        this.htmlElement.addEventListener("mousemove", function(){
            if(that.hideGUITimeout)
                clearTimeout(that.hideGUITimeout);
            that.stormPlayerGUI.dispatch(EventType.GUI_SHOW);

            that.hideGUITimeout = setTimeout(function(){
                if(that.stormPlayerGUI.getStormPlayerLibrary().isPlaying())
                    that.stormPlayerGUI.dispatch(EventType.GUI_HIDE);
            },that.hideGUITimeoutSeconds*1000);
        });

        this.stormPlayerGUI.addListener(EventType.FULLSCREEN_ENTER, function(){
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

        this.stormPlayerGUI.addListener(EventType.FULLSCREEN_EXIT, function(){
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

    }

}