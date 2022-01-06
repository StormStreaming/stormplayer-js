import { Dispatcher } from "./events/Dispatcher";
import { MainElement } from "./ui/MainElement";
import { LibraryManager } from "./LibraryManager";
import { StormLibrary } from "@stormstreaming/stormlibrary";
import { StormGUIConfigImpl } from "./StormGUIConfigImpl";
import { StormPlayerConfig } from "./types/StormPlayerConfig";
export declare class StormPlayer extends Dispatcher {
    private static NEXT_PLAYER_ID;
    private instanceID;
    private readonly guiConfig;
    private readonly mainElement;
    private readonly libraryManager;
    constructor(guiConfig: StormPlayerConfig, stormLibraryConfig: any);
    addCuePoint(title: string, time: number): void;
    removeCuePoint(time: number): void;
    getLibrary(): StormLibrary;
    getInstanceID(): string;
    getMainElement(): MainElement;
    setSize(width: number, height: number): void;
    setTitle(title: string): void;
    setSubtitle(subtitle: string): void;
    getGuiConfig(): StormGUIConfigImpl;
    getLibraryManager(): LibraryManager;
    isTouchDevice(): boolean;
    destroy(): void;
}
