import { GraphicElement } from "./GraphicElement";
import { StormPlayer } from "../StormPlayer";
export declare class ContextMenu extends GraphicElement {
    private isFullScreen;
    constructor(stormPlayer: StormPlayer);
    protected draw(): void;
    showContextMenu(e: MouseEvent): void;
    hideContextMenu(): void;
    protected attachListeners(): void;
}
