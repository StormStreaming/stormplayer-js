import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {EventType} from "../events/EventType";

/**
 * Class represents video object
 */
export class VideoElement extends GraphicElement {

    /**
     * Constructor
     * @param stormPlayer reference to the main player class
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-container__box");
    }

    /**
     * Draws the element
     * @protected
     */
    protected override draw(): void {
        super.draw();
        this.htmlElement.setAttribute("id", this.stormPlayer.getInstanceID());
    }

    /**
     * Attaches listeners
     * @protected
     */
    protected override attachListeners(): void {
        let that:VideoElement = this;
        that.htmlElement.addEventListener("click", function () {
            that.stormPlayer.dispatch(EventType.TOGGLE_CLICKED);
        });
    }
}
