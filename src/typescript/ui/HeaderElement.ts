import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {EventType} from "../events/EventType";

export class HeaderElement extends GraphicElement {

    private shadowElement: GraphicElement;
    private wrapperElement: GraphicElement;
    private liveIconElement: GraphicElement;

    constructor(stormPlayer: StormPlayer) {

        super(stormPlayer, 'sp-header');

    }

    public show(): void {
        this.htmlElement.classList.remove("sp-controls--hidden");
    }

    public hide(): void {
        this.htmlElement.classList.add("sp-controls--hidden");
    }

    protected draw() : void{
        super.draw();

        this.shadowElement = new GraphicElement(this.stormPlayer, "sp-header__shadow");
        this.htmlElement.appendChild(this.shadowElement.getHtmlElement());

        this.wrapperElement = new GraphicElement(this.stormPlayer, "sp-header__wrapper");
        this.htmlElement.appendChild(this.wrapperElement.getHtmlElement());

        this.wrapperElement.getHtmlElement().innerHTML = '<h2 class="sp-header__text sp-header__title"></h2><p class="sp-header__text sp-header__sub-title"></p>';

        this.liveIconElement = new GraphicElement(this.stormPlayer, "sp-live-icon");
        this.htmlElement.appendChild(this.liveIconElement.getHtmlElement());

        this.liveIconElement.getHtmlElement().innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g fill="none" fill-rule="evenodd">
                <g>
                  <g>
                    <path d="M0 0H24V24H0z" transform="translate(-1301 -243) translate(1301 243)" />
                    <path fill="#df0f33" fill-rule="nonzero"
                      d="M7.76 16.24C6.67 15.16 6 13.66 6 12c0-1.66.67-3.16 1.76-4.24l1.42 1.42C8.45 9.9 8 10.9 8 12c0 1.1.45 2.1 1.17 2.83l-1.41 1.41zm8.48 0C17.33 15.16 18 13.66 18 12c0-1.66-.67-3.16-1.76-4.24l-1.42 1.42C15.55 9.9 16 10.9 16 12c0 1.1-.45 2.1-1.17 2.83l1.41 1.41zM12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 2c0 2.21-.9 4.21-2.35 5.65l1.42 1.42C20.88 17.26 22 14.76 22 12c0-2.76-1.12-5.26-2.93-7.07l-1.42 1.42C19.1 7.79 20 9.79 20 12zM6.35 6.35L4.93 4.93C3.12 6.74 2 9.24 2 12c0 2.76 1.12 5.26 2.93 7.07l1.42-1.42C4.9 16.21 4 14.21 4 12c0-2.21.9-4.21 2.35-5.65z"
                      transform="translate(-1301 -243) translate(1301 243)" />
                  </g>
                </g>
              </g>
            </svg>

            <span class="sp-live-icon__text" id="sp-live-icon-text">LIVE</span>`;
    }

    public setTitle(title : string): void{
        this.wrapperElement.getHtmlElement().querySelector("h2").innerHTML = title;
    }

    public setSubtitle(subtitle : string): void{
        this.wrapperElement.getHtmlElement().querySelector("p").innerHTML = subtitle;
    }

    protected attachListeners(): void {
        let that = this;
        this.stormPlayer.addListener(EventType.GUI_SHOW, function(){
            that.show();
        });

        this.stormPlayer.addListener(EventType.GUI_HIDE, function(){
            that.hide();
        });
    }

}