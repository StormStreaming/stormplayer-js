import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {CuepointsElement} from "./CuepointsElement";
import {EventType} from "../events/EventType";

export class ProgressbarElement extends GraphicElement {

    /*
    HTML elements
     */
    private cuepointsElement: CuepointsElement;
    private progressElement: HTMLProgressElement;
    private progressEndElement: GraphicElement;
    private seekElement: HTMLInputElement;
    private seekTooltipElement: GraphicElement;
    private thumbElement: GraphicElement;

    /*
    Server data
     */
    private duration: number;
    private sourceTime: number;
    private sourceStartTime: number;
    private cacheTime: number;
    private streamStartTime: number;

    /*
    Calculated data
     */
    private progressBarStartTime: number;
    private progressBarEndTime: number;
    private progressBarCurrTime: number;

    /*
    Auxiliary variables
     */
    private lastSeekUpdateTime : number;
    private stopRefreshBar: boolean = false;

    constructor(stormPlayer: StormPlayer) {

        super(stormPlayer, "sp-progress");

    }

    /*
    Gets seconds time elapsed by percent
     */
    public percentToTime(percent: number): number {

        if (percent < 0)
            percent = 0;

        if (percent > 100)
            percent = 100;

        percent = 100 - percent;

        let endTime = this.progressBarEndTime - this.progressBarStartTime;
        let percentTime = ((endTime * percent) / 100);

        return percentTime;

    }

    /*
    Sets thumb & bar position while mouse seeking
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

    /*
    Library seek
    */
    public seekTo(percent: number): void {

        let percentTime = this.percentToTime(percent);
        let seekTime = this.progressBarEndTime - percentTime;

        /*
        Prevent too frequent update
         */
        if(this.lastSeekUpdateTime == seekTime)
            return;
        this.lastSeekUpdateTime = seekTime;

        console.log("Seek to: " + seekTime);
    }

    /*
    Refreshes the bar based on new server data
     */
    public refreshBar(): void {
        if (this.stopRefreshBar)
            return;

        if (!this.stormPlayer.getGuiConfig().getTimeline() || this.cacheTime < 1000 * 5)
            this.hide();
        else {
            this.show();

            this.progressElement.setAttribute("min", "0");
            this.progressElement.setAttribute("max", (this.progressBarEndTime - this.progressBarStartTime).toString());
            this.progressElement.setAttribute("value", (this.progressBarCurrTime - this.progressBarStartTime).toString());

            let maxThumbPos = this.seekElement.clientWidth;
            maxThumbPos -= 15; //offset right
            let thumbPos = (maxThumbPos * this.progressBarCurrTime) / this.progressBarEndTime;
            thumbPos += 5; //offset left
            this.thumbElement.getHtmlElement().style.transform = `translateX(${thumbPos}px)`;
            this.thumbElement.show();
            this.cuepointsElement.refreshCuepointsPosition();
        }
    }

    /*
    Parses server data
     */
    public parseServerData(data): void {

        this.duration = data.duration;
        this.sourceTime = data.sourceTime;
        this.sourceStartTime = data.sourceStartTime;
        this.streamStartTime = data.streamStartTime;
        //that.cacheTime = e.cacheTime;
        this.cacheTime = 1000 * 60 * 5; //5min
        //this.cacheTime = 1000*4; //4 sec

        this.progressBarStartTime = this.sourceStartTime + this.sourceTime - this.cacheTime;
        this.progressBarEndTime = this.sourceStartTime + this.sourceTime;
        this.progressBarCurrTime = this.streamStartTime + this.duration;

        //workaround
        if (this.progressBarCurrTime > this.progressBarEndTime)
            this.progressBarCurrTime = this.progressBarEndTime;

        this.refreshBar();

    }

