import {Dispatcher} from "./events/Dispatcher";
import {MainElement} from "./ui/MainElement";
import {EventType} from "./events/EventType";
import {LibraryManager} from "./LibraryManager";

export class StormPlayer extends Dispatcher
{

    /*
    Video container identifier for StormPlayer library video injection
     */
    private instanceID : string = "StormPlayer-"+Math.random().toString(36).substr(2, 9);

    /*
    Configuration
     */
    private guiConfig : any;

    /*
    Main HTML element of GUI
     */
    private mainElement: MainElement;

    /*
    This object manages the StormPlayer library
     */
    private libraryManager : LibraryManager;

    constructor(guiConfig : any, stormLibraryConfig : any) {
        super();

        this.guiConfig = guiConfig;

        /*
        Initializing StormPlayer library manager
         */
        this.libraryManager = new LibraryManager(stormLibraryConfig, this);

        /*
        Initializing main HTML element of player
         */
        this.mainElement = new MainElement(this);
        document.getElementById(this.guiConfig.containerID).appendChild(this.mainElement.getHtmlElement());
        this.dispatch(EventType.GUI_INITIALIZED);

        /*
        Init config settings
         */
        this.setSize(guiConfig.width, guiConfig.height);
        this.setTitle(this.guiConfig.title ? this.guiConfig.title : "");
        this.setSubtitle(this.guiConfig.subtitle ? this.guiConfig.subtitle : "");


    }

    public getInstanceID() : string{
        return this.instanceID;
    }

    public setSize(width : number, height : number) : void{
        this.mainElement.setSize(width, height);
    }

    public setTitle(title : string) : void{
        this.mainElement.getHeaderElement().setTitle(title);
    }

    public setSubtitle(subtitle : string) : void{
        this.mainElement.getHeaderElement().setSubtitle(subtitle);
    }

    public getGuiConfig() : any{
        return this.guiConfig;
    }

    public getLibraryManager() : LibraryManager{
        return this.libraryManager;
    }

}
