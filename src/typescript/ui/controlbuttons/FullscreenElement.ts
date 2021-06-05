import {GraphicElement} from "../GraphicElement";
import {StormPlayer} from "../../StormPlayer";
import {EventType} from "../../events/EventType";

export class FullscreenElement extends GraphicElement {

    constructor(stormPlayer: StormPlayer) {

        super(stormPlayer, 'sp-controls__fullscreen', 'button');

    }

    protected draw() : void{
        super.draw();

        this.htmlElement.innerHTML = `
                <svg class="fullscreen-icon" xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27">
                  <g fill="none" fill-rule="evenodd">
                    <g fill="#FFF" fill-rule="nonzero">
                      <path
                        d="M1.5 17c.828 0 1.5.672 1.5 1.5v5h5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5H1.5C.672 26.5 0 25.828 0 25v-6.5c0-.828.672-1.5 1.5-1.5zM25 17c.828 0 1.5.672 1.5 1.5V25c0 .828-.672 1.5-1.5 1.5h-6.5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5h5v-5c0-.828.672-1.5 1.5-1.5zM8 0c.828 0 1.5.672 1.5 1.5S8.828 3 8 3H3v5c0 .828-.672 1.5-1.5 1.5S0 8.828 0 8V1.5C0 .672.672 0 1.5 0zm17 0c.828 0 1.5.672 1.5 1.5V8c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5V3h-5c-.828 0-1.5-.672-1.5-1.5S17.672 0 18.5 0H25z"
                        transform="translate(-1358 -956) translate(1358 956)" />
                    </g>
                  </g>
                </svg>
                
                <svg class="close-fullscreen-icon" xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27">
                <path d="M17.321,25.471V18.849a1.528,1.528,0,0,1,1.528-1.528h6.622a1.528,1.528,0,1,1,0,3.056H20.377v5.094a1.528,1.528,0,1,1-3.056,0Zm-10.7,0V20.377H1.529a1.528,1.528,0,1,1,0-3.056H8.151A1.528,1.528,0,0,1,9.68,18.849v6.622a1.528,1.528,0,1,1-3.056,0ZM18.849,9.68a1.528,1.528,0,0,1-1.528-1.528V1.529a1.528,1.528,0,1,1,3.056,0V6.623h5.094a1.528,1.528,0,1,1,0,3.056Zm-17.32,0a1.528,1.528,0,1,1,0-3.056H6.623V1.529a1.528,1.528,0,1,1,3.056,0V8.151A1.528,1.528,0,0,1,8.151,9.68Z" fill="#fff"/>
                </svg>
        `;

    }

    protected attachListeners() : void {
        let that = this;

        this.htmlElement.addEventListener("click", function(e) {
            // @ts-ignore: Unreachable code error
            let enterFullscreen = document.webkitIsFullScreen === false || document.mozFullScreen === false || document.msFullscreenElement === false;

            if (enterFullscreen)
                that.stormPlayer.dispatch(EventType.FULLSCREEN_ENTERED);
            else
                that.stormPlayer.dispatch(EventType.FULLSCREEN_EXITED);
        });

        this.stormPlayer.addEventListener(EventType.FULLSCREEN_ENTERED, function(){
            that.htmlElement.classList.add('sp-active');
        });

        this.stormPlayer.addEventListener(EventType.FULLSCREEN_EXITED, function(){
            that.htmlElement.classList.remove('sp-active');
        });

    }
}
