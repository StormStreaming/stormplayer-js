import {GraphicElement} from "../GraphicElement";
import {StormPlayer} from "../../StormPlayer";
import {PlayElement} from "./PlayElement";
import {VolumeElement} from "./VolumeElement";
import {QualityElement} from "./QualityElement";
import {SubtitlesElement} from "./SubtitlesElement";
import {FullscreenElement} from "./FullscreenElement";

export class ControlButtonsElement extends GraphicElement {


    /*
    Control buttons
     */
    private playElement : PlayElement;
    private volumeElement : VolumeElement;
    private qualityElement : QualityElement;

    //private subtitlesElement : SubtitlesElement;
    private fullscreenElement : FullscreenElement;

    /*
    Buttons wrapper
     */
    private leftWrapper : GraphicElement;
    private rightWrapper : GraphicElement;

    constructor(stormPlayer: StormPlayer) {

        super(stormPlayer, 'sp-controls__bottom');

    }

    protected draw() : void{
        super.draw();

        /*
        Creating wrapper
         */
        this.leftWrapper = new GraphicElement(this.stormPlayer, "sp-controls__left");
        this.htmlElement.appendChild(this.leftWrapper.getHtmlElement());

        this.rightWrapper = new GraphicElement(this.stormPlayer, "sp-controls__right");
        this.htmlElement.appendChild(this.rightWrapper.getHtmlElement());

        /*
        Creating control buttons
         */
        this.playElement = new PlayElement(this.stormPlayer);
        this.leftWrapper.getHtmlElement().appendChild(this.playElement.getHtmlElement());

        this.volumeElement = new VolumeElement(this.stormPlayer);
        this.leftWrapper.getHtmlElement().appendChild(this.volumeElement.getHtmlElement());

        this.qualityElement = new QualityElement(this.stormPlayer);
        this.leftWrapper.getHtmlElement().appendChild(this.qualityElement.getHtmlElement());

        //this.subtitlesElement = new SubtitlesElement(this.stormPlayer);
        //this.rightWrapper.getHtmlElement().appendChild(this.subtitlesElement.getHtmlElement());

        this.fullscreenElement = new FullscreenElement(this.stormPlayer);
        this.rightWrapper.getHtmlElement().appendChild(this.fullscreenElement.getHtmlElement());
    }

}