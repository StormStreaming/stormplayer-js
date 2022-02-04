import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {CuePointsElement} from "./CuePointsElement";
import {EventType} from "../events/EventType";
import {UserCapabilities} from "@app/typescript/utilities/UserCapabilities";

/**
 * Class represents the progress bar
 */
export class ProgressbarElement extends GraphicElement {

    /**
     * Container for cue-points
     * @private
     */
    private cuePointsElement: CuePointsElement;

    /**
     * Progress bar element
     * @private
     */
    private progressElement: HTMLProgressElement;

    /**
     * End element for the progress bar (live mode)
     * @private
     */
    private progressEndElement: GraphicElement;

    /**
     * Seek element
     * @private
     */
    private seekElement: HTMLInputElement;

    /**
     * Tooltip for seek thumb
     * @private
     */
    private seekTooltipElement: GraphicElement;

    /**
     * Thumb element
     * @private
     */
    private thumbElement: GraphicElement;

    /**
     * Current stream duration
     * @private
     */
    private streamDuration: number;

    /**
     * Source duration (how long the stream is "on")
     * @private
     */
    private sourceDuration: number;

    /**
     * When the source was started (unixtime)
     * @private
     */
    private sourceStartTime: number;

    /**
     * Amount of time that server has recorded for DVR
     * @private
     */
    private dvrCacheSize: number;

    /**
     * When current stream was started
     * @private
     */
    private streamStartTime: number;

    /**
     * Time at which progress bar starts (the earliest point in time)
     * @private
     */
    private progressBarStartTime: number;

    /**
     * Time at which progress bar ends (the latest point in time)
     * @private
     */
    private progressBarEndTime: number;

    /**
     * Current time (where viewer aka player is at the moment)
     * @private
     */
    private progressBarCurrTime: number;

    /**
     * Where user seeked last time?
     * @private
     */
    private lastSeekUpdateTime: number;

    /**
     * Where user seeked last time?
     * @private
     */
    private newPosition: number;

    /**
     * Whenever progress bar should be refreshed or not
     * @private
     */
    private stopRefreshBar: boolean = false;

    /**
     * Constructor
     * @param stormPlayer reference to the main player class
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-progress");
    }

    /**
     * Changes percents to time (unixtime)
     * @param percent
     */
    public percentToTime(percent: number): number {
        if (percent < 0)
            percent = 0;

        if (percent > 100)
            percent = 100;

        percent = 100 - percent;

        let endTime = this.dvrCacheSize;
        let percentTime = Math.round((endTime * percent) / 100);

        return percentTime;
    }

    /**
     * Sets thumb & bar position while mouse seeking
     * @param percent
     */
    public setPosition(percent: number): void {

        let maxThumbPos = this.seekElement.clientWidth;
        maxThumbPos -= 15; //offset right
        let thumbPos = (maxThumbPos * percent) / 100;
        thumbPos += 5; //offset left
        this.thumbElement.getHtmlElement().style.transform = `translateX(${thumbPos}px)`;

        this.progressElement.setAttribute("min", "0");
        this.progressElement.setAttribute("max", "100");
        this.progressElement.setAttribute("value", percent.toString());
    }

    /**
     * Peforms seek operation on the library
     * @param percent
     */
    public seekTo(percent: number): void {

        let percentTime = this.percentToTime(percent);
        let seekTime = this.progressBarEndTime - percentTime;

        let seekDate: Date = new Date(seekTime);

        let seekHours = seekDate.getHours();
        let seekMinutes = "0" + seekDate.getMinutes();
        let seekSeconds = "0" + seekDate.getSeconds();

        let formattedSeekTime = seekHours + ":" + seekMinutes.substr(-2) + ":" + seekSeconds.substr(-2);

        // Prevent too frequent update
        if (this.lastSeekUpdateTime == seekTime)
          return;

        this.lastSeekUpdateTime = seekTime;

        this.stormPlayer.dispatch(EventType.SEEK_SETTED, {
            seekToTime: seekTime,
        });

      }

