# [Storm JavaScript Player](http://stormstreaming.com/)

Storm Player is a fully customizable GUI wrapper project for Storm Library, which can act as ready-to use Web Video Player or work as a template for creating your own, customizable players.
It is a part of **Storm Streaming Suite** and requires **Storm Streaming Server** instance or **Cloud** subscription to work.

If you wish to test the player, check its API, look code snippets please visit our demo page: https://www.stormstreaming.com/demo

To get started check our examples and documentation at https://www.stormstreaming.com/docs/javascript-getting-started

# Requirements
* Node 16.16.0+

# Installation

1. Using NPM:

> `npm install @stormstreaming/stormplayer`

2. Using Yarn:

> `yarn add @stormstreaming/stormplayer`

3. Manually - if you are clueless about NPM/Yarn or simply want to test it out, just grab`/dist/iife/index.js` file and embed it on your website.


## Project compilation

Start with downloading and installing all dependencies.
> `npm install`

Now you can build the project with:
> `npm run build`

For development, you can use:
> `npm run dev`


## Sample setup

1. **IIFE** (Immediately-Invoked Function Expression).

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Storm Player - IIFE Sample page</title>
    <meta charset="UTF-8">
    <script src="../dist/iife/index.js"></script>
</head>
<body>
    <div id="container"></div>
    <script>
        /**
         * Standard library configuration object
         */
        const streamConfig = {
            configurationType: "embedded",                   // "embedded" or "gateway", please check doc for more info
            stream: {
                serverList: [                                // list of streaming server, 2nd, 3rd etc. will be used as backup
                    {
                        host: "localhost",                   // host or ip to the streaming server
                        application: "live",                 // application name (can be configured in storm server settings)
                        port: 80,                            // server port
                        ssl: false                           // whenever SSL connection should be used or not
                    }
                ],
                sourceList: [
                    {
                        protocol: "storm",                   // either "storm" (stream was published to the server), or "rtmp". RTMP (external source)
                        streamKey: "test",                   // streamKey of the stream
                    },
                ]
            },
            settings: {
                autoStart: true,                              // if true, video will start playing automatically, but will be muted too
                debug: {
                    console: {                                // console output
                        enabled: true                         // if console output is activated
                    }
                }
            }
        };

        /**
         * Standard player configuration object
         */
        const playerConfig = {
            containerID: "container",                        // HTML container where player will be added
            aspectRatio: "16:9",                             // <video> element will scale to provided aspect-ratio. This parameter is optional and will overwrite "height" parameter as "width" will only be used for calculations
            width: "100%",                                   // <video> element width, can be either "px" or "%" (string), as (number) will always be "px" value. For % it'll auto-scale to parent container,
            title: "Title goes here",                        // title for the stream
            subtitle: "This is going to be epic!",           // subtitle for the stream
        };

        /**
         * Each player instance must be provided with both player (gui) and library configs
         */
        const storm = stormPlayer(playerConfig, streamConfig);

    </script>
</body>
</html>
```

2. **UMD** (Universal Module Definition).

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Storm Player - UMD Sample page</title>
    <meta charset="UTF-8">
    <script src="../dist/umd/index.js"></script>
</head>
<body>
    <div id="container"></div>
    <script>
        /**
         * Standard library configuration object
         */
        const streamConfig = {
            configurationType: "embedded",                   // "embedded" or "gateway", please check doc for more info
            stream: {
                serverList: [                                // list of streaming server, 2nd, 3rd etc. will be used as backup
                    {
                        host: "localhost",                   // host or ip to the streaming server
                        application: "live",                 // application name (can be configured in storm server settings)
                        port: 80,                            // server port
                        ssl: false                           // whenever SSL connection should be used or not
                    }
                ],
                sourceList: [
                    {
                        protocol: "storm",                   // either "storm" (stream was published to the server), or "rtmp". RTMP (external source)
                        streamKey: "test",                   // streamKey of the stream
                    },
                ]
            },
            settings: {
                autoStart: true,                              // if true, video will start playing automatically, but will be muted too
                debug: {
                    console: {                                // console output
                        enabled: true                         // if console output is activated
                    }
                }
            }
        };

        /**
         * Standard player configuration object
         */
        const playerConfig = {
            containerID: "container",                        // HTML container where player will be added
            aspectRatio: "16:9",                             // <video> element will scale to provided aspect-ratio. This parameter is optional and will overwrite "height" parameter as "width" will only be used for calculations
            width: "100%",                                   // <video> element width, can be either "px" or "%" (string), as (number) will always be "px" value. For % it'll auto-scale to parent container,
            title: "Title goes here",                        // title for the stream
            subtitle: "This is going to be epic!",           // subtitle for the stream
        };
        
        /**
         * Creating an instance of the storm library
         */
        const storm = stormPlayer.create(playerConfig, libraryConfig);

    </script>
</body>
</html>
```

