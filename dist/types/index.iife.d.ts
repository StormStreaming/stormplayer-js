import "../styles/index.scss";
import { StormPlayerConfig } from "./types/StormPlayerConfig";
import { StormPlayer } from "./StormPlayer";
import { StormStreamConfig } from "@stormstreaming/stormlibrary";
export default function (playerConfig: StormPlayerConfig, stormConfig: StormStreamConfig, wait: boolean): StormPlayer;
