import { GraphicElement } from "./GraphicElement";
import { StormPlayer } from "../StormPlayer";
export declare class HeaderElement extends GraphicElement {
    private shadowElement;
    private wrapperElement;
    private liveIconElement;
    constructor(stormPlayer: StormPlayer);
    show(): void;
    hide(): void;
    protected draw(): void;
    setTitle(title: string): void;
    setSubtitle(subtitle: string): void;
    protected attachListeners(): void;
}
