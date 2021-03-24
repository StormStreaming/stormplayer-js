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

    }

    public getMainElement() : MainElement{
        return this.mainElement;
    }
}
