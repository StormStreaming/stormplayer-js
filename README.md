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

        /**
         * Event fires whenever player interface becomes visible (e.g. user mouse activity).
         */
        storm.addEventListener("guiShown", function(event){
            console.log("guiShown");
        });

        /**
         * Event fires whenever player interface becomes invisible (user mouse inactivity).
         */
        storm.addEventListener("guiHid", function(event){
            console.log("guiHid");
        });

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

        /**
         * Event fires whenever player interface becomes visible (e.g. user mouse activity).
         */
        storm.addEventListener("guiShowed", function(event){
            console.log("guiShowed");
        });

        /**
         * Event fires whenever player interface becomes invisible (user mouse inactivity).
         */
        storm.addEventListener("guiHid", function(event){
            console.log("guiHid");
        });

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

/**
 * Event fires whenever player interface becomes visible (e.g. user mouse activity).
 */
storm.addEventListener("guiShowed", function(event){
    console.log("guiShowed");
});

/**
 * Event fires whenever player interface becomes invisible (user mouse inactivity).
 */
storm.addEventListener("guiHid", function(event){
    console.log("guiHid");
});

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

            /**
             * Event fires whenever player interface becomes visible (e.g. user mouse activity).
             */
            player.addEventListener("guiShowed", function(event){
                console.log("guiShowed");
            });

            /**
             * Event fires whenever player interface becomes invisible (user mouse inactivity).
             */
            player.addEventListener("guiHid", function(event){
                console.log("guiHid");
            });

        });

    </script>
</body>
</html>
```

## Attaching and detaching events

``` JavaScript
/**
 * An event can be registered using addEventListener method (preferably before initialize() method is called)
 */
storm.addEventListener("libraryReady", guiHide);

/**
 * Inline functions are fine too...
 */
storm.addEventListener("guiHide", function(event){
    console.log("guiHide");
});

/**
 * An event can also be removed...
 */
storm.removeEventListener("guiHide", onPlayerReady);

/**
 * All event listeners of that type can be removed like this
 */
storm.removeEventListener("guiHide");
```

## ## Sample event listeners

``` JavaScript
storm.addEventListener("libraryReady", function(event){
    console.log(`Player ID: ${event.ref.getInstanceID} is ready for interaction!`);
})

storm.addEventListener("libraryConnected", function(event){
    console.log(`Player ID: ${event.ref.getInstanceID()} - Successfully connected to: ${event.serverURL}`);
})

storm.addEventListener("libraryDisconnected", function(event){
    console.log(`Player ID: ${event.ref.getInstanceID()} - Disconnected from: ${event.serverURL}`);
})

storm.addEventListener("libraryConnectionFailed", function(event){
    console.log(`Player ID: ${event.ref.getInstanceID()} - Could not connect to server: ${event.serverURL}`);
})

storm.addEventListener("allConnectionsFailed", function(event){
    console.log(`Player ID: ${event.ref.getInstanceID()} - All connections from server list failed`);
})

storm.addEventListener("streamNotFound", function(event){
    console.log(`Player ID: ${event.ref.getInstanceID()} - No stream for streamKey: ${event.streamKey}`);
})

storm.addEventListener("interactionRequired", function(event){
    console.log(`Player ID: ${event.ref.getInstanceID()} - User interaction is required!`);
})

storm.addEventListener("playbackInitiated", function(event){
    console.log(`Player ID: ${event.ref.getInstanceID()} - Playback initiated for streamKey: ${event.streamKey}`);
})

storm.addEventListener("playbackStarted", function(event){
    console.log(`Player ID: ${event.ref.getInstanceID()} - Playback started for streamKey: ${event.streamKey}`);
})

storm.addEventListener("playbackPaused", function(event){
    console.log(`Player ID: ${event.ref.getInstanceID()} - Playback paused for streamKey: ${event.streamKey}`);
})

storm.addEventListener("playbackStopped", function(event){
    console.log(`Player ID: ${event.ref.getInstanceID()} - Playback stopped for streamKey: ${event.streamKey}`);
})

storm.addEventListener("volumeChanged", function(event){
    console.log(`Player ID: ${event.ref.getInstanceID()} - Volumed changed, new value: ${event.volume}`);
    console.log(`-- >: is muted: ${event.muted}`);
    console.log(`-- >: invoked by: ${event.invokedBy}`);
})

storm.addEventListener("volumeSet", function(event){
    console.log(`Player ID: ${event.ref.getInstanceID()} - Volume set to: ${event.volume}`);
})

storm.addEventListener("metadataReceived", function(event){
    console.log(`Player ID: ${event.ref.getInstanceID()} - Metadata arrived`);
    console.log(`-- >: video-codec: ${event.metadata.getVideoCodec()}`);
    console.log(`-- >: audio-codec: ${event.metadata.getAudioCodec()}`);
    console.log(`-- >: video width: ${event.metadata.getVideoWidth()}`);
    console.log(`-- >: video height: ${event.metadata.getVideoHeight()}`);
    console.log(`-- >: fps: ${event.metadata.getNominalFPS()}`);
    console.log(`-- >: encoder: ${event.metadata.getEncoder()}`);
})

