import { StormPlayerEvent } from "./Events";
export type EventListener<K extends keyof StormPlayerEvent> = [K, (ev: StormPlayerEvent[K]) => void, boolean];
