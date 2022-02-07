import { GraphicElement } from "../GraphicElement";
import { StormPlayer } from "../../StormPlayer";
export declare class QualityMenuElement extends GraphicElement {
    private spMenuBoxElement;
    private listItems;
    constructor(stormPlayer: StormPlayer);
    setCurrentItem(): void;
    refreshList(): void;
    protected draw(): void;
    protected attachListeners(): void;
}
