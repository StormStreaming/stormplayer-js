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
    private libraryEvents;
    private videoElement;
    constructor(stormPlayer: StormPlayer);
    initialize(config: StormStreamConfig): void;
    getConfig(): StormStreamConfig;
    getLibrary(): StormLibrary;
    setStreamConfig(streamConfig: StormStreamConfig): void;
    initializeLibrary(): void;
    private attachListeners;
    checkResolution(): void;
    destroy(): void;
}
