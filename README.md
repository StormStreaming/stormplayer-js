# [Storm JavaScript Player](http://stormstreaming.com/)

Storm Player is a fully customizable GUI wrapper project for Storm Library, which can act as ready-to use Web Video Player or work as a template for creating your own, customizable players.
It is a part of **Storm Streaming Suite** and requires **Storm Streaming Server** instance or **Cloud** subscription to work.

If you wish to test the player, check its API, look code snippets please visit our demo page: https://www.stormstreaming.com/demo

To get started check our examples and documentation at https://www.stormstreaming.com/docs/javascript-getting-started


# Installation

1. Using NPM:

> `npm install --save @stormstreaming/stormplayer`

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
        const libraryConfig = {
            role: "player",                                  // "player" or "streamer"
            connectionType: "direct",                        // "direct" or "gateway", please check doc for more info
            stream: {
                serverList: [                                // list of streaming server, 2nd, 3rd etc. will be used as backup
                    {
                        host: "localhost",                   // host or ip to the streaming server
                        port: 80,                            // server port
                        ssl: false                           // whenever SSL connection should be used or not
                    }
                ],
                sourceList: [
                    {
                        protocol: "storm",                   // either "storm" (stream was published to the server), or "rtmp". RTMP (external source)
                        streamName: "test",                  // name of the stream
                        application: "live"                  // application name (can be configured in storm server settings)
                    },
                ]
            },
            settings: {
                autoStart: true,                              // if true, video will start playing automatically, but will be muted too
                restartOnError: true,                         // if something bad happens, player will try to restart
                reconnectTime: 1.0,                           // if a connection with a server fails, player will restart in given time
                enabledProtocols: ["MSE", "HLS"],             // "MSE" for desktop, android browsers and iPad OS, "HLS" for iPhone iOS
                video: {
                    scalingMode: "fill"                       // possible values "fill", "letterbox", "crop" and "letterbox"
                },
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
            width: 640,                                      // initial player width
            height: 360,                                     // initial player height
            title: "Test title",                             // title for the stream
            subtitle: "Subtitle",                            // subtitle for the stream
            unmuteText: "Unmute"                             // label for "unmute" button
        };

        /**
         * Each player instance must be provided with both player (gui) and library configs
         */
        const storm = stormPlayer(playerConfig, libraryConfig);

        /**
         * Event fires whenever player interface becomes visible (e.g. user mouse activity).
         */
        storm.addEventListener("guiShow", function(event){
            console.log("guiShow");
        });

        /**
         * Event fires whenever player interface becomes invisible (user mouse inactivity).
         */
        storm.addEventListener("guiHide", function(event){
            console.log("guiHide");
        });

        /**
         * Event fires when user clicks any play button
         */
        storm.addEventListener("playClick", function(event){
            console.log("playClick");
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
        const libraryConfig = {
            role: "player",                                  // "player" or "streamer"
            connectionType: "direct",                        // "direct" or "gateway", please check doc for more info
            stream: {
                serverList: [                                // list of streaming server, 2nd, 3rd etc. will be used as backup
                    {
                        host: "localhost",                   // host or ip to the streaming server
                        port: 80,                            // server port
                        ssl: false                           // whenever SSL connection should be used or not
                    }
                ],
                sourceList: [
                    {
                        protocol: "storm",                   // either "storm" (stream was published to the server), or "rtmp". RTMP (external source)
                        streamName: "test",                  // name of the stream
                        application: "live"                  // application name (can be configured in storm server settings)
                    },
                ]
            },
            settings: {
                autoStart: true,                              // if true, video will start playing automatically, but will be muted too
                restartOnError: true,                         // if something bad happens, player will try to restart
                reconnectTime: 1.0,                           // if a connection with a server fails, player will restart in given time
                enabledProtocols: ["MSE", "HLS"],             // "MSE" for desktop, android browsers and iPad OS, "HLS" for iPhone iOS
                video: {
                    scalingMode: "fill"                       // possible values "fill", "letterbox", "crop" and "letterbox"
                },
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
            width: 640,                                      // initial player width
            height: 360,                                     // initial player height
            title: "Test title",                             // title for the stream
            subtitle: "Subtitle",                            // subtitle for the stream
            unmuteText: "Unmute"                             // label for "unmute" button
        };

        /**
         * Creating an instance of the storm library
         */
        const storm = stormPlayer.create(playerConfig, libraryConfig);

        /**
         * Event fires whenever player interface becomes visible (e.g. user mouse activity).
         */
        storm.addEventListener("guiShow", function(event){
            console.log("guiShow");
        });

        /**
         * Event fires whenever player interface becomes invisible (user mouse inactivity).
         */
        storm.addEventListener("guiHide", function(event){
            console.log("guiHide");
        });

        /**
         * Event fires when user clicks any play button
         */
        storm.addEventListener("playClick", function(event){
            console.log("playClick");
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
const libraryConfig = {
    role: "player",                                  // "player" or "streamer"
    connectionType: "direct",                        // "direct" or "gateway", please check doc for more info
    stream: {
        serverList: [                                // list of streaming server, 2nd, 3rd etc. will be used as backup
            {
                host: "localhost",                   // host or ip to the streaming server
                port: 80,                            // server port
                ssl: false                           // whenever SSL connection should be used or not
            }
        ],
        sourceList: [
            {
                protocol: "storm",                   // either "storm" (stream was published to the server), or "rtmp". RTMP (external source)
                streamName: "test",                  // name of the stream
                application: "live"                  // application name (can be configured in storm server settings)
            },
        ]
    },
    settings: {
        autoStart: true,                              // if true, video will start playing automatically, but will be muted too
        restartOnError: true,                         // if something bad happens, player will try to restart
        reconnectTime: 1.0,                           // if a connection with a server fails, player will restart in given time
        enabledProtocols: ["MSE", "HLS"],             // "MSE" for desktop, android browsers and iPad OS, "HLS" for iPhone iOS
        video: {
            scalingMode: "fill"                       // possible values "fill", "letterbox", "crop" and "letterbox"
        },
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
    width: 640,                                      // initial player width
    height: 360,                                     // initial player height
    title: "Test title",                             // title for the stream
    subtitle: "Subtitle",                            // subtitle for the stream
    unmuteText: "Unmute"                             // label for "unmute" button
};

/**
 * Each player instance must be provided with both player (gui) and library configs
 */
const storm = new StormPlayer(playerConfig, libraryConfig);

/**
 * Event fires whenever player interface becomes visible (e.g. user mouse activity).
 */
storm.addEventListener("guiShow", function(event){
    console.log("guiShow");
});

/**
 * Event fires whenever player interface becomes invisible (user mouse inactivity).
 */
storm.addEventListener("guiHide", function(event){
    console.log("guiHide");
});

/**
 * Event fires when user clicks any play button
 */
storm.addEventListener("playClick", function(event){
    console.log("playClick");
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
         * Standard configuration object
         */
        const libraryConfig = {
            role: "player",                                  // "player" or "streamer"
            connectionType: "direct",                        // "direct" or "gateway", please check doc for more info
            stream: {
                serverList: [                                // list of streaming server, 2nd, 3rd etc. will be used as backup
                    {
                        host: "localhost",                   // host or ip to the streaming server
                        port: 80,                            // server port
                        ssl: false                           // whenever SSL connection should be used or not
                    }
                ],
                sourceList: [
                    {
                        protocol: "storm",                   // either "storm" (stream was published to the server), or "rtmp". RTMP (external source)
                        streamName: "test",                  // name of the stream
                        application: "live"                  // application name (can be configured in storm server settings)
                    },
                ]
            },
            settings: {
                autoStart: true,                              // if true, video will start playing automatically, but will be muted too
                restartOnError: true,                         // if something bad happens, player will try to restart
                reconnectTime: 1.0,                           // if a connection with a server fails, player will restart in given time
                enabledProtocols: ["MSE", "HLS"],             // "MSE" for desktop, android browsers and iPad OS, "HLS" for iPhone iOS
                video: {
                    scalingMode: "fill"                       // possible values "fill", "letterbox", "crop" and "letterbox"
                },
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
            width: 640,                                      // initial player width
            height: 360,                                     // initial player height
            title: "Test title",                             // title for the stream
            subtitle: "Subtitle",                            // subtitle for the stream
            unmuteText: "Unmute"                             // label for "unmute" button
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
            player.addEventListener("guiShow", function(event){
                console.log("guiShow");
            });

            /**
             * Event fires whenever player interface becomes invisible (user mouse inactivity).
             */
            player.addEventListener("guiHide", function(event){
                console.log("guiHide");
            });

            /**
             * Event fires when user clicks any play button
             */
            player.addEventListener("playClick", function(event){
                console.log("playClick");
            });

        });

    </script>
</body>
</html>
```

## Custom HTML Element

It is also possible to use a custom HTML element. The embed code looks as follow:

``` html
<storm-player
    containerID="player1"
    width="640"
    height="360"
    title="Your streaming video title"
    subtitle="Subtitle for your video"
    unmuteText="UNMUTE SOUND"
/>
<script>
    /**
     * Standard library configuration object
     */
    const libraryConfig = {
        role: "player",                                  // "player" or "streamer"
        connectionType: "direct",                        // "direct" or "gateway", please check doc for more info
        stream: {
            serverList: [                                // list of streaming server, 2nd, 3rd etc. will be used as backup
                {
                    host: "localhost",                   // host or ip to the streaming server
                    port: 80,                            // server port
                    ssl: false                           // whenever SSL connection should be used or not
                }
            ],
            sourceList: [
                {
                    protocol: "storm",                   // either "storm" (stream was published to the server), or "rtmp". RTMP (external source)
                    streamName: "test",                  // name of the stream
                    application: "live"                  // application name (can be configured in storm server settings)
                },
            ]
        },
        settings: {
            autoStart: true,                              // if true, video will start playing automatically, but will be muted too
            restartOnError: false,                         // if something bad happens, player will try to restart
            reconnectTime: 1.0,                           // if a connection with a server fails, player will restart in given time
            enabledProtocols: ["MSE", "HLS"],             // "MSE" for desktop, android browsers and iPad OS, "HLS" for iPhone iOS
            video: {
                scalingMode: "fill"                       // possible values "fill", "letterbox", "crop" and "letterbox"
            },
            debug: {
                console: {                                // console output
                    enabled: true                         // if console output is activated
                }
            }
        }
    };

    /**
     * Each player instance must be provided with both player (gui) and library configs
     */
    document.querySelector('[containerID="player1"]').setAttribute("config", JSON.stringify(libraryConfig));

</script>
```


## Attaching and detaching events

``` JavaScript

/**
 * An event can be registered using addEventListener method (preferably before initialize() method is called)
 */
storm.addEventListener("playerReady", guiHide);

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

## Event list

| Event name | Additional data | Description | Can be fired more than once | 
| :---: | :---: | :---: | :---: | 
| interfaceReady | no | Event fires when the player interface is ready. This action takes place before libraryCreated event. | no |
| libraryCreated | no | Event fires when the player library is created. This action takes place after interfaceReady event. | no |
| libraryInitialized | no | Event fires when the Storm JavaScript Library is initialized. | no |
| playClick | no | Event fires when user clicks any play button. | yes |
| pauseClick | no | Event fires when user clicks the pause button. | yes |
| videoClick | no | Event fires when user clicks the video screen. | yes |
| muteClicked | no | Event fires when user mutes the volume. | yes |
| unmuteClick | no | Event fires when volume is unmuted. | yes |
| qualityBtnClick | no | Event fires when user chooses different stream quality. | yes |
| qualityChange | no | Event fires when a stream quality is changed. | yes |
| volumeChange | no | Event fires when stream volume is changed. | yes |
| fullscreenEnter | no | Event fires when user enters fullscreen mode. | yes |
| fullscreenExit | no | Event fires when user exits fullscreen mode. | yes |
| errorMessage | no | Event fires whenever an error message appears. | yes |
| guiShow | no | Event fires whenever player interface becomes visible (e.g. user mouse activity). | yes |
| guiHide | no | Event fires whenever player interface becomes invisible (user mouse inactivity). | yes |
| titleAdd | no | Event fires whenever a stream title is added. | yes |
| subtitleAdd | no | Event fires whenever a stream subtitle is added. | yes |
| seekStart | no | Event fires whenever a user grabs progress bar thumb (mouse button down). | yes |
| seekEnd | no | Event fires whenever a user releases progress bar thumb (mouse button up). | yes |
| seekTo | no | Event fires everytime a user clicks on a progress bar or releases progress bar thumb in a new place. | yes |
| cuePointAdd | no | Event fires everytime new CUE Point is added. | yes |
| cuePointRemove | no | Event fires whenever an existing CUE Point is removed. | yes |

## API

| Method | Returns | Return type | Description | 
| :---: | :---: | :---: | :---: | 
| getInstanceID() | Instance ID number | number | The method returns instance ID of the player. | 
| getLibrary() | StormLibrary Object | number | The method returns main StormLibrary object used by the player. |
| setSize(width:number, height:number) | - | void | This method allows to resize the player. | 
| setWidth(width:number) | - | void | This method allows to change player width. | 
| setHeight(height:number) | - | void | This method allows to change player height. | 
| getWidth() | Player width | number | Returns player width |
| getHeight() | Player height | number | Returns player height |
| setTitle(title:string) | - | void | The method allows to specify the title displayed in the upper-right corner of the player. |
| setSubtitle(subtitle:string) | - | void | The method allows to specify the subtitle displayed in the upper-right corner of the player (below the title). |
| getGuiConfig() | Object containing player settings | Object | This method returns an object containing all player preferences (related to its GUI). | 
| addCuePoint(title:string, time:number) | - | void | This method adds a CUE point to the player timeline with a given title. | 
| removeCuePoint(time:number) | - | void | This method removes a CUE point based on its time. |
| addEventListener(eventName:string, callback:function) | - | void | Registers an event with the player object. Whenever a registered event occurs, player will call a predefined function provided | 
| removeEventListener(eventName:string, callback:function) | - | void | Removes event listener from the player. | 


Browser compatibility
---------------------
* Edge 12+
* Chrome 31+
* Firefox 42+
* Safari 13+
* Opera 15+

For legacy browsers, HLS mode is used instead.

## Requirements

- Node v14

## Resources

- [Documentation](https://www.stormstreaming.com/docs)
- [Storm Library Project](https://github.com/StormStreaming/stormlibrary-js)
- [Changelog](CHANGELOG.md)