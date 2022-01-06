import { StormPlayer } from "./StormPlayer";
import { StormLibraryConfig, StormLibrary } from "@stormstreaming/stormlibrary";
export declare class LibraryManager {
    private stormPlayer;
    private config;
    private library;
    constructor(config: StormLibraryConfig, stormPlayer: StormPlayer);
    getConfig(): StormLibraryConfig;
    getLibrary(): StormLibrary;
    initializeLibrary(): void;
    private attachListeners;
}
