import { GraphicElement } from "./GraphicElement";
import { StormPlayer } from "../StormPlayer";
import { CuePointElement } from "./CuePointElement";
import { ProgressbarElement } from "./ProgressbarElement";

/**
 * Class representing an element containing all CuePoints on the progress bar
 */
export class CuePointsElement extends GraphicElement {

    /**
     * Reference to the progress bar element
     * @private
     */
    private progressbarElement: ProgressbarElement;

    /**
     * List of all cue-points
     * @private
     */
    private list: Array<CuePointElement> = new Array<CuePointElement>();

    /**
     * Constructor
     * @param stormPlayer reference to the main player class
     * @param progressbarElement reference to the progress-bar element
     */
    constructor(stormPlayer: StormPlayer, progressbarElement: ProgressbarElement) {
        super(stormPlayer, "sp-cue-points");
        this.progressbarElement = progressbarElement;
    }

    /**
     * Adds new cue-point at given time
     * @param title title for the cue-point
     * @param time time (unixtime) for the cue-point
     */
    public addCuePoint(title: string, time: number): void {
        let cuePoint: CuePointElement = new CuePointElement(this.stormPlayer, title, time);
        this.list.push(cuePoint);
        this.htmlElement.appendChild(cuePoint.getHtmlElement());
    }

    /**
     * Removes a cue-point from a given position (time)
     * @param time where cue-point should be removed (if exists)
     */
    public removeCuePoint(time: number): void {
        let indexesToRemove = [];

        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].getTime() == time) {
                this.list[i].remove();
                indexesToRemove.push(i);
            }
        }

        for (let i = 0; i < indexesToRemove.length; i++)
            this.list.splice(indexesToRemove[i], 1);

    }

    /**
     * Refreshed cue-point positions on the progress bar
     */
    public refreshCuePointsPosition(): void {

          for (let i = 0; i < this.list.length; i++) {
              let cuePointPercentPosition = this.timeToPercent(this.list[i].getTime());
              let xPosition = (cuePointPercentPosition * this.htmlElement.clientWidth) / 100;

              this.list[i].getHtmlElement().style.left = `${xPosition}px`;
              this.list[i].show();

              if (xPosition < 0)
                  this.removeCuePoint(this.list[i].getTime());
          }
      }

    /**
     * Converts time to percent (location on progress bar)
     * @param time
     */
    public timeToPercent(time: number): number {
        time -= this.progressbarElement.getProgressBarStartTime();
        let progressBarEndTime = this.progressbarElement.getProgressBarEndTime() - this.progressbarElement.getProgressBarStartTime();
        let percent = (time * 100) / progressBarEndTime;
        return percent;
    }

    /**
     * Attaches listeners to this element
     * @protected
     */
    protected override attachListeners(): void {

        this.stormPlayer.addEventListener("cuePointAdded", (event) => {
            this.addCuePoint(event.label, event.time);
        });

        this.stormPlayer.addEventListener("cuePointRemoved", (event) => {
            this.removeCuePoint(event.time);
        });
    }
}
