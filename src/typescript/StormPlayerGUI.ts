import {Dispatcher} from "./events/Dispatcher";
import {MainElement} from "./ui/MainElement";

export class StormPlayerGUI extends Dispatcher
{

    private config : any;

    /*
    Main HTML element of player
     */
    private mainElement: MainElement;

    constructor(config: any) {
        super();
        this.config = config;

        /*
        Initializing main HTML element of player
         */
        this.mainElement = new MainElement(this);
        document.getElementById(config.settings.video.containerID).appendChild(this.mainElement.getHtmlElement());

        /*
        Init config settings
         */
        this.setSize(config.settings.video && config.settings.video.width ? config.settings.video.width : 640, config.settings.video && config.settings.video.height ? config.settings.video.height : 480);
        this.setTitle(config.gui && config.gui.title ? config.gui.title : "");
        this.setSubtitle(config.gui && config.gui.subtitle ? config.gui.subtitle : "");

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

    public getConfig() : any{
        return this.config;
    }
}
