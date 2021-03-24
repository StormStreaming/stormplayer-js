import {GraphicElement} from "./GraphicElement";
import {StormPlayerGUI} from "../StormPlayerGUI";

export class SeektooltipElement extends GraphicElement {

    constructor(stormPlayerGUI: StormPlayerGUI) {

        super(stormPlayerGUI, "sp-seek__tooltip");

    }

    protected draw() : void{
        super.draw();

        this.htmlElement.innerHTML = '00:16';
        this.htmlElement.style.left = "85px";
    }

}