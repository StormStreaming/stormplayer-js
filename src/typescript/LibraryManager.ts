import {StormPlayer} from "./StormPlayer";
import {EventType} from "./events/EventType";

export class LibraryManager
{

    private stormPlayer : StormPlayer;
    private config : any;

    // @ts-ignore: Unreachable code error
    private library : StormLibrary;

    constructor(config : any, stormPlayer : StormPlayer) {
        this.stormPlayer = stormPlayer;

        this.config = config;

        /*
        Override config variables
        */
        this.config.settings.video.containerID = stormPlayer.getInstanceID();
        this.config.settings.video.width = stormPlayer.getGuiConfig().width;
        this.config.settings.video.height = stormPlayer.getGuiConfig().height;

        this.attachListeners();
    }

    public getConfig() : any{
        return this.config;
    }

    // @ts-ignore: Unreachable code error
    public getLibrary() : StormLibrary{
        return this.library;
    }

    public initializeLibrary() : void{
        // @ts-ignore: Unreachable code error
        this.library = new StormLibrary(this.config);
        this.stormPlayer.dispatch(EventType.LIBRARY_CREATED);

        this.library.initialize();

        document.querySelector('#'+this.stormPlayer.getInstanceID()+' video').classList.add('sp-video');

        this.stormPlayer.dispatch(EventType.LIBRARY_INITIALIZED);
    }

    private attachListeners() : void{
        let that = this;

        this.stormPlayer.addListener(EventType.GUI_INITIALIZED, function(){
            that.initializeLibrary();
        });

        this.stormPlayer.addListener(EventType.PLAY_CLICKED, function(){
            that.getLibrary().play();
        });

        this.stormPlayer.addListener(EventType.PAUSE_CLICKED, function(){
            that.getLibrary().pause();
        });

        this.stormPlayer.addListener(EventType.LIBRARY_CREATED, function(){
            that.stormPlayer.addListener(EventType.FULLSCREEN_ENTER, function(){
                that.getLibrary().setSize(window.screen.width, window.screen.height);
            });

            that.stormPlayer.addListener(EventType.FULLSCREEN_EXIT, function(){
                that.getLibrary().setSize(that.getConfig().settings.video.width, that.getConfig().settings.video.height);
            });

        });

    }

}