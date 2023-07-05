import { GraphicElement } from "./GraphicElement";
import { StormPlayer } from "../StormPlayer";
export declare class ContextMenu extends GraphicElement {
    constructor(stormPlayer: StormPlayer);
    protected draw(): void;
    showContextMenu(e: MouseEvent, element: HTMLElement): void;
    hideContextMenu(): void;
    protected attachListeners(): void;
}
