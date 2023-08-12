import { GraphicElement } from "../GraphicElement";
import { StormPlayer } from "../../StormPlayer";

/**
 * Class represents volume change button and the slider
 */
export class VolumeElement extends GraphicElement {

    /**
     * Main element
     * @private
     */
    private volumeButtonElement: HTMLButtonElement;

    /**
     * Wrapper for Control element
     * @private
     */
    private volumeControlWrapperElement: HTMLElement;

    /**
     * Control element
     * @private
     */
    private volumeInputElement: HTMLInputElement;

    /**
     * Progress bar wrapper
     * @private
     */
    private volumeProgressWrapperElement: HTMLElement;

    /**
     * Progress bar
     * @private
     */
    private volumeProgressElement: HTMLElement;

    /**
     * Number of seconds after which volume bar disappears
     * @private
     */
    private hideTimeoutSeconds: number = 1.5;

    /**
     * Timeout for hiding the volume bar
     * @private
     */
    private hideTimeout: ReturnType<typeof setTimeout>;


    /**
     * Constructor
     * @param stormPlayer reference to the main player class
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-volume");
    }

    /**
     * Switches icon to mute state
     */
    public showMute(): void {
        this.volumeButtonElement.querySelector(".sp-mute-icon").classList.remove("sp-hidden");
        this.volumeButtonElement.querySelector(".sp-unmute-icon").classList.add("sp-hidden");
    }

    /**
     * Switches icon to unmute state
     */
    public showUnMute(): void {
        this.volumeButtonElement.querySelector(".sp-mute-icon").classList.add("sp-hidden");
        this.volumeButtonElement.querySelector(".sp-unmute-icon").classList.remove("sp-hidden");
    }

    /**
     * Sets volume to given value
     * @param percent value between 0.00 to 1.00
     */
    public setVolume(percent: any): void {

        if (this.stormPlayer.getLibraryManager().getConfig().settings.audio && this.stormPlayer.getLibraryManager().getConfig().settings.audio.maxVolume && percent > this.stormPlayer.getLibraryManager().getConfig().settings.audio.maxVolume)
          percent = this.stormPlayer.getLibraryManager().getConfig().settings.audio.maxVolume;

        let px = (percent * 70) / 100;
        this.volumeProgressElement.style.transform = `translateX(${px}px)`;

        this.stormPlayer.dispatchEvent("volumeSet", {
            ref:this.stormPlayer,
          volume: percent,
        });

    }

    /**
     * Updates GUI for new volume
     * @param percent
     * @private
     */
    private updateVolume(percent:number):void {

        if (this.stormPlayer.getLibraryManager().getConfig().settings.audio && this.stormPlayer.getLibraryManager().getConfig().settings.audio.maxVolume && percent > this.stormPlayer.getLibraryManager().getConfig().settings.audio.maxVolume)
            percent = this.stormPlayer.getLibraryManager().getConfig().settings.audio.maxVolume;

        let px = (percent * 70) / 100;
        this.volumeProgressElement.style.transform = `translateX(${px}px)`;

    }

    /**
     * Resets hide timeout
     */
    public resetHideTimeout(): void {

        if (this.hideTimeout)
            clearTimeout(this.hideTimeout);

        let that = this;

        this.hideTimeout = setTimeout(function () {
            that.volumeButtonElement.classList.remove("sp-active");
            that.volumeControlWrapperElement.classList.add("sp-hidden");
        }, this.hideTimeoutSeconds * 1000);
    }