    /**
     * Refreshes the bar based on new server data
     */
    public refreshBar(): void {

        if (this.stopRefreshBar)
          return;

        if (!this.stormPlayer.getGuiConfig().getTimeline() || this.dvrCacheSize < 1000 * 5)
            this.hide();
        else {

            this.show();

            this.progressElement.setAttribute("min", "0");
            this.progressElement.setAttribute("max", (this.progressBarEndTime - this.progressBarStartTime).toString());
            this.progressElement.setAttribute("value", (this.progressBarCurrTime - this.progressBarStartTime).toString());

            let maxThumbPos = this.seekElement.clientWidth;
            maxThumbPos -= 15; //offset right

            let thumbPos = (maxThumbPos * (this.progressBarCurrTime - this.progressBarStartTime)) / (this.progressBarEndTime - this.progressBarStartTime);
            thumbPos += 5; //offset left
            this.thumbElement.getHtmlElement().style.transform = `translateX(${thumbPos}px)`;
            this.thumbElement.show();

            this.cuePointsElement.refreshCuePointsPosition();
        }
    }

    /**
     * Parsing data from the server
     * @param data
     */
    public parseServerData(data: any): void {

        this.streamDuration = data.streamDuration; // how long does our stream works
        this.sourceDuration = data.sourceDuration; // how long is the source broadcasting
        this.sourceStartTime = data.sourceStartTime; // when the source was started
        this.streamStartTime = data.streamStartTime; // when our stream was started
        this.dvrCacheSize = data.dvrCacheSize; // how many ms does the DVR Cache hold at this point

        this.progressBarStartTime = this.sourceStartTime + this.sourceDuration - this.dvrCacheSize;
        this.progressBarEndTime = this.sourceStartTime + this.sourceDuration;
        this.progressBarCurrTime = this.streamStartTime + this.streamDuration;

        //workaround
        if (this.progressBarCurrTime > this.progressBarEndTime)
            this.progressBarCurrTime = this.progressBarEndTime;

        //easy to read dates

        let startDVR: number = this.progressBarStartTime;
        let endDVR: number = this.progressBarEndTime;
        let currTimePos: number = this.progressBarCurrTime;

        let startDVRDate: Date = new Date(startDVR);
        let endDVRDate: Date = new Date(endDVR);
        let dvrSize: Date = new Date(this.dvrCacheSize);
        let currTimePosDate: Date = new Date(currTimePos);

        let startHours = startDVRDate.getHours();
        let startMinutes = "0" + startDVRDate.getMinutes();
        let startSeconds = "0" + startDVRDate.getSeconds();

        let endHours = endDVRDate.getHours();
        let endMinutes = "0" + endDVRDate.getMinutes();
        let endSeconds = "0" + endDVRDate.getSeconds();

        let dvrMinutes = "0" + dvrSize.getMinutes();
        let dvrSeconds = "0" + dvrSize.getSeconds();

        let currHours = currTimePosDate.getHours();
        let currMinutes = "0" + currTimePosDate.getMinutes();
        let currSeconds = "0" + currTimePosDate.getSeconds();

        let formattedStartTime = startHours + ":" + startMinutes.substr(-2) + ":" + startSeconds.substr(-2);
        let formattedEndTime = endHours + ":" + endMinutes.substr(-2) + ":" + endSeconds.substr(-2);
        let formattedSize = dvrMinutes.substr(-2) + ":" + dvrSeconds.substr(-2);
        let formattedCurrTime = currHours + ":" + currMinutes.substr(-2) + ":" + currSeconds.substr(-2);

        //console.log(formattedStartTime+ " / "+formattedEndTime+" (total seconds in storage: "+formattedSize+") now position: "+formattedCurrTime);

        this.refreshBar();

      }

    /**
     * Updates tooltip
     * @param mouseX current mouse position
     */
    public updateTooltip(mouseX: number): void {

        if (mouseX < 0)
            mouseX = 0;
        else if (mouseX > this.seekElement.clientWidth)
            mouseX = this.seekElement.clientWidth;

        let maxPos = this.seekElement.clientWidth;
        let percentPosition = (mouseX * 100) / maxPos;
        let percentTimeSeconds = this.percentToTime(percentPosition) / 1000;
        let tooltipText =
            percentTimeSeconds > 0
                ? "-" + this.secondsToNicetime(percentTimeSeconds)
                : this.stormPlayer.getGuiConfig().getLiveText();

        this.seekTooltipElement.getHtmlElement().innerHTML = tooltipText;

        if (mouseX < 34)
            mouseX = 34;
        else if (mouseX > maxPos - 25)
            mouseX = maxPos - 25;

        this.seekTooltipElement.getHtmlElement().style.left = `${mouseX + 5}px`;
    }

