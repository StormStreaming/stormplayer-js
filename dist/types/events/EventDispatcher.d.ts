import { StormPlayerEvent } from "./Events";
export declare class EventDispatcher {
    private listeners;
    addEventListener<K extends keyof StormPlayerEvent>(eventName: K, listener: (ev: StormPlayerEvent[K]) => void, removable?: boolean): boolean;
    removeEventListener<K extends keyof StormPlayerEvent>(eventName: K, listener?: (ev: StormPlayerEvent[K]) => void): boolean;
    removeAllEventListeners<K extends keyof StormPlayerEvent>(): void;
    dispatchEvent<K extends keyof StormPlayerEvent>(eventName: K, event: StormPlayerEvent[K]): void;
}
