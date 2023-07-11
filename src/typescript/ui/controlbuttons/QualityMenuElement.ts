import { GraphicElement } from "../GraphicElement";
import { StormPlayer } from "../../StormPlayer";
import { EventType } from "../../events/EventType";

/**
 * Class represents quality menu (the list) for quality switch button
 */
export class QualityMenuElement extends GraphicElement {

    /**
     * Main element
     * @private
     */
    private spMenuBoxElement: GraphicElement;

    /**
     * List of items (qualities to choose)
     * @private
     */
    private listItems: Array<HTMLElement> = [];

    /**
     * Constructor
     * @param stormPlayer reference to the main player class
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-menu sp-menu__quality sp-menu--hidden");
    }

    /**
     * Sets select item as current
     */
    public setCurrentItem(): void {

        try {
            let currentLabel = this.stormPlayer.getLibrary().getCurrentQuality();

            for (let i = 0; i < this.listItems.length; i++) {
                if (this.listItems[i].getAttribute("data-label") == currentLabel)
                    this.listItems[i].classList.add("sp-menu__list-item__active");
                else
                    this.listItems[i].classList.remove("sp-menu__list-item__active");
            }
        } catch(error:any){
            //
        }
    }

    /**
     * Updates the list
     */
    public refreshList(): void {

        if (!this.spMenuBoxElement)
           return;

        this.spMenuBoxElement.getHtmlElement().querySelector("ul").innerHTML = "";
        this.listItems = [];

        let that = this;
        let list = this.stormPlayer.getLibrary().getAllSources();

        for (let i = 0; i < list.length; i++) {

            let menuPosition = document.createElement("li");
            menuPosition.setAttribute("data-label", list[i].streamInfo.label);
            menuPosition.classList.add("sp-menu__list-item");
            menuPosition.innerHTML = `
                <span>${list[i].streamInfo.label}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <g fill="none" fill-rule="evenodd">
                            <g>
                                <g>
                                    <g>
                                        <path d="M0 0L24 0 24 24 0 24z" transform="translate(-400 -664) translate(234 554) translate(166 110)"></path>
                                        <path fill="#FFF" fill-rule="nonzero" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" transform="translate(-400 -664) translate(234 554) translate(166 110)"></path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>`;

            this.listItems.push(menuPosition);
            this.spMenuBoxElement.getHtmlElement().querySelector("ul").appendChild(menuPosition);

            menuPosition.addEventListener("click", function () {
                that.stormPlayer.dispatch(EventType.QUALITY_CHANGED, {
                    label: this.getAttribute("data-label"),
                });
                that.getHtmlElement().classList.add("sp-menu--hidden");
            });
        }

        this.setCurrentItem();
    }

    /**
     * Draw graphics for the element
     * @protected
     */
    protected override draw(): void {
        super.draw();

        this.spMenuBoxElement = new GraphicElement(this.stormPlayer, "sp-menu__box");
        this.htmlElement.appendChild(this.spMenuBoxElement.getHtmlElement());
        this.spMenuBoxElement.getHtmlElement().innerHTML = `<ul class="sp-menu__list"></ul>`;
    }

    /**
     * Attaches listeners to the button
     * @protected
     */
    protected override attachListeners(): void {

        let that = this;

        this.stormPlayer.addEventListener(EventType.LIBRARY_INITIALIZED, function () {

            if(that.stormPlayer.getLibrary().isInitialized()){
                that.refreshList();
            }

            that.stormPlayer.getLibrary().addEventListener("libraryReady", function(){
                that.refreshList();
            });

            that.stormPlayer.getLibrary().addEventListener("newStreamSourceAdded", function () {
                that.refreshList();
            });

            that.stormPlayer.getLibrary().addEventListener("playbackInitiated", function () {
                that.setCurrentItem();
            });

            that.stormPlayer.getLibrary().addEventListener("playbackStarted", function () {
                that.setCurrentItem();
            });

        });

        this.stormPlayer.addEventListener(EventType.QUALITY_CLICKED, function () {
            that.getHtmlElement().classList.toggle("sp-menu--hidden");
        });

        this.stormPlayer.addEventListener(EventType.QUALITY_CHANGED, function () {
            setTimeout(function(){
                that.refreshList();
            },100)
        });

        this.stormPlayer.addEventListener(EventType.GUI_HIDED, function () {
            that.getHtmlElement().classList.add("sp-menu--hidden");
        });

        document.addEventListener("click", function (e) {
            if (!(e.target as HTMLElement).classList.contains("sp-controls__button")) {
                that.getHtmlElement().classList.add("sp-menu--hidden");
            }

        });
    }
}
