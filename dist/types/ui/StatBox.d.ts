import { GraphicElement } from "./GraphicElement";
import { StormPlayer } from "../StormPlayer";
export declare class StatBox extends GraphicElement {
    constructor(stormPlayer: StormPlayer);
    protected draw(): void;
    showStatBox(): void;
    hideStatBox(): void;
    protected attachListeners(): void;
}
