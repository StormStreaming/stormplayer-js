import "../styles/index.scss";
import { StormPlayer } from "./StormPlayer";
import { StormPlayerConfig } from "./types/StormPlayerConfig";
import { StormStreamConfig } from "@stormstreaming/stormlibrary";
export type { StormPlayerConfig } from "./types/StormPlayerConfig";
export type { StormStreamConfig } from "@stormstreaming/stormlibrary";
export { StormPlayer } from "./StormPlayer";
export declare function create(playerConfig: StormPlayerConfig, streamConfig: StormStreamConfig, wait?: boolean): StormPlayer;
