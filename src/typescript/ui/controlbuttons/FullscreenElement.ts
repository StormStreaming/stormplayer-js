import {GraphicElement} from "../GraphicElement";
import {StormPlayer} from "../../StormPlayer";
import {EventType} from "../../events/EventType";

export class FullscreenElement extends GraphicElement {

    constructor(stormPlayer: StormPlayer) {

        super(stormPlayer, 'sp-controls__fullscreen', 'button');

    }

    protected draw() : void{
        super.draw();

        this.htmlElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27">
                  <g fill="none" fill-rule="evenodd">
                    <g fill="#FFF" fill-rule="nonzero">
                      <path
                        d="M1.5 17c.828 0 1.5.672 1.5 1.5v5h5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5H1.5C.672 26.5 0 25.828 0 25v-6.5c0-.828.672-1.5 1.5-1.5zM25 17c.828 0 1.5.672 1.5 1.5V25c0 .828-.672 1.5-1.5 1.5h-6.5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5h5v-5c0-.828.672-1.5 1.5-1.5zM8 0c.828 0 1.5.672 1.5 1.5S8.828 3 8 3H3v5c0 .828-.672 1.5-1.5 1.5S0 8.828 0 8V1.5C0 .672.672 0 1.5 0zm17 0c.828 0 1.5.672 1.5 1.5V8c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5V3h-5c-.828 0-1.5-.672-1.5-1.5S17.672 0 18.5 0H25z"
                        transform="translate(-1358 -956) translate(1358 956)" />
                    </g>
                  </g>
                </svg>`;

        this.htmlElement.setAttribute('data-title', "Fullscreen");
    }

    protected attachListeners() : void {
        let that = this;

        this.htmlElement.addEventListener("click", function(e) {
            // @ts-ignore: Unreachable code error
            let enterFullscreen = document.webkitIsFullScreen === false || document.mozFullScreen === false || document.msFullscreenElement === false;

            if (enterFullscreen)
                that.stormPlayer.dispatch(EventType.FULLSCREEN_ENTER);
            else
                that.stormPlayer.dispatch(EventType.FULLSCREEN_EXIT);
        });

        this.stormPlayer.addListener(EventType.FULLSCREEN_ENTER, function(){
            that.htmlElement.classList.add('sp-active');
        });

        this.stormPlayer.addListener(EventType.FULLSCREEN_EXIT, function(){
            that.htmlElement.classList.remove('sp-active');
        });

    }
}