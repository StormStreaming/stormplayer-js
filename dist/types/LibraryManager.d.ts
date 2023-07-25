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
    constructor(stormPlayer: StormPlayer);
    initialize(config: StormStreamConfig): void;
    getConfig(): StormStreamConfig;
    getLibrary(): StormLibrary;
    initializeLibrary(): void;
    addEventListener(event: any, callback: any): boolean;
    removeEventListener(event: string | number, callback?: any): boolean;
    private attachListeners;
    checkResolution(): void;
    destroy(): void;
}
