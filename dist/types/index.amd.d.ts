import "../styles/index.scss";
import { StormPlayer } from "./StormPlayer";
import { StormPlayerConfig } from "./types/StormPlayerConfig";
import { StormLibraryConfig } from "@stormstreaming/stormlibrary";
export type { StormPlayerConfig } from "./types/StormPlayerConfig";
export type { StormLibraryConfig } from "@stormstreaming/stormlibrary";
export { StormPlayer } from "./StormPlayer";
export declare function create(playerConfig: StormPlayerConfig, libraryConfig: StormLibraryConfig, wait?: boolean): StormPlayer;
