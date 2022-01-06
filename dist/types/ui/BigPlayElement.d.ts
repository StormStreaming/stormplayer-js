import { GraphicElement } from "./GraphicElement";
import { StormPlayer } from "../StormPlayer";
export declare class BigPlayElement extends GraphicElement {
    private dontShowPlayback;
    constructor(stormPlayer: StormPlayer);
    show(): void;
    protected draw(): void;
    protected attachListeners(): void;
}
