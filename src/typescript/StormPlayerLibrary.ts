import {StormPlayerGUI} from "./StormPlayerGUI";

export class StormPlayerLibrary
{

    private stormPlayerGUI : StormPlayerGUI;

    private videoHtmlElement: HTMLVideoElement;

    constructor(stormPlayerGUI : StormPlayerGUI) {
        this.stormPlayerGUI = stormPlayerGUI;
    }

    public setVideoHtmlElement(videoHtmlElement: HTMLVideoElement) : void{
        this.videoHtmlElement = videoHtmlElement;
    }

    public isPlaying() : boolean{
        return !!(this.videoHtmlElement.currentTime > 0 && !this.videoHtmlElement.paused && !this.videoHtmlElement.ended && this.videoHtmlElement.readyState > 2);
    }

}