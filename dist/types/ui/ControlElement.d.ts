import { GraphicElement } from "./GraphicElement";
import { StormPlayer } from "../StormPlayer";
export declare class ControlElement extends GraphicElement {
    private shadowElement;
    private progressbarElement;
    private controlButtonsElement;
    constructor(stormPlayer: StormPlayer);
    show(): void;
    hide(): void;
    protected draw(): void;
}
