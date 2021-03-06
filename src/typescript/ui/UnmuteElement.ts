import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {EventType} from "../events/EventType";

/**
 * Class representing unmute button. Due to browser's restrictions, no video object can autostart playback with audio "on".
 * This button appears on the left side of the player providing a fast way to disable mute.
 */
export class UnmuteElement extends GraphicElement {

    /**
     * Constructor
     * @param stormPlayer reference to the main player class
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-unmute sp-unmute__afterheader");
    }

    /**
     * Draws the element
     * @protected
     */
    protected override draw(): void {
        super.draw();
        this.htmlElement.innerHTML = `
            <svg width="23" height="18" class="sp-unmute-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="10px" y="10px" viewBox="0 -2 28 21" xml:space="preserve">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="PLAYER-@go-back" transform="translate(-255.000000, -966.000000)" fill="#000">
                        <g id="Group-4" transform="translate(255.000000, 966.000000)">
                            <polygon id="Fill-1" points="24.364 5 22.066 7.298 19.768 5 18 6.768 20.298 9.065 18 11.364 19.768 13.132 22.066 10.834 24.364 13.132 26.132 11.364 23.834 9.065 26.132 6.768"></polygon>
                            <g id="VOLUME-CONTROLLER" fill-rule="nonzero">
                                <path d="M12.3213457,17.8895415 C12.1613173,17.9640048 11.9898384,18 11.8194767,18 C11.5496906,18 11.2824181,17.9087756 11.0665335,17.7326465 L4.61568703,12.4735047 L1.17996477,12.4735047 C0.528400791,12.4740542 0,11.9539102 0,11.3128665 L0,6.68762428 C0,6.04630572 0.528400791,5.52643653 1.17996477,5.52643653 L4.61596631,5.52643653 L11.0668128,0.267294644 C11.4192661,-0.020117185 11.9080089,-0.0813914086 12.321625,0.110949204 C12.735241,0.301915954 13,0.711326686 13,1.16140372 L12.9997207,16.839087 C12.9997207,17.2894388 12.735241,17.6985748 12.3213457,17.8895415 Z" id="volume-icon"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
            ${this.stormPlayer.getGuiConfig().getUnmuteText()}`;

        if (
            !this.stormPlayer.getGuiConfig().getTitle() &&
            this.stormPlayer.getGuiConfig().getTitle() == "" &&
            this.stormPlayer.getGuiConfig().getSubtitle() &&
            this.stormPlayer.getGuiConfig().getSubtitle() == ""
        )
            this.getHtmlElement().classList.remove("sp-unmute__afterheader");

        this.hide();
    }

    /**
     * Attaches listeners to the element
     * @protected
     */
    protected override attachListeners(): void {
        let that:UnmuteElement = this;

        this.stormPlayer.addEventListener(EventType.GUI_SHOWN, function () {
            if (that.stormPlayer.getGuiConfig().getTitle() || that.stormPlayer.getGuiConfig().getSubtitle())
                that.getHtmlElement().classList.add("sp-unmute__afterheader");
            }
        );

        this.stormPlayer .addEventListener(EventType.GUI_HIDED, function () {
            that.getHtmlElement().classList.remove("sp-unmute__afterheader");
        });

        this.htmlElement.addEventListener("click", function () {
            that.stormPlayer.dispatch(EventType.UNMUTE_CLICKED);
        });

        this.stormPlayer.addEventListener(EventType.LIBRARY_INITIALIZED, function () {
            that.stormPlayer.getLibrary().addEventListener("volumeChange", function (event: any) {
                if (event.isMuted && event.type == "browser") {
                    that.show();
                } else
                    that.hide();
            });
        });

        this.stormPlayer.addEventListener(EventType.TITLE_SETTED, function () {
            if ((that.stormPlayer.getGuiConfig().getTitle() && that.stormPlayer.getGuiConfig().getTitle() != "") ||
                (that.stormPlayer.getGuiConfig().getSubtitle() && that.stormPlayer.getGuiConfig().getSubtitle() != ""))
                that.getHtmlElement().classList.add("sp-unmute__afterheader");
            else
                that.getHtmlElement().classList.remove("sp-unmute__afterheader");
        });

        this.stormPlayer .addEventListener(EventType.SUBTITLE_SETTED, function () {
            if ((that.stormPlayer.getGuiConfig().getTitle() && that.stormPlayer.getGuiConfig().getTitle() != "") ||
                (that.stormPlayer.getGuiConfig().getSubtitle() && that.stormPlayer.getGuiConfig().getSubtitle() != ""))
                that.getHtmlElement().classList.add("sp-unmute__afterheader");
            else
                that.getHtmlElement().classList.remove("sp-unmute__afterheader");
        });




    }
}
