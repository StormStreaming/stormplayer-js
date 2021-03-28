import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {EventType} from "../events/EventType";

export class UnmuteElement extends GraphicElement {

    constructor(stormPlayer: StormPlayer) {

        super(stormPlayer, 'sp-unmute sp-unmute__afterheader');

    }

    protected draw() : void {
        super.draw();

        this.htmlElement.innerHTML = 'UNMUTE SOUND';

        if(!this.stormPlayer.getGuiConfig().title && this.stormPlayer.getGuiConfig().title == "" && this.stormPlayer.getGuiConfig().subtitle && this.stormPlayer.getGuiConfig().subtitle == "")
            this.getHtmlElement().classList.remove('sp-unmute__afterheader');

        this.hide();
    }

    protected attachListeners(): void {
        let that = this;

        this.stormPlayer.addListener(EventType.GUI_SHOW, function(){
            if(that.stormPlayer.getGuiConfig().title || that.stormPlayer.getGuiConfig().subtitle)
                that.getHtmlElement().classList.add('sp-unmute__afterheader');
        });

        this.stormPlayer.addListener(EventType.GUI_HIDE, function(){
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
            if((that.stormPlayer.getGuiConfig().title && that.stormPlayer.getGuiConfig().title != "") || (that.stormPlayer.getGuiConfig().subtitle && that.stormPlayer.getGuiConfig().subtitle != ""))
                that.getHtmlElement().classList.add('sp-unmute__afterheader');
            else
                that.getHtmlElement().classList.remove('sp-unmute__afterheader');
        });

        this.stormPlayer.addListener(EventType.SUBTITLE_SETTED,function(){
            if((that.stormPlayer.getGuiConfig().title && that.stormPlayer.getGuiConfig().title != "") || (that.stormPlayer.getGuiConfig().subtitle && that.stormPlayer.getGuiConfig().subtitle != ""))
                that.getHtmlElement().classList.add('sp-unmute__afterheader');
            else
                that.getHtmlElement().classList.remove('sp-unmute__afterheader');
        });

    }
}