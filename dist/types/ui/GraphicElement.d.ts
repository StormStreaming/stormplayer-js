import { StormPlayer } from "../StormPlayer";
export declare class GraphicElement {
    protected stormPlayer: StormPlayer;
    protected htmlElement: HTMLElement;
    protected tagName: string;
    protected className: string;
    constructor(stormPlayer: StormPlayer, className?: string, tagName?: string);
    getHtmlElement(): HTMLElement;
    remove(): void;
    hide(): void;
    show(): void;
    protected draw(): void;
    protected attachListeners(): void;
}
