import "../styles/index.scss";
import { StormPlayerConfig } from "./types/StormPlayerConfig";
import { StormPlayer } from "./StormPlayer";
import { StormLibraryConfig } from "@stormstreaming/stormlibrary";
import StormPlayerCustomElement from "./StormPlayerElement";

export default function(playerConfig:StormPlayerConfig, libraryConfig:StormLibraryConfig):StormPlayer{
    return new StormPlayer(playerConfig, libraryConfig);
}

customElements.define("storm-player", StormPlayerCustomElement);