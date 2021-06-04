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

        this.htmlElement.innerHTML = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="92px" height="92px" viewBox="0 0 72 72" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>play_arrow_black_24dp</title>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="PLAYER-MOBILE-@-pause" transform="translate(-144.000000, -284.000000)">
            <g id="play_arrow_black_24dp" transform="translate(144.000000, 284.000000)">
                <polygon id="Path" points="0 0 72 0 72 72 0 72"></polygon>
                <polygon id="Path" fill="#FFFFFF" fill-rule="nonzero" points="24 15 24 57 57 36"></polygon>
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