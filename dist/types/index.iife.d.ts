import "../styles/index.scss";
import { StormPlayerConfig } from "./types/StormPlayerConfig";
import { StormPlayer } from "./StormPlayer";
import { StormLibraryConfig } from "@stormstreaming/stormlibrary";
export default function (playerConfig: StormPlayerConfig, libraryConfig: StormLibraryConfig): StormPlayer;
