import {GraphicElement} from "../GraphicElement";
import {StormPlayer} from "../../StormPlayer";

/**
 * Class represents play button
 */
export class PlayElement extends GraphicElement {

    /**
     * PlayButton element
     * @private
     */
    private playButtonElement: HTMLButtonElement;

    /**
     * Reference to the player main class
     * @param stormPlayer
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-play");
    }

    /**
     * Draws graphics
     * @protected
     */
    protected override draw(): void {
        super.draw();

        this.playButtonElement = document.createElement("button");
        this.playButtonElement.setAttribute("type","button");
        this.playButtonElement.className = "sp-play__button";
        this.playButtonElement.innerHTML = `<svg class="sp-play-icon" width="17" height="22" viewBox="0 2 21 26">
            <g fill="none" fill-rule="evenodd">
                <g fill="#000">
                    <g>
                        <path
                        d="M13.51 7.681l9.252 13.57c.945 1.386.587 3.276-.799 4.221-.504.344-1.1.528-1.711.528H1.748C.07 26-1.29 24.64-1.29 22.962c0-.61.184-1.207.528-1.711L8.49 7.68c.945-1.386 2.835-1.743 4.221-.798.314.214.585.485.8.798z"
                        transform="translate(-221 -954) translate(221 954) rotate(90 11 15)" />
                    </g>
                </g>
            </g>    
            </svg>
                <svg class="sp-pause-icon sp-hidden" width="17" height="22" viewBox="6 4 12 16">
                <path d="M14.016 5.016h3.984v13.969h-3.984v-13.969zM6 18.984v-13.969h3.984v13.969h-3.984z"></path>
            </svg>`;

        this.htmlElement.append(this.playButtonElement);
    }

    /**
     * Shows "play" (state) on the button
     */
    public showPlay(): void {
        if (!this.playButtonElement) {
            return;
        }

        this.playButtonElement.querySelector(".sp-play-icon").classList.remove("sp-hidden");
        this.playButtonElement.querySelector(".sp-pause-icon").classList.add("sp-hidden");
    }

    /**
     * Shows "pause" (state) on the button
     */
    public showPause(): void {
        if (!this.playButtonElement) {
            return;
        }

        this.playButtonElement.querySelector(".sp-play-icon").classList.add("sp-hidden");
        this.playButtonElement.querySelector(".sp-pause-icon").classList.remove("sp-hidden");
    }

    /**
     * Attaches listeners to the button
     * @protected
     */
    protected override attachListeners(): void {

        this.stormPlayer.addEventListener("libraryInitialize", () => {

            this.stormPlayer.getLibrary().addEventListener("interactionRequired", () => {
                this.showPlay();
            });

            this.stormPlayer.getLibrary().addEventListener("playbackInitiate", () => {
                this.showPause();
            });

            this.stormPlayer.getLibrary().addEventListener("playbackStart", () => {
                this.showPause();
            });

            this.stormPlayer.getLibrary().addEventListener("playbackPause", () => {
                this.showPlay();
            });

            this.stormPlayer.getLibrary().addEventListener("streamStop", () => {
                this.showPlay();
            });

        });

        this.playButtonElement.addEventListener("click", () => {

            if (!this.playButtonElement || this.stormPlayer.getRawPlayerConfig().demoMode == true)
                return;

            if (!this.playButtonElement.querySelector(".sp-play-icon").classList.contains("sp-hidden"))
                this.stormPlayer.dispatchEvent("playClick",{ref:this.stormPlayer});
            else
                this.stormPlayer.dispatchEvent("pauseClick", {ref:this.stormPlayer});

        });
    }
}