storm.addEventListener("fullscreenEntered", function(event){
    console.log(`Player ID: ${event.ref.getInstanceID()} - Entered FullScreen Mode`);
})

storm.addEventListener("fullscreenExited", function(event){
    console.log(`Player ID: ${event.ref.getInstanceID()} - Exited FullScreen Mode`);
})

storm.addEventListener("guiShown", function(event){
    console.log(`Player ID: ${event.ref.getInstanceID()} - Player GUI is now visible`);
})

storm.addEventListener("guiHid", function(event){
    console.log(`Player ID: ${event.ref.getInstanceID()} - Player GUI was hidden due to inactivity`);
})

storm.addEventListener("qualityChanged", function(event){
    console.log(`Player ID: ${event.ref.getInstanceID()} - Quality changed to:${event.label}`);
})

```


## Player Event list

|      Event name      |   Additional data    |                                             Description                                              | Can be fired more than once | 
|:--------------------:|:--------------------:|:----------------------------------------------------------------------------------------------------:| :---: | 
|    interfaceReady    |          no          | Event fires when the player interface is ready. This action takes place before libraryCreated event. | no |
|    libraryCreated    |          no          | Event fires when the player library is created. This action takes place after interfaceReady event.  | no |
|  libraryInitialized  |          no          |                    Event fires when the Storm JavaScript Library is initialized.                     | no |
|     playClicked      |          no          |                            Event fires when user clicks any play button.                             | yes |
|     pauseClicked     |          no          |                            Event fires when user clicks the pause button.                            | yes |
|     videoClicked     |          no          |                            Event fires when user clicks the video screen.                            | yes |
|     muteClicked      |          no          |                               Event fires when user mutes the volume.                                | yes |
|     muteClicked      |          no          |                                 Event fires when volume is unmuted.                                  | yes |
| qualitySwitchClicked |          no          |                             Event fires when user clicks quality switch.                             | yes |
|    qualityChanged    |          no          |                            Event fires when a stream quality is changed.                             | yes |
|    volumeChanged     |          no          |                              Event fires when stream volume is changed.                              | yes |
|  fullscreenEntered   |          no          |                            Event fires when user enters fullscreen mode.                             | yes |
|   fullscreenExited   |          no          |                             Event fires when user exits fullscreen mode.                             | yes |
|     errorMessage     |          no          |                            Event fires whenever an error message appears.                            | yes |
|       guiShown       |          no          |          Event fires whenever player interface becomes visible (e.g. user mouse activity).           | yes |
|        guiHid        |          no          |           Event fires whenever player interface becomes invisible (user mouse inactivity).           | yes |
|      titleAdded      |          no          |                            Event fires whenever a stream title is added.                             | yes |
|     subtitleAdd      |          no          |                           Event fires whenever a stream subtitle is added.                           | yes |
|     seekStarted      |          no          |              Event fires whenever a user grabs progress bar thumb (mouse button down).               | yes |
|      seekEnded       |          no          |              Event fires whenever a user releases progress bar thumb (mouse button up).              | yes |
|       seekSet        |          no          | Event fires everytime a user clicks on a progress bar or releases progress bar thumb in a new place. | yes |
|    cuePointAdded     |          no          |                            Event fires everytime new CUE Point is added.                             | yes |
|   cuePointRemoved    |          no          |                        Event fires whenever an existing CUE Point is removed.                        | yes |
|        resize        | newWidth & newHeight |                             Event fires whenever player size is changed                              | yes |

## Library Event List (inherited after Storm Library component)

|       Event name        | Additional data |                                                                                                                                                           Description                                                                                                                                                           | Can be fired more than once |
|:-----------------------:|:---------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:---------------------------:|
|      libraryReady       |       no        |                                                                                      This event is activated when the library is prepared to accept API calls. No method should be invoked on the library before this event is registered.                                                                                      |             no              |
|    libraryConnected     |       no        |                                                                                                      This event is triggered when the library establishes a connection with the Storm Streaming Server or Cloud instance.                                                                                                       |    yes (once per video)     |
|   libraryDisconnected   |       no        |                                                                                   This event is activated when the library is disconnected from the Storm server, which may occur due to viewer connection problems or other network issues.                                                                                    |    yes (once per video)     |
| libraryConnectionFailed |       no        |                     This event is triggered when the library fails to establish a connection with a Storm Streaming Server or Cloud instance, possibly due to network issues. If there are additional servers on the configuration list, the library will attempt to connect to a different server instead.                     |             yes             |
|  allConnectionsFailed   |       no        |                                                        This event is associated with "libraryConnectionFailed". If the library is unable to connect to any of the servers provided in the configuration list, this event indicates that no further action can be taken.                                                         |             yes             |
|   compatibilityError    |       no        | This event is triggered if a browser or device does not support the provided sources. Please note that the library will attempt all possible measures (switching between various modes) to ensure maximum compatibility with a given device. However, there may be instances where it is simply impossible to initiate a video. |             yes             |
|   interactionRequired   |       no        |                                                Certain browsers and devices do not permit a video element to initiate on its own and necessitate direct user interaction, such as a mouse click or a touch gesture. This event signifies that such an "engagement" is required.                                                 |             no              |
|        SLLError         |       no        |                                                                                                       If an SSL layer is required for specific sources and the browser does not provide it, this error will be displayed.                                                                                                       |             no              |
|   videoElementCreated   |       no        |                                                                                                               This event is triggered whenever a video element within the library is either created or recreated.                                                                                                               |             yes             |
|  newStreamSourceAdded   |       no        |                                                                                                     This event is activated whenever a new video source is added to the library (check addSourceStream in the API section).                                                                                                     |             yes             |


## Playback Event List (inherited after Storm Library component)

|    Event name    | Additional data |                                                                                                  Description                                                                                                  | Can be fired more than once |
|:----------------:|:---------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:---------------------------:|
| streamBuffering  |       no        |     This event indicates that video content is being readied for playback. The content isn't playing yet, but it will start imminently. This is the second event in the sequence for successful playback.     |    yes (once per video)     |
| metadataReceived |       yes       |                               This event comprises all data related to the video, such as resolutions and codecs. It's the third event in the sequence for successful playback.                               |    yes (once per video)     |
| playbackStarted  |       no        |                                          The event is fired whenever the playback starts. It's the fourth and final event in the sequence for a successful playback.                                          |             yes             |
|  playbackPaused  |       no        |                                                                              The event is triggered when the playback is paused.                                                                              |             yes             |
| playbackProgress |       yes       |                                                    Event informs on video progress, source stream time, source stream start time and current viewer time.                                                     |      yes (each second)      |
| playbackStopped  |       no        |                                       Event will be called when the stream is closed on the server side (usually it means that the broadcaster has stopped streaming).                                        |    yes (once per video)     |
|  volumeChanged   |    newVolume    |                                                            This event tells us that video volume was changed (either by the system or by a user).                                                             |             yes             |
|  streamNotFound  |       no        | This event is called whenever a stream with a specific name was not found (was not published or is not ready yet). This event will be triggered after videoConnecting only and will stop a playback sequence. |    yes (once per video)     |
|  playbackError   |       no        |                                              Event indicates that there was a problem with playback (it usually means that the browser was not able to play it).                                              |    yes (once per video)     |

## API

|                          Method                          | Returns | Return type |                                                                                                                                                    Description                                                                                                                                                     | 
|:--------------------------------------------------------:| :---: | :---: |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:| 
|                       initialize()                       | - | void |                                                                                 Starts the player. This method will be called automatically by the constructor unless *wait* parameter in the constructor has been set to *false*.                                                                                 | 
|                     getInstanceID()                      | Instance ID number | number |                                                                                                                                   The method returns instance ID of the player.                                                                                                                                    | 
|                       getLibrary()                       | StormLibrary Object | number |                                                                                                                          The method returns main StormLibrary object used by this player.                                                                                                                          |
|      setSize(width:number/string, height:number/s)       | - | void | The method sets a new width and height for the player. The values can be given as a number (in which case they are treated as the number of pixels), or as a string ending with "px" (this will also be the number of pixels) or "%", where the number is treated as a percentage of the parent container's value. | 
|              setWidth(width:number/string)               | - | void |        The method sets a new width for the player. The value can be given as a number (in which case it is treated as the number of pixels), or as a string ending with "px" (this will also be the number of pixels) or "%", where the number is treated as a percentage of the parent container's value.         | 
|             setHeight(height:number/string)              | - | void |        The method sets a new height for the player. The value can be given as a number (in which case it is treated as the number of pixels), or as a string ending with "px" (this will also be the number of pixels) or "%", where the number is treated as a percentage of the parent container's value.        | 
|                        getWidth()                        | Player width | number |                                                                                                                                          Returns player width in pixels.                                                                                                                                           |
|                       getHeight()                        | Player height | number |                                                                                                                                          Returns player height in pixels.                                                                                                                                          |
|                  setTitle(title:string)                  | - | void |                                                                                                            The method allows to add/change the title displayed in the upper-right corner of the player.                                                                                                            |
|               setSubtitle(subtitle:string)               | - | void |                                                                                                 The method allows to add/change the subtitle displayed in the upper-right corner of the player (below the title).                                                                                                  |
|                    getPlayerConfig()                     | Object containing player settings | Object |                                                                                                               This method returns an object containing all player preferences (related to its GUI).                                                                                                                | 
|          addCuePoint(title:string, time:number)          | - | void |                                                                                                                      This method adds a CUE point to the player timeline with a given title.                                                                                                                       | 
|               removeCuePoint(time:number)                | - | void |                                                                                                                                 This method removes a CUE point based on its time.                                                                                                                                 |
|  addEventListener(eventName:string, callback:function)   | - | void |                                                                                           Registers an event with the player object. Whenever a registered event occurs, player will call a predefined function provided                                                                                           | 
| removeEventListener(eventName:string, callback:function) | - | void |                                                                                                                                      Removes event listener from the player.                                                                                                                                       | 


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