# [Storm JavaScript Player](http://stormstreaming.com/)

Storm Player is a fully customizable GUI wrapper project for Storm Library, which can act as ready-to use Web Video Player or work as a template for creating your own, customizable players.
It is a part of *Storm Streaming Suite* and requires *Storm Streaming Server* instance or *Cloud* subscription to work.

If you wish to test the player, check its API, look code snippets please visit our demo page: https://www.stormstreaming.com/demo/index.html

To get started check our examples and documentation at https://www.stormstreaming.com/docs/v3

# Installation

1. Using NPM:

> `npm install @stormstreaming/stormplayer`

2. Using Yarn:

> `yarn add @stormstreaming/stormplayer`

3. Manually - if you are unfamiliar with NPM/Yarn or simply want to test it out, just download the `/dist/iife/index.js` file and embed it on your website.

## Sample setup

1. *IIFE* (Immediately-Invoked Function Expression).

```html
<!doctype html>
<html lang="en">
<head>
    <title>Storm JavaScript Player - IIFE Sample page</title>
    <meta charset="UTF-8"/>
    <script src="dist/iife/index.js"></script>
</head>
<body>
<div id="container"></div>
<script>
    /*
     * Standard library configuration object
     */
    const streamConfig = {
        stream: {
            serverList: [                                // list of streaming servers, 2nd, 3rd etc. will be used as backup
                {
                    host: "localhost",                   // host or IP address of a Storm Streaming server instance
                    application: "live",                 // application name (can be configured in Storm server settings)
                    port: 80,                            // server port, usually 80 (non-ssl) or 443 (ssl)
                    ssl: false                           // whether SSL connection should be used or not
                }
            ],
            streamKey: "test"                             // default streamKey to which player subscribes
        },
        settings: {
            autoStart: true,                              // if set to true, video will start playing automatically, but will be muted too
            debug: {
                console: {                                // console output
                    enabled: true                         // if console output is activated
                }
            }
        }
    };

    /*
     * Standard player configuration object
     */
    const playerConfig = {
        containerID: "container",                        // HTML container where player will be added
        aspectRatio: "16:9",                             // <video> element will scale to provided aspect-ratio. This parameter is optional and will overwrite "height" parameter as "width" will only be used for calculations
        width: "100%",                                   // <video> element width, can be either "px" or "%" (string), as (number) will always be "px" value. For % it'll auto-scale to parent container
        title: "Title goes here",                        // title for the stream
        subtitle: "This is going to be epic!",           // subtitle for the stream
    };

    /*
     * Each player instance must be provided with both player (gui) and library configs
     */
    const storm = stormPlayer(playerConfig, streamConfig);

</script>
</body>
</html>
```

2. *UMD* (Universal Module Definition).

```html
<!doctype html>
<html lang="en">
<head>
    <title>Storm JavaScript Player - UMD Sample page</title>
    <meta charset="UTF-8"/>
    <script src="../dist/umd/index.js"></script>
</head>
<body>
<div id="container"></div>
<script>
    /*
     * Standard library configuration object
     */
    const streamConfig = {
        stream: {
            serverList: [                                // list of streaming servers, 2nd, 3rd etc. will be used as backup
                {
                    host: "localhost",                   // host or IP address of a Storm Streaming server instance
                    application: "live",                 // application name (can be configured in Storm server settings)
                    port: 80,                            // server port, usually 80 (non-ssl) or 443 (ssl)
                    ssl: false                           // whether SSL connection should be used or not
                }
            ],
            streamKey: "test"                            // default streamKey to which player subscribes
        },
        settings: {
            autoStart: true,                              // if set to true, video will start playing automatically
            debug: {
                console: {                                // console output
                    enabled: true                         // if console output is activated
                }
            }
        }
    };

    /*
     * Standard player configuration object
     */
    const playerConfig = {
        containerID: "container",                        // HTML container where player will be added
        aspectRatio: "16:9",                             // <video> element will scale to provided aspect-ratio. This parameter is optional and will overwrite "height" parameter as "width" will only be used for calculations
        width: "100%",                                   // <video> element width, can be either "px" or "%" (string), as (number) will always be "px" value. For % it'll auto-scale to parent container
        title: "Title goes here",                        // title for the stream
        subtitle: "This is going to be epic!",           // subtitle for the stream
    };
    
    /*
     * Creating an instance of the storm player
     */
    const storm = stormPlayer.create(playerConfig, streamConfig);

</script>
</body>
</html>
```

