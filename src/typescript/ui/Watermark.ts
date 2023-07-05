import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {EventType} from "@app/typescript/events/EventType";

/**
 * Class representing countdown screen
 */
export class Watermark extends GraphicElement {

    /**
     * Constructor
     * @param stormPlayer reference to the main player class
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-watermark");
    }

    /**
     * Draw graphics for the element
     * @protected
     */
    protected override draw(): void {
        super.draw();

        if(this.stormPlayer.getGuiConfig().getWatermarkURL() != null) {

            switch (this.stormPlayer.getGuiConfig().getWatermarkPosition().toLowerCase()) {
                case 'bottom_left':
                    this.htmlElement.style.left = '20px';
                    break;
                case 'bottom_right':
                    this.htmlElement.style.right = '20px';
                    break;
                default:
                    this.htmlElement.style.right = '20px';
            }

            this.htmlElement.innerHTML = `<img src='${this.stormPlayer.getGuiConfig().getWatermarkURL()}' alt="watermark logo">`;
        }

    }

    /**
     * Attaches listeners to the element
     * @protected
     */
    protected override attachListeners(): void {

        let that:Watermark = this;

        this.stormPlayer.addEventListener(EventType.WAITING_ROOM_CREATED, function () {

        });

        this.stormPlayer.addEventListener(EventType.WAITING_ROOM_ENDED, function () {

        });

    }
}
