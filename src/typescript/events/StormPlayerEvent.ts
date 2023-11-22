import {StormPlayer} from "../StormPlayer";
import {StormMetaDataItem} from "@stormstreaming/stormlibrary/dist/types/model/StormMetaDataItem";
import {StormLibrary} from "@stormstreaming/stormlibrary";

export interface StormPlayerEvent {

    "playerCoreReady": {ref:StormPlayer};
    "serverConnectionInitiate": {ref:StormPlayer, serverURL:string};
    "serverConnect": {ref:StormPlayer, serverURL:string};
    "serverDisconnect": {ref:StormPlayer, serverURL:string, restart:boolean};
    "serverConnectionError": {ref:StormPlayer, serverURL:string, restart:boolean};
    "allConnectionsFailed": {ref:StormPlayer, mode:string};
    "interactionRequired": {ref:StormPlayer, mode:string};
    "compatibilityError": {ref:StormPlayer, message:string};
    "playbackInitiate": {ref:StormPlayer, streamKey:string}
    "bufferingStart": {ref:StormPlayer, mode:string}
    "bufferingComplete": {ref:StormPlayer, mode:string}
    "playbackStart": {ref:StormPlayer, mode:string, streamKey:string}
    "playbackPause": {ref:StormPlayer, mode:string, streamKey:string}
    "playbackStop": {ref:StormPlayer, mode:string, streamKey:string}
    "playbackProgress": {ref:StormPlayer, streamKey:string, streamStartTime:number, streamDuration:number, playbackStartTime:number, playbackDuration:number, dvrCacheSize:number}
    "playbackError": {ref:StormPlayer, mode:string, streamKey:string}
    "streamNotFound": {ref:StormPlayer, streamKey:string}
    "newStreamSourceAdded": {ref:StormPlayer, mode:string, streamKey:string}
    "metadataReceived": {ref:StormPlayer, metadata:StormMetaDataItem}
    "volumeChange": {ref:StormPlayer, mode:string, volume:number, muted:boolean, invokedBy:"user" | "browser"};
    "awaitingStream": {ref:StormPlayer, streamKey:string}
    "streamEnd": {ref:StormPlayer, streamKey:string}
    "videoElementCreate": {ref:StormPlayer, videoElement:HTMLVideoElement};
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
    "titleAdded": {ref:StormPlayer, title:string, newHeight:number}
    "subtitleAdd": {ref:StormPlayer, subtitle:string, newHeight:number}
    "boxStatShown": {ref:StormPlayer}
    "boxStatHid": {ref:StormPlayer}
    "contextMenuShown": {ref:StormPlayer, e: MouseEvent}
    "contextMenuHid": {ref:StormPlayer}
    "errorShown": {ref:StormPlayer, message:string}
    "qualitySwitchClicked": {ref:StormPlayer}
    "qualityChanged": {ref:StormPlayer, label:string}
    "SSLError":  { ref:StormPlayer, mode:string};
    "incompatibleProtocol": {ref:StormPlayer, clientProtocolVer:number,serverProtocolVersion:number}
    "invalidLicense": {ref:StormPlayer}
    "resize": {ref:StormPlayer, newWidth:number, newHeight:number}
    "playerConfigUpdated": {ref:StormPlayer}
    "streamConfigUpdated": {ref:StormPlayer}
}
