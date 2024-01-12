import {GraphicElement} from "../GraphicElement";
import {StormPlayer} from "../../StormPlayer";
import {StormLibraryEvent} from "@stormstreaming/stormlibrary";
import {StormPlayerEvent} from "@app/typescript/events/StormPlayerEvent";

/**
 * Class represents the FullScreen button
 */
export class FullscreenElement extends GraphicElement {

    /**
     * Whenever we have some kind of fullscreen-mode
     * @private
     */
    private isFullScreenMode:boolean = false;

    private dynFunction:any;

    /**
     * Constructor
     * @param stormPlayer reference to the player main class
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-controls__fullscreen", "button");
    }

    /**
     * Draws graphics
     * @protected
     */
    protected override draw(): void {
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
          </svg>`;
    }

    /**
    * Attaches listeners
    * @protected
    */
    protected override attachListeners(): void {

        let that:FullscreenElement = this;

        this.htmlElement.addEventListener("click", function (e) {

            let enterFullscreen = !that.isFullScreenMode;

            if(!that.isMobile()){
                // @ts-ignore: Unreachable code error
                enterFullscreen =
                    document.webkitIsFullScreen === false ||
                    document.mozFullScreen === false ||
                    document.msFullscreenElement === false;

            }

            if(that.stormPlayer.getPlayerConfigManager().getIfNativeMobileGUI() && !that.stormPlayer.getPlayerConfigManager().getIfDemoMode()){
                if(that.stormPlayer.getLibrary().getPlaybackState() == "INITIALIZED"){

                    that.stormPlayer.getLibrary().togglePlay();

                    that.dynFunction = function(){
                        that.stormPlayer.dispatchEvent("fullscreenEnter", {ref: that.stormPlayer});
                        that.stormPlayer.removeEventListener("playbackStart", that.dynFunction);
                    };
                    that.stormPlayer.addEventListener("playbackStart", that.dynFunction);

                    that.isFullScreenMode = true;

                } else {
                    that.isFullScreenMode = true;
                    that.stormPlayer.dispatchEvent("fullscreenEnter", {ref: that.stormPlayer});
                }
            } else {

                if (enterFullscreen) {

                    if(that.stormPlayer.getLibrary().getPlaybackState() == "INITIALIZED" && !that.stormPlayer.getPlayerConfigManager().getIfDemoMode())
                        that.stormPlayer.getLibrary().togglePlay();

                    that.isFullScreenMode = true;
                    that.stormPlayer.dispatchEvent("fullscreenEnter", {ref: that.stormPlayer});
                } else {
                    that.isFullScreenMode = false;
                    that.stormPlayer.dispatchEvent("fullscreenExit", {ref: that.stormPlayer});
                }

            }

        });

        this.stormPlayer.addEventListener("fullscreenEnter", function () {
            that.htmlElement.classList.add("sp-active");
        });

        this.stormPlayer.addEventListener("fullscreenExit", function () {
            that.htmlElement.classList.remove("sp-active");
        });
    }

    /**
     * Method checks if player is running on mobile device
     * @private
     */
    private isMobile():boolean{
        let check = false;
        // @ts-ignore
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }

}
