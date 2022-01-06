import { GraphicElement } from "../GraphicElement";
import { StormPlayer } from "../../StormPlayer";

/**
 * Subtitles button (NOT IMPLEMENTED YET)
 */
export class SubtitlesElement extends GraphicElement {

    /**
     * Constructor
     * @param stormPlayer reference to the main player class
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-controls__button", "button");
    }

    /**
     * Draw graphics for the element
     * @protected
     */
    protected override draw(): void {
        super.draw();
        this.htmlElement.innerHTML = "<span>CC</span>";
        this.htmlElement.setAttribute("data-title", "Subtitles");
    }
}
