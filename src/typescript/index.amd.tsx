import "../styles/index.scss";
import {StormPlayer} from "./StormPlayer";
import StormPlayerCustomElement from "./StormPlayerElement";
import {StormPlayerConfig} from "./types/StormPlayerConfig";
import {StormStreamConfig} from "@stormstreaming/stormlibrary";

export type {StormPlayerConfig} from "./types/StormPlayerConfig";
export type {StormStreamConfig} from "@stormstreaming/stormlibrary";

export {StormPlayer} from "./StormPlayer";

export function create(playerConfig:StormPlayerConfig, streamConfig:StormStreamConfig, wait:boolean = false):StormPlayer{
    return new StormPlayer(playerConfig, streamConfig, wait);
}

customElements.define("storm-player", StormPlayerCustomElement);
