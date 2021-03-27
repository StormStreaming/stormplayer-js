import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";

export class SeektooltipElement extends GraphicElement {

    constructor(stormPlayer: StormPlayer) {

        super(stormPlayer, "sp-seek__tooltip");

    }

    protected draw() : void{
        super.draw();

        this.htmlElement.innerHTML = '00:16';
        this.htmlElement.style.left = "85px";
    }

}