3. *ESM* (ECMAScript Module).

```javascript
import { StormPlayer } from "../dist/esm/index.js";

/*
 * Standard library configuration object
 */
const streamConfig = {
    stream: {
        serverList: [                                // list of streaming servers, 2nd, 3rd etc. will be used as backup
            {
                host: "localhost",                   // host or IP address of a Storm Streaming server instance
                application: "live",                 // application name (can be configured in Storm server settings)
                port: 80,                            // server port, usually 80 (non-ssl) or 443 (ssl)
                ssl: false                           // whether SSL connection should be used or not
            }
        ],
        streamKey: "test"                            // default streamKey to which player subscribes
    },
    settings: {
        autoStart: true,                              // if set to true, video will start playing automatically
        debug: {
            console: {                                // console output
                enabled: true                         // if console output is activated
            }
        }
    }
};

/*
 * Standard player configuration object
 */
const playerConfig = {
    containerID: "container",                        // HTML container where player will be added
    aspectRatio: "16:9",                             // <video> element will scale to provided aspect-ratio. This parameter is optional and will overwrite "height" parameter as "width" will only be used for calculations
    width: "100%",                                   // <video> element width, can be either "px" or "%" (string), as (number) will always be "px" value. For % it'll auto-scale to parent container
    title: "Title goes here",                        // title for the stream
    subtitle: "This is going to be epic!",           // subtitle for the stream
};

/*
 * Each player instance must be provided with both player (gui) and library configs
 */
const storm = new StormPlayer(playerConfig, streamConfig);
```

4. *AMD* (Asynchronous Module Definition).

```html
<!doctype html>
<html lang="en">
<head>
    <title>Storm JavaScript Player - AMD Sample page</title>
    <meta charset="UTF-8"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"></script>
</head>
<body>
<div id="container"></div>
<script>
    /*
     * Standard library configuration object
     */
    const streamConfig = {
        stream: {
            serverList: [                                // list of streaming servers, 2nd, 3rd etc. will be used as backup
                {
                    host: "localhost",                   // host or IP address of a Storm Streaming server instance
                    application: "live",                 // application name (can be configured in Storm server settings)
                    port: 80,                            // server port, usually 80 (non-ssl) or 443 (ssl)
                    ssl: false                           // whether SSL connection should be used or not
                }
            ],
            streamKey: "test"                            // default streamKey to which player subscribes
        },
        settings: {
            autoStart: true,                              // if set to true, video will start playing automatically
            debug: {
                console: {                                // console output
                    enabled: true                         // if console output is activated
                }
            }
        }
    };

    /*
     * Standard player configuration object
     */
    const playerConfig = {
        containerID: "container",                        // HTML container where player will be added
        aspectRatio: "16:9",                             // <video> element will scale to provided aspect-ratio. This parameter is optional and will overwrite "height" parameter as "width" will only be used for calculations
        width: "100%",                                   // <video> element width, can be either "px" or "%" (string), as (number) will always be "px" value. For % it'll auto-scale to parent container
        title: "Title goes here",                        // title for the stream
        subtitle: "This is going to be epic!",           // subtitle for the stream
    };

    /*
     * Path to the AMD module
     */
    requirejs(['../dist/amd/index'], function (storm) {

        /*
         * Player instance
         */
        const player = storm.create(playerConfig, streamConfig);

    });
</script>
</body>
</html>
```

