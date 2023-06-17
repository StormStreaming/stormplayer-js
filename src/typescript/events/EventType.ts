/**
 * Enums for events
 */
export enum EventType {

    GUI_INITIALIZED = "interfaceReady",
    LIBRARY_CREATED = "libraryCreated",
    LIBRARY_INITIALIZED = "libraryInitialized",

    PLAY_CLICKED = "playClick",
    PAUSE_CLICKED = "pauseClick",
    TOGGLE_CLICKED = "videoClick",
    MUTE_CLICKED = "muteClick",
    UNMUTE_CLICKED = "unmuteClick",
    QUALITY_CLICKED = "qualityBtnClick",

    QUALITY_CHANGED = "qualityChange",
    VOLUME_CHANGED = "volumeChange",

    FULLSCREEN_ENTERED = "fullscreenEnter",
    FULLSCREEN_EXITED = "fullscreenExit",

    ERROR_SHOWN = "errorMessage",
    GUI_SHOWN = "guiShow",
    GUI_HIDED = "guiHide",

    TITLE_SETTED = "titleAdd",
    SUBTITLE_SETTED = "subtitleAdd",

    SEEK_STARTED = "seekStart",
    SEEK_ENDED = "seekEnd",
    SEEK_SETTED = "seekTo",

    CUEPOINT_ADDED = "cuePointAdd",
    CUEPOINT_REMOVED = "cuePointRemove",

    BOX_STAT_SHOWN = "boxStatShow",
    BOX_STAT_HIDED = "boxStatHide",

    CONTEXT_MENU_SHOWN = "contextMenuShow",
    CONTEXT_MENU_HIDED = "contextMenuHide",

    WAITING_ROOM_CREATED = "waitingRoomCreated",
    WAITING_ROOM_ENDED = "waitingRoomEnded",

}