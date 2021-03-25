import {GraphicElement} from "../GraphicElement";
import {StormPlayerGUI} from "../../StormPlayerGUI";
import {EventType} from "../../events/EventType";

export class VolumeElement extends GraphicElement {

    /*
    Volume button
     */
    private volumeButtonElement : HTMLButtonElement;

    /*
    Volume control
     */
    private volumeControlWrapperElement : HTMLElement;
    private volumeInputElement : HTMLInputElement;
    private volumeProgressWrapperElement : HTMLElement;
    private volumeProgressElement : HTMLElement;

    constructor(stormPlayerGUI: StormPlayerGUI) {

        super(stormPlayerGUI, 'sp-volume');

        if(stormPlayerGUI.getConfig().settings.audio && stormPlayerGUI.getConfig().settings.audio.startVolume)
            this.setVolume(stormPlayerGUI.getConfig().settings.audio.startVolume);
    }

    public setVolume(percent) : void{
        if(this.stormPlayerGUI.getConfig().settings.audio && this.stormPlayerGUI.getConfig().settings.audio.maxVolume && percent > this.stormPlayerGUI.getConfig().settings.audio.maxVolume)
            percent = this.stormPlayerGUI.getConfig().settings.audio.maxVolume;

        let px = (percent*70)/100;
        this.volumeProgressElement.style.transform = `translateX(${px}px)`;

        this.stormPlayerGUI.dispatch(EventType.VOLUME_CHANGED, {volume: percent});
    }

    protected draw() : void{
        super.draw();

        this.volumeButtonElement = document.createElement("button");
        this.volumeButtonElement.className = 'sp-volume__button';
        this.volumeButtonElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="27" viewBox="0 0 34 27">
                    <g fill="none" fill-rule="evenodd">
                      <g fill="#FFF" fill-rule="nonzero">
                        <g>
                          <path
                            d="M17.01 128.103c0 .6-.346 1.143-.887 1.397-.21.1-.434.147-.657.147-.353 0-.703-.121-.985-.355l-8.441-6.995H1.544c-.853 0-1.544-.691-1.544-1.544v-6.151c0-.853.691-1.544 1.544-1.544H6.04l8.441-6.995c.461-.382 1.1-.464 1.642-.208.541.254.888.799.888 1.397v20.851zm5.934-2.412c-.038.002-.074.004-.111.004-.408 0-.801-.162-1.092-.452l-.206-.208c-.542-.54-.605-1.396-.15-2.011 1.157-1.559 1.767-3.407 1.767-5.346 0-2.085-.693-4.04-2.004-5.656-.5-.614-.453-1.506.106-2.065l.207-.206c.308-.309.721-.477 1.169-.45.435.022.842.227 1.118.564 1.82 2.226 2.78 4.928 2.78 7.814 0 2.687-.85 5.245-2.458 7.396-.268.359-.68.584-1.126.616zm6.383 4.771c-.279.33-.683.528-1.115.546l-.065.002c-.408 0-.801-.162-1.091-.452l-.203-.203c-.567-.566-.605-1.472-.09-2.086 2.49-2.961 3.862-6.722 3.862-10.59 0-4.025-1.469-7.898-4.135-10.908-.54-.611-.513-1.536.062-2.113l.203-.203c.3-.302.69-.468 1.138-.454.425.012.827.2 1.11.518 3.222 3.628 4.997 8.302 4.997 13.16 0 4.673-1.659 9.213-4.673 12.783z"
                            transform="translate(-263 -956) translate(263 852)" />
                        </g>
                      </g>
                    </g>
                  </svg>`;
        this.volumeButtonElement.setAttribute('data-title', "Volume");
        this.htmlElement.append(this.volumeButtonElement);

        this.volumeControlWrapperElement = document.createElement("div");
        this.volumeControlWrapperElement.className = 'sp-volume__wrapper sp-hidden';
        this.htmlElement.append(this.volumeControlWrapperElement);

        this.volumeInputElement = document.createElement("input");
        this.volumeInputElement.className = 'sp-volume__input';
        this.volumeInputElement.setAttribute("value", "1");
        this.volumeInputElement.setAttribute("data-mute", "0.5");
        this.volumeInputElement.setAttribute("type", "range");
        this.volumeInputElement.setAttribute("max", "1");
        this.volumeInputElement.setAttribute("min", "0");
        this.volumeInputElement.setAttribute("step", "0.01");
        this.volumeControlWrapperElement.append(this.volumeInputElement);

        this.volumeProgressWrapperElement = document.createElement("div");
        this.volumeProgressWrapperElement.className = 'sp-volume__progress';
        this.volumeControlWrapperElement.append(this.volumeProgressWrapperElement);

        this.volumeProgressElement = document.createElement("div");
        this.volumeProgressElement.className = 'sp-volume__thumb';
        this.volumeProgressElement.style.transform = 'translateX(24px)';
        this.volumeProgressWrapperElement.appendChild(this.volumeProgressElement);

    }

    protected attachListeners(): void {
        let that = this;

        /*
        Show / hide volume bar
         */
        this.volumeButtonElement.addEventListener('click', function(){
            that.volumeButtonElement.classList.toggle("sp-active");
            that.volumeControlWrapperElement.classList.toggle('sp-hidden');
        });

        /*
        Hiding volume bar when GUI_HIDE event is dispatched
         */
        this.stormPlayerGUI.addListener(EventType.GUI_HIDE, function(){
            that.volumeButtonElement.classList.remove("sp-active");
            that.volumeControlWrapperElement.classList.add('sp-hidden');
        });

        /*
        Volume bar control event
         */
        this.volumeInputElement.addEventListener("input",function(){
            that.setVolume(parseFloat(this.value)*100);
        });

    }

}