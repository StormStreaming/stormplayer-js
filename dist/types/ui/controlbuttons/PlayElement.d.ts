import { GraphicElement } from "../GraphicElement";
import { StormPlayer } from "../../StormPlayer";
export declare class PlayElement extends GraphicElement {
    private playButtonElement;
    constructor(stormPlayer: StormPlayer);
    protected draw(): void;
    showPlay(): void;
    showPause(): void;
    protected attachListeners(): void;
}
