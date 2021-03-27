import {GraphicElement} from "../GraphicElement";
import {StormPlayer} from "../../StormPlayer";

export class SubtitlesElement extends GraphicElement {

    constructor(stormPlayer: StormPlayer) {

        super(stormPlayer, 'sp-controls__button', 'button');

    }

    protected draw() : void{
        super.draw();

        this.htmlElement.innerHTML = '<span>CC</span>';

        this.htmlElement.setAttribute('data-title', "Subtitles");
    }

}