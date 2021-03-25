import {GraphicElement} from "../GraphicElement";
import {StormPlayerGUI} from "../../StormPlayerGUI";
import {PlayElement} from "./PlayElement";
import {VolumeElement} from "./VolumeElement";
import {ResolutionElement} from "./ResolutionElement";
import {SubtitlesElement} from "./SubtitlesElement";
import {CinematicElement} from "./CinematicElement";
import {FullscreenElement} from "./FullscreenElement";

export class ControlButtonsElement extends GraphicElement {


    /*
    Control buttons
     */
    private playElement : PlayElement;
    private volumeElement : VolumeElement;
    private resolutionElement : ResolutionElement;

    private subtitlesElement : SubtitlesElement;
    private cinematicElement : CinematicElement;
    private fullscreenElement : FullscreenElement;

    /*
    Buttons wrapper
     */
    private leftWrapper : GraphicElement;
    private rightWrapper : GraphicElement;

    constructor(stormPlayerGUI: StormPlayerGUI) {

        super(stormPlayerGUI, 'sp-controls__bottom');

    }

    protected draw() : void{
        super.draw();

        /*
        Creating wrapper
         */
        this.leftWrapper = new GraphicElement(this.stormPlayerGUI, "sp-controls__left");
        this.htmlElement.appendChild(this.leftWrapper.getHtmlElement());

        this.rightWrapper = new GraphicElement(this.stormPlayerGUI, "sp-controls__right");
        this.htmlElement.appendChild(this.rightWrapper.getHtmlElement());

        /*
        Creating control buttons
         */
        this.playElement = new PlayElement(this.stormPlayerGUI);
        this.leftWrapper.getHtmlElement().appendChild(this.playElement.getHtmlElement());

        this.volumeElement = new VolumeElement(this.stormPlayerGUI);
        this.leftWrapper.getHtmlElement().appendChild(this.volumeElement.getHtmlElement());

        this.resolutionElement = new ResolutionElement(this.stormPlayerGUI);
        this.leftWrapper.getHtmlElement().appendChild(this.resolutionElement.getHtmlElement());

        this.subtitlesElement = new SubtitlesElement(this.stormPlayerGUI);
        this.rightWrapper.getHtmlElement().appendChild(this.subtitlesElement.getHtmlElement());

        this.cinematicElement = new CinematicElement(this.stormPlayerGUI);
        this.rightWrapper.getHtmlElement().appendChild(this.cinematicElement.getHtmlElement());

        this.fullscreenElement = new FullscreenElement(this.stormPlayerGUI);
        this.rightWrapper.getHtmlElement().appendChild(this.fullscreenElement.getHtmlElement());
    }

}