import {GraphicElement} from "./GraphicElement";
import {StormPlayerGUI} from "../StormPlayerGUI";
import {VideoElement} from "./VideoElement";
import {LoaderElement} from "./LoaderElement";
import {ErrorElement} from "./ErrorElement";
import {PlaybackElement} from "./PlaybackElement";
import {HeaderElement} from "./HeaderElement";
import {ControlElement} from "./ControlElement";

export class MainElement extends GraphicElement {

    /*
    Main GUI elements
    */
    private videoElement: VideoElement;
    private loaderElement: LoaderElement;
    private errorElement : ErrorElement;
    private playbackElement : PlaybackElement;
    private headerElement : HeaderElement;
    private controlElement: ControlElement;

    /*
    All MainElement objects will be added to this wrapper
     */
    private spContainer: GraphicElement;

    constructor(stormPlayerGUI: StormPlayerGUI) {
        super(stormPlayerGUI, 'sp-container__wrapper');
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

    public getHeaderElement() : HeaderElement{
        return this.headerElement;
    }

}