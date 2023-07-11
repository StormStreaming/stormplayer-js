import {GraphicElement} from "../GraphicElement";
import {StormPlayer} from "../../StormPlayer";
import {EventType} from "../../events/EventType";
import {QualityMenuElement} from "./QualityMenuElement";

/**
 * Class represents quality switch button
 */
export class QualityElement extends GraphicElement {

    /**
     * List of the quality change
     * @private
     */
    private qualityMenuElement: QualityMenuElement;

    /**
     * Quality change button
     * @private
     */
    private qualityButtonElement: HTMLButtonElement;

    /**
     * Constructor
     * @param stormPlayer reference to the main player class
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-resolution sp-hidden");

        if (this.stormPlayer.getOrigGUIConfig().demoMode) {
            this.show();
            this.qualityButtonElement.innerHTML = `<span>Quality</span>`;
        }
    }

    /**
     * Refresh button state
     * @protected
     */
    protected refreshButton(): void {

        try {
            if (!this.qualityButtonElement)
                return;

            if (this.stormPlayer.getLibrary().getAllSources().length == 1)
                this.hide();
            else
                this.show();

            this.qualityButtonElement.innerHTML = `<span>${this.stormPlayer.getLibrary().getCurrentQuality()}</span>`;

        } catch(error:any) {
            //nothing
        }
    }


    /**
     * Draw graphics for the element
     * @protected
     */
    protected override draw(): void {
        super.draw();

        this.qualityButtonElement = document.createElement("button");
        this.qualityButtonElement.className = "sp-controls__button";

        this.htmlElement.append(this.qualityButtonElement);

        this.qualityMenuElement = new QualityMenuElement(this.stormPlayer);
        this.htmlElement.appendChild(this.qualityMenuElement.getHtmlElement());
    }

    /**
     * Attaches listeners to the button
     * @protected
     */
    protected override attachListeners(): void {

        let that = this;
        this.qualityButtonElement.addEventListener("click", function () {
            that.stormPlayer.dispatch(EventType.QUALITY_CLICKED);
        });

        this.stormPlayer.addEventListener(EventType.LIBRARY_INITIALIZED, function () {

            that.stormPlayer.getLibrary().addEventListener("libraryReady", function(){
                that.refreshButton();
            });

            that.stormPlayer.getLibrary().addEventListener("newStreamSourceAdded", function () {
                that.refreshButton();
            });

            that.stormPlayer.getLibrary().addEventListener("playbackInitiated", function () {
                that.refreshButton();
            });

            that.stormPlayer.getLibrary().addEventListener("playbackStarted", function () {
                that.refreshButton();
            });

        });

        this.stormPlayer.addEventListener(EventType.QUALITY_CHANGED, function(event:any){
            setTimeout(function(){
                that.refreshButton();
            },100)
        })


    }
}