## Attaching and detaching events

```javascript
/*
 * An event can be registered using addEventListener method (preferably before initialize() method is called)
 */
player.addEventListener("playerCoreReady", onPlayerReady);

/*
 * Inline functions work well too...
 */
player.addEventListener("playerCoreReady", function(event){
    console.log("Player is ready!");
});

/*
 * An event can also be removed...
 */
player.removeEventListener("playerCoreReady", onPlayerReady);

/*
 * All event listeners of a specific type can be removed like this
 */
player.removeEventListener("playerCoreReady");
```

## Player Event List

| Event name           |              Additional data              | Description                                                                                          | Can be fired more than once |
|:---------------------|:-----------------------------------------:|:-----------------------------------------------------------------------------------------------------|:---------------------------:|
| `interfaceReady`     |                     -                     | Event fires when the player interface is ready. This action takes place before libraryCreated event. |             no              |
| `libraryCreate`      |                     -                     | Event fires when the player library is created. This action takes place after interfaceReady event.  |             no              |
| `libraryInitialize`  |                     -                     | Event fires when the Storm JavaScript Library is initialized.                                        |             no              |
| `playClick`          |                     -                     | Event fires when user clicks any play button.                                                        |             yes             |
| `pauseClick`         |                     -                     | Event fires when user clicks the pause button.                                                       |             yes             |
| `videoClick`         |                     -                     | Event fires when user clicks the video screen.                                                       |             yes             |
| `muteClick`          |                     -                     | Event fires when user mutes the volume.                                                              |             yes             |
| `unmuteClick`        |                     -                     | Event fires when volume is unmuted.                                                                  |             yes             |
| `qualitySwitchClick` |                     -                     | Event fires when user clicks the quality switch button.                                              |             yes             |
| `sourceChange`       |                     -                     | Event fires when a stream source is changed.                                                         |             yes             |
| `fullscreenEnter`    |                     -                     | Event fires when user enters fullscreen mode.                                                        |             yes             |
| `fullscreenExit`     |                     -                     | Event fires when user exits fullscreen mode.                                                         |             yes             |
| `errorMessage`       |                     -                     | Event fires whenever an error message appears.                                                       |             yes             |
| `guiShow`            |                     -                     | Event fires whenever player interface becomes visible (e.g. user mouse activity).                    |             yes             |
| `guiHide`            |                     -                     | Event fires whenever player interface becomes invisible (user mouse inactivity).                     |             yes             |
| `titleUpdate`        |                     -                     | Event fires whenever a stream title is added or updated.                                             |             yes             |
| `subtitleUpdate`     |                     -                     | Event fires whenever a stream subtitle is added or updated.                                          |             yes             |
| `seekStart`          |                     -                     | Event fires whenever a user grabs progress bar thumb (mouse button down).                            |             yes             |
| `seekEnd`            |                     -                     | Event fires whenever a user releases progress bar thumb (mouse button up).                           |             yes             |
| `seekSet`            |                     -                     | Event fires everytime a user clicks on a progress bar or releases progress bar thumb in a new place. |             yes             |
| `cuePointAdd`        |                     -                     | Event fires every time new CUE Point is added.                                                       |             yes             |
| `cuePointRemove`     |                     -                     | Event fires whenever an existing CUE Point is removed.                                               |             yes             |
| `resize`             | newWidth:*number*, newHeight:*number* | Event fires whenever player size is changed.                                                         |             yes             |

## Library Event List (inherited from Storm Library)

