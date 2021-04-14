import {GraphicElement} from "../GraphicElement";
import {StormPlayer} from "../../StormPlayer";
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

    private hideTimeoutSeconds : number = 3;
    private hideTimeout : ReturnType<typeof setTimeout>;

    constructor(stormPlayer: StormPlayer) {

        super(stormPlayer, 'sp-volume');

    }

    public showMute() : void{
        this.volumeButtonElement.querySelector(".sp-mute-icon").classList.remove("sp-hidden");
        this.volumeButtonElement.querySelector(".sp-unmute-icon").classList.add("sp-hidden");
    }

    public showUnMute() : void{
        this.volumeButtonElement.querySelector(".sp-mute-icon").classList.add("sp-hidden");
        this.volumeButtonElement.querySelector(".sp-unmute-icon").classList.remove("sp-hidden");
    }

    public setVolume(percent) : void{
        if(this.stormPlayer.getLibraryManager().getConfig().settings.audio && this.stormPlayer.getLibraryManager().getConfig().settings.audio.maxVolume && percent > this.stormPlayer.getLibraryManager().getConfig().settings.audio.maxVolume)
            percent = this.stormPlayer.getLibraryManager().getConfig().settings.audio.maxVolume;

        let px = (percent*70)/100;
        this.volumeProgressElement.style.transform = `translateX(${px}px)`;

        this.stormPlayer.dispatch(EventType.VOLUME_CHANGED, {volume: percent});
    }

    public resetHideTimeout() : void{
        if (this.hideTimeout)
            clearTimeout(this.hideTimeout);

        var that = this;
        this.hideTimeout = setTimeout(function () {
            that.volumeButtonElement.classList.remove("sp-active");
            that.volumeControlWrapperElement.classList.add('sp-hidden');
        }, this.hideTimeoutSeconds * 1000);
    }

    protected draw() : void{
        super.draw();

        this.volumeButtonElement = document.createElement("button");
        this.volumeButtonElement.className = 'sp-volume__button';
        this.volumeButtonElement.innerHTML = `
                <svg class="sp-mute-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="21" viewBox="0 0 28 21">
                    <g transform="translate(0 0)">
                        <path d="M22.486,20.649l-.161-.157a1.183,1.183,0,0,1-.072-1.622,12.59,12.59,0,0,0-.216-16.715A1.182,1.182,0,0,1,22.086.511l.16-.157a1.2,1.2,0,0,1,.9-.353,1.235,1.235,0,0,1,.881.4,15.171,15.171,0,0,1,.257,20.171A1.237,1.237,0,0,1,23.4,21h-.051A1.236,1.236,0,0,1,22.486,20.649Zm-11.419-.916-6.45-5.259H1.18A1.171,1.171,0,0,1,0,13.313V8.688A1.17,1.17,0,0,1,1.18,7.527H4.616l6.45-5.26a1.2,1.2,0,0,1,1.255-.157A1.162,1.162,0,0,1,13,3.162V18.839a1.158,1.158,0,0,1-.679,1.05,1.193,1.193,0,0,1-1.255-.157Zm7.2-3.217-.165-.161a1.182,1.182,0,0,1-.118-1.564,6.863,6.863,0,0,0-.189-8.554,1.182,1.182,0,0,1,.085-1.606l.164-.16a1.212,1.212,0,0,1,.928-.35,1.234,1.234,0,0,1,.888.439,9.455,9.455,0,0,1,.256,11.825,1.233,1.233,0,0,1-.895.479c-.03,0-.059,0-.088,0A1.239,1.239,0,0,1,18.266,16.516Z" fill="#fff"/>
                    </g>
                </svg>
                <svg class="sp-unmute-icon sp-hidden" xmlns="http://www.w3.org/2000/svg" width="28" height="21" viewBox="0 0 28 21">
                    <g transform="translate(0.003 0.094)">
                              <path d="M.295.307,12.25,9.188l4.667,3.5,10.866,8.106" transform="translate(0 0)" fill="none" stroke="#fff" stroke-width="3"/>
                        <path d="M22.486,20.649l-.161-.157a1.183,1.183,0,0,1-.072-1.622,12.59,12.59,0,0,0-.216-16.715A1.182,1.182,0,0,1,22.086.511l.16-.157a1.2,1.2,0,0,1,.9-.353,1.235,1.235,0,0,1,.881.4,15.171,15.171,0,0,1,.257,20.171A1.237,1.237,0,0,1,23.4,21h-.051A1.236,1.236,0,0,1,22.486,20.649Zm-11.419-.916-6.45-5.259H1.18A1.171,1.171,0,0,1,0,13.313V8.688A1.17,1.17,0,0,1,1.18,7.527H4.616l6.45-5.26a1.2,1.2,0,0,1,1.255-.157A1.162,1.162,0,0,1,13,3.162V18.839a1.158,1.158,0,0,1-.679,1.05,1.193,1.193,0,0,1-1.255-.157Zm7.2-3.217-.165-.161a1.182,1.182,0,0,1-.118-1.564,6.863,6.863,0,0,0-.189-8.554,1.182,1.182,0,0,1,.085-1.606l.164-.16a1.212,1.212,0,0,1,.928-.35,1.234,1.234,0,0,1,.888.439,9.455,9.455,0,0,1,.256,11.825,1.233,1.233,0,0,1-.895.479c-.03,0-.059,0-.088,0A1.239,1.239,0,0,1,18.266,16.516Z" fill="#fff"/>
              
                    </g>
                </svg>
<!--                <svg class="sp-unmute-icon sp-hidden" xmlns="http://www.w3.org/2000/svg" width="13" height="18" viewBox="0 -0.5 13 18">-->
<!--                    <path d="M12.321,19.89a1.194,1.194,0,0,1-1.255-.157L4.616,14.474H1.18A1.17,1.17,0,0,1,0,13.313V8.688A1.171,1.171,0,0,1,1.18,7.526H4.616l6.451-5.259a1.193,1.193,0,0,1,1.255-.156A1.159,1.159,0,0,1,13,3.161V18.839A1.159,1.159,0,0,1,12.321,19.89Z" transform="translate(0 -2)" fill="#fff"/>-->
<!--                </svg>-->
            `;

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


        if(!this.stormPlayer.isTouchDevice()) {
            this.htmlElement.addEventListener("mousemove", function () {
                if(!that.stormPlayer.getLibrary().isMute()) {
                    that.volumeControlWrapperElement.classList.remove('sp-hidden');
                    that.resetHideTimeout();
                }
            });

            this.volumeInputElement.addEventListener("mousemove", function(){
                that.resetHideTimeout();
            });

            this.stormPlayer.addListener(EventType.MUTE_CLICKED, function(){
                that.volumeButtonElement.classList.remove("sp-active");
                that.volumeControlWrapperElement.classList.add('sp-hidden');
            });

            this.stormPlayer.addListener(EventType.UNMUTE_CLICKED, function(){

            });
        }

        this.stormPlayer.addListener(EventType.GUI_HIDED, function(){
            that.volumeButtonElement.classList.remove("sp-active");
            that.volumeControlWrapperElement.classList.add('sp-hidden');
        });

        this.volumeInputElement.addEventListener("input",function(){
            that.setVolume(parseFloat(this.value)*100);
            that.resetHideTimeout();
        });

        this.volumeButtonElement.addEventListener("click", function(e){
            if(that.volumeButtonElement.querySelector(".sp-mute-icon").classList.contains('sp-hidden'))
                that.stormPlayer.dispatch(EventType.UNMUTE_CLICKED);
            else
                that.stormPlayer.dispatch(EventType.MUTE_CLICKED);
        });

        this.stormPlayer.addListener(EventType.LIBRARY_INITIALIZED, function() {
            that.stormPlayer.getLibrary().addEventListener("volumeChange", function(event){

                that.setVolume(event.volume);
                if(event.isMuted)
                    that.showUnMute();
                else
                    that.showMute();

            });
        });

    }

}