    /**
     * Draw graphics for the element
     * @protected
     */
    protected override draw(): void {

        super.draw();

        this.volumeButtonElement = document.createElement("button");
        this.volumeButtonElement.setAttribute("type","button");
        this.volumeButtonElement.className = "sp-volume__button";
        this.volumeButtonElement.innerHTML = `
                <svg class="sp-mute-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="21" viewBox="0 0 28 21">
                    <g transform="translate(0 0)">
                        <path d="M22.486,20.649l-.161-.157a1.183,1.183,0,0,1-.072-1.622,12.59,12.59,0,0,0-.216-16.715A1.182,1.182,0,0,1,22.086.511l.16-.157a1.2,1.2,0,0,1,.9-.353,1.235,1.235,0,0,1,.881.4,15.171,15.171,0,0,1,.257,20.171A1.237,1.237,0,0,1,23.4,21h-.051A1.236,1.236,0,0,1,22.486,20.649Zm-11.419-.916-6.45-5.259H1.18A1.171,1.171,0,0,1,0,13.313V8.688A1.17,1.17,0,0,1,1.18,7.527H4.616l6.45-5.26a1.2,1.2,0,0,1,1.255-.157A1.162,1.162,0,0,1,13,3.162V18.839a1.158,1.158,0,0,1-.679,1.05,1.193,1.193,0,0,1-1.255-.157Zm7.2-3.217-.165-.161a1.182,1.182,0,0,1-.118-1.564,6.863,6.863,0,0,0-.189-8.554,1.182,1.182,0,0,1,.085-1.606l.164-.16a1.212,1.212,0,0,1,.928-.35,1.234,1.234,0,0,1,.888.439,9.455,9.455,0,0,1,.256,11.825,1.233,1.233,0,0,1-.895.479c-.03,0-.059,0-.088,0A1.239,1.239,0,0,1,18.266,16.516Z" fill="#fff"/>
                    </g>
                </svg>
                <svg class="sp-unmute-icon sp-hidden" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 -2 28 21" xml:space="preserve">
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="PLAYER-@go-back" transform="translate(-255.000000, -966.000000)" fill="#FFFFFF">
                            <g id="Group-4" transform="translate(255.000000, 966.000000)">
                                <polygon id="Fill-1" points="24.364 5 22.066 7.298 19.768 5 18 6.768 20.298 9.065 18 11.364 19.768 13.132 22.066 10.834 24.364 13.132 26.132 11.364 23.834 9.065 26.132 6.768"></polygon>
                                <g id="VOLUME-CONTROLLER" fill-rule="nonzero">
                                    <path d="M12.3213457,17.8895415 C12.1613173,17.9640048 11.9898384,18 11.8194767,18 C11.5496906,18 11.2824181,17.9087756 11.0665335,17.7326465 L4.61568703,12.4735047 L1.17996477,12.4735047 C0.528400791,12.4740542 0,11.9539102 0,11.3128665 L0,6.68762428 C0,6.04630572 0.528400791,5.52643653 1.17996477,5.52643653 L4.61596631,5.52643653 L11.0668128,0.267294644 C11.4192661,-0.020117185 11.9080089,-0.0813914086 12.321625,0.110949204 C12.735241,0.301915954 13,0.711326686 13,1.16140372 L12.9997207,16.839087 C12.9997207,17.2894388 12.735241,17.6985748 12.3213457,17.8895415 Z" id="volume-icon"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>`;

        this.htmlElement.append(this.volumeButtonElement);

        this.volumeControlWrapperElement = document.createElement("div");
        this.volumeControlWrapperElement.className = "sp-volume__wrapper sp-hidden";
        this.htmlElement.append(this.volumeControlWrapperElement);

        this.volumeInputElement = document.createElement("input");
        this.volumeInputElement.className = "sp-volume__input";
        this.volumeInputElement.setAttribute("value", "1");
        this.volumeInputElement.setAttribute("data-mute", "0.5");
        this.volumeInputElement.setAttribute("type", "range");
        this.volumeInputElement.setAttribute("max", "1");
        this.volumeInputElement.setAttribute("min", "0");
        this.volumeInputElement.setAttribute("step", "0.01");
        this.volumeControlWrapperElement.append(this.volumeInputElement);

        this.volumeProgressWrapperElement = document.createElement("div");
        this.volumeProgressWrapperElement.className = "sp-volume__progress";
        this.volumeControlWrapperElement.append(this.volumeProgressWrapperElement);

        this.volumeProgressElement = document.createElement("div");
        this.volumeProgressElement.className = "sp-volume__thumb";
        this.volumeProgressElement.style.transform = "translateX(24px)";
        this.volumeProgressWrapperElement.appendChild(this.volumeProgressElement);

    }

    /**
     * Attaches listeners to the button
     * @protected
     */
    protected override attachListeners(): void {

        let that = this;
        this.draw();

        if (!this.stormPlayer.isTouchDevice()) {

            this.htmlElement.addEventListener("mousemove", function () {
                if (!that.stormPlayer.getLibrary().isMute()){
                    that.volumeControlWrapperElement.classList.remove("sp-hidden");
                    that.resetHideTimeout();
                }
            });

            this.volumeInputElement.addEventListener("mousemove", function () {
                that.resetHideTimeout();
            });

            this.stormPlayer.addEventListener("muteClicked", function () {
                that.volumeButtonElement.classList.remove("sp-active");
                that.volumeControlWrapperElement.classList.add("sp-hidden");
            });

            this.stormPlayer.addEventListener("unmuteClicked", function () {
                // nothing...
            });

        }

        this.stormPlayer.addEventListener("guiHid", function () {
            that.volumeButtonElement.classList.remove("sp-active");
            that.volumeControlWrapperElement.classList.add("sp-hidden");
        });

        this.volumeInputElement.addEventListener("input", function () {
          that.setVolume(parseFloat(this.value) * 100);
          that.resetHideTimeout();
        });

        this.volumeButtonElement.addEventListener("click", function (e) {
            if (that.volumeButtonElement.querySelector(".sp-mute-icon").classList.contains("sp-hidden")) {
                that.stormPlayer.dispatchEvent("unmuteClicked", {ref:that.stormPlayer});
            } else {
                that.stormPlayer.dispatchEvent("muteClicked", {ref:that.stormPlayer});
            }
        });


        this.stormPlayer.addEventListener("libraryInitialized", function () {
            that.stormPlayer.getLibrary().addEventListener("volumeChanged", function (event){
                that.updateVolume(event.volume);
                if (event.muted)
                    that.showUnMute();
                else
                    that.showMute();
            });
        });
    }
}