3. **ESM** (Universal Module Definition).

``` javascript
import {StormPlayer} from "../dist/esm/index.js";

/**
 * Standard library configuration object
 */
const streamConfig = {
    configurationType: "embedded",                   // "embedded" or "gateway", please check doc for more info
    stream: {
        serverList: [                                // list of streaming server, 2nd, 3rd etc. will be used as backup
            {
                host: "localhost",                   // host or ip to the streaming server
                application: "live",                 // application name (can be configured in storm server settings)
                port: 80,                            // server port
                ssl: false                           // whenever SSL connection should be used or not
            }
        ],
        sourceList: [
            {
                protocol: "storm",                   // either "storm" (stream was published to the server), or "rtmp". RTMP (external source)
                streamKey: "test",                   // streamKey of the stream
            },
        ]
    },
    settings: {
        autoStart: true,                              // if true, video will start playing automatically, but will be muted too
        debug: {
            console: {                                // console output
                enabled: true                         // if console output is activated
            }
        }
    }
};

/**
 * Standard player configuration object
 */
const playerConfig = {
    containerID: "container",                        // HTML container where player will be added
    aspectRatio: "16:9",                             // <video> element will scale to provided aspect-ratio. This parameter is optional and will overwrite "height" parameter as "width" will only be used for calculations
    width: "100%",                                   // <video> element width, can be either "px" or "%" (string), as (number) will always be "px" value. For % it'll auto-scale to parent container,
    title: "Title goes here",                        // title for the stream
    subtitle: "This is going to be epic!",           // subtitle for the stream
};

/**
 * Each player instance must be provided with both player (gui) and library configs
 */
const storm = new StormPlayer(playerConfig, libraryConfig);

```

4. **AMD** (Asynchronous Module Definition).

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Storm Player - AMD Sample page</title>
    <meta charset="UTF-8">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"></script>
</head>
<body>
    <div id="container"></div>
    <script>
         /**
         * Standard library configuration object
         */
        const streamConfig = {
            configurationType: "embedded",                   // "embedded" or "gateway", please check doc for more info
            stream: {
                serverList: [                                // list of streaming server, 2nd, 3rd etc. will be used as backup
                    {
                        host: "localhost",                   // host or ip to the streaming server
                        application: "live",                 // application name (can be configured in storm server settings)
                        port: 80,                            // server port
                        ssl: false                           // whenever SSL connection should be used or not
                    }
                ],
                sourceList: [
                    {
                        protocol: "storm",                   // either "storm" (stream was published to the server), or "rtmp". RTMP (external source)
                        streamKey: "test",                   // streamKey of the stream
                    },
                ]
            },
            settings: {
                autoStart: true,                              // if true, video will start playing automatically, but will be muted too
                debug: {
                    console: {                                // console output
                        enabled: true                         // if console output is activated
                    }
                }
            }
        };

        /**
         * Standard player configuration object
         */
        const playerConfig = {
            containerID: "container",                        // HTML container where player will be added
            aspectRatio: "16:9",                             // <video> element will scale to provided aspect-ratio. This parameter is optional and will overwrite "height" parameter as "width" will only be used for calculations
            width: "100%",                                   // <video> element width, can be either "px" or "%" (string), as (number) will always be "px" value. For % it'll auto-scale to parent container,
            title: "Title goes here",                        // title for the stream
            subtitle: "This is going to be epic!",           // subtitle for the stream
        };

        /**
         * Path to the AMD module
         */
        requirejs(['../dist/amd/index'], function (storm) {

            /**
             * Library instance
             */
            const player = new storm.create(playerConfig, libraryConfig);

        });

    </script>
