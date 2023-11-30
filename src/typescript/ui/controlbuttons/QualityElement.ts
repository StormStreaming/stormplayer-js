import {GraphicElement} from "../GraphicElement";
import {StormPlayer} from "../../StormPlayer";
import {QualityMenuElement} from "./QualityMenuElement";
import {ISourceItem} from "@stormstreaming/stormlibrary";

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

        if (this.stormPlayer.getRawPlayerConfig().demoMode) {
            this.show();

            let label = "Quality";
            try {
                label = this.stormPlayer.getRawStreamConfig().stream.sourceList.at(0).streamInfo.label;
            } catch(e){
                // nobody's care
            }

            this.qualityButtonElement.innerHTML = '<span>'+label+'</span>';
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

            const library = this.stormPlayer.getLibrary();
            if (!library) {
                this.hide();
                return;
            }

            const sourceList = library.getSourceList();
            let firstSource: ISourceItem = null
            if (sourceList.length <= 1) {
                this.hide();
                return;
            } else {
                firstSource = sourceList.at(0);
            }

            const currentSourceItem = library.getCurrentSourceItem();
            const streamInfo = currentSourceItem?.getStreamInfo();
            const label = streamInfo?.getLabel() ?? firstSource.getStreamInfo().getLabel();

            this.qualityButtonElement.innerHTML = `<span>${label}</span>`;
            this.show();


        } catch(error:any) {
            console.log(error);
        }


    }


    /**
     * Draw graphics for the element
     * @protected
     */
    protected override draw(): void {
        super.draw();

        this.qualityButtonElement = document.createElement("button");
        this.qualityButtonElement.setAttribute("type","button");
        this.qualityButtonElement.className = "sp-controls__button";

        this.htmlElement.append(this.qualityButtonElement);

        this.qualityMenuElement = new QualityMenuElement(this.stormPlayer);
        this.htmlElement.appendChild(this.qualityMenuElement.getHtmlElement());

        this.refreshButton();
    }

    /**
     * Attaches listeners to the button
     * @protected
     */
    protected override attachListeners(): void {

        let that = this;

        this.qualityButtonElement.addEventListener("click", function () {
            that.stormPlayer.dispatchEvent("qualitySwitchClick", {ref:that.stormPlayer});
        });

        this.stormPlayer.addEventListener("streamConfigUpdated", function () {
            that.refreshButton();
        });

        this.stormPlayer.addEventListener("libraryInitialize", function () {

            that.stormPlayer.getLibrary().addEventListener("playerCoreReady", function(){
                that.refreshButton();
            });

            that.stormPlayer.getLibrary().addEventListener("newStreamSourceAdded", function () {
                that.refreshButton();
            });

            that.stormPlayer.getLibrary().addEventListener("playbackInitiate", function () {
                that.refreshButton();
            });

            that.stormPlayer.getLibrary().addEventListener("playbackStart", function () {
                that.refreshButton();
            });

        });

        this.stormPlayer.addEventListener("sourceChange", function(event){
            setTimeout(function(){
                that.refreshButton();
            },100)
        })

    }
}
