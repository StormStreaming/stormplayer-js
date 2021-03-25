import {GraphicElement} from "../GraphicElement";
import {StormPlayerGUI} from "../../StormPlayerGUI";

export class SubtitlesElement extends GraphicElement {

    constructor(stormPlayerGUI: StormPlayerGUI) {

        super(stormPlayerGUI, 'sp-controls__button', 'button');

    }

    protected draw() : void{
        super.draw();

        this.htmlElement.innerHTML = '<span>CC</span>';

        this.htmlElement.setAttribute('data-title', "Subtitles");
    }

}