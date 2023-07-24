import "../styles/index.scss";
import {StormPlayerConfig} from "./types/StormPlayerConfig";
import {StormPlayer} from "./StormPlayer";
import {StormStreamConfig} from "@stormstreaming/stormlibrary";
import StormPlayerCustomElement from "./StormPlayerElement";

export default function(playerConfig:StormPlayerConfig, stormConfig:StormStreamConfig, wait:boolean):StormPlayer{
    return new StormPlayer(playerConfig, stormConfig, wait);
}

customElements.define("storm-player", StormPlayerCustomElement);