import "../styles/index.scss";
import {StormPlayer} from "./StormPlayer";
import StormPlayerCustomElement from "./StormPlayerElement";
import {StormPlayerConfig} from "./types/StormPlayerConfig";
import {StormStreamConfig} from "@stormstreaming/stormlibrary";

export type {StormPlayerConfig} from "./types/StormPlayerConfig";
export type {StormStreamConfig} from "@stormstreaming/stormlibrary";

export { StormPlayer } from "./StormPlayer";

export function create(playerConfig:StormPlayerConfig, stormConfig:StormStreamConfig, wait:boolean):StormPlayer{
    return new StormPlayer(playerConfig, stormConfig, wait);
}

customElements.define("storm-player", StormPlayerCustomElement);
