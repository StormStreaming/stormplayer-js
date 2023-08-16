import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {UserCapabilities} from "@app/typescript/utilities/UserCapabilities";
import {StormPlayerEvent} from "@app/typescript/events/StormPlayerEvent";

/**
 * Header (top) element of the player
 */
export class PosterElement extends GraphicElement {


    /**
     * Constructor
     * @param stormPlayer reference to the main player class
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-poster");
    }



    /**
     * Makes element visible
     */
    public override show(): void {
        this.htmlElement.classList.remove("sp-poster--hidden");
    }

    /**
     * Makes element invisible
     */
    public override hide(): void {
        this.htmlElement.classList.add("sp-poster--hidden");
    }

    /**
     * Draw graphics for the element
     * @protected
     */
    protected override draw(): void {
        super.draw();

        if(this.stormPlayer.getPlayerConfig().getPoster() != null) {
            this.htmlElement.innerHTML = `<img src='${this.stormPlayer.getPlayerConfig().getPoster()}' alt="logo">`;
        }

    }

    /**
     * Attaches listeners to the element
     * @protected
     */
    protected override attachListeners(): void {

        let that:PosterElement = this;

        this.stormPlayer.addEventListener("playerConfigUpdated", function () {
            if(that.stormPlayer.getPlayerConfig().getPoster() != null)
                that.htmlElement.innerHTML = `<img src='${that.stormPlayer.getPlayerConfig().getPoster()}' alt="logo">`;
            else
                that.htmlElement.innerHTML = ``;
        });

        this.stormPlayer.addEventListener("interactionRequired", function (e: any) {
            that.show();
        });

        this.stormPlayer.addEventListener("playbackInitiated", function () {
            that.show();
        });

        this.stormPlayer.addEventListener("playbackStarted", function () {
            that.hide();
        });

        this.stormPlayer.addEventListener("playbackPaused", function () {
            //that.show();
        });

    }
}
