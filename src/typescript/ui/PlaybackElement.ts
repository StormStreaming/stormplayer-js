import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {EventType} from "../events/EventType";

export class PlaybackElement extends GraphicElement {

    private dontShowPlayback : boolean = false;

    constructor(stormPlayer: StormPlayer) {

        super(stormPlayer, 'sp-playback');

        if(this.stormPlayer.getGuiConfig().isBigPlaybackButton() === false)
            this.hide();

    }

    public show(): void {
        if(this.stormPlayer.getGuiConfig().isBigPlaybackButton() === false || this.dontShowPlayback)
            return;
        super.show();
    }

    protected draw() : void{
        super.draw();

        /*this.htmlElement.innerHTML = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="102px" height="102px" viewBox="0 0 72 72" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>play_arrow_black_24dp</title>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="PLAYER-MOBILE-@-pause" transform="translate(-144.000000, -284.000000)">
            <g id="play_arrow_black_24dp" transform="translate(144.000000, 284.000000)">
                <polygon id="Path" points="0 0 72 0 72 72 0 72"></polygon>
                <polygon id="Path" fill="#FFFFFF" fill-rule="nonzero" points="24 15 24 57 57 36"></polygon>
            </g>
        </g>
    </g>
</svg>`;*/

        this.htmlElement.innerHTML = `<?xml version="1.0" encoding="UTF-8"?>
<svg class="sp-play-icon" width="57px" height="74px" viewBox="0 2 21 26">
                    <g fill="none" fill-rule="evenodd">
                      <g fill="#fff">
                        <g>
                          <path
                            d="M13.51 7.681l9.252 13.57c.945 1.386.587 3.276-.799 4.221-.504.344-1.1.528-1.711.528H1.748C.07 26-1.29 24.64-1.29 22.962c0-.61.184-1.207.528-1.711L8.49 7.68c.945-1.386 2.835-1.743 4.221-.798.314.214.585.485.8.798z"
                            transform="translate(-221 -954) translate(221 954) rotate(90 11 15)" />
                        </g>
                      </g>
                    </g>    
                  </svg>`;

        this.hide();

    }

    protected attachListeners() : void{
        let that = this;
        this.htmlElement.addEventListener('click', function() {
            that.stormPlayer.dispatch(EventType.PLAY_CLICKED);
        });

        this.stormPlayer.addListener(EventType.SEEK_STARTED, function(){
            that.dontShowPlayback = true;
        });

        this.stormPlayer.addListener(EventType.SEEK_ENDED, function(){
            that.dontShowPlayback = false;
        });

        this.stormPlayer.addListener(EventType.LIBRARY_CREATED, function() {

            that.stormPlayer.getLibrary().addEventListener("playerReady", function () {
                that.show();
            });

            that.stormPlayer.getLibrary().addEventListener("interactionRequired", function (e) {
                that.show();
            });

            that.stormPlayer.getLibrary().addEventListener("videoConnecting", function(){
                that.hide();
            });

            that.stormPlayer.getLibrary().addEventListener("videoPlay", function () {
                that.hide();
            });

            that.stormPlayer.getLibrary().addEventListener("videoPause", function () {
                that.show();
            });

        });
    }


}