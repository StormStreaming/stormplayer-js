import { GraphicElement } from "./GraphicElement";
import { StormPlayer } from "../StormPlayer";
export declare class WaitingRoom extends GraphicElement {
    constructor(stormPlayer: StormPlayer);
    setTime(): void;
    protected draw(): void;
    protected attachListeners(): void;
}
