import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {CuepointElement} from "./CuepointElement";
import {ProgressbarElement} from "./ProgressbarElement";
import {EventType} from "../events/EventType";

export class CuepointsElement extends GraphicElement {

    private progressbarElement : ProgressbarElement;
    private list : Array<CuepointElement> = new Array<CuepointElement>();

    constructor(stormPlayer: StormPlayer, progressbarElement: ProgressbarElement) {
        super(stormPlayer, "sp-cue-points");
        this.progressbarElement = progressbarElement;
    }

    public addCuePoint(title : string, time : number) : void {
        let cuepoint : CuepointElement = new CuepointElement(this.stormPlayer, title, time);
        this.list.push(cuepoint);
        this.htmlElement.appendChild(cuepoint.getHtmlElement());
    }

    public removeCuePoint(time : number) : void{
        let indexesToRemove = [];
        for(let i=0;i<this.list.length;i++){
            if(this.list[i].getTime() == time){
                this.list[i].remove();
                indexesToRemove.push(i);
            }
        }
        for(let i=0;i<indexesToRemove.length;i++){
            this.list.splice(indexesToRemove[i], 1);
        }
    }

    public refreshCuepointsPosition() : void{
        for(let i=0;i<this.list.length;i++){
            //console.log(this.htmlElement.clientWidth);
            let cuepointPercentPosition = this.timeToPercent(this.list[i].getTime());
            let xPosition = (cuepointPercentPosition*this.htmlElement.clientWidth)/100;

            if(xPosition < 0)
                this.removeCuePoint(this.list[i].getTime());

            this.list[i].getHtmlElement().style.left = `${xPosition}px`;
            this.list[i].show();
        }
    }

    /*
    Gets percent on timeline based on time
    */
    public timeToPercent(time: number): number {
        time -= this.progressbarElement.getProgressBarStartTime();
        let progressBarEndTime = this.progressbarElement.getProgressBarEndTime()-this.progressbarElement.getProgressBarStartTime();
        let percent = (time*100)/progressBarEndTime;
        return percent;
    }

    protected attachListeners() : void {
        let that = this;

        this.stormPlayer.addListener(EventType.CUEPOINT_ADD, function(e){
            that.addCuePoint(e.title, e.time);
        });

        this.stormPlayer.addListener(EventType.CUEPOINT_REMOVE, function(e){
            that.removeCuePoint(e.time);
        });

    }

}