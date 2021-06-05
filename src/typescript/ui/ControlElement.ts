import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {ProgressbarElement} from "./ProgressbarElement";
import {ControlButtonsElement} from "./controlbuttons/ControlButtonsElement";
import {EventType} from "../events/EventType";

export class ControlElement extends GraphicElement {

    private shadowElement: GraphicElement;
    private progressbarElement : ProgressbarElement;
    private controlButtonsElement : ControlButtonsElement;

    constructor(stormPlayer: StormPlayer) {

        super(stormPlayer, 'sp-controls');

    }

    public show(): void {
        this.htmlElement.classList.remove("sp-controls--hidden");
    }

    public hide(): void {
        this.htmlElement.classList.add("sp-controls--hidden");
    }

    protected draw() : void{
        super.draw();

        this.shadowElement = new GraphicElement(this.stormPlayer, "sp-controls__shadow");
        this.htmlElement.appendChild(this.shadowElement.getHtmlElement());

        this.progressbarElement = new ProgressbarElement(this.stormPlayer);
        this.htmlElement.appendChild(this.progressbarElement.getHtmlElement());

        this.controlButtonsElement = new ControlButtonsElement(this.stormPlayer);
        this.htmlElement.appendChild(this.controlButtonsElement.getHtmlElement());

        let that = this;

        this.stormPlayer.addEventListener(EventType.GUI_SHOWN, function(){
            that.show();
        });

        this.stormPlayer.addEventListener(EventType.GUI_HIDED, function(){
            that.hide();
        });
    }

}