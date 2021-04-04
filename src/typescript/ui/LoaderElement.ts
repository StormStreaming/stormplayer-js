import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {EventType} from "../events/EventType";

export class LoaderElement extends GraphicElement {



    constructor(stormPlayer: StormPlayer) {

        super(stormPlayer, 'sp-loader');

    }

    protected draw() : void{
        super.draw();

        this.htmlElement.innerHTML = '<svg width="38" height="38" viewBox="0 0 38 38" stroke="#fff">\n' +
            '            <g fill="none" fill-rule="evenodd">\n' +
            '              <g transform="translate(1 1)" stroke-width="2">\n' +
            '                <circle stroke-opacity=".5" cx="18" cy="18" r="18" />\n' +
            '                <path d="M36 18c0-9.94-8.06-18-18-18">\n' +
            '                  <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s"\n' +
            '                    repeatCount="indefinite" />\n' +
            '                </path>\n' +
            '              </g>\n' +
            '            </g>\n' +
            '          </svg>';

        this.hide();
    }


    protected attachListeners(): void {
        let that = this;

        this.stormPlayer.addListener(EventType.LIBRARY_CREATED, function(){

            that.stormPlayer.getLibrary().addEventListener("playerStart", function(){
                that.show();
            });

            that.stormPlayer.getLibrary().addEventListener("videoConnecting", function(){
                that.show();
            });

            that.stormPlayer.getLibrary().addEventListener("videoBufforing", function(){
                that.show();
            });

            that.stormPlayer.getLibrary().addEventListener("videoPlay", function(){
                that.hide();
            });

            that.stormPlayer.getLibrary().addEventListener("videoPause", function(){
                that.hide();
            });

            that.stormPlayer.addListener(EventType.ERROR_SHOWN, function(){
                that.hide();
            });

        });

    }
}