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

        let isAutoStart:boolean = this.stormPlayer.getLibrary()?.getStreamConfig()?.getSettings()?.getIfAutoStart() ?? false;

        if(this.stormPlayer.getPlayerConfigManager().getPosterURL() != null && !isAutoStart){

            let newWidth:number = this.stormPlayer.getWidth();
            let newHeight:number = this.stormPlayer.getHeight();

            this.htmlElement.innerHTML = `<img src='${this.stormPlayer.getPlayerConfigManager().getPosterURL()}' alt="logo" width="${newWidth}" height="${newHeight}">`;

        } else
            this.htmlElement.innerHTML = ``;

    }

    /**
     * Attaches listeners to the element
     * @protected
     */
    protected override attachListeners(): void {

        this.stormPlayer.addEventListener("hidePoster", (ev) => {
            if(ev.autoStart)
                this.hide();
        });

        this.stormPlayer.addEventListener("streamStartNotification", () => {
            this.show();
        })

        this.stormPlayer.addEventListener("playerConfigUpdate", () => {
            this.subDraw();
        });

        this.stormPlayer.addEventListener("interactionRequired", () => {
            this.show();
        });

        this.stormPlayer.addEventListener("playbackStart", () => {
            this.hide();
        });

        // when user enters full-screen mode
        this.stormPlayer.addEventListener("fullscreenEnter", () => {
            if(UserCapabilities.isMobile() && this.stormPlayer.getPlayerConfigManager().getIfNativeMobileGUI()){

                if(this.stormPlayer.getPlayerConfigManager().getPosterURL() != null )
                    this.htmlElement.innerHTML = `<img src='${this.stormPlayer.getPlayerConfigManager().getPosterURL()}' alt="logo">`;
                else
                    this.htmlElement.innerHTML = ``;

                this.show();
            }
        });


        // when user enters full-screen mode
        this.stormPlayer.addEventListener("fullscreenExit", () => {
            if(UserCapabilities.isMobile() && this.stormPlayer.getPlayerConfigManager().getIfNativeMobileGUI()){
                this.hide();
            }
        });

    }
}
