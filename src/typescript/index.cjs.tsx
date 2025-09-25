import "../styles/index.scss";
import {StormPlayer} from "./StormPlayer";
import StormPlayerCustomElement from "./StormPlayerElement";
import {StormPlayerConfig} from "./types/StormPlayerConfig";
import {StormStreamConfig} from "@stormstreaming/stormlibrary";
import {StormLibraryListener} from "@stormstreaming/stormlibrary";
import {StormLibraryEvent} from "@stormstreaming/stormlibrary";
import {StormPlayerEvent} from "./events/StormPlayerEvent";
import {StormPlayerListener} from "./events/StormPlayerListener";
import {StreamMetadata} from "@stormstreaming/stormlibrary";

export type {StormPlayerConfig} from "./types/StormPlayerConfig";
export type {StormStreamConfig} from "@stormstreaming/stormlibrary";
export type {StormPlayerEvent} from "./events/StormPlayerEvent";
export type {StormPlayerListener} from "./events/StormPlayerListener";
export type {StormLibraryListener} from "@stormstreaming/stormlibrary";
export type {StormLibraryEvent} from "@stormstreaming/stormlibrary";
export type {StreamMetadata} from "@stormstreaming/stormlibrary";

export {StormPlayer} from "./StormPlayer";

export function create(playerConfig:StormPlayerConfig, streamConfig:StormStreamConfig, wait:boolean = false):StormPlayer{
    return new StormPlayer(playerConfig, streamConfig, wait);
}

customElements.define("storm-player", StormPlayerCustomElement);
