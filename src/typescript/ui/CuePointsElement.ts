import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {CuePointElement} from "./CuePointElement";
import {ProgressbarElement} from "./ProgressbarElement";
import {EventType} from "../events/EventType";

export class CuePointsElement extends GraphicElement {

    private progressbarElement : ProgressbarElement;
    private list : Array<CuePointElement> = new Array<CuePointElement>();

    constructor(stormPlayer: StormPlayer, progressbarElement: ProgressbarElement) {
        super(stormPlayer, "sp-cue-points");
        this.progressbarElement = progressbarElement;
    }

    public addCuePoint(title : string, time : number) : void {
        let cuePoint : CuePointElement = new CuePointElement(this.stormPlayer, title, time);
        this.list.push(cuePoint);
        this.htmlElement.appendChild(cuePoint.getHtmlElement());
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

    public refreshCuePointsPosition() : void{
        for(let i=0;i<this.list.length;i++){
            let cuePointPercentPosition = this.timeToPercent(this.list[i].getTime());
            let xPosition = (cuePointPercentPosition*this.htmlElement.clientWidth)/100;

            this.list[i].getHtmlElement().style.left = `${xPosition}px`;
            this.list[i].show();

            if(xPosition < 0)
                this.removeCuePoint(this.list[i].getTime());
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

        this.stormPlayer.addListener(EventType.CUEPOINT_ADDED, function(e){
            that.addCuePoint(e.title, e.time);
        });

        this.stormPlayer.addListener(EventType.CUEPOINT_REMOVED, function(e){
            that.removeCuePoint(e.time);
        });

    }

}