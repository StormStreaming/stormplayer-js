import {ISourceItem} from "@stormstreaming/stormlibrary";
import {StormPlayer} from "@app/typescript/StormPlayer";

export class QualityMenuItem {

    private source:ISourceItem;

    private html:HTMLElement;

    private stormPlayer:StormPlayer

    constructor(stormPlayer:StormPlayer, source:ISourceItem) {

        this.stormPlayer = stormPlayer;
        this.source = source;

        this.draw();
        this.attachEventListener();

    }

    public draw(){

        this.html = document.createElement("li");
        this.html.setAttribute("data-label", this.source.getStreamInfo().getLabel());
        this.html.classList.add("sp-menu__list-item");
        this.html.innerHTML = `<span>${this.source.getStreamInfo().getLabel()}</span>`;

        this.checkIfSelected();

    }

    private checkIfSelected():void {

        if(this.stormPlayer.getLibrary() != null){
            const currentSource = this.stormPlayer.getLibrary().getCurrentSourceItem();
            if(currentSource != null){
                if(currentSource == this.source){
                    this.html.classList.add("sp-menu__list-item__active");
                } else {
                    this.html.classList.remove("sp-menu__list-item__active");
                }
            }
        }


    }

    public getHTMLElement():HTMLElement {
        return this.html;
    }

    public attachEventListener():void {

        this.html.addEventListener("click", () => {
            this.stormPlayer.dispatchEvent("sourceChange", {
                ref: this.stormPlayer,
                newSource:this.source
            });
        });

        this.stormPlayer.addEventListener("sourceChange", ()=>{
            this.checkIfSelected();
        })

    }

}