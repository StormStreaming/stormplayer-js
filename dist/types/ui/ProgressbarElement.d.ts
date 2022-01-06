import { GraphicElement } from "./GraphicElement";
import { StormPlayer } from "../StormPlayer";
export declare class ProgressbarElement extends GraphicElement {
    private cuePointsElement;
    private progressElement;
    private progressEndElement;
    private seekElement;
    private seekTooltipElement;
    private thumbElement;
    private streamDuration;
    private sourceDuration;
    private sourceStartTime;
    private dvrCacheSize;
    private streamStartTime;
    private progressBarStartTime;
    private progressBarEndTime;
    private progressBarCurrTime;
    private lastSeekUpdateTime;
    private stopRefreshBar;
    constructor(stormPlayer: StormPlayer);
    percentToTime(percent: number): number;
    setPosition(percent: number): void;
    seekTo(percent: number): void;
    refreshBar(): void;
    parseServerData(data: any): void;
    updateTooltip(mouseX: number): void;
    secondsToNicetime(seconds: number): string;
    protected draw(): void;
    getProgressBarStartTime(): number;
    getProgressBarEndTime(): number;
    getProgressBarCurrTime(): number;
    protected attachListeners(): void;
}