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

        this.htmlElement.innerHTML = `<svg xmlns:xlink="http://www.w3.org/1999/xlink" width="190" height="190" viewBox="0 0 190 190">
            <defs>
              <linearGradient id="gy6773nscc" x1="4.09%" x2="102%" y1="4.05%" y2="101%">
                <stop offset="0%" stop-color="#FFAA5A" />
                <stop offset="100%" stop-color="#FF785A" />
              </linearGradient>
              <filter id="3t7cb37sya" width="132.5%" height="132.5%" x="-16.2%" y="-11.9%"
                filterUnits="objectBoundingBox">
                <feOffset dy="7" in="SourceAlpha" result="shadowOffsetOuter1" />
                <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="7.5" />
                <feColorMatrix in="shadowBlurOuter1"
                  values="0 0 0 0 1 0 0 0 0 0.568627451 0 0 0 0 0.352941176 0 0 0 0.283740942 0" />
              </filter>
              <path id="3947u920jb"
                d="M96 16c-44.16 0-80 35.84-80 80s35.84 80 80 80 80-35.84 80-80-35.84-80-80-80zM76 132V60l56 36-56 36z" />
            </defs>
            <g fill="none" fill-rule="evenodd">
              <g>
                <g transform="translate(-705 -512) translate(704 504)">
                  <use fill="#000" filter="url(#3t7cb37sya)" xlink:href="#3947u920jb" />
                  <use fill="url(#gy6773nscc)" xlink:href="#3947u920jb" />
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