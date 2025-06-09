import {ISourceItem, QualityItem} from "@stormstreaming/stormlibrary";
import {StormPlayer} from "@app/typescript/StormPlayer";

export class QualityMenuItem {

    private source: QualityItem;

    private html:HTMLElement;

    private stormPlayer:StormPlayer

    constructor(stormPlayer:StormPlayer, source: QualityItem) {

        this.stormPlayer = stormPlayer;
        this.source = source;

        this.draw();
        this.attachEventListener();

    }

    public draw(){

        this.html = document.createElement("li");
        this.html.setAttribute("data-label", this.source.label);
        this.html.classList.add("sp-menu__list-item");
        this.html.innerHTML = `<span>${this.source.label}</span>`;

        this.checkIfSelected();

    }

    private checkIfSelected():void {
        if(this.source.isSelected){
            this.html.classList.add("sp-menu__list-item__active");
        } else {
            this.html.classList.remove("sp-menu__list-item__active");
        }
    }

    public getHTMLElement():HTMLElement {
        return this.html;
    }

    public attachEventListener():void {

        this.html.addEventListener("click", () => {
            this.stormPlayer.dispatchEvent("qualityChange", {
                ref: this.stormPlayer,
                qualityId:this.source.id
            });
        });

        this.stormPlayer.addEventListener("qualityChange", ()=>{
            this.checkIfSelected();
        })

    }

}