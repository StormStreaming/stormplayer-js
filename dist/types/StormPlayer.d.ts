import { Dispatcher } from "./events/Dispatcher";
import { MainElement } from "./ui/MainElement";
import { LibraryManager } from "./LibraryManager";
import { StormLibrary } from "@stormstreaming/stormlibrary";
import { StormGUIConfigImpl } from "./StormGUIConfigImpl";
import { StormPlayerConfig } from "./types/StormPlayerConfig";
import { StormLibraryConfig } from "@stormstreaming/stormlibrary";
export declare class StormPlayer extends Dispatcher {
    private static NEXT_PLAYER_ID;
    private readonly instanceID;
    private guiConfig;
    private mainElement;
    private libraryManager;
    private readonly origGUIConfig;
    private readonly origLibraryConfig;
    private started;
    waitingRoom: boolean;
    constructor(guiConfig: StormPlayerConfig, stormLibraryConfig: any, wait?: boolean);
    initialize(): void;
    setLibraryManager(): void;
    addCuePoint(title: string, time: number): void;
    removeCuePoint(time: number): void;
    getLibrary(): StormLibrary;
    getInstanceID(): string;
    getMainElement(): MainElement;
    setSize(width: number, height: number): void;
    setWidth(width: number): void;
    setHeight(height: number): void;
    setStyle(config: any): void;
    getWidth(): number;
    getHeight(): number;
    setTitle(title: string): void;
    setSubtitle(subtitle: string): void;
    getGuiConfig(): StormGUIConfigImpl;
    getOrigLibraryConfig(): StormLibraryConfig;
    getOrigGUIConfig(): StormPlayerConfig;
    getLibraryManager(): LibraryManager;
    isTouchDevice(): boolean;
    destroy(): void;
}
