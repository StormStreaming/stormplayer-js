import { GraphicElement } from "../GraphicElement";
import { StormPlayer } from "../../StormPlayer";
import {ISourceItem} from "@stormstreaming/stormlibrary";
import {QualityMenuItem} from "@app/typescript/ui/controlbuttons/QualityMenuItem";

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


    }

    /**
     * Updates the list
     */
    public refreshList(): void {

        if (!this.spMenuBoxElement)
           return;

        this.spMenuBoxElement.getHtmlElement().querySelector("ul").innerHTML = "";

        const list:ISourceItem[] = this.stormPlayer.getLibrary().getSourceList();

        for (let i = 0; i < list.length; i++) {
            const element = new QualityMenuItem(this.stormPlayer, list[i]);
            this.spMenuBoxElement.getHtmlElement().querySelector("ul").appendChild(element.getHTMLElement());
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

        this.stormPlayer.addEventListener("streamConfigUpdate", () => {
            this.refreshList();
        });

        this.stormPlayer.addEventListener("libraryInitialize", () => {

            if(this.stormPlayer.getLibrary().isInitialized())
                this.refreshList();

            this.stormPlayer.getLibrary().addEventListener("playerCoreReady", () => {
                this.refreshList();
            });

            this.stormPlayer.getLibrary().addEventListener("streamSourceAdd", () => {
                this.refreshList();
            });

            this.stormPlayer.getLibrary().addEventListener("playbackInitiate", () => {
                this.setCurrentItem();
            });

            this.stormPlayer.getLibrary().addEventListener("playbackStart", () => {
                this.setCurrentItem();
            });

        });

        this.stormPlayer.addEventListener("qualitySwitchClick", () => {
            this.getHtmlElement().classList.toggle("sp-menu--hidden");
        });

        this.stormPlayer.addEventListener("sourceChange", () => {
            setTimeout(() => {
                this.refreshList();
            },100)
        });

        this.stormPlayer.addEventListener("guiHide", () => {
            this.getHtmlElement().classList.add("sp-menu--hidden");
        });

        document.addEventListener("click", (event) => {
            if (!(event.target as HTMLElement).classList.contains("sp-controls__button"))
                this.getHtmlElement().classList.add("sp-menu--hidden");
        });
    }
}
