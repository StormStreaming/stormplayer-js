import { GraphicElement } from "../GraphicElement";
import { StormPlayer } from "../../StormPlayer";
export declare class FullScreenElement extends GraphicElement {
    constructor(stormPlayer: StormPlayer);
    protected draw(): void;
    protected attachListeners(): void;
}