    /*
    Sets tooltip position based on mouse X
     */
    public updateTooltip(mouseX: number): void {

        if (mouseX < 0)
            mouseX = 0;
        else if (mouseX > this.seekElement.clientWidth)
            mouseX = this.seekElement.clientWidth;

        let maxPos = this.seekElement.clientWidth;
        let percentPosition = (mouseX * 100) / maxPos;
        let percentTimeSeconds = this.percentToTime(percentPosition) / 1000;
        let tooltipText = percentTimeSeconds > 0 ? "-" + this.secondsToNicetime(percentTimeSeconds) : this.stormPlayer.getGuiConfig().getLiveText();

        this.seekTooltipElement.getHtmlElement().innerHTML = tooltipText;


        if (mouseX < 34)
            mouseX = 34;
        else if (mouseX > maxPos - 25)
            mouseX = maxPos - 25;

        this.seekTooltipElement.getHtmlElement().style.left = `${mouseX + 5}px`;

    }

    public secondsToNicetime(seconds: number): string {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.round(seconds % 60);
        return [
            h,
            m > 9 ? m : (h ? '0' + m : m || '0'),
            s > 9 ? s : '0' + s
        ].filter(Boolean).join(':');
    }

    protected draw(): void {
        super.draw();

        this.cuepointsElement = new CuepointsElement(this.stormPlayer, this);
        this.htmlElement.appendChild(this.cuepointsElement.getHtmlElement());

        this.thumbElement = new GraphicElement(this.stormPlayer, "sp-progress-thumb");
        this.htmlElement.appendChild(this.thumbElement.getHtmlElement());
        this.thumbElement.hide();

        this.progressElement = document.createElement('progress');
        this.progressElement.className = 'sp-progress-bar';
        this.progressElement.setAttribute("value", "0");
        this.progressElement.setAttribute("min", "0");
        this.progressElement.setAttribute("max", "100");
        this.htmlElement.appendChild(this.progressElement);

        this.progressEndElement = new GraphicElement(this.stormPlayer, "sp-progress-bar__end", "span");
        this.htmlElement.appendChild(this.progressEndElement.getHtmlElement());

        this.seekElement = document.createElement('input');
        this.seekElement.className = 'sp-seek';
        this.seekElement.setAttribute("min", "0");
        this.seekElement.setAttribute("type", "range");
        this.seekElement.setAttribute("step", "0.001");
        this.seekElement.setAttribute("max", "100");
        this.htmlElement.appendChild(this.seekElement);

        this.seekTooltipElement = new GraphicElement(this.stormPlayer, 'sp-seek__tooltip');
        this.htmlElement.appendChild(this.seekTooltipElement.getHtmlElement());

        this.hide();


    }

    public getProgressBarStartTime() : number{
        return this.progressBarStartTime;
    }

    public getProgressBarEndTime() : number{
        return this.progressBarEndTime;
    }

    public getProgressBarCurrTime() : number{
        return this.progressBarCurrTime;
    }

    protected attachListeners(): void {

        let that = this;

        this.stormPlayer.addListener(EventType.LIBRARY_CREATED, function () {
            that.stormPlayer.getLibrary().addEventListener("videoProgress", function (e) {
                that.parseServerData(e);
            });
        });

        this.seekElement.addEventListener('input', function (e) {
            that.setPosition(parseFloat(this.value));
        });

        this.seekElement.addEventListener('mousemove', function (e) {
            let rect = that.seekElement.getBoundingClientRect();
            let xPosition = e.clientX - rect.left;
            that.updateTooltip(xPosition);
        });

        this.seekElement.addEventListener('mousedown', function (e) {
            that.stopRefreshBar = true;

            that.stormPlayer.dispatch(EventType.SEEK_START);
            that.stormPlayer.dispatch(EventType.PAUSE_CLICKED);

        });

        this.seekElement.addEventListener('mouseup', function (e) {
            that.stopRefreshBar = false;
            that.seekTo(parseFloat(this.value));

            that.stormPlayer.dispatch(EventType.SEEK_END);
            that.stormPlayer.dispatch(EventType.PLAY_CLICKED);

        });
    }

}