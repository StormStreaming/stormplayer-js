import { GraphicElement } from "./GraphicElement";
import { StormPlayer } from "../StormPlayer";
export declare class ErrorElement extends GraphicElement {
    constructor(stormPlayer: StormPlayer);
    showErrorMessage(message: string): void;
    protected draw(): void;
    protected attachListeners(): void;
}
