import { GraphicElement } from "./GraphicElement";
import { StormPlayer } from "../StormPlayer";
import { HeaderElement } from "./HeaderElement";
export declare class MainElement extends GraphicElement {
    private videoElement;
    private loaderElement;
    private errorElement;
    private playbackElement;
    private headerElement;
    private controlElement;
    private unmuteElement;
    private spContainer;
    private hideGUITimeoutSeconds;
    private hideGUITimeout;
    private fsInterval;
    private playerWidth;
    private playerHeight;
    private oldPlayerWidth;
    private oldPlayerHeight;
    constructor(stormPlayer: StormPlayer);
    setSize(width: number, height: number): void;
    setWidth(width: number): void;
    setHeight(height: number): void;
    getWidth(): number;
    getHeight(): number;
    getHeaderElement(): HeaderElement;
    protected draw(): void;
    protected attachListeners(): void;
    private updateResolution;
}
