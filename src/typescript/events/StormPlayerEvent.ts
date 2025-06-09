import {StormPlayer} from "../StormPlayer";
import {ISourceItem, StormLibrary, PlaybackState, StreamState, QualityItem, StreamMetadata} from "@stormstreaming/stormlibrary";
import {PlayerConfigManager} from "@app/typescript/PlayerConfigManager";

export interface StormPlayerEvent {

    /**
     * This event is triggered when a player instance is initialized via initialize() method.
     */
    "playerReady": {ref:StormPlayer};

    /**
     * This event is fired when a player instance initiates a connection with a Storm Streaming Server/Cloud instance.
     */
    "serverConnectionInitiate": {ref:StormPlayer, serverURL:string};

    /**
     * This event is triggered when a player instance successfully establishes a connection with a Storm Streaming Server/Cloud instance.
     */
    "serverConnect": {ref:StormPlayer, serverURL:string};

    /**
     *  This event is called when a player instance is disconnected from the Storm Streaming Server/Cloud (after a connection was previously established), which may occur due to viewer networking issues or Storm Streaming Server/Cloud problems
     */
    "serverDisconnect": {ref:StormPlayer, serverURL:string, restart:boolean};

    /**
     * This event is fired whenever a player instance needs to restart a connection with a Storm Streaming Server/Cloud instance.
     */
    "serverConnectionRestart": {ref:StormPlayer, isSilent:boolean}

    /**
     * This event is triggered when a player instance fails to establish a connection with a Storm Streaming Server/Cloud instance, possibly due to networking issues. If there are additional servers on the configuration list and the "restartOnError" parameter is set to true, the player will attempt to connect to a different server instead
     */
    "serverConnectionError": {ref:StormPlayer, serverURL:string, restart:boolean};

    /**
     * This event is associated with serverConnectionError. If a player instance is unable to connect to any of the servers provided in the configuration list, this event indicates that no further action can be taken.
     */
    "allConnectionsFailed": {ref:StormPlayer, mode:string};

    /**
     * Certain browsers and devices do not permit a video element to initiate on its own and necessitate direct user interaction, such as a mouse click or a touch gesture. This event signifies that such an engagement is required.
     */
    "interactionRequired": {ref:StormPlayer, mode:string};

    /**
     * This event is triggered if a browser or device does not support any of the provided sources. Please note that the player will attempt all possible measures (switching between various modes) to ensure maximum compatibility with a given device. However, there may be instances where it is simply impossible to initiate a video.
     */
    "compatibilityError": {ref:StormPlayer, message:string};

    /**
     * This event is indicates that a request for a stream playback has been created.
     */
    "playbackRequest": {ref:StormPlayer, streamKey:string}

    /**
     * This event is fired whenever a playback of a stream is successfully requested form a Storm Streaming Server/Cloud instance.
     */
    "playbackInitiate": {ref:StormPlayer, streamKey:string};

    /**
     * This event indicates a video content is being readied for playback. The video buffer must fill in order for the video to start
     */
    "bufferingStart": {ref:StormPlayer};

    /**
     * This event indicates that the buffer is full and playback is about to start.
     */
    "bufferingComplete": {ref:StormPlayer};

    /**
     * This event notifies that video playback has started (video is now playing)
     */
    "playbackStart": {ref:StormPlayer, streamKey:string | null};

    /**
     * This event notifies that video playback has been paused (due to end-user or system interaction)
     */
    "playbackPause": {ref:StormPlayer, streamKey:string | null};

    /**
     * This event is fired when the playback is forcefully paused by the system (not by user interaction)
     */
    "playbackForcePause": {ref:StormPlayer}

    /**
     * This event is fired when the playback is forcefully muted by the system (not by user interaction)
     */
    "playbackForceMute": {ref:StormPlayer}

    /**
     * This event notifies that video playback has been stopped
     */
    "playbackStop": {ref:StormPlayer, streamKey:string | null};

    /**
     * This event informs on video progress, stream/playback start-time, stream/playback duration and nDVR cache size
     */
    "playbackProgress": {ref:StormPlayer, streamKey:string, streamStartTime:number, streamDuration:number, playbackStartTime:number, playbackDuration:number, dvrCacheSize:number};

    /**
     * This event indicates that there was a problem with the playback (it usually means that the browser was not able to play a source material due to malformed bitcode)
     */
    "playbackError": {ref:StormPlayer, mode:string, streamKey:string};

    /**
     * This event is called whenever a stream with a specific name was not found on the server (this includes hibernated streams or sub-streams)
     */
    "streamNotFound": {ref:StormPlayer, streamKey:string};

    /**
     * This event delivers optional stream data that was provided by the publisher
     */
    "optionalStreamData": {ref:StormPlayer, optData:any}

    /**
     * This event is fired when a subscription request is initiated
     */
    "subscriptionStart": {ref:StormPlayer, streamKey:string}

    /**
     * This event is fired when a subscription request is completed
     */
    "subscriptionComplete": {ref:StormPlayer, streamKey:string, sourceList:Array<ISourceItem>}

    /**
     * This event notifies that a subscription request has failed
     */
    "subscriptionFailed": {ref:StormPlayer, streamKey:string}

    /**
     * This event notifies that stream state has changed (stream state always refers to the original stream on a server)
     */
    "streamStateChange": {ref:StormPlayer, streamKey:string | null, state:StreamState}

    /**
     * This event informs on video playback state change
     */
    "playbackStateChange": {ref:StormPlayer, streamKey:string | null, state:PlaybackState}

