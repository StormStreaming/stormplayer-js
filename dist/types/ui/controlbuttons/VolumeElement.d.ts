import { GraphicElement } from "../GraphicElement";
import { StormPlayer } from "../../StormPlayer";
export declare class VolumeElement extends GraphicElement {
    private volumeButtonElement;
    private volumeControlWrapperElement;
    private volumeInputElement;
    private volumeProgressWrapperElement;
    private volumeProgressElement;
    private hideTimeoutSeconds;
    private hideTimeout;
    constructor(stormPlayer: StormPlayer);
    showMute(): void;
    showUnMute(): void;
    setVolume(percent: any): void;
    private updateVolume;
    resetHideTimeout(): void;
    protected draw(): void;
    protected attachListeners(): void;
}
