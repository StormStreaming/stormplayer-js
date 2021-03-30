import {GraphicElement} from "../GraphicElement";
import {StormPlayer} from "../../StormPlayer";
import {EventType} from "../../events/EventType";
import {QualityMenuElement} from "./QualityMenuElement";

export class QualityElement extends GraphicElement {

    private qualityMenuElement : QualityMenuElement;
    private qualityButtonElement : HTMLButtonElement;

    constructor(stormPlayer: StormPlayer) {

        super(stormPlayer, 'sp-resolution sp-hidden');

    }

    protected refreshButton() : void{

        if(this.stormPlayer.getLibrary().getAllSources().length == 1)
            this.hide();
        else
            this.show();

        /*
        wyswietlenie aktualnie granego labela
         */


    }

    protected draw() : void{
        super.draw();

        this.qualityButtonElement = document.createElement("button");
        this.qualityButtonElement.className = 'sp-controls__button';
        this.qualityButtonElement.innerHTML = '<span>HD</span>';

        this.htmlElement.append(this.qualityButtonElement);

        this.qualityMenuElement = new QualityMenuElement(this.stormPlayer);
        this.htmlElement.appendChild(this.qualityMenuElement.getHtmlElement());

    }

    protected attachListeners(): void {
        let that = this;
        this.qualityButtonElement.addEventListener("click", function(){
            that.stormPlayer.dispatch(EventType.QUALITY_CLICKED);
        });

        this.stormPlayer.addListener(EventType.LIBRARY_INITIALIZED, function() {

            that.refreshButton();

            that.stormPlayer.getLibrary().addEventListener("newStreamSourceAdded", function () {
                that.refreshButton();
            });

            that.stormPlayer.getLibrary().addEventListener("videoConnecting", function(){
                that.refreshButton();
            });

            that.stormPlayer.getLibrary().addEventListener("videoPlay", function(){
                that.refreshButton();
            });

        });

    }
}