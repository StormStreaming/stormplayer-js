import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {EventType} from "../events/EventType";

export class UnmuteElement extends GraphicElement {

    constructor(stormPlayer: StormPlayer) {

        super(stormPlayer, 'sp-unmute sp-unmute__afterheader');

    }

    protected draw() : void {
        super.draw();

        this.htmlElement.innerHTML = this.stormPlayer.getGuiConfig().getUnmuteText();

        if(!this.stormPlayer.getGuiConfig().getTitle() && this.stormPlayer.getGuiConfig().getTitle() == "" && this.stormPlayer.getGuiConfig().getSubtitle() && this.stormPlayer.getGuiConfig().getSubtitle() == "")
            this.getHtmlElement().classList.remove('sp-unmute__afterheader');

        this.hide();
    }

    protected attachListeners(): void {
        let that = this;

        this.stormPlayer.addListener(EventType.GUI_SHOWN, function(){
            if(that.stormPlayer.getGuiConfig().getTitle() || that.stormPlayer.getGuiConfig().getSubtitle())
                that.getHtmlElement().classList.add('sp-unmute__afterheader');
        });

        this.stormPlayer.addListener(EventType.GUI_HIDED, function(){
            that.getHtmlElement().classList.remove('sp-unmute__afterheader');
        });

        this.htmlElement.addEventListener("click", function(){
            that.stormPlayer.dispatch(EventType.UNMUTE_CLICKED);
        });

        this.stormPlayer.addListener(EventType.LIBRARY_INITIALIZED, function() {
            that.stormPlayer.getLibrary().addEventListener("volumeChange", function(event){
                if(event.isMuted && event.type == 'browser')
                    that.show();
                else
                    that.hide();

            });
        });

        this.stormPlayer.addListener(EventType.TITLE_SETTED,function(){
            if((that.stormPlayer.getGuiConfig().getTitle() && that.stormPlayer.getGuiConfig().getTitle() != "") || (that.stormPlayer.getGuiConfig().getSubtitle() && that.stormPlayer.getGuiConfig().getSubtitle() != ""))
                that.getHtmlElement().classList.add('sp-unmute__afterheader');
            else
                that.getHtmlElement().classList.remove('sp-unmute__afterheader');
        });

        this.stormPlayer.addListener(EventType.SUBTITLE_SETTED,function(){
            if((that.stormPlayer.getGuiConfig().getTitle() && that.stormPlayer.getGuiConfig().getTitle() != "") || (that.stormPlayer.getGuiConfig().getSubtitle() && that.stormPlayer.getGuiConfig().getSubtitle() != ""))
                that.getHtmlElement().classList.add('sp-unmute__afterheader');
            else
                that.getHtmlElement().classList.remove('sp-unmute__afterheader');
        });

    }
}