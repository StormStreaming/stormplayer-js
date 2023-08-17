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

        if(this.stormPlayer.getPlayerConfig().getWatermarkURL() != null) {

            switch (this.stormPlayer.getPlayerConfig().getWatermarkPosition().toLowerCase()) {
                case 'bottom_left':
                    this.htmlElement.style.left = '20px';
                    break;
                case 'bottom_right':
                    this.htmlElement.style.right = '20px';
                    break;
                default:
                    this.htmlElement.style.right = '20px';
            }

            this.htmlElement.innerHTML = `<img width="auto" src='${this.stormPlayer.getPlayerConfig().getWatermarkURL()}' alt="watermark logo">`;
        }

    }

    /**
     * Attaches listeners to the element
     * @protected
     */
    protected override attachListeners(): void {

        let that:Watermark = this;

        this.stormPlayer.addEventListener("playerConfigUpdated", function () {

            if(that.stormPlayer.getPlayerConfig().getWatermarkURL() != null) {

                switch (that.stormPlayer.getPlayerConfig().getWatermarkPosition().toLowerCase()) {
                    case 'bottom_left':
                        that.htmlElement.style.left = '20px';
                        that.htmlElement.style.right = '0px';
                        break;
                    case 'bottom_right':
                        that.htmlElement.style.left = '0px';
                        that.htmlElement.style.right = '20px';
                        break;
                    default:
                        that.htmlElement.style.right = '20px';
                }

                that.htmlElement.innerHTML = `<img src='${that.stormPlayer.getPlayerConfig().getWatermarkURL()}' alt="watermark logo">`;
            } else
                that.htmlElement.innerHTML = ``;

        });

        this.stormPlayer.addEventListener("resize", function (event:StormPlayerEvent["resize"]) {

            if(event.newWidth >= 700) {

                that.htmlElement.classList.remove("tiny");
                that.htmlElement.classList.remove("tiny");
                that.htmlElement.classList.remove("narrow");
                that.htmlElement.classList.remove("narrow");

            } else if(event.newWidth < 700 && event.newWidth >= 500){

                that.htmlElement.classList.remove("tiny");
                that.htmlElement.classList.remove("tiny");
                that.htmlElement.classList.add("narrow");
                that.htmlElement.classList.add("narrow");

            } else if(event.newWidth < 500){

                that.htmlElement.classList.add("tiny");
                that.htmlElement.classList.remove("narrow");
                that.htmlElement.classList.add("tiny");
                that.htmlElement.classList.remove("narrow");

            }

        });

        this.stormPlayer.addEventListener("fullscreenEntered", function () {
            if(that.stormPlayer.getPlayerConfig().getIfNativeMobileGUI()){
                that.htmlElement.style.display = "none";
            }
        });

        this.stormPlayer.addEventListener("fullscreenExited", function () {
            if(that.stormPlayer.getPlayerConfig().getIfNativeMobileGUI()){
                that.htmlElement.style.display = "block";
            }
        });

    }
}
