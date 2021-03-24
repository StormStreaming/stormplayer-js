import {GraphicElement} from "./GraphicElement";
import {StormPlayerGUI} from "../StormPlayerGUI";
import {ProgressbarElement} from "./ProgressbarElement";

export class ControlElement extends GraphicElement {

    private shadowElement: GraphicElement;
    private progressbarElement : ProgressbarElement;

    constructor(stormPlayerGUI: StormPlayerGUI) {

        super(stormPlayerGUI, 'sp-controls');

    }

    protected draw() : void{
        super.draw();

        this.shadowElement = new GraphicElement(this.stormPlayerGUI, "sp-controls__shadow");
        this.htmlElement.appendChild(this.shadowElement.getHtmlElement());

        this.progressbarElement = new ProgressbarElement(this.stormPlayerGUI);
        this.htmlElement.appendChild(this.progressbarElement.getHtmlElement());

    }

}