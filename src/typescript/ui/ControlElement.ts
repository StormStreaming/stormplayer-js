import { GraphicElement } from "./GraphicElement";
import { StormPlayer } from "../StormPlayer";
import { ProgressbarElement } from "./ProgressbarElement";
import { ControlButtonsElement } from "./controlbuttons/ControlButtonsElement";
import { EventType } from "../events/EventType";

/**
 * Class represents main control element
 */
export class ControlElement extends GraphicElement {

    /**
     * Shadow element
     * @private
     */
    private shadowElement: GraphicElement;

    /**
     * Progress bar
     * @private
     */
    private progressbarElement: ProgressbarElement;

    /**
     * Control buttons
     * @private
     */
    private controlButtonsElement: ControlButtonsElement;

    /**
     * Constructor
     * @param stormPlayer reference to the main class
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-controls");
    }

    /**
     * Makes the element visible
     */
    public override show(): void {
        this.htmlElement.classList.remove("sp-controls--hidden");
    }

    /**
     * Makes the element invisible
     */
    public override hide(): void {
        this.htmlElement.classList.add("sp-controls--hidden");
    }

    /**
     * Draw graphics for the element
     * @protected
     */
    protected override draw(): void {

        super.draw();

        this.shadowElement = new GraphicElement(this.stormPlayer, "sp-controls__shadow");

        this.htmlElement.appendChild(this.shadowElement.getHtmlElement());

        this.progressbarElement = new ProgressbarElement(this.stormPlayer);
        this.htmlElement.appendChild(this.progressbarElement.getHtmlElement());

        this.controlButtonsElement = new ControlButtonsElement(this.stormPlayer);
        this.htmlElement.appendChild(this.controlButtonsElement.getHtmlElement());

        let that:ControlElement = this;

        this.stormPlayer .addEventListener(EventType.GUI_SHOWN, function () {
            that.show();
        });

        this.stormPlayer.addEventListener(EventType.GUI_HIDED, function () {
            that.hide();
        });

        this.stormPlayer.addEventListener(EventType.FULLSCREEN_ENTERED, function () {
            if(that.stormPlayer.getPlayerConfig().getIfNativeMobileGUI()){
                //that.htmlElement.style.display = "none";
            }
        });

        this.stormPlayer.addEventListener(EventType.FULLSCREEN_EXITED, function () {
            if(that.stormPlayer.getPlayerConfig().getIfNativeMobileGUI()){
                //that.htmlElement.style.display = "block";
            }
        });

    }
}
