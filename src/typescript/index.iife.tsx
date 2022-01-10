import "../styles/index.scss";
import { StormPlayerConfig } from "./types/StormPlayerConfig";
import { StormPlayer } from "./StormPlayer";
import { StormLibraryConfig } from "@stormstreaming/stormlibrary";
import StormPlayerCustomElement from "./StormPlayerElement";

export default function(playerConfig:StormPlayerConfig, libraryConfig:StormLibraryConfig, wait:boolean):StormPlayer{
    return new StormPlayer(playerConfig, libraryConfig, wait);
}

customElements.define("storm-player", StormPlayerCustomElement);