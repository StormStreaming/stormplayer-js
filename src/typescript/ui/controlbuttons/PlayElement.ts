import {GraphicElement} from "../GraphicElement";
import {StormPlayer} from "../../StormPlayer";
import {EventType} from "../../events/EventType";

export class PlayElement extends GraphicElement {

    private playButtonElement : HTMLButtonElement;

    constructor(stormPlayer: StormPlayer) {

        super(stormPlayer, 'sp-play');

    }

    protected draw() : void{
        super.draw();

        this.playButtonElement = document.createElement("button");
        this.playButtonElement.className = 'sp-play__button';
        this.playButtonElement.innerHTML = `<svg class="sp-play-icon" width="22" height="30" viewBox="0 0 22 30">
                    <g fill="none" fill-rule="evenodd">
                      <g fill="#FFF">
                        <g>
                          <path
                            d="M13.51 7.681l9.252 13.57c.945 1.386.587 3.276-.799 4.221-.504.344-1.1.528-1.711.528H1.748C.07 26-1.29 24.64-1.29 22.962c0-.61.184-1.207.528-1.711L8.49 7.68c.945-1.386 2.835-1.743 4.221-.798.314.214.585.485.8.798z"
                            transform="translate(-221 -954) translate(221 954) rotate(90 11 15)" />
                        </g>
                      </g>
                    </g>
                  </svg>
                  <svg class="sp-pause-icon sp-hidden" viewBox="0 0 24 24">
                    <path d="M14.016 5.016h3.984v13.969h-3.984v-13.969zM6 18.984v-13.969h3.984v13.969h-3.984z"></path>
                  </svg>`;
        this.playButtonElement.setAttribute('data-title', "Play");
        this.htmlElement.append(this.playButtonElement);

    }

    protected attachListeners() : void {
        let that = this;
        let playIcon = this.playButtonElement.querySelector(".sp-play-icon");
        let pauseIcon = this.playButtonElement.querySelector(".sp-pause-icon");

        this.stormPlayer.addListener(EventType.LIBRARY_CREATED, function() {
            that.stormPlayer.getLibraryManager().getLibrary().addEventListener("videoPlay", function () {
                that.playButtonElement.setAttribute('data-title', 'Pause');
                playIcon.classList.add("sp-hidden");
                pauseIcon.classList.remove("sp-hidden");
            });

            that.stormPlayer.getLibraryManager().getLibrary().addEventListener("videoConnecting", function () {
                that.playButtonElement.setAttribute('data-title', 'Pause');
                playIcon.classList.add("sp-hidden");
                pauseIcon.classList.remove("sp-hidden");
            });

            that.stormPlayer.getLibraryManager().getLibrary().addEventListener("videoPause", function () {
                that.playButtonElement.setAttribute('data-title', 'Play');
                playIcon.classList.remove("sp-hidden");
                pauseIcon.classList.add("sp-hidden");
            });
        });

        this.playButtonElement.addEventListener("click", function(e){
            if(!playIcon.classList.contains('sp-hidden'))
                that.stormPlayer.dispatch(EventType.PLAY_CLICKED);
            else
                that.stormPlayer.dispatch(EventType.PAUSE_CLICKED);
        });

    }
}