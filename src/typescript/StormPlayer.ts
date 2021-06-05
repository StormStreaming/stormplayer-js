import {Dispatcher} from "./events/Dispatcher";
import {MainElement} from "./ui/MainElement";
import {EventType} from "./events/EventType";
import {LibraryManager} from "./LibraryManager";
import {GUIConfig} from "./GUIConfig";

export class StormPlayer extends Dispatcher
{

    /*
    Video container identifier for StormPlayer library video injection
     */
    private instanceID : string = "StormPlayer-"+Math.random().toString(36).substr(2, 9);

    /*
    Player GUI configuration
     */
    private guiConfig : GUIConfig;

    /*
    Main HTML element of GUI
     */
    private mainElement: MainElement;

    /*
    This object manages the StormPlayer library
     */
    private libraryManager : LibraryManager;

    constructor(guiConfig : any, stormLibraryConfig : any, cuepoints : Array<any>) {
        super();

        this.guiConfig = new GUIConfig(guiConfig);

        /*
        Initializing StormPlayer library manager
         */
        this.libraryManager = new LibraryManager(stormLibraryConfig, this);

        /*
        Initializing main HTML element of player
         */
        this.mainElement = new MainElement(this);
        document.getElementById(this.guiConfig.getContainerID()).appendChild(this.mainElement.getHtmlElement());
        this.dispatch(EventType.GUI_INITIALIZED);

        /*
        Init config settings
         */
        this.setSize(guiConfig.width, guiConfig.height);
        this.setTitle(this.guiConfig.getTitle());
        this.setSubtitle(this.guiConfig.getSubtitle());

        /*
        Add cuepoints
         */
        let that = this;
        this.addEventListener(EventType.LIBRARY_INITIALIZED, function(){
            for(let i=0;i<cuepoints.length;i++){
                that.addCuePoint(cuepoints[i].title, cuepoints[i].time);
            }
        });

    }

    public addCuePoint(title : string, time : number) : void{
        this.dispatch(EventType.CUEPOINT_ADDED, {title: title, time : time});
    }

    public removeCuePoint(time : number) : void{
        this.dispatch(EventType.CUEPOINT_REMOVED, {time : time});
    }


    // @ts-ignore: Unreachable code error
    public getLibrary() : StormLibrary{
        return this.libraryManager.getLibrary();
    }

    public getInstanceID() : string{
        return this.instanceID;
    }

    public setSize(width : number, height : number) : void{
        this.mainElement.setSize(width, height);
    }

    public setTitle(title : string) : void{
        this.guiConfig.setTitle(title);
        this.mainElement.getHeaderElement().setTitle(title);
    }

    public setSubtitle(subtitle : string) : void{
        this.guiConfig.setSubtitle(subtitle);
        this.mainElement.getHeaderElement().setSubtitle(subtitle);
    }

    public getGuiConfig() : GUIConfig{
        return this.guiConfig;
    }

    public getLibraryManager() : LibraryManager{
        return this.libraryManager;
    }

    public isTouchDevice() : boolean{
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    }

}
