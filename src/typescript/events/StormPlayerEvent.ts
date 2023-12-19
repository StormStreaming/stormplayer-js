import {StormPlayer} from "../StormPlayer";
import {StormMetaDataItem} from "@stormstreaming/stormlibrary/dist/types/model/StormMetaDataItem";
import {ISourceItem, StormLibrary} from "@stormstreaming/stormlibrary";

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
    "cuePointAdd": {ref:StormPlayer, label:string, time:number}
    "cuePointRemove": {ref:StormPlayer, time:number}
    "libraryCreate" : {ref:StormPlayer, library:StormLibrary}
    "libraryInitialize" : {ref:StormPlayer, library:StormLibrary}
    "playClick": {ref:StormPlayer}
    "pauseClick": {ref:StormPlayer}
    "muteClick": {ref:StormPlayer}
    "unmuteClick": {ref:StormPlayer}
    "videoClick": {ref:StormPlayer}
    "volumeSet": {ref:StormPlayer, volume:number}
    "qualitySet": {ref:StormPlayer, label:string}
    "seekSet": {ref:StormPlayer, time:number}
    "seekStart": {ref:StormPlayer}
    "seekEnd": {ref:StormPlayer}
    "fullscreenEnter": {ref:StormPlayer}
    "fullscreenExit": {ref:StormPlayer}
    "waitingRoomCreated": {ref:StormPlayer}
    "waitingRoomEnded": {ref:StormPlayer}
    "guiShow": {ref:StormPlayer}
    "guiHide": {ref:StormPlayer}
    "hidePoster": {ref:StormPlayer, autoStart:boolean}
    "titleUpdate": {ref:StormPlayer, title:string, newHeight:number}
    "subtitleUpdate": {ref:StormPlayer, subtitle:string, newHeight:number}
    "boxStatShown": {ref:StormPlayer}
    "boxStatHid": {ref:StormPlayer}
    "contextMenuShown": {ref:StormPlayer, e: MouseEvent}
    "contextMenuHid": {ref:StormPlayer}
    "errorShown": {ref:StormPlayer, message:string}
    "qualitySwitchClick": {ref:StormPlayer}
    "sourceChange": {ref:StormPlayer, newSource:ISourceItem}
    "SSLError":  { ref:StormPlayer, mode:string};
    "incompatibleProtocol": {ref:StormPlayer, clientProtocolVer:number,serverProtocolVersion:number}
    "invalidLicense": {ref:StormPlayer}
    "resize": {ref:StormPlayer, newWidth:number, newHeight:number}
    "streamStartNotification": {ref:StormPlayer}
    "streamStateChange": {ref:StormPlayer, streamKey:string, state:string}
    "playerConfigUpdate": {ref:StormPlayer}
    "streamConfigUpdate": {ref:StormPlayer}
    "authorizationComplete": {ref:StormPlayer}
    "authorizationError": {ref:StormPlayer}
}
