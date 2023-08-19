import { GraphicElement } from "../GraphicElement";
import { StormPlayer } from "../../StormPlayer";

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
            menuPosition.innerHTML = `<span>${list[i].streamInfo.label}</span>`;

            this.listItems.push(menuPosition);
            this.spMenuBoxElement.getHtmlElement().querySelector("ul").appendChild(menuPosition);

            menuPosition.addEventListener("click", function () {
                that.stormPlayer.dispatchEvent("qualityChanged", {
                    ref: that.stormPlayer,
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

        this.stormPlayer.addEventListener("streamConfigUpdated", () => {
            this.refreshList();
        });

        this.stormPlayer.addEventListener("libraryInitialized", () => {

            if(this.stormPlayer.getLibrary().isInitialized())
                this.refreshList();

            this.stormPlayer.getLibrary().addEventListener("libraryReady", () => {
                this.refreshList();
            });

            this.stormPlayer.getLibrary().addEventListener("newStreamSourceAdded", () => {
                this.refreshList();
            });

            this.stormPlayer.getLibrary().addEventListener("playbackInitiated", () => {
                this.setCurrentItem();
            });

            this.stormPlayer.getLibrary().addEventListener("playbackStarted", () => {
                this.setCurrentItem();
            });

        });

        this.stormPlayer.addEventListener("qualitySwitchClicked", () => {
            this.getHtmlElement().classList.toggle("sp-menu--hidden");
        });

        this.stormPlayer.addEventListener("qualityChanged", () => {
            setTimeout(() => {
                this.refreshList();
            },100)
        });

        this.stormPlayer.addEventListener("guiHid", () => {
            this.getHtmlElement().classList.add("sp-menu--hidden");
        });

        document.addEventListener("click", (event) => {
            if (!(event.target as HTMLElement).classList.contains("sp-controls__button"))
                this.getHtmlElement().classList.add("sp-menu--hidden");
        });
    }
}
