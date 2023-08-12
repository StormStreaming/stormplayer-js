import {StormPlayer} from "../StormPlayer";
import {StormMetaDataItem} from "@stormstreaming/stormlibrary/dist/types/model/StormMetaDataItem";
import {StormLibrary} from "@stormstreaming/stormlibrary";

export interface StormPlayerEvent {
    "libraryReady": {ref:StormPlayer, mode:"mse" | "hls" | "webrtc"};
    "libraryConnected": {ref:StormPlayer, mode:string, serverURL:string};
    "libraryDisconnected": {ref:StormPlayer, mode:string, serverURL:string};
    "libraryConnectionFailed": {ref:StormPlayer, mode:string, serverURL:string};
    "allConnectionsFailed": {ref:StormPlayer, mode:string};
    "interactionRequired": {ref:StormPlayer, mode:string};
    "compatibilityError": {ref:StormPlayer, message:string};
    "playbackInitiated": {ref:StormPlayer, mode:string, streamKey:string}
    "streamBuffering": {ref:StormPlayer, mode:string, streamKey:string}
    "playbackStarted": {ref:StormPlayer, mode:string, streamKey:string}
    "playbackPaused": {ref:StormPlayer, mode:string, streamKey:string}
    "playbackStopped": {ref:StormPlayer, mode:string, streamKey:string}
    "playbackProgress": {ref:StormPlayer, mode:string, streamKey:string, streamStartTime:number, streamDuration:number, playbackStartTime:number, playbackDuration:number, dvrCacheSize:number}
    "playbackError": {ref:StormPlayer, mode:string, streamKey:string}
    "streamNotFound": {ref:StormPlayer, mode:string, streamKey:string}
    "newStreamSourceAdded": {ref:StormPlayer, mode:string, streamKey:string}
    "metadataReceived": {ref:StormPlayer, mode:string, metadata:StormMetaDataItem, streamKey:string}
    "volumeChanged": {ref:StormPlayer, mode:string, volume:number, muted:boolean, invokedBy:"user" | "browser"};
    "videoElementCreated": {ref:StormPlayer, videoElement:HTMLVideoElement};
    "interfaceReady": {ref:StormPlayer}
    "cuePointAdded": {ref:StormPlayer, label:string, time:number}
    "cuePointRemoved": {ref:StormPlayer, time:number}
    "libraryCreated" : {ref:StormPlayer, library:StormLibrary}
    "libraryInitialized" : {ref:StormPlayer, library:StormLibrary}
    "playClicked": {ref:StormPlayer}
    "pauseClicked": {ref:StormPlayer}
    "muteClicked": {ref:StormPlayer}
    "unmuteClicked": {ref:StormPlayer}
    "videoClicked": {ref:StormPlayer}
    "volumeSet": {ref:StormPlayer, volume:number}
    "qualitySet": {ref:StormPlayer, label:string}
    "seekSet": {ref:StormPlayer, time:number}
    "seekStarted": {ref:StormPlayer}
    "seekEnded": {ref:StormPlayer}
    "fullscreenEntered": {ref:StormPlayer}
    "fullscreenExited": {ref:StormPlayer}
    "waitingRoomCreated": {ref:StormPlayer}
    "waitingRoomEnded": {ref:StormPlayer}
    "guiShown": {ref:StormPlayer}
    "guiHid": {ref:StormPlayer}
    "titleAdded": {ref:StormPlayer, title:string}
    "subtitleAdd": {ref:StormPlayer, subtitle:string}
    "boxStatShown": {ref:StormPlayer}
    "boxStatHid": {ref:StormPlayer}
    "contextMenuShown": {ref:StormPlayer, e: MouseEvent}
    "contextMenuHid": {ref:StormPlayer}
    "errorShown": {ref:StormPlayer, message:string}
    "qualitySwitchClicked": {ref:StormPlayer}
    "qualityChanged": {ref:StormPlayer, label:string}
    "SSLError":  { ref:StormPlayer, mode:string};
    "incompatibleProtocol": {ref:StormPlayer, mode:string, clientProtocolVer:number,serverProtocolVersion:number}
    "licenseError": {ref:StormPlayer}
    "resize": {ref:StormPlayer, newWidth:number, newHeight:number}
}