| Event name                 |                     Additional data                     | Description                                                                                                                                                                                                                                                                                                                        | Can be fired more than once |
|:---------------------------|:-------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------------------------:|
| `serverConnectionInitiate` |                  serverURL:*string*                   | Fired when a library instance initiates a connection with a Storm Streaming Server/Cloud instance.                                                                                                                                                                                                                                 |  yes (once per connection)  |
| `serverConnect`            |                  serverURL:*string*                   | Triggered when a library instance successfully establishes a connection with a Storm Streaming Server/Cloud instance.                                                                                                                                                                                                              |  yes (once per connection)  |
| `serverDisconnect`         |                  serverURL:*string*                   | Called when a library instance is disconnected from the Storm Streaming Server/Cloud (after a connection was previously established), which may occur due to viewer networking issues or Storm Streaming Server/Cloud problems.                                                                                                    |  yes (once per connection)  |
| `serverConnectionRestart`  |                  isSilent:*boolean*                   | Fired whenever a library instance needs to restart a connection with a Storm Streaming Server/Cloud instance.                                                                                                                                                                                                                      |  yes (once per connection)  |
| `serverConnectionError`    |                  serverURL:*string*                   | Triggered when a library instance fails to establish a connection with a Storm Streaming Server/Cloud instance, possibly due to networking issues. If there are additional servers on the configuration list and the "restartOnError" parameter is set to true, the library will attempt to connect to a different server instead. |  yes (once per connection)  |
| `allConnectionsFailed`     |                            -                            | Associated with _serverConnectionError_. If a library instance is unable to connect to any of the servers provided in the configuration list, this event indicates that no further action can be taken.                                                                                                                            |             no              |
| `playerCoreReady`          |                            -                            | Triggered when a library instance is initialized via the initialize() method.                                                                                                                                                                                                                                                      |             no              |
| `compatibilityError`       |                            -                            | Triggered if a browser or device does not support any of the provided sources. Please note that the library will attempt all possible measures (switching between various modes) to ensure maximum compatibility with a given device. However, there may be instances where it is simply impossible to initiate a video.           |             yes             |
| `interactionRequired`      |                            -                            | Certain browsers and devices do not permit a video element to initiate on its own and necessitate direct user interaction, such as a mouse click or a touch gesture. This event signifies that such an engagement is required.                                                                                                     |             no              |
| `SSLError`                 |                            -                            | Triggered if an SSL layer is required for specific sources and the browser does not provide it.                                                                                                                                                                                                                                    |             no              |
| `videoElementCreate`       |            videoElement:*HTMLVideoElement*            | Triggered whenever a video element within a library instance is either created or recreated.                                                                                                                                                                                                                                       |             no              |
| `authorizationError`       |                            -                            | Fired when a library instance fails to authorize with a server application on a Storm Streaming Server/Cloud instance (e.g., incorrect token).                                                                                                                                                                                     |             yes             |
| `authorizationComplete`    |                            -                            | Called when a library instance successfully authorizes with a server application on a Storm Streaming Server/Cloud instance.                                                                                                                                                                                                       |             yes             |
| `invalidLicense`           |                            -                            | Fired whenever a Storm Streaming Server/Cloud license expires.                                                                                                                                                                                                                                                                     |             no              |
| `streamConfigChange`       |             newConfig:*StormStreamConfig*             | Notifies that basic stream configuration has been updated.                                                                                                                                                                                                                                                                         |             yes             |
| `subscriptionStart`        |                  streamKey:*string*                   | Fired when a subscription request is initiated.                                                                                                                                                                                                                                                                                    |             yes             |
| `subscriptionComplete`     | streamKey:*string*, sourceList:*Array(ISourceItem)* | Fired when a subscription request is completed.                                                                                                                                                                                                                                                                                    |             yes             |
| `subscriptionFailed`       |                  streamKey:*string*                   | Notifies that a subscription request has failed.                                                                                                                                                                                                                                                                                   |             yes             |
| `containerChange`          |          container:*HTMLElement* \| *null*          | Fired whenever a library is detached or attached to a new container.                                                                                                                                                                                                                                                               |             yes             |
| `resizeUpdate`             |           width:*number*, height:*number*           | Triggered when the video size is changed or updated.                                                                                                                                                                                                                                                                               |             yes             |

## Playback Event List (inherited from Storm Library)

