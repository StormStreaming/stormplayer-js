import {GraphicElement} from "./GraphicElement";
import {StormPlayerGUI} from "../StormPlayerGUI";

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

    }
}