import { StormPlayerEvent } from "./StormPlayerEvent";
export type StormPlayerListener<K extends keyof StormPlayerEvent> = [K, (ev: StormPlayerEvent[K]) => void, boolean];