| Event name             |                                                              Additional data                                                              | Description                                                                                                                                               | Can be fired more than once |
|:-----------------------|:-----------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------|:---------------------------:|
| `playbackRequest`      |                                                           streamKey:*string*                                                            | Indicates that a request for a stream playback has been created.                                                                                          |    yes (once per video)     |
| `playbackInitiate`     |                                                                     -                                                                     | Fired whenever a playback of a stream is successfully requested from a Storm Streaming Server/Cloud instance.                                             |    yes (once per video)     |
| `playbackStart`        |                                                                     -                                                                     | Notifies that video playback has started (video is now playing).                                                                                          |             yes             |
| `playbackPause`        |                                                                     -                                                                     | Notifies that video playback has been paused (due to end-user or system interaction).                                                                     |             yes             |
| `playbackProgress`     | playbackStartTime:*number*, playbackDuration:*number*, streamStartTime:*number*, streamDuration:*number*, dvrCacheSize:*number* | Informs on video progress, stream/playback start-time, stream/playback duration and nDVR cache size.                                                      |             yes             |
| `playbackStateChange`  |                                                          state:*PlaybackState*                                                          | Informs on video playback state change.                                                                                                                   |             yes             |
| `streamStateChange`    |                                                           state:*StreamState*                                                           | Notifies that stream state has changed (stream state always refers to the original stream on a server).                                                   |             yes             |
| `streamStop`           |                                                                     -                                                                     | Called when the stream is closed on the server side (usually it means that the broadcaster has stopped streaming, or stream was unpublished).             |             yes             |
| `streamNotFound`       |                                                                     -                                                                     | Called whenever a stream with a specific name was not found on the server (this includes hibernated streams or sub-streams).                              |    yes (once per video)     |
| `streamMetadataUpdate` |                                                        metadata:*StreamMetadata*                                                        | Informs of metadata arrival for current video. MetaData contains information about stream codecs, width, height, bitrate, etc.                            |             yes             |
| `bufferingStart`       |                                                                     -                                                                     | Indicates that video content is being readied for playback. The video buffer must fill in order for the video to start.                                   |             yes             |
| `bufferingComplete`    |                                                                     -                                                                     | Indicates that the buffer is full and playback is about to start.                                                                                         |             yes             |
| `volumeChange`         |                                volume:*number*, muted:*boolean*, invokedBy:*"user"* \| *"browser"*                                | Notifies that video volume was changed (either its value was changed, or video was muted/un-muted).                                                       |             yes             |
| `playbackError`        |                                                                     -                                                                     | Indicates that there was a problem with the playback (it usually means that the browser was not able to play a source material due to malformed bitcode). |    yes (once per video)     |
| `fullScreenEnter`      |                                                                     -                                                                     | Fired whenever a library instance enters browser fullscreen mode (either native or overlay type).                                                         |             yes             |
| `fullScreenExit`       |                                                                     -                                                                     | Fired whenever a library instance exits fullscreen mode (either native or overlay type).                                                                  |             yes             |
| `qualityListUpdate`    |                                                    qualityList:*Array<QualityItem>*                                                     | Fired whenever a list of available qualities (substreams) is updated.                                                                                     |             yes             |
| `sourceDowngrade`      |                                                          bandwidthCap:*number*                                                          | Fired when the video source is downgraded due to bandwidth limitations.                                                                                   |             yes             |

## StormPlayer API