    /**
     * Reformats seconds to nice time HH:MM:SS
     * @param seconds
     */
    public secondsToNicetime(seconds: number): string {
          const h = Math.floor(seconds / 3600);
          const m = Math.floor((seconds % 3600) / 60);
          const s = Math.round(seconds % 60);
          return [h, m > 9 ? m : h ? "0" + m : m || "0", s > 9 ? s : "0" + s]
              .filter(Boolean)
              .join(":");
      }

    /**
     * Draws graphics related to this element
     * @protected
     */
    protected override draw(): void {
        super.draw();

        this.cuePointsElement = new CuePointsElement(this.stormPlayer, this);
        this.htmlElement.appendChild(this.cuePointsElement.getHtmlElement());

        this.thumbElement = new GraphicElement(
            this.stormPlayer,
            "sp-progress-thumb"
        );
        this.htmlElement.appendChild(this.thumbElement.getHtmlElement());
        this.thumbElement.hide();

        this.progressElement = document.createElement("progress");
        this.progressElement.className = "sp-progress-bar";
        this.progressElement.setAttribute("value", "0");
        this.progressElement.setAttribute("min", "0");
        this.progressElement.setAttribute("max", "100");
        this.htmlElement.appendChild(this.progressElement);

        this.progressEndElement = new GraphicElement(
            this.stormPlayer,
            "sp-progress-bar__end",
            "span"
        );
        this.htmlElement.appendChild(this.progressEndElement.getHtmlElement());

        this.seekElement = document.createElement("input");
        this.seekElement.className = "sp-seek";
        this.seekElement.setAttribute("min", "0");
        this.seekElement.setAttribute("type", "range");
        this.seekElement.setAttribute("step", "0.001");
        this.seekElement.setAttribute("max", "100");
        this.htmlElement.appendChild(this.seekElement);

        this.seekTooltipElement = new GraphicElement(
            this.stormPlayer,
            "sp-seek__tooltip"
        );
        this.htmlElement.appendChild(this.seekTooltipElement.getHtmlElement());

        this.hide();
    }

    /**
     * Returns progress bar start time
     */
    public getProgressBarStartTime(): number {
        return this.progressBarStartTime;
    }

    /**
     * Returns progress bar end time
     */
    public getProgressBarEndTime(): number {
        return this.progressBarEndTime;
    }

    /**
     * Returns current player time
     */
    public getProgressBarCurrTime(): number {
        return this.progressBarCurrTime;
    }

    public updateThumb

    /**
     * Attaches listeners to this element
     * @protected
     */
    protected override attachListeners(): void {
        let that:ProgressbarElement = this;

        this.stormPlayer.addEventListener(EventType.LIBRARY_CREATED, function () {
            that.stormPlayer.getLibrary().addEventListener("videoProgress", function (e: any) {
                that.parseServerData(e);
            });
        });

        this.seekElement.addEventListener("input", function (e) {
            that.setPosition(parseFloat(this.value));
        });

        if (UserCapabilities.isMobile()) {

            this.seekElement.addEventListener("touchstart", function (e) {
                that.stopRefreshBar = true;
                that.stormPlayer.dispatch(EventType.SEEK_STARTED);
                console.log("T-SEEK START");
            });

            this.seekElement.addEventListener("touchmove", function (e) {
                let rect = that.seekElement.getBoundingClientRect();
                let xPosition = Math.floor(e.touches[0].clientX - rect.left);

                if(that.newPosition != xPosition) {
                    that.newPosition = xPosition;
                    that.updateTooltip(xPosition);
                }
            });

            this.seekElement.addEventListener("touchend", function (e) {
                that.stopRefreshBar = false;
                that.seekTo(parseFloat(this.value));
                that.stormPlayer.dispatch(EventType.SEEK_ENDED);
                console.log("T-SEEK END");
            });

        } else {


            this.seekElement.addEventListener("mousedown", function (e) {
                that.stopRefreshBar = true;
                console.log("M-SEEK START");
                that.stormPlayer.dispatch(EventType.SEEK_STARTED);
            });

            this.seekElement.addEventListener("mousemove", function (e) {
                let rect = that.seekElement.getBoundingClientRect();
                let xPosition = e.clientX - rect.left;
                that.updateTooltip(xPosition);
            });

            this.seekElement.addEventListener("mouseup", function (e) {
                that.stopRefreshBar = false;
                console.log("M-SEEK END");
                that.seekTo(parseFloat(this.value));
                that.stormPlayer.dispatch(EventType.SEEK_ENDED);
            });

        }

    }
}
