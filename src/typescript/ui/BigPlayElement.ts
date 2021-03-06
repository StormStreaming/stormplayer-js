import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {EventType} from "../events/EventType";

/**
 * Class representing big play button (visible in the middle of the player)
 */
export class BigPlayElement extends GraphicElement {

    /**
     * Whenever big play button should be visible
     * @private
     */
    private dontShowPlayback: boolean = false;

    /**
     * Constructor
     * @param stormPlayer reference to the main player class
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-playback");

        if (this.stormPlayer.getGuiConfig().isBigPlaybackButton() === false)
            this.hide();
    }

    /**
     * Makes element visible
     */
    public override show(): void {
        if (this.stormPlayer.getGuiConfig().isBigPlaybackButton() === false || this.dontShowPlayback)
            return;

        super.show();
    }

    /**
     * Draw graphics for the element
     * @protected
     */
    protected override draw(): void {
        super.draw();

        this.htmlElement.innerHTML = `
            <svg class="sp-play-icon" width="43" height="53" viewBox="0 0 72 72">
                <g  fill="#fff" fill-rule="evenodd">
                    <g id="path" fill="#fff">
                        <g>
                            <path d="M13.51 7.681l9.252 13.57c.945 1.386.587 3.276-.799 4.221-.504.344-1.1.528-1.711.528H1.748C.07 26-1.29 24.64-1.29 22.962c0-.61.184-1.207.528-1.711L8.49 7.68c.945-1.386 2.835-1.743 4.221-.798.314.214.585.485.8.798z" transform="translate(-221 -954) translate(290 947) rotate(90 11 15) scale(3.6)" />
                        </g>
                    </g>
                </g>    
            </svg>`;

        this.hide();
    }

    /**
     * Attaches listeners to the element
     * @protected
     */
    protected override attachListeners(): void {

        let that:BigPlayElement = this;

        this.htmlElement.addEventListener("click", function () {
            that.stormPlayer.dispatch(EventType.PLAY_CLICKED);
        });

        this.stormPlayer.addEventListener(EventType.SEEK_STARTED, function () {
            that.dontShowPlayback = true;
        });

        this.stormPlayer.addEventListener(EventType.SEEK_ENDED, function () {
            that.dontShowPlayback = false;
        });

        this.stormPlayer .addEventListener(EventType.LIBRARY_CREATED, function () {

            that.stormPlayer.getLibrary().addEventListener("playerReady", function () {
                that.show();
            });

            that.stormPlayer.getLibrary().addEventListener("interactionRequired", function (e: any) {
                that.show();
            });

            that.stormPlayer.getLibrary().addEventListener("videoConnecting", function () {
                that.hide();
            });

            that.stormPlayer.getLibrary().addEventListener("videoPlay", function () {
                that.hide();
            });

            that.stormPlayer.getLibrary().addEventListener("videoPause", function () {
                that.show();
            });
        });
    }
}