| Method                                                     |              Returns              |   Return type    | Description                                                                                                                                                                                                                                                                                                                |
|:-----------------------------------------------------------|:---------------------------------:|:----------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `initialize()`                                             |                 -                 |     *void*     | Starts the player. This method will be called automatically by the constructor unless _wait_ parameter in the constructor has been set to _false_.                                                                                                                                                                         |
| `getInstanceID()`                                          |        Instance ID number         |    *number*    | The method returns instance ID of the player.                                                                                                                                                                                                                                                                              |
| `getLibrary()`                                             |        StormLibrary Object        | *StormLibrary* | The method returns main StormLibrary object used by this player.                                                                                                                                                                                                                                                           |
| `setSize(width:number\|string, height:number\|string)`     |                 -                 |     *void*     | The method sets a new width and height for the player. The values can be given as a *number* (in which case they are treated as the number of pixels), or as a *string* ending with "px" (this will also be the number of pixels) or "%", where the number is treated as a percentage of the parent container's value. |
| `setWidth(width:number\|string)`                           |                 -                 |     *void*     | The method sets a new width for the player. The value can be given as a *number* (in which case it is treated as the number of pixels), or as a *string* ending with "px" (this will also be the number of pixels) or "%", where the number is treated as a percentage of the parent container's value.                |
| `setHeight(height:number\|string)`                         |                 -                 |     *void*     | The method sets a new height for the player. The value can be given as a *number* (in which case it is treated as the number of pixels), or as a *string* ending with "px" (this will also be the number of pixels) or "%", where the number is treated as a percentage of the parent container's value.               |
| `getWidth()`                                               |           Player width            |    *number*    | Returns player width in pixels.                                                                                                                                                                                                                                                                                            |
| `getHeight()`                                              |           Player height           |    *number*    | Returns player height in pixels.                                                                                                                                                                                                                                                                                           |
| `setTitle(title:string)`                                   |                 -                 |     *void*     | The method allows to add/change the title displayed in the upper-right corner of the player.                                                                                                                                                                                                                               |
| `setSubtitle(subtitle:string)`                             |                 -                 |     *void*     | The method allows to add/change the subtitle displayed in the upper-right corner of the player (below the title).                                                                                                                                                                                                          |
| `getPlayerConfig()`                                        | Object containing player settings |    *Object*    | This method returns an object containing all player preferences (related to its GUI).                                                                                                                                                                                                                                      |
| `setPlayerConfig(config:Object)`                           |                 -                 |     *void*     | This method pushes new player (GUI) config settings.                                                                                                                                                                                                                                                                       |
| `addCuePoint(title:string, time:number)`                   |                 -                 |     *void*     | This method adds a CUE point to the player timeline with a given title.                                                                                                                                                                                                                                                    |
| `removeCuePoint(time:number)`                              |                 -                 |     *void*     | This method removes a CUE point based on its time.                                                                                                                                                                                                                                                                         |
| `addEventListener(eventName:string, callback:function)`    |                 -                 |     *void*     | Registers an event with the player object. Whenever a registered event occurs, player will call a predefined function provided.                                                                                                                                                                                            |
| `removeEventListener(eventName:string, callback:function)` |                 -                 |     *void*     | Removes event listener from the player. If callback is not provided, all events of that type will be removed.                                                                                                                                                                                                              |

## Objects & Enums

### PlaybackState Enum

| Value         | Description                             |
|:--------------|:----------------------------------------|
| `INITIALIZED` | Component has been initialized.         |
| `PLAYING`     | Stream is playing.                      |
| `BUFFERING`   | Stream is buffering.                    |
| `PAUSED`      | Stream was paused by user or a browser. |
| `STOPPED`     | Stream has been stopped.                |
| `UNKNOWN`     | Unknown state.                          |

### StreamState Enum

| Value             | Description                                                      |
|:------------------|:-----------------------------------------------------------------|
| `NOT_INITIALIZED` | Stream has not been initialized.                                 |
| `INITIALIZED`     | Stream has been initialized.                                     |
| `NOT_FOUND`       | Stream has not been found.                                       |
| `AWAITING`        | Stream exists, but there is no data yet.                         |
| `NOT_PUBLISHED`   | Stream exists, but hasn't been published.                        |
| `PUBLISHED`       | Stream exists and it's published (can stream).                   |
| `UNPUBLISHED`     | Stream exists, but has been unublished.                          |
| `STOPPED`         | Stream existed, but has been stopped (server-side).              |
| `CLOSED`          | Stream existed, but has been removed (server-side).              |
| `UNKNOWN`         | Stream status is unknown (there is no connection to the server). |
| `ERROR`           | Error while retrieving stream status.                            |

