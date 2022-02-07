import { GraphicElement } from "../GraphicElement";
import { StormPlayer } from "../../StormPlayer";
export declare class QualityElement extends GraphicElement {
    private qualityMenuElement;
    private qualityButtonElement;
    constructor(stormPlayer: StormPlayer);
    protected refreshButton(): void;
    protected draw(): void;
    protected attachListeners(): void;
}
