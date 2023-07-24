import { StormPlayer } from "./StormPlayer";
import { StormLibrary, StormStreamConfig } from "@stormstreaming/stormlibrary";
export declare class LibraryManager {
    private stormPlayer;
    private config;
    private library;
    private resolutionTimeout;
    private isFullScreenMode;
    private currWidth;
    private currHeight;
    constructor(config: StormStreamConfig, stormPlayer: StormPlayer);
    getConfig(): StormStreamConfig;
    getLibrary(): StormLibrary;
    initializeLibrary(): void;
    private attachListeners;
    checkResolution(): void;
    destroy(): void;
}
