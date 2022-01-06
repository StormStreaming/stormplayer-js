import { GraphicElement } from "../GraphicElement";
import { StormPlayer } from "../../StormPlayer";
export declare class ControlButtonsElement extends GraphicElement {
    private playElement;
    private volumeElement;
    private qualityElement;
    private fullscreenElement;
    private leftWrapper;
    private rightWrapper;
    constructor(stormPlayer: StormPlayer);
    protected draw(): void;
}
