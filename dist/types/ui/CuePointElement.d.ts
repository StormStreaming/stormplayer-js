import { GraphicElement } from "./GraphicElement";
import { StormPlayer } from "../StormPlayer";
export declare class CuePointElement extends GraphicElement {
    private time;
    private title;
    constructor(stormPlayer: StormPlayer, title: string, time: number);
    getTitle(): string;
    getTime(): number;
    protected draw(): void;
}
