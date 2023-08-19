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

        let isAutoStart = false;
        if(this.stormPlayer.getOrigLibraryConfig().settings != undefined && this.stormPlayer.getOrigLibraryConfig().settings != null){
            if(this.stormPlayer.getOrigLibraryConfig().settings.autoStart != undefined && this.stormPlayer.getOrigLibraryConfig().settings.autoStart != null){
                isAutoStart = this.stormPlayer.getOrigLibraryConfig().settings.autoStart;

                if(this.stormPlayer.getOrigGUIConfig().demoMode)
                    isAutoStart = true;
            }
        }

        if(this.stormPlayer.getPlayerConfig().getPoster() != null ){
            if(this.stormPlayer.getOrigGUIConfig().demoMode || isAutoStart){
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

            let isAutoStart = false;
            if(this.stormPlayer.getOrigLibraryConfig().settings != undefined && this.stormPlayer.getOrigLibraryConfig().settings != null){
                if(this.stormPlayer.getOrigLibraryConfig().settings.autoStart != undefined && this.stormPlayer.getOrigLibraryConfig().settings.autoStart != null){
                    isAutoStart = this.stormPlayer.getOrigLibraryConfig().settings.autoStart;

                    if(this.stormPlayer.getOrigGUIConfig().demoMode)
                        isAutoStart = true;
                }
            }

            if(this.stormPlayer.getPlayerConfig().getPoster() != null ){
                if(this.stormPlayer.getOrigGUIConfig().demoMode || isAutoStart)
                    this.htmlElement.innerHTML = `<img src='${this.stormPlayer.getPlayerConfig().getPoster()}' alt="logo">`;
                else
                    this.htmlElement.innerHTML = ``;
            } else
                this.htmlElement.innerHTML = ``;

        });

        this.stormPlayer.addEventListener("interactionRequired", function (e: any) {
            this.show();
        });

        this.stormPlayer.addEventListener("playbackInitiated", () => {
            this.show();
        });

        this.stormPlayer.addEventListener("playbackStarted", () => {
            this.hide();
        });

    }
}
