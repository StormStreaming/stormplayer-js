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

        this.htmlElement.classList.add("sp-hidden");
    }

    public update():void {

        let that:StatBox = this;

        let streamKey:string = "Unknown";
        let host:string = "Unknown";
        let metadata:string = "Unknown";

        // streamKey
        try {
            streamKey = this.stormPlayer.getLibrary().getCurrentSource().getStreamKey();
        } catch(error){

        }

        try {
            host = this.stormPlayer.getLibrary().internalPlayer.connection.socketURL;
        } catch(error){

        }

        try {
            metadata = this.stormPlayer.getLibrary().internalPlayer.metaData.toString();
            let metadataArray = metadata.split("|");
            metadata = metadataArray.join("<br>");
        } catch(error){

        }

        this.htmlElement.innerHTML =`
         <span class="sp-stat-box_close-btn">x</span>
         <div class="sp-stat-box_column sp-stat-box_column--first">
           <span>streamKey</span>
           <span>host</span>
           <span>metadata</span>
         </div>
         <div class="sp-stat-box_column">
           <span>${streamKey}</span>
           <span>${host}</span>
           <span>${metadata}</span>
         </div>
        `;
        this.htmlElement.classList.add("sp-hidden");

        that.htmlElement.querySelector('.sp-stat-box_close-btn').addEventListener('click', function () {
            that.stormPlayer.dispatchEvent("boxStatHid", {ref:that.stormPlayer});
        });

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

        this.stormPlayer.addEventListener("boxStatShown", function () {
            that.update();
            that.showStatBox();
        });

        this.stormPlayer.addEventListener("boxStatHid", function () {
            that.hideStatBox();
        });

    }
}
