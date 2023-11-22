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
        this.subDraw();
    }

    /**
     * Additional drawing
     * @private
     */
    private subDraw():void {

        let isAutoStart = false;
        if(this.stormPlayer.getRawStreamConfig().settings != undefined && this.stormPlayer.getRawStreamConfig().settings != null){
            if(this.stormPlayer.getRawStreamConfig().settings.autoStart != undefined && this.stormPlayer.getRawStreamConfig().settings.autoStart != null){
                isAutoStart = this.stormPlayer.getRawStreamConfig().settings.autoStart;

                if(this.stormPlayer.getRawPlayerConfig().demoMode)
                    isAutoStart = true;
            }
        }

        if(this.stormPlayer.getPlayerConfig().getPoster() != null ){
            if(this.stormPlayer.getRawPlayerConfig().demoMode || !isAutoStart){
                this.htmlElement.innerHTML = `<img src='${this.stormPlayer.getPlayerConfig().getPoster()}' alt="logo">`;
            } else
                this.htmlElement.innerHTML = ``;
        } else
            this.htmlElement.innerHTML = ``;

    }

    /**
     * Attaches listeners to the element
     * @protected
     */
    protected override attachListeners(): void {

        this.stormPlayer.addEventListener("playerConfigUpdated", () => {
            this.subDraw();
        });

        this.stormPlayer.addEventListener("interactionRequired", () => {
            this.show();
        });

        this.stormPlayer.addEventListener("playbackInitiate", () => {
            this.hide();
        });

        // when user enters full-screen mode
        this.stormPlayer.addEventListener("fullscreenEntered", () => {
            if(UserCapabilities.isMobile() && this.stormPlayer.getPlayerConfig().getIfNativeMobileGUI()){

                if(this.stormPlayer.getPlayerConfig().getPoster() != null )
                    this.htmlElement.innerHTML = `<img src='${this.stormPlayer.getPlayerConfig().getPoster()}' alt="logo">`;
                else
                    this.htmlElement.innerHTML = ``;

                this.show();
            }
        });


        // when user enters full-screen mode
        this.stormPlayer.addEventListener("fullscreenExited", () => {
            if(UserCapabilities.isMobile() && this.stormPlayer.getPlayerConfig().getIfNativeMobileGUI()){
                this.hide();
            }
        });

    }
}
