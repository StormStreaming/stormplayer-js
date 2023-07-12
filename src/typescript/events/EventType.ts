/**
 * Enums for events
 */
export enum EventType {

    GUI_INITIALIZED = "interfaceReady",
    LIBRARY_CREATED = "libraryCreated",
    LIBRARY_INITIALIZED = "libraryInitialized",
    PLAY_CLICKED = "playClicked",
    PAUSE_CLICKED = "pauseClicked",
    TOGGLE_CLICKED = "videoClicked",
    MUTE_CLICKED = "muteClicked",
    UNMUTE_CLICKED = "unmuteClicked",
    QUALITY_CLICKED = "qualityBtnClicked",
    QUALITY_CHANGED = "qualityChanged",
    VOLUME_CHANGED = "volumeChanged",
    FULLSCREEN_ENTERED = "fullscreenEntered",
    FULLSCREEN_EXITED = "fullscreenExited",
    ERROR_SHOWN = "errorMessage",
    GUI_SHOWN = "guiShowed",
    GUI_HIDED = "guiHid",
    TITLE_SETTED = "titleAdded",
    SUBTITLE_SETTED = "subtitleAdd",
    SEEK_STARTED = "seekStarted",
    SEEK_ENDED = "seekEnded",
    SEEK_SETTED = "seekTo",
    CUEPOINT_ADDED = "cuePointAdded",
    CUEPOINT_REMOVED = "cuePointRemoved",
    BOX_STAT_SHOWN = "boxStatShow",
    BOX_STAT_HIDED = "boxStatHide",

    CONTEXT_MENU_SHOWN = "contextMenuShow",
    CONTEXT_MENU_HIDED = "contextMenuHide",

    WAITING_ROOM_CREATED = "waitingRoomCreated",
    WAITING_ROOM_ENDED = "waitingRoomEnded",

}