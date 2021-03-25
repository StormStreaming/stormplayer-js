import {GraphicElement} from "./GraphicElement";
import {StormPlayerGUI} from "../StormPlayerGUI";
import {ProgressbarElement} from "./ProgressbarElement";
import {ControlButtonsElement} from "./controlbuttons/ControlButtonsElement";
import {EventType} from "../events/EventType";

export class ControlElement extends GraphicElement {

    private shadowElement: GraphicElement;
    private progressbarElement : ProgressbarElement;
    private controlButtonsElement : ControlButtonsElement;

    constructor(stormPlayerGUI: StormPlayerGUI) {

        super(stormPlayerGUI, 'sp-controls');

    }

    public show(): void {
        this.htmlElement.classList.remove("sp-controls--hidden");
    }

    public hide(): void {
        this.htmlElement.classList.add("sp-controls--hidden");
    }

    protected draw() : void{
        super.draw();

        this.shadowElement = new GraphicElement(this.stormPlayerGUI, "sp-controls__shadow");
        this.htmlElement.appendChild(this.shadowElement.getHtmlElement());

        this.progressbarElement = new ProgressbarElement(this.stormPlayerGUI);
        this.htmlElement.appendChild(this.progressbarElement.getHtmlElement());

        this.controlButtonsElement = new ControlButtonsElement(this.stormPlayerGUI);
        this.htmlElement.appendChild(this.controlButtonsElement.getHtmlElement());

        let that = this;

        this.stormPlayerGUI.addListener(EventType.GUI_SHOW, function(){
            that.show();
        });

        this.stormPlayerGUI.addListener(EventType.GUI_HIDE, function(){
            that.hide();
        });
    }

}