</body>
</html>
```

## Attaching and detaching events

```JavaScript

/**
 * An event can be registered using addEventListener method (preferably before initialize() method is called)
 */
player.addEventListener("playerCoreReady", onLibraryReady);

/**
 * Inline functions are fine too...
 */
player.addEventListener("playerCoreReady", function(event){
    console.log("playerReady");
});

/**
 * An event can also be removed...
 */
player.removeEventListener("playerCoreReady", onLibraryReady);

/**
 * All event listeners of that type can be removed like this
 */
player.removeEventListener("playerCoreReady");
```

## Sample event listeners

```JavaScript
player.addEventListener("playerCoreReady", function(event){
    console.log(`Player ID: ${event.ref.getLibraryID()} is ready for interaction!`);
})

player.addEventListener("serverConnectionInitiate", function(event){
    console.log(`Player ID: ${event.ref.getLibraryID()} - Connection to: ${event.serverURL} has been initialized`);
})

player.addEventListener("serverConnect", function(event){
    console.log(`Player ID: ${event.ref.getLibraryID()} - Successfully connected to: ${event.serverURL}`);
})

player.addEventListener("serverDisconnect", function(event){
    console.log(`Player ID: ${event.ref.getLibraryID()} - Disconnected from: ${event.serverURL}`);
})

player.addEventListener("serverConnectionError", function(event){
    console.log(`Player ID: ${event.ref.getLibraryID()} - Could not connect to server: ${event.serverURL}`);
})

player.addEventListener("allConnectionsFailed", function(event){
    console.log(`Player ID: ${event.ref.getLibraryID()} - All connections from server list failed`);
})

player.addEventListener("awaitingStream", function(event){
    console.log(`Player ID: ${event.ref.getLibraryID()} - Awaiting for stream: ${event.streamKey} to start. Works only if stream exisits prior to publishing it.`);
})

player.addEventListener("streamNotFound", function(event){
    console.log(`Player ID: ${event.ref.getLibraryID()} - No stream for streamKey: ${event.streamKey}`);
})

player.addEventListener("interactionRequired", function(event){
    console.log(`Player ID: ${event.ref.getLibraryID()} - User interaction is required!`);
})

player.addEventListener("playbackInitiate", function(event){
    console.log(`Player ID: ${event.ref.getLibraryID()} - Playback initiated for streamKey: ${event.streamKey}`);
})

player.addEventListener("playbackStart", function(event){
    console.log(`Player ID: ${event.ref.getLibraryID()} - Playback started for streamKey: ${event.streamKey}`);
})

player.addEventListener("playbackPause", function(event){
    console.log(`Player ID: ${event.ref.getLibraryID()} - Playback paused for streamKey: ${event.streamKey}`);
})

player.addEventListener("streamEnd", function(event){
    console.log(`Player ID: ${event.ref.getLibraryID()} - Stream has ended`);
})

player.addEventListener("volumeChange", function(event){
    console.log(`Player ID: ${event.ref.getLibraryID()} - Volumed changed, new value: ${event.volume}`);
    console.log(`-->: is muted: ${event.muted}`);
    console.log(`-->: invoked by: ${event.invokedBy}`);
})

player.addEventListener("playbackProgress", function(event){
    console.log(`Player ID: ${event.ref.getLibraryID()} - Progress event`);
    console.log(`-->: playback duration: ${event.playbackDuration}`);
    console.log(`-->: playback start time: ${event.playbackStartTime}`);
    console.log(`-->: stream total duration: ${event.streamDuration}`);
    console.log(`-->: stream start time: ${event.streamStartTime}`);
    console.log(`-->: dvr cache size: ${event.dvrCacheSize}`);
})

