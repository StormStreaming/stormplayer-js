import "../styles/index.scss";
import { StormPlayer } from "./StormPlayer";
import StormPlayerCustomElement from "./StormPlayerElement";
import {StormPlayerConfig} from "./types/StormPlayerConfig";
import {StormLibraryConfig} from "@stormstreaming/stormlibrary";

export type { StormPlayerConfig } from "./types/StormPlayerConfig";
export type {StormLibraryConfig } from "@stormstreaming/stormlibrary";

export { StormPlayer } from "./StormPlayer";

export function create(playerConfig:StormPlayerConfig, libraryConfig:StormLibraryConfig):StormPlayer{
    return new StormPlayer(playerConfig, libraryConfig);
}

customElements.define("storm-player", StormPlayerCustomElement);