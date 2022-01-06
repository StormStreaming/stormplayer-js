import {GraphicElement} from "../GraphicElement";
import {StormPlayer} from "../../StormPlayer";
import {PlayElement} from "./PlayElement";
import {VolumeElement} from "./VolumeElement";
import {QualityElement} from "./QualityElement";
import {FullscreenElement} from "./FullScreenElement";

/**
 * Class represents a single controller for all buttons located at the bottom of the player
 */
export class ControlButtonsElement extends GraphicElement {

    /**
     * Play button
     * @private
     */
    private playElement: PlayElement;

    /**
     * Volume button
     * @private
     */
    private volumeElement: VolumeElement;

    /**
     * Quality switch button
     * @private
     */
    private qualityElement: QualityElement;

    /**
     * Fullscreen button
     * @private
     */
    private fullscreenElement: FullscreenElement;

    /**
     * Left buttons wrapper
     * @private
     */
    private leftWrapper: GraphicElement;

    /**
     * Right buttons wrapper
     * @private
     */
    private rightWrapper: GraphicElement;

    /**
     * Constructor
     * @param stormPlayer reference to the main class of the player
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-controls__bottom");
    }

  /**
   * Creates all sub-elements and adds them to the page
   * @protected
   */
  protected override draw(): void {
        super.draw();

        // creating wrappers
        this.leftWrapper = new GraphicElement(this.stormPlayer, "sp-controls__left");
        this.htmlElement.appendChild(this.leftWrapper.getHtmlElement());

        this.rightWrapper = new GraphicElement(this.stormPlayer, "sp-controls__right");
        this.htmlElement.appendChild(this.rightWrapper.getHtmlElement());

        // creating buttons
        this.playElement = new PlayElement(this.stormPlayer);
        this.leftWrapper.getHtmlElement().appendChild(this.playElement.getHtmlElement());

        this.volumeElement = new VolumeElement(this.stormPlayer);
        this.leftWrapper.getHtmlElement().appendChild(this.volumeElement.getHtmlElement());

        this.qualityElement = new QualityElement(this.stormPlayer);
        this.leftWrapper.getHtmlElement().appendChild(this.qualityElement.getHtmlElement());

        this.fullscreenElement = new FullscreenElement(this.stormPlayer);
        this.rightWrapper.getHtmlElement().appendChild(this.fullscreenElement.getHtmlElement());
    }
}
