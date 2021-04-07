import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {EventType} from "../events/EventType";

export class VideoElement extends GraphicElement {


    constructor(stormPlayer: StormPlayer) {

        super(stormPlayer, 'sp-container__box');

    }

    protected draw() : void{
        super.draw();

        this.htmlElement.setAttribute("id", this.stormPlayer.getInstanceID());

    }

    protected attachListeners(): void {
        let that = this;

        that.htmlElement.addEventListener("click", function () {
            console.log("kliknięcie w VideoElement")
            that.stormPlayer.dispatch(EventType.TOGGLE_CLICKED);
        });

    }
}