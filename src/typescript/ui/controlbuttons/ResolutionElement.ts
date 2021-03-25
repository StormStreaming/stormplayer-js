import {GraphicElement} from "../GraphicElement";
import {StormPlayerGUI} from "../../StormPlayerGUI";

export class ResolutionElement extends GraphicElement {

    private resolutionButtonElement : HTMLButtonElement;

    constructor(stormPlayerGUI: StormPlayerGUI) {

        super(stormPlayerGUI, 'sp-resolution');

    }

    protected draw() : void{
        super.draw();

        this.resolutionButtonElement = document.createElement("button");
        this.resolutionButtonElement.className = 'sp-controls__button';
        this.resolutionButtonElement.innerHTML = '<span>HD</span>';
        this.resolutionButtonElement.setAttribute('data-title', "Resolution");
        this.htmlElement.append(this.resolutionButtonElement);

    }

}