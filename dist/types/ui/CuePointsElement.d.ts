import { GraphicElement } from "./GraphicElement";
import { StormPlayer } from "../StormPlayer";
import { ProgressbarElement } from "./ProgressbarElement";
export declare class CuePointsElement extends GraphicElement {
    private progressbarElement;
    private list;
    constructor(stormPlayer: StormPlayer, progressbarElement: ProgressbarElement);
    addCuePoint(title: string, time: number): void;
    removeCuePoint(time: number): void;
    refreshCuePointsPosition(): void;
    timeToPercent(time: number): number;
    protected attachListeners(): void;
}
