import "../styles/index.scss";
import { StormPlayer } from "./StormPlayer";
import StormPlayerCustomElement from "./StormPlayerElement";
import {StormPlayerConfig} from "./types/StormPlayerConfig";
import {StormLibraryConfig} from "@stormstreaming/stormlibrary";

export type { StormPlayerConfig } from "./types/StormPlayerConfig";
export type {StormLibraryConfig } from "@stormstreaming/stormlibrary";

export { StormPlayer } from "./StormPlayer";

export function create(playerConfig:StormPlayerConfig, libraryConfig:StormLibraryConfig, wait:boolean = false):StormPlayer{
    return new StormPlayer(playerConfig, libraryConfig, wait);
}

customElements.define("storm-player", StormPlayerCustomElement);
