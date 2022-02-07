import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {EventType} from "../events/EventType";

/**
 * Loader element
 */
export class LoaderElement extends GraphicElement {

    /**
     * Constructor
     * @param stormPlayer reference to the main player class
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-loader");
    }

    /**
     * Draw graphics for the element
     * @protected
     */
    protected override draw(): void {
        super.draw();

        this.htmlElement.innerHTML = `
            <svg width="38" height="38" viewBox="0 0 38 38" stroke="#fff">
                <g fill="none" fill-rule="evenodd">
                    <g transform="translate(1 1)" stroke-width="2">
                    <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
                    <path d="M36 18c0-9.94-8.06-18-18-18">
                        <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite" />
                    </path>
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
        let that = this;

        this.stormPlayer.addEventListener(EventType.LIBRARY_CREATED, function () {

            that.stormPlayer.getLibrary().addEventListener("playerStart", function () {
                that.show();
            });

            that.stormPlayer.getLibrary().addEventListener("videoConnecting", function () {
                that.show();
            });

            that.stormPlayer.getLibrary().addEventListener("videoBufforing", function () {
                that.show();
            });

            that.stormPlayer.getLibrary().addEventListener("videoPlay", function () {
                that.hide();
            });

            that.stormPlayer.getLibrary().addEventListener("videoPause", function () {
                that.hide();
            });

            that.stormPlayer.getLibrary().addEventListener("videoNotFound", function () {
                that.hide();
            });

            that.stormPlayer.getLibrary().addEventListener("videoError", function () {
                that.hide();
            });

            that.stormPlayer.getLibrary().addEventListener("onAllServersFailed", function () {
                that.hide();
            });

            that.stormPlayer.addEventListener(EventType.ERROR_SHOWN, function () {
                that.hide();
            });
        });
    }
}