    /**
     * This event will be called when the stream is closed on the server side (usually it means that the broadcaster has stopped streaming, or stream was unpublished)
     */
    "streamStop": {ref:StormPlayer, streamKey:string}

    /**
     * This event is activated whenever a new video source is added to the player
     */
    "streamSourceAdd": {ref:StormPlayer, mode:string, streamKey:string};

    /**
     * This event is triggered when a player instance is initialized via initialize() method.
     */
    "sourceListUpdate": {ref:StormPlayer, sourceList:Array<ISourceItem>};

    /**
     * This event is fired whenever a list of available qualities (substreams) is updated
     */
    "qualityListUpdate": {ref:StormPlayer, qualityList:Array<QualityItem>}

    /**
     * This event informs of metadata arrival for current video. MetaData contains information about stream codecs, width, height, bitrate etc
     */
    "streamMetadataUpdate": {ref:StormPlayer, metadata:StreamMetadata}

    /**
     * This event notifies that video volume was changed (either its value was changed, or video was muted/un-muted)
     */
    "volumeChange": {ref:StormPlayer, volume:number, muted:boolean, invokedBy:"user" | "browser"};

    /**
     * This event is triggered whenever a video element within a player instance is either created or recreated
     */
    "videoElementCreate": {ref:StormPlayer, videoElement:HTMLVideoElement};

    /**
     * This event is fired whenever a player is detached or attached to a new container
     */
    "containerChange": {ref:StormPlayer, container: HTMLElement | null;};

    /**
     * This event is triggered when the video size is changed or updated
     */
    "resizeUpdate": {ref:StormPlayer, width:number, height:number};

    /**
     * This event is fired when the video source is downgraded due to bandwidth limitations
     */
    "sourceDowngrade": {ref:StormPlayer, bandwidthCap:number};

    /**
     * This event is fired when the video is successfully unmuted
     */
    "videoUnmuted": {ref:StormPlayer};

    /**
     * This event is fired if an SSL layer is required for specific sources and the browser does not provide it
     */
    "SSLError": { ref:StormPlayer, mode:string};

    /**
     * This event is fired when there is a protocol version mismatch between the client and server
     */
    "incompatibleProtocol": {ref:StormPlayer, clientProtocolVer:number, serverProtocolVersion:number};

    /**
     * This event is fired when a player instance fails to authorize with a server application on Storm Streaming Server/Cloud instance (e.g. incorrect token)
     */
    "authorizationError": {ref:StormPlayer};

    /**
     * This event is called when a player instance successfully authorizes with a server application on Storm Streaming Server/Cloud instance
     */
    "authorizationComplete": {ref:StormPlayer};

    /**
     * This event is fired whenever a Storm Streaming Server/Cloud license expires
     */
    "invalidLicense": {ref:StormPlayer}

    /**
     * This event notifies that basic stream configuration has been updated
     */
    "streamConfigChange": {ref:StormPlayer, newConfig:PlayerConfigManager}

    /**
     * This event is fired whenever a player instance enters browser fullscreen mode (either native or overlay type)
     */
    "fullScreenEnter": {ref:StormPlayer}

    /**
     * This event is fired whenever a player instance exits fullscreen mode (either native or overlay type)
     */
    "fullScreenExit": {ref:StormPlayer}


    "interfaceReady": {ref:StormPlayer};

    "cuePointAdd": {ref:StormPlayer, label:string, time:number};

    "cuePointRemove": {ref:StormPlayer, time:number};

    "libraryCreate" : {ref:StormPlayer, library:StormLibrary};

    "libraryInitialize" : {ref:StormPlayer, library:StormLibrary};

    "playClick": {ref:StormPlayer};

    "pauseClick": {ref:StormPlayer};

    "muteClick": {ref:StormPlayer};

    "unmuteClick": {ref:StormPlayer};

    "videoClick": {ref:StormPlayer};

    "volumeSet": {ref:StormPlayer, volume:number};

    "qualitySet": {ref:StormPlayer, label:string};

    "seekSet": {ref:StormPlayer, time:number};

    "seekStart": {ref:StormPlayer};

    "seekEnd": {ref:StormPlayer};

    "fullscreenEnter": {ref:StormPlayer};

    "fullscreenExit": {ref:StormPlayer};

    "waitingRoomCreated": {ref:StormPlayer};

    "waitingRoomEnded": {ref:StormPlayer};

    "guiShow": {ref:StormPlayer};

    "guiHide": {ref:StormPlayer};

    "hidePoster": {ref:StormPlayer, autoStart:boolean};

    "titleUpdate": {ref:StormPlayer, title:string, newHeight:number};

    "subtitleUpdate": {ref:StormPlayer, subtitle:string, newHeight:number};

    "boxStatShown": {ref:StormPlayer};

    "boxStatHid": {ref:StormPlayer};

    "contextMenuShown": {ref:StormPlayer, e: MouseEvent};

    "contextMenuHid": {ref:StormPlayer};

    "errorShown": {ref:StormPlayer, message:string};

    "qualitySwitchClick": {ref:StormPlayer};

    "qualityChange": {ref:StormPlayer, qualityId:number};

    "resize": {ref:StormPlayer, newWidth:number, newHeight:number};

    "streamStartNotification": {ref:StormPlayer}

    "playerConfigUpdate": {ref:StormPlayer};

    "streamConfigUpdate": {ref:StormPlayer};
}


