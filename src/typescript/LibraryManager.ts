import {StormPlayer} from "./StormPlayer";
import {EventType} from "./events/EventType";

export class LibraryManager
{

    private stormPlayer : StormPlayer;
    private config : any;
    private library : StormLibrary;

    constructor(config : any, stormPlayer : StormPlayer) {
        this.stormPlayer = stormPlayer;

        this.config = config;

        /*
        Override config variables
        */
        this.config.settings.video.containerID = stormPlayer.getInstanceID();
        this.config.settings.video.width = stormPlayer.getGuiConfig().getWitdth();
        this.config.settings.video.height = stormPlayer.getGuiConfig().getHeight();

        this.attachListeners();
    }

    public getConfig() : any{
        return this.config;
    }

    public getLibrary() : StormLibrary{
        return this.library;
    }

    public initializeLibrary() : void{

        // @ts-ignore
        this.library = new StormLibrary(this.config);
        this.stormPlayer.dispatch(EventType.LIBRARY_CREATED);
        this.library.initialize();
        this.stormPlayer.dispatch(EventType.LIBRARY_INITIALIZED);

    }

    private attachListeners() : void{
        let that = this;

        this.stormPlayer.addEventListener(EventType.GUI_INITIALIZED, function(){
            that.initializeLibrary();
        });

        this.stormPlayer.addEventListener(EventType.LIBRARY_CREATED, function() {

            that.getLibrary().addEventListener("videoObjectCreation", function () {
               document.querySelector('#' + that.stormPlayer.getInstanceID() + ' video').classList.add('sp-video');
            });

        });

        this.stormPlayer.addEventListener(EventType.LIBRARY_INITIALIZED, function(){

            that.stormPlayer.addEventListener(EventType.PLAY_CLICKED, function(){
                that.getLibrary().play();
            });

            that.stormPlayer.addEventListener(EventType.PAUSE_CLICKED, function(){
                that.getLibrary().pause();
            });

            that.stormPlayer.addEventListener(EventType.MUTE_CLICKED, function(){
                that.getLibrary().mute();
            });

            that.stormPlayer.addEventListener(EventType.UNMUTE_CLICKED, function(){
                that.getLibrary().unmute();
            });

            that.stormPlayer.addEventListener(EventType.TOGGLE_CLICKED, function(){
                that.getLibrary().togglePlay();
            });

            that.stormPlayer.addEventListener(EventType.VOLUME_CHANGED, function(e:any){
                that.getLibrary().setVolume(e.volume);
            });

            that.stormPlayer.addEventListener(EventType.QUALITY_CHANGED, function(e:any){
                that.getLibrary().setQuality(e.label);
            });

            that.stormPlayer.addEventListener(EventType.SEEK_SETTED, function(e:any){
                that.getLibrary().seek(e.seekToTime);
            });

            that.stormPlayer.addEventListener(EventType.FULLSCREEN_ENTERED, function(){
                that.getLibrary().setSize(window.screen.width, window.screen.height);
            });

            that.stormPlayer.addEventListener(EventType.FULLSCREEN_EXITED, function(){
                that.getLibrary().setSize(that.getConfig().settings.video.width, that.getConfig().settings.video.height);
            });

        });

    }

}