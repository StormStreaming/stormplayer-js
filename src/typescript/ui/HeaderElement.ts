import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {UserCapabilities} from "@app/typescript/utilities/UserCapabilities";

/**
 * Header (top) element of the player
 */
export class HeaderElement extends GraphicElement {

    /**
     * Shadow element
     * @private
     */
    private shadowElement: GraphicElement;

    /**
     * Wrapper element
     * @private
     */
    private wrapperElement: GraphicElement;

    /**
     * Live Icon element
     * @private
     */
    private liveIconElement: GraphicElement;

    /**
     * Constructor
     * @param stormPlayer reference to the main player class
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-header");
    }

    /**
     * Makes element visible
     */
    public override show(): void {
        this.htmlElement.classList.remove("sp-controls--hidden");
    }

    /**
     * Makes element invisible
     */
    public override hide(): void {
        this.htmlElement.classList.add("sp-controls--hidden");
    }

    /**
     * Draw graphics for the element
     * @protected
     */
    protected override draw(): void {

        super.draw();

        this.shadowElement = new GraphicElement(this.stormPlayer, "sp-header__shadow");
        this.htmlElement.appendChild(this.shadowElement.getHtmlElement());

        this.wrapperElement = new GraphicElement(this.stormPlayer, "sp-header__wrapper");
        this.htmlElement.appendChild(this.wrapperElement.getHtmlElement());

        this.wrapperElement.getHtmlElement().innerHTML = '<h2 class="sp-header__text sp-header__title"></h2><p class="sp-header__text sp-header__sub-title"></p>';

        this.liveIconElement = new GraphicElement(this.stormPlayer, "sp-live-icon");
        this.htmlElement.appendChild(this.liveIconElement.getHtmlElement());

        this.liveIconElement.getHtmlElement().innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="none" fill-rule="evenodd">
                    <g>
                        <g>
                            <path fill="#df0f33" fill-rule="nonzero"
                              d="M7.76 16.24C6.67 15.16 6 13.66 6 12c0-1.66.67-3.16 1.76-4.24l1.42 1.42C8.45 9.9 8 10.9 8 12c0 1.1.45 2.1 1.17 2.83l-1.41 1.41zm8.48 0C17.33 15.16 18 13.66 18 12c0-1.66-.67-3.16-1.76-4.24l-1.42 1.42C15.55 9.9 16 10.9 16 12c0 1.1-.45 2.1-1.17 2.83l1.41 1.41zM12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 2c0 2.21-.9 4.21-2.35 5.65l1.42 1.42C20.88 17.26 22 14.76 22 12c0-2.76-1.12-5.26-2.93-7.07l-1.42 1.42C19.1 7.79 20 9.79 20 12zM6.35 6.35L4.93 4.93C3.12 6.74 2 9.24 2 12c0 2.76 1.12 5.26 2.93 7.07l1.42-1.42C4.9 16.21 4 14.21 4 12c0-2.21.9-4.21 2.35-5.65z"
                              transform="translate(-1301 -243) translate(1301 243)" />
                        </g>
                    </g>
                </g>
            </svg>

            <span class="sp-live-icon__text" id="sp-live-icon-text">${this.stormPlayer.getPlayerConfig().getLiveText()}</span>`;
    }

    /**
     * Sets new title for the player
     * @param title text for title
     */
    public setTitle(title: string): void {
        this.wrapperElement.getHtmlElement().querySelector("h2").innerHTML = title;
        this.stormPlayer.dispatchEvent("titleAdded", {ref:this.stormPlayer, title:title});
    }

    /**
     * Sets new subtitle for the player
     * @param subtitle text for subtitle
     */
    public setSubtitle(subtitle: string): void {
        this.wrapperElement.getHtmlElement().querySelector("p").innerHTML = subtitle;
        this.stormPlayer.dispatchEvent("subtitleAdd", {ref:this.stormPlayer, subtitle:subtitle});
    }

    /**
     * Attaches listeners to the element
     * @protected
     */
    protected override attachListeners(): void {

        let that:HeaderElement = this;

        this.stormPlayer.addEventListener("guiShown", function () {
            that.show();
        });

        this.stormPlayer.addEventListener("guiHid", function () {
            that.hide();
        });

        this.stormPlayer.addEventListener("fullscreenEntered", function () {
            if(UserCapabilities.isMobile() && that.stormPlayer.getPlayerConfig().getIfNativeMobileGUI()){
                that.htmlElement.style.display = "none";
            }
        });

        this.stormPlayer.addEventListener("fullscreenExited", function () {
            if(UserCapabilities.isMobile() && that.stormPlayer.getPlayerConfig().getIfNativeMobileGUI()){
                that.htmlElement.style.display = "flex";
            }
        });

    }
}
