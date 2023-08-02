import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";

/**
 * Class representing stat box
 */
export class StatBox extends GraphicElement {

    /**
     * Constructor
     * @param stormPlayer reference to the main player class
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-stat-box");

    }

    /**
     * Draw graphics for the element
     * @protected
     */
    protected override draw(): void {
        super.draw();

        this.htmlElement.innerHTML =`
         <span class="sp-stat-box_close-btn">x</span>
         <div class="sp-stat-box_column sp-stat-box_column--first">
           <span>streamName</span>
           <span>application</span>
           <span>host</span>
           <span>Codecs</span>
           <span>Bandwidth</span>
           <span>Buffer size</span>
         </div>
         <div class="sp-stat-box_column">
           <span>abdf2342341</span>
           <span>live</span>
           <span>stormstreaming01.web-anatomy.com</span>
           <span>h.264 / aac</span>
           <div class="canvas">
             <canvas id="canvas" ></canvas>
             <span>4000 Kbps</span>
           </div cl>
         </div>
        `;
        this.htmlElement.classList.add("sp-hidden");
    }

    /**
     * Shows context menu
     */
    public showStatBox(): void {
        if (!this.htmlElement) {
            return;
        }

        this.htmlElement.classList.remove("sp-hidden");
    }

    /**
     * Hide context menu
     */
    public hideStatBox(): void {
        if (!this.htmlElement) {
            return;
        }

        this.htmlElement.classList.add("sp-hidden");
    }

    /**
     * Attaches listeners to the element
     * @protected
     */
    protected override attachListeners(): void {

        let that:StatBox = this;

        that.htmlElement.querySelector('.sp-stat-box_close-btn').addEventListener('click', function () {
            that.stormPlayer.dispatchEvent("boxStatHid", {ref:that.stormPlayer});
        });

        this.stormPlayer.addEventListener("boxStatShown", function () {
            that.showStatBox();
        });

        this.stormPlayer.addEventListener("boxStatHid", function () {
            that.hideStatBox();
        });

    }
}