### ScalingType Enum

| Value        | Description                                                                               |
|:-------------|:------------------------------------------------------------------------------------------|
| `FILL`       | Scales content to fill the entire container, may distort aspect ratio.                    |
| `LETTER_BOX` | Scales content to fit within container while preserving aspect ratio, may add black bars. |
| `CROP`       | Scales content to fill container while preserving aspect ratio, may crop edges.           |
| `ORIGINAL`   | Displays content at its original size without scaling.                                    |

### QualityControlMode Enum

| Value              | Description                                                                                                  |
|:-------------------|:-------------------------------------------------------------------------------------------------------------|
| `PASSIVE`          | Library will use previously saved information from RESOLUTION_AWARE mode, but it'll not react to any resize. |
| `RESOLUTION_AWARE` | Quality will depend on library screen size and source resolution (closest match).                            |
| `HIGHEST_QUALITY`  | Library will always pick the highest available quality.                                                      |
| `LOWEST_QUALITY`   | Library will always pick the lowest available quality.                                                       |
| `UNKNOWN`          | Quality mode has not been provided or Quality Control has not been initialized yet.                          |

### QualityItem Object

| Field      | Return Value | Description                                                                                              |
|:-----------|:------------:|:---------------------------------------------------------------------------------------------------------|
| `id`       |  *number*  | Returns the quality item ID, which can later be used to activate this particular quality.                |
| `label`    |  *string*  | Returns the quality label, which consists of the vertical resolution and "p", e.g., "1080p".             |
| `monogram` |  *string*  | Returns the monogram for this quality based on its resolution, e.g., "LQ", "SD", "HD", "FH", "2K", "4K". |
| `isAuto`   | *boolean*  | Returns true if this quality item is of the auto type.                                                   |

### StreamMetadata Object

| Field               | Return Value | Description                                                                                         |
|:--------------------|:------------:|:----------------------------------------------------------------------------------------------------|
| `videoWidth`        |  *number*  | Width of the video frame in pixels.                                                                 |
| `videoHeight`       |  *number*  | Height of the video frame in pixels.                                                                |
| `videoTimeScale`    |  *number*  | Time unit for video timestamps, typically expressed in Hz.                                          |
| `constantFrameRate` | *boolean*  | Indicates whether the video stream has a constant frame rate (true) or variable frame rate (false). |
| `videoDataRate`     |  *number*  | Bit rate of the video stream expressed in bits per second (bps).                                    |
| `frameRate`         |  *number*  | Number of frames per second in the video stream.                                                    |
| `encoder`           |  *string*  | Name of the software or hardware encoder used to encode the video stream.                           |
| `videoCodec`        |  *string*  | Codec used for video compression (e.g., H.264, H.265, VP9).                                         |
| `audioCodec`        |  *string*  | Codec used for audio compression (e.g., AAC, MP3, Opus).                                            |
| `audioChannels`     |  *number*  | Number of audio channels in the stream (e.g., 2 for stereo, 6 for 5.1 surround).                    |
| `audioSampleRate`   |  *number*  | Audio sampling rate expressed in Hz (e.g., 44100, 48000).                                           |
| `audioSampleSize`   |  *number*  | Bit depth of audio samples (e.g., 16, 24, 32).                                                      |
| `audioDataRate`     |  *number*  | Bit rate of the audio stream expressed in bits per second (bps).                                    |

### ServerInfo Object

| Field             | Return Value | Description                                   |
|:------------------|:------------:|:----------------------------------------------|
| `name`            |  *string*  | Common name of the server.                    |
| `group`           |  *string*  | Group name of the server.                     |
| `protocolVersion` |  *number*  | Protocol version used by the server.          |
| `serverInitTime`  |  *number*  | Server initialization time as Unix timestamp. |
| `version`         |  *number*  | Version of the server protocol.               |

