import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {EventType} from "../events/EventType";

export class VideoElement extends GraphicElement {


    constructor(stormPlayer: StormPlayer) {

        super(stormPlayer, 'sp-container__box');

    }

    protected draw() : void{
        super.draw();

        this.htmlElement.setAttribute("id", this.stormPlayer.getInstanceID());

    }

    protected attachListeners(): void {
        let that = this;
/*
        this.stormPlayerGUI.addListener(EventType.PLAY_CLICKED, function(){
            that.videoHtmlElement.play();
        });

        this.stormPlayerGUI.addListener(EventType.PAUSE_CLICKED, function(){
            that.videoHtmlElement.pause();
        });

        this.videoHtmlElement.addEventListener('pause', function() {
            that.stormPlayerGUI.dispatch(EventType.VIDEO_PAUSED);
        });

        this.videoHtmlElement.addEventListener('play', function() {
            that.stormPlayerGUI.dispatch(EventType.VIDEO_PLAYING);
        });
*/
        this.htmlElement.addEventListener("click", function(){
            if(that.stormPlayer.getLibraryManager().getLibrary().isPlaying())
                that.stormPlayer.dispatch(EventType.PAUSE_CLICKED);
            else
                that.stormPlayer.dispatch(EventType.PLAY_CLICKED);
        });
    }
}