import {GraphicElement} from "./GraphicElement";
import {StormPlayerGUI} from "../StormPlayerGUI";
import {EventType} from "../events/EventType";

export class VideoElement extends GraphicElement {

    private videoHtmlElement: HTMLVideoElement;

    constructor(stormPlayerGUI: StormPlayerGUI) {

        super(stormPlayerGUI, 'sp-container__box');

    }

    protected draw() : void{
        super.draw();

        this.videoHtmlElement = document.createElement("video");
        this.videoHtmlElement.className = "sp-video";
        this.videoHtmlElement.controls = false;

        const source = document.createElement("source");
        source.setAttribute('src', "sample/cinematic-1080.mp4");
        this.videoHtmlElement.appendChild(source);

        this.htmlElement.appendChild(this.videoHtmlElement);

        this.stormPlayerGUI.getStormPlayerLibrary().setVideoHtmlElement(this.videoHtmlElement);

    }

    protected attachListeners(): void {
        let that = this;

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

    }
}