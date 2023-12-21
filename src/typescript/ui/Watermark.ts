import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {StormPlayerEvent} from "@app/typescript/events/StormPlayerEvent";

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
        this.subDraw();
    }

    /**
     * Additional drawing
     * @private
     */
    private subDraw():void {

        const heightAdj:number = (this.stormPlayer.getMainElement().getControlElement().getProgresBar().getIfVisible()) ? 65 : 48;

        if(this.stormPlayer.getPlayerConfigManager().getWatermarkURL() != null) {
            switch (this.stormPlayer.getPlayerConfigManager().getWatermarkPosition().toLowerCase()) {
                case 'bottom_left':
                    this.htmlElement.style.left = '20px';
                    this.htmlElement.style.removeProperty("right");
                    break;
                case 'bottom_right':
                    this.htmlElement.style.removeProperty("left");
                    this.htmlElement.style.right = '20px';
                    break;
                default:
                    this.htmlElement.style.removeProperty("left");
                    this.htmlElement.style.right = '20px';
            }

            this.htmlElement.style.bottom = heightAdj+"px";
            this.htmlElement.innerHTML = `<img width="auto" src='${this.stormPlayer.getPlayerConfigManager().getWatermarkURL()}' alt="watermark logo">`;
        } else
            this.htmlElement.innerHTML = ``;

    }
    /**
     * Attaches listeners to the element
     * @protected
     */
    protected override attachListeners(): void {

        this.stormPlayer.addEventListener("playerConfigUpdate", () => {
            this.subDraw();
        });

        this.stormPlayer.addEventListener("resize", (event:StormPlayerEvent["resize"]) => {

            if(event.newWidth >= 700) {

                this.htmlElement.classList.remove("tiny");
                this.htmlElement.classList.remove("tiny");
                this.htmlElement.classList.remove("narrow");
                this.htmlElement.classList.remove("narrow");

            } else if(event.newWidth < 700 && event.newWidth >= 500){

                this.htmlElement.classList.remove("tiny");
                this.htmlElement.classList.remove("tiny");
                this.htmlElement.classList.add("narrow");
                this.htmlElement.classList.add("narrow");

            } else if(event.newWidth < 500){

                this.htmlElement.classList.add("tiny");
                this.htmlElement.classList.remove("narrow");
                this.htmlElement.classList.add("tiny");
                this.htmlElement.classList.remove("narrow");

            }

        });

        this.stormPlayer.addEventListener("guiShow", () => {
            this.htmlElement.classList.remove("low-position");
        });

        this.stormPlayer.addEventListener("guiHide", () => {
            this.htmlElement.classList.add("low-position");
        });

        this.stormPlayer.addEventListener("fullscreenEnter", () => {
            if(this.stormPlayer.getPlayerConfigManager().getIfNativeMobileGUI())
                this.htmlElement.style.display = "none";
        });

        this.stormPlayer.addEventListener("fullscreenExit", () => {
            if(this.stormPlayer.getPlayerConfigManager().getIfNativeMobileGUI())
                this.htmlElement.style.display = "block";
        });

    }
}
