import {GraphicalElement} from "./GraphicalElement";
import {StormPlayerGUI} from "../StormPlayerGUI";
import {VideoElement} from "./VideoElement";
import {LoaderElement} from "./LoaderElement";
import {ErrorElement} from "./ErrorElement";
import {PlaybackElement} from "./PlaybackElement";

export class MainElement extends GraphicalElement {

    /*
    Main GUI elements
    */
    private videoElement: VideoElement;
    private loaderElement: LoaderElement;
    private errorElement : ErrorElement;
    private playbackElement : PlaybackElement;

    /*
    All MainElement objects will be added to this wrapper
     */
    private spContainer: GraphicalElement;

    constructor(stormPlayerGUI: StormPlayerGUI) {
        super(stormPlayerGUI, 'sp-container__wrapper');
    }

    protected draw() : void{
        super.draw();

        /*
        Creating wrapper
         */
        this.spContainer = new GraphicalElement(this.stormPlayerGUI, "sp-container");
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

    }

}