player.addEventListener("metadataReceived", function(event){
    console.log(`Player ID: ${event.ref.getLibraryID()} - Metadata arrived`);
    console.log(`-->: video-codec: ${event.metadata.getVideoCodec()}`);
    console.log(`-->: audio-codec: ${event.metadata.getAudioCodec()}`);
    console.log(`-->: video width: ${event.metadata.getVideoWidth()}`);
    console.log(`-->: video height: ${event.metadata.getVideoHeight()}`);
    console.log(`-->: fps: ${event.metadata.getNominalFPS()}`);
    console.log(`-->: encoder: ${event.metadata.getEncoder()}`);
})
```


## Player Event list

|     Event name     |   Additional data    |                                             Description                                              | Can be fired more than once |
|:------------------:|:--------------------:|:----------------------------------------------------------------------------------------------------:|:---------------------------:|
|   interfaceReady   |          no          | Event fires when the player interface is ready. This action takes place before libraryCreated event. |             no              |
|   libraryCreate    |          no          | Event fires when the player library is created. This action takes place after interfaceReady event.  |             no              |
| libraryInitialize  |          no          |                    Event fires when the Storm JavaScript Library is initialized.                     |             no              |
|     playClick      |          no          |                            Event fires when user clicks any play button.                             |             yes             |
|     pauseClick     |          no          |                            Event fires when user clicks the pause button.                            |             yes             |
|     videoClick     |          no          |                            Event fires when user clicks the video screen.                            |             yes             |
|     muteClick      |          no          |                               Event fires when user mutes the volume.                                |             yes             |
|    unmuteClick     |          no          |                                 Event fires when volume is unmuted.                                  |             yes             |
| qualitySwitchClick |          no          |                       Event fires when user clicks the quality switch button.                        |             yes             |
|   qualityChange    |          no          |                            Event fires when a stream quality is changed.                             |             yes             |
|  fullscreenEnter   |          no          |                            Event fires when user enters fullscreen mode.                             |             yes             |
|   fullscreenExit   |          no          |                             Event fires when user exits fullscreen mode.                             |             yes             |
|    errorMessage    |          no          |                            Event fires whenever an error message appears.                            |             yes             |
|      guiShow       |          no          |          Event fires whenever player interface becomes visible (e.g. user mouse activity).           |             yes             |
|      guiHide       |          no          |           Event fires whenever player interface becomes invisible (user mouse inactivity).           |             yes             |
|    titleUpdate     |          no          |                       Event fires whenever a stream title is added or updated.                       |             yes             |
|   subtitleUpdate   |          no          |                     Event fires whenever a stream subtitle is added or updated.                      |             yes             |
|     seekStart      |          no          |              Event fires whenever a user grabs progress bar thumb (mouse button down).               |             yes             |
|      seekEnd       |          no          |              Event fires whenever a user releases progress bar thumb (mouse button up).              |             yes             |
|      seekSet       |          no          | Event fires everytime a user clicks on a progress bar or releases progress bar thumb in a new place. |             yes             |
|    cuePointAdd     |          no          |                            Event fires everytime new CUE Point is added.                             |             yes             |
|   cuePointRemove   |          no          |                        Event fires whenever an existing CUE Point is removed.                        |             yes             |
|       resize       | newWidth & newHeight |                             Event fires whenever player size is changed                              |             yes             |

## Library Event List (inherited after Storm Library component)

|        Event name        |  Additional data  |                                                                                                                                                                   Description                                                                                                                                                                    | Can be fired more than once |
|:------------------------:|:-----------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:---------------------------:|
| serverConnectionInitiate | serverURL:string  |                                                                                                                 This event is fired when a library instance initiates a connection with a Storm Streaming Server/Cloud instance.                                                                                                                 |  yes (once per connection)  |
|      serverConnect       | serverURL:string  |                                                                                                       This event is triggered when a library instance successfully establishes a connection with a Storm Streaming Server/Cloud instance.                                                                                                        |  yes (once per connection)  |
|     serverDisconnect     | serverURL:string  |                                                  This event is called when a library instance is disconnected from the Storm Streaming Server/Cloud (after a connection was previously established), which may occur due to viewer networking issues or Storm Streaming Server/Cloud problems.                                                   |  yes (once per connection)  |
|  serverConnectionError   | serverURL:string  | This event is triggered when a library instance fails to establish a connection with a Storm Streaming Server/Cloud instance, possibly due to networking issues. If there are additional servers on the configuration list and the "restartOnError" parameter is set to true, the library will attempt to connect to a different server instead. |  yes (once per connection)  |
|   allConnectionsFailed   |        no         |                                                              This event is associated with _serverConnectionError_. If a library instance is unable to connect to any of the servers provided in the configuration list, this event indicates that no further action can be taken.                                                               |             no              |
|     playerCoreReady      |        no         |                                                                      This event is called when a library instance is prepared to accept API calls (using different methods). No playback-related methods should be invoked on the library before this event is registered.                                                                       |             no              |
|    compatibilityError    |        no         |      This event is triggered if a browser or device does not support any of the provided sources. Please note that the library will attempt all possible measures (switching between various modes) to ensure maximum compatibility with a given device. However, there may be instances where it is simply impossible to initiate a video.      |             yes             |
|   interactionRequired    |        no         |                                                          Certain browsers and devices do not permit a video element to initiate on its own and necessitate direct user interaction, such as a mouse click or a touch gesture. This event signifies that such an engagement is required.                                                          |             no              |
|         SSLError         |        no         |                                                                                                               If an SSL layer is required for specific sources and the browser does not provide it, this event will be triggered.                                                                                                                |             no              |
|    videoElementCreate    | yes (videoObject) |                                                                                                                    This event is triggered whenever a video element within a library instance is either created or recreated.                                                                                                                    |             no              |
|   newStreamSourceAdded   |    ISourceItem    |                                                                                                             This event is activated whenever a new video source is added to the library (check addSourceStream in the API section).                                                                                                              |             yes             |
|    authorizationError    |        no         |                                                                                             This event is fired when a library instance fails to authorize with a server application on Storm Streaming Server/Cloud instance (e.g. incorrect token)                                                                                             |             yes             |
|  authorizationComplete   |        no         |                                                                                                     This event is called when a library instance successfully authorizes with a server application on Storm Streaming Server/Cloud instance.                                                                                                     |             yes             |
|      invalidLicense      |        no         |                                                                                                                        Whenever a Storm Streaming Server/Cloud license expires, a library instance will fire this event.                                                                                                                         |             no              |


## Playback Event List (inherited after Storm Library component)

|     Event name      |                                                   Additional data                                                    |                                                                                   Description                                                                                   | Can be fired more than once |
|:-------------------:|:--------------------------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:---------------------------:|
|  playbackInitiate   |                                                          no                                                          |                       This event is fired whenever a playback of a stream is initiated (e.g. either due to autoStart set to _true_ or user interaction).                        |    yes (once per video)     |
|    playbackStart    |                                                          no                                                          |                                                   This event notifies that video playback has started (video is now playing)                                                    |             yes             |
|    playbackPause    |                                                          no                                                          |                                         This event notifies that video playback has been paused (due to end-user or system interaction)                                         |             yes             |
|  playbackProgress   | playbackStarTime:number, playbackDuration:number, streamStartTime:number, streamDuration:number, dvrCacheSize:number |                                   Event informs on video progress, stream/playback start-time, stream/playback duration and nDVR cache size.                                    |             yes             |
|   awaitingStream    |                                                          no                                                          | This event notifies that stream is in hibernate mode - it's not streaming yet, but it might start any time. The library will automatically start playback once stream is ready. |             yes             |
|      streamEnd      |                                                          no                                                          |           Event will be called when the stream is closed on the server side (usually it means that the broadcaster has stopped streaming, or stream was unpublished).           |             yes             |
|   streamNotFound    |                                                          no                                                          |                   This event is called whenever a stream with a specific name was not found on the server (this includes hibernated streams or sub-streams).                    |    yes (once per video)     |
|  metadataReceived   |                                                  StormMetaDataItem                                                   |                    This event informs of metadata arrival for current video. MetaData contains information about stream codecs, width, height, bitrate etc.                     |             yes             |
|   bufferingStart    |                                                          no                                                          |                         This event indicates a video content is being readied for playback. The video buffer must fill in order for the video to start.                         |             yes             |
|  bufferingComplete  |                                                          no                                                          |                                                  This event indicates that the buffer is full and playback is ready to start.                                                   |             yes             |
|    volumeChange     |                                volume:number, muted:boolean, invokedBy: user/browser                                 |                                 This event notifies that video volume was changed (either its value was changed, or video was muted/un-muted).                                  |             yes             |
|    playbackError    |                                                          no                                                          |         Event indicates that there was a problem with the playback (it usually means that the browser was not able to play a source material due to malformed bitcode).         |    yes (once per video)     |
|   fullScreenEnter   |                                                          no                                                          |                                 This event is fired whenever a library instance enters browser fullscreen mode (either native or overlay type)                                  |             yes             |
|   fullScreenExit    |                                                          no                                                          |                                      This event is fired whenever a library instance exits fullscreen mode (either native or overlay type)                                      |             yes             |
| streamConfigChanged |                                                  StormStreamConfig                                                   |                                                      This event notifies that basic stream configuration has been updated.                                                      |             yes             |


## API

|                          Method                          |              Returns              | Return type  |                                                                                                                                                    Description                                                                                                                                                     |
|:--------------------------------------------------------:|:---------------------------------:|:------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|                       initialize()                       |                 -                 |     void     |                                                                                 Starts the player. This method will be called automatically by the constructor unless *wait* parameter in the constructor has been set to *false*.                                                                                 |
|                     getInstanceID()                      |        Instance ID number         |    number    |                                                                                                                                   The method returns instance ID of the player.                                                                                                                                    |
|                       getLibrary()                       |        StormLibrary Object        |    number    |                                                                                                                          The method returns main StormLibrary object used by this player.                                                                                                                          |
|      setSize(width:number/string, height:number/s)       |                 -                 |     void     | The method sets a new width and height for the player. The values can be given as a number (in which case they are treated as the number of pixels), or as a string ending with "px" (this will also be the number of pixels) or "%", where the number is treated as a percentage of the parent container's value. |
|              setWidth(width:number/string)               |                 -                 |     void     |        The method sets a new width for the player. The value can be given as a number (in which case it is treated as the number of pixels), or as a string ending with "px" (this will also be the number of pixels) or "%", where the number is treated as a percentage of the parent container's value.         |
|             setHeight(height:number/string)              |                 -                 |     void     |        The method sets a new height for the player. The value can be given as a number (in which case it is treated as the number of pixels), or as a string ending with "px" (this will also be the number of pixels) or "%", where the number is treated as a percentage of the parent container's value.        |
|                        getWidth()                        |           Player width            |    number    |                                                                                                                                          Returns player width in pixels.                                                                                                                                           |
|                       getHeight()                        |           Player height           |    number    |                                                                                                                                          Returns player height in pixels.                                                                                                                                          |
|                  setTitle(title:string)                  |                 -                 |     void     |                                                                                                            The method allows to add/change the title displayed in the upper-right corner of the player.                                                                                                            |
|               setSubtitle(subtitle:string)               |                 -                 |     void     |                                                                                                 The method allows to add/change the subtitle displayed in the upper-right corner of the player (below the title).                                                                                                  |
|                    getPlayerConfig()                     | Object containing player settings |    Object    |                                                                                                               This method returns an object containing all player preferences (related to its GUI).                                                                                                                |
|                    setPlayerConfig()                     |                 -                 |      -       |                                                                                                                                This method pushes new player (GUI) config settings                                                                                                                                 |
|          addCuePoint(title:string, time:number)          |                 -                 |     void     |                                                                                                                      This method adds a CUE point to the player timeline with a given title.                                                                                                                       | 
|               removeCuePoint(time:number)                |                 -                 |     void     |                                                                                                                                 This method removes a CUE point based on its time.                                                                                                                                 |
|  addEventListener(eventName:string, callback:function)   |                 -                 |     void     |                                                                                           Registers an event with the player object. Whenever a registered event occurs, player will call a predefined function provided                                                                                           | 
| removeEventListener(eventName:string, callback:function) |                 -                 |     void     |                                                                                                                                      Removes event listener from the player.                                                                                                                                       | 


Browser compatibility
---------------------
* Edge 12+
* Chrome 31+
* Firefox 42+
* Safari 13+
* Opera 15+

For legacy browsers, HLS mode is used instead.

## Resources

- [Documentation](https://www.stormstreaming.com/docs)
- [Storm Library Project](https://github.com/StormStreaming/stormlibrary-js)
- [Changelog](CHANGELOG.md)