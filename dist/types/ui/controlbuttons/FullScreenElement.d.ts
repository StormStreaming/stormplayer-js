import { GraphicElement } from "../GraphicElement";
import { StormPlayer } from "../../StormPlayer";
export declare class FullscreenElement extends GraphicElement {
    private isFullScreenMode;
    constructor(stormPlayer: StormPlayer);
    protected draw(): void;
    protected attachListeners(): void;
    private isMobile;
}