---

# FAQ & Troubleshooting

## 1. What is the difference between StormPlayer and StormLibrary?

StormLibrary is the base project that provides server stream connection handling and management. However, it doesn't have a user interface (except for the video object itself). StormPlayer provides the interface and is built on top of StormLibrary.

## 2. How can I access StormLibrary methods through StormPlayer?

You can access the underlying StormLibrary instance using the `getLibrary()` method. This gives you access to all StormLibrary methods like `play()`, `pause()`, `setVolume()`, etc.

```javascript
const library = player.getLibrary();
library.play(); // Use any StormLibrary method
```

## 3. What is the difference between playbackState and streamState events?

The `playbackState` parameter refers to the video playback state in the library object. If the stream is playing, we get the `PLAYING` state; if the video is currently buffering, we have the `BUFFERING` state, etc. The `streamState` parameter refers to the stream state on the server that the library object is connected to, e.g., `NOT_FOUND` tells us that such a stream doesn't exist, and `AWAITING` means we're waiting for it to start.

## 4. Why does the player sometimes start muted and sometimes with sound from the beginning?

There are two factors to consider separately here. First, the library remembers user settings regarding volume and whether the stream is muted or not. If the user muted the stream, it will be muted immediately upon page refresh. The same applies to the volume value. However, there's also the issue of browser mechanics, where audio playback is not allowed unless the user has interacted with the page (e.g., clicking/touching). When we receive a `volumeChange` event, we also get information about whether the value change was initiated by the user or the browser, for example:

```javascript
/*
 * Example event listener for volume change event
 */
player.addEventListener("volumeChange", function(event){
    if(event.muted == true && event.invokedBy == "browser"){
        // player was muted by a browser
    }

    if(event.muted == true && event.invokedBy == "user"){
        // player was muted by a user
    }
});
```

## 5. What is the difference between player-specific events and library events?

Player-specific events (like `playClick`, `guiShow`, `guiHide`) are related to the user interface interactions, while library events (like `playbackStart`, `streamStateChange`) are related to the actual streaming and playback functionality. Both types of events can be listened to using the same `addEventListener` method on the player instance.

## 6. What is the allConnectionsFailed event for?

It's possible to define multiple Storm server addresses. If one of them doesn't work, the library will try to connect to the next one on the list. When all defined servers (even if there's only one) are marked as non-functioning, this event will be triggered.

## 7. If my project is not based on TypeScript, how should I handle ENUMs?

Each enum is essentially a string with a name analogous to its type, so:

```typescript
/*
 * TypeScript version
 */
library.setQualityControlMode(QualityControlMode.RESOLUTION_AWARE);
```

Is the same as:

```javascript
/*
 * JavaScript version
 */
library.setQualityControlMode("RESOLUTION_AWARE");
```

## 8. Will the player automatically adjust to the parent container's dimensions?

Yes, as long as the width and/or height parameters are defined as percentage values, e.g., "100%". It's also important that the parent has its size defined, which may depend on parameters like display, float, etc.

## 9. How does the aspectRatio parameter relate to width and height parameters?

The `aspectRatio` parameter forces the player to adopt dimensions in appropriate proportions. The width parameter serves as the basis for calculation, and the player's height is calculated based on it. Therefore, the height parameter can be omitted when using `aspectRatio`.

---

# Browser compatibility

- Edge 12+
- Chrome 31+
- Firefox 42+
- Safari 13+
- Opera 15+

For legacy browsers, HLS mode is used instead.

---

# Resources

- [Documentation](https://www.stormstreaming.com/docs/v3)
- [Live demo page](https://www.stormstreaming.com/demo/index.html)
- [Storm Library Project](https://github.com/StormStreaming/stormlibrary-js)
- [Changelog](CHANGELOG.md)

---

# License

- [License](LICENSE.txt)