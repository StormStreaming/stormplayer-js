import { GraphicElement } from "./GraphicElement";
import { StormPlayer } from "../StormPlayer";
import { HeaderElement } from "./HeaderElement";
export declare class MainElement extends GraphicElement {
    private watermark;
    private waitingRoom;
    private statBox;
    private contextMenu;
    private videoElement;
    private loaderElement;
    private errorElement;
    private playbackElement;
    private headerElement;
    private controlElement;
    private unmuteElement;
    private spContainer;
    private hideGUITimeoutSeconds;
    isOpenMenu: boolean;
    private hideGUITimeout;
    private fsInterval;
    private aspectRatio;
    private playerWidth;
    private playerHeight;
    private copyPlayerWidth;
    private copyPlayerHeight;
    private widthOrigValue;
    private heightOrigValue;
    private resolutionLock;
    private parentContainer;
    private resizeObserver;
    constructor(stormPlayer: StormPlayer);
    setSize(width: number | string, height: number | string): void;
    setWidth(width: number | string): void;
    setHeight(height: number | string): void;
    private calculateSize;
    getWidth(): number;
    getHeight(): number;
    getHeaderElement(): HeaderElement;
    createWaitingRoom(): void;
    createPlayer(): void;
    protected draw(): void;
    protected attachListeners(): void;
    private updateResolution;
    getPlayerElement(): HTMLElement | null;
    getParentContainer(): HTMLElement | null;
}
