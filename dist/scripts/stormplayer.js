define("GUIConfig", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GUIConfig = void 0;
    class GUIConfig {
        constructor(guiConfig) {
            this.bigPlaybackButton = true;
            this.timeline = true;
            this.guiHideSeconds = 3;
            this.title = null;
            this.subtitle = null;
            this.playerDisconnectedText = 'Disconnected from stream server.';
            this.serversFailedText = 'Failed to connect to the stream server.';
            this.compatibilityErrorText = 'Your device is not compatible with the available video source.';
            this.noSSLErrorText = 'This connection requires an SSL layer.';
            this.videoErrorText = 'Disconnected from stream server.';
            this.videoNotFoundText = 'Stream with given name was not found.';
            this.videoStopText = 'The stream has ended.';
            this.incompatiblePlayerProtocolText = 'This player version is not compatible with the provided streaming server.';
            this.liveText = "LIVE";
            this.unmuteText = 'UNMUTE SOUND';
            if (!guiConfig.containerID)
                throw new Error("containerID is not defined in guiConfig");
            if (!guiConfig.width)
                throw new Error("width is not defined in guiConfig");
            if (!guiConfig.height)
                throw new Error("height is not defined in guiConfig");
            this.containerID = guiConfig.containerID;
            this.width = guiConfig.width;
            this.height = guiConfig.height;
            if (typeof guiConfig.timeline != "undefined")
                this.timeline = guiConfig.timeline;
            if (typeof guiConfig.bigPlaybackButton != "undefined")
                this.bigPlaybackButton = guiConfig.bigPlaybackButton;
            if (guiConfig.guiHideSeconds)
                this.guiHideSeconds = guiConfig.guiHideSeconds;
            if (guiConfig.title)
                this.title = guiConfig.title;
            if (guiConfig.subtitle)
                this.subtitle = guiConfig.subtitle;
            if (guiConfig.unmuteText)
                this.unmuteText = guiConfig.unmuteText;
            if (guiConfig.playerDisconnectedText)
                this.playerDisconnectedText = guiConfig.playerDisconnectedText;
            if (guiConfig.serversFailedText)
                this.serversFailedText = guiConfig.serversFailedText;
            if (guiConfig.compatibilityErrorText)
                this.compatibilityErrorText = guiConfig.compatibilityErrorText;
            if (guiConfig.noSSLErrorText)
                this.noSSLErrorText = guiConfig.noSSLErrorText;
            if (guiConfig.videoErrorText)
                this.videoErrorText = guiConfig.videoErrorText;
            if (guiConfig.videoNotFoundText)
                this.videoNotFoundText = guiConfig.videoNotFoundText;
            if (guiConfig.videoStopText)
                this.videoStopText = guiConfig.videoStopText;
            if (guiConfig.liveText)
                this.liveText = guiConfig.liveText;
        }
        setIncompatiblePlayerProtocolText(value) {
            this.incompatiblePlayerProtocolText = value;
        }
        getIncompatiblePlayerProtocolText() {
            return this.incompatiblePlayerProtocolText;
        }
        setTimeline(value) {
            this.timeline = value;
        }
        getTimeline() {
            return this.timeline;
        }
        setLiveText(value) {
            this.liveText = value;
        }
        getLiveText() {
            return this.liveText;
        }
        setVideoStopText(value) {
            this.videoStopText = value;
        }
        getVideoStopText() {
            return this.videoStopText;
        }
        isBigPlaybackButton() {
            return this.bigPlaybackButton;
        }
        setBigPlaybackButton(value) {
            this.bigPlaybackButton = value;
        }
        getContainerID() {
            return this.containerID;
        }
        setGuiHideSeconds(value) {
            this.guiHideSeconds = value;
        }
        getGuiHideSeconds() {
            return this.guiHideSeconds;
        }
        setContainerID(value) {
            this.containerID = value;
        }
        getWitdth() {
            return this.width;
        }
        setWidth(value) {
            this.width = value;
        }
        getHeight() {
            return this.height;
        }
        setHeight(value) {
            this.height = value;
        }
        getTitle() {
            return this.title;
        }
        setTitle(value) {
            this.title = value;
        }
        getSubtitle() {
            return this.subtitle;
        }
        setSubtitle(value) {
            this.subtitle = value;
        }
        getUnmuteText() {
            return this.unmuteText;
        }
        setUnmuteText(value) {
            this.unmuteText = value;
        }
        getPlayerDisconnectedText() {
            return this.playerDisconnectedText;
        }
        setPlayerDisconnectedText(value) {
            this.playerDisconnectedText = value;
        }
        getServersFailedText() {
            return this.serversFailedText;
        }
        setServersFailedText(value) {
            this.serversFailedText = value;
        }
        getCompatibilityErrorText() {
            return this.compatibilityErrorText;
        }
        setCompatibilityErrorText(value) {
            this.compatibilityErrorText = value;
        }
        getNoSSLErrorText() {
            return this.noSSLErrorText;
        }
        setNoSSLErrorText(value) {
            this.noSSLErrorText = value;
        }
        getVideoErrorText() {
            return this.videoErrorText;
        }
        setVideoErrorText(value) {
            this.videoErrorText = value;
        }
        getVideoNotFoundText() {
            return this.videoNotFoundText;
        }
        setVideoNotFoundText(value) {
            this.videoNotFoundText = value;
        }
    }
    exports.GUIConfig = GUIConfig;
});
define("events/Dispatcher", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Dispatcher = void 0;
    class Dispatcher {
        constructor() {
            this.events = {};
        }
        addEventListener(event, callback) {
            if (typeof callback !== 'function') {
                console.error(`The listener callback must be a function, the given type is ${typeof callback}`);
                return false;
            }
            if (typeof event !== 'string') {
                console.error(`The event name must be a string, the given type is ${typeof event}`);
                return false;
            }
            if (this.events[event] === undefined) {
                this.events[event] = {
                    listeners: []
                };
            }
            this.events[event].listeners.push(callback);
            return true;
        }
        removeEventListener(event, callback) {
            if (this.events[event] === undefined) {
                console.error(`This event: ${event} does not exist`);
                return false;
            }
            this.events[event].listeners = this.events[event].listeners.filter((listener) => {
                return listener.toString() !== callback.toString();
            });
        }
        dispatch(event, details = null) {
            if (this.events[event] === undefined)
                return false;
            this.events[event].listeners.forEach((listener) => {
                listener(details);
            });
            return true;
        }
    }
    exports.Dispatcher = Dispatcher;
});
define("ui/GraphicElement", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GraphicElement = void 0;
    class GraphicElement {
        constructor(stormPlayer, className = "", tagName = 'div') {
            this.className = className;
            this.tagName = tagName;
            this.stormPlayer = stormPlayer;
            this.draw();
            this.attachListeners();
        }
        getHtmlElement() {
            return this.htmlElement;
        }
        remove() {
            this.htmlElement.remove();
        }
        hide() {
            this.htmlElement.classList.add("sp-hidden");
        }
        show() {
            this.htmlElement.classList.remove("sp-hidden");
        }
        draw() {
            this.htmlElement = document.createElement(this.tagName);
            if (this.className != '')
                this.htmlElement.className = this.className;
            this.htmlElement.innerHTML = ``;
        }
        attachListeners() {
        }
    }
    exports.GraphicElement = GraphicElement;
});
define("events/EventType", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventType = void 0;
    var EventType;
    (function (EventType) {
        EventType["GUI_INITIALIZED"] = "interfaceReady";
        EventType["LIBRARY_CREATED"] = "libraryCreated";
        EventType["LIBRARY_INITIALIZED"] = "libraryInitialized";
        EventType["PLAY_CLICKED"] = "playClick";
        EventType["PAUSE_CLICKED"] = "pauseClick";
        EventType["TOGGLE_CLICKED"] = "videoClick";
        EventType["MUTE_CLICKED"] = "muteClick";
        EventType["UNMUTE_CLICKED"] = "unmuteClick";
        EventType["QUALITY_CLICKED"] = "qualityBtnClick";
        EventType["QUALITY_CHANGED"] = "qualityChange";
        EventType["VOLUME_CHANGED"] = "volumeChange";
        EventType["FULLSCREEN_ENTERED"] = "fullscreenEnter";
        EventType["FULLSCREEN_EXITED"] = "fullscreenExit";
        EventType["ERROR_SHOWN"] = "errorMessage";
        EventType["GUI_SHOWN"] = "guiShow";
        EventType["GUI_HIDED"] = "guiHide";
        EventType["TITLE_SETTED"] = "titleAdd";
        EventType["SUBTITLE_SETTED"] = "subtitleAdd";
        EventType["SEEK_STARTED"] = "seekStart";
        EventType["SEEK_ENDED"] = "seekEnd";
        EventType["SEEK_SETTED"] = "seekTo";
        EventType["CUEPOINT_ADDED"] = "cuePointAdd";
        EventType["CUEPOINT_REMOVED"] = "cuePointRemove";
    })(EventType = exports.EventType || (exports.EventType = {}));
});
define("ui/VideoElement", ["require", "exports", "ui/GraphicElement", "events/EventType"], function (require, exports, GraphicElement_1, EventType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VideoElement = void 0;
    class VideoElement extends GraphicElement_1.GraphicElement {
        constructor(stormPlayer) {
            super(stormPlayer, 'sp-container__box');
        }
        draw() {
            super.draw();
            this.htmlElement.setAttribute("id", this.stormPlayer.getInstanceID());
        }
        attachListeners() {
            let that = this;
            that.htmlElement.addEventListener("click", function () {
                that.stormPlayer.dispatch(EventType_1.EventType.TOGGLE_CLICKED);
            });
        }
    }
    exports.VideoElement = VideoElement;
});
define("ui/LoaderElement", ["require", "exports", "ui/GraphicElement", "events/EventType"], function (require, exports, GraphicElement_2, EventType_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LoaderElement = void 0;
    class LoaderElement extends GraphicElement_2.GraphicElement {
        constructor(stormPlayer) {
            super(stormPlayer, 'sp-loader');
        }
        draw() {
            super.draw();
            this.htmlElement.innerHTML = '<svg width="38" height="38" viewBox="0 0 38 38" stroke="#fff">\n' +
                '            <g fill="none" fill-rule="evenodd">\n' +
                '              <g transform="translate(1 1)" stroke-width="2">\n' +
                '                <circle stroke-opacity=".5" cx="18" cy="18" r="18" />\n' +
                '                <path d="M36 18c0-9.94-8.06-18-18-18">\n' +
                '                  <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s"\n' +
                '                    repeatCount="indefinite" />\n' +
                '                </path>\n' +
                '              </g>\n' +
                '            </g>\n' +
                '          </svg>';
            this.hide();
        }
        attachListeners() {
            let that = this;
            this.stormPlayer.addEventListener(EventType_2.EventType.LIBRARY_CREATED, function () {
                that.stormPlayer.getLibrary().addEventListener("playerStart", function () {
                    that.show();
                });
                that.stormPlayer.getLibrary().addEventListener("videoConnecting", function () {
                    that.show();
                });
                that.stormPlayer.getLibrary().addEventListener("videoBufforing", function () {
                    that.show();
                });
                that.stormPlayer.getLibrary().addEventListener("videoPlay", function () {
                    that.hide();
                });
                that.stormPlayer.getLibrary().addEventListener("videoPause", function () {
                    that.hide();
                });
                that.stormPlayer.addEventListener(EventType_2.EventType.ERROR_SHOWN, function () {
                    that.hide();
                });
            });
        }
    }
    exports.LoaderElement = LoaderElement;
});
define("ui/ErrorElement", ["require", "exports", "ui/GraphicElement", "events/EventType"], function (require, exports, GraphicElement_3, EventType_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ErrorElement = void 0;
    class ErrorElement extends GraphicElement_3.GraphicElement {
        constructor(stormPlayer) {
            super(stormPlayer, 'sp-error');
        }
        showErrorMessage(message) {
            this.htmlElement.querySelector('span').innerHTML = message;
            this.show();
            this.stormPlayer.dispatch(EventType_3.EventType.ERROR_SHOWN);
        }
        draw() {
            super.draw();
            this.htmlElement.innerHTML = `<svg width="72" height="72" viewBox="0 0 72 72">
        <defs>
        <filter id="ynnx5kr06a">
        <feColorMatrix in="SourceGraphic"
        values="0 0 0 0 0.875877 0 0 0 0 0.056962 0 0 0 0 0.198697 0 0 0 1.000000 0" />
            </filter>
            </defs>
            <g fill="none" fill-rule="evenodd">
        <g filter="url(#ynnx5kr06a)" transform="translate(-764 -536)">
        <g>
            <path d="M0 0L72 0 72 72 0 72z" transform="translate(764 536)" />
        <path fill="#000" fill-rule="nonzero"
        d="M36 21c-9.93 0-18 8.07-18 18 0 4.98 2.04 9.45 5.28 12.72l4.26-4.26C25.35 45.3 24 42.33 24 39c0-6.63 5.37-12 12-12s12 5.37 12 12c0 3.33-1.35 6.3-3.54 8.46l4.26 4.26C51.96 48.45 54 43.98 54 39c0-9.93-8.07-18-18-18zm0-12C19.44 9 6 22.44 6 39c0 8.28 3.36 15.78 8.79 21.21l4.26-4.26C14.7 51.63 12 45.63 12 39c0-13.26 10.74-24 24-24 7.59 0 14.34 3.51 18.72 9h7.26C56.79 15.03 47.1 9 36 9zm0 24c-3.3 0-6 2.7-6 6 0 1.65.69 3.15 1.77 4.23C32.85 44.31 34.35 45 36 45c1.65 0 3.15-.69 4.23-1.77C41.31 42.15 42 40.65 42 39c0-3.3-2.7-6-6-6zm24-3h6v18h-6V30zm0 24h6v6h-6v-6z"
        transform="translate(764 536)" />
            </g>
            </g>
            </g>
            </svg>
<span></span>`;
            this.hide();
        }
        attachListeners() {
            let that = this;
            this.stormPlayer.addEventListener(EventType_3.EventType.LIBRARY_CREATED, function () {
                that.stormPlayer.getLibrary().addEventListener("playerDisconnected", function (e) {
                    that.showErrorMessage(that.stormPlayer.getGuiConfig().getPlayerDisconnectedText());
                });
                that.stormPlayer.getLibrary().addEventListener("onAllServersFailed", function (e) {
                    that.showErrorMessage(that.stormPlayer.getGuiConfig().getServersFailedText());
                });
                that.stormPlayer.getLibrary().addEventListener("compatibilityError", function (e) {
                    that.showErrorMessage(that.stormPlayer.getGuiConfig().getCompatibilityErrorText());
                });
                that.stormPlayer.getLibrary().addEventListener("noSLLError", function (e) {
                    that.showErrorMessage(that.stormPlayer.getGuiConfig().getNoSSLErrorText());
                });
                that.stormPlayer.getLibrary().addEventListener("videoError", function (e) {
                    that.showErrorMessage(that.stormPlayer.getGuiConfig().getVideoErrorText());
                });
                that.stormPlayer.getLibrary().addEventListener("videoNotFound", function (e) {
                    that.showErrorMessage(that.stormPlayer.getGuiConfig().getVideoNotFoundText());
                });
                that.stormPlayer.getLibrary().addEventListener("videoStop", function (e) {
                    that.showErrorMessage(that.stormPlayer.getGuiConfig().getVideoStopText());
                });
                that.stormPlayer.getLibrary().addEventListener("incompatiblePlayerProtocol", function (e) {
                    that.showErrorMessage(that.stormPlayer.getGuiConfig().getIncompatiblePlayerProtocolText());
                });
            });
        }
    }
    exports.ErrorElement = ErrorElement;
});
define("ui/PlaybackElement", ["require", "exports", "ui/GraphicElement", "events/EventType"], function (require, exports, GraphicElement_4, EventType_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PlaybackElement = void 0;
    class PlaybackElement extends GraphicElement_4.GraphicElement {
        constructor(stormPlayer) {
            super(stormPlayer, 'sp-playback');
            this.dontShowPlayback = false;
            if (this.stormPlayer.getGuiConfig().isBigPlaybackButton() === false)
                this.hide();
        }
        show() {
            if (this.stormPlayer.getGuiConfig().isBigPlaybackButton() === false || this.dontShowPlayback)
                return;
            super.show();
        }
        draw() {
            super.draw();
            this.htmlElement.innerHTML = `<svg class="sp-play-icon" width="43" height="53" viewBox="0 0 72 72">
                    <g  fill="#fff" fill-rule="evenodd">
                      <g id="path" fill="#fff">
                        <g>
                          <path
                            d="M13.51 7.681l9.252 13.57c.945 1.386.587 3.276-.799 4.221-.504.344-1.1.528-1.711.528H1.748C.07 26-1.29 24.64-1.29 22.962c0-.61.184-1.207.528-1.711L8.49 7.68c.945-1.386 2.835-1.743 4.221-.798.314.214.585.485.8.798z"
                            transform="translate(-221 -954) translate(290 947) rotate(90 11 15) scale(3.6)" />
                        </g>
                      </g>
                    </g>    
                  </svg>
                  `;
            this.hide();
        }
        attachListeners() {
            let that = this;
            this.htmlElement.addEventListener('click', function () {
                that.stormPlayer.dispatch(EventType_4.EventType.PLAY_CLICKED);
            });
            this.stormPlayer.addEventListener(EventType_4.EventType.SEEK_STARTED, function () {
                that.dontShowPlayback = true;
            });
            this.stormPlayer.addEventListener(EventType_4.EventType.SEEK_ENDED, function () {
                that.dontShowPlayback = false;
            });
            this.stormPlayer.addEventListener(EventType_4.EventType.LIBRARY_CREATED, function () {
                that.stormPlayer.getLibrary().addEventListener("playerReady", function () {
                    that.show();
                });
                that.stormPlayer.getLibrary().addEventListener("interactionRequired", function (e) {
                    that.show();
                });
                that.stormPlayer.getLibrary().addEventListener("videoConnecting", function () {
                    that.hide();
                });
                that.stormPlayer.getLibrary().addEventListener("videoPlay", function () {
                    that.hide();
                });
                that.stormPlayer.getLibrary().addEventListener("videoPause", function () {
                    that.show();
                });
            });
        }
    }
    exports.PlaybackElement = PlaybackElement;
});
define("ui/HeaderElement", ["require", "exports", "ui/GraphicElement", "events/EventType"], function (require, exports, GraphicElement_5, EventType_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HeaderElement = void 0;
    class HeaderElement extends GraphicElement_5.GraphicElement {
        constructor(stormPlayer) {
            super(stormPlayer, 'sp-header');
        }
        show() {
            this.htmlElement.classList.remove("sp-controls--hidden");
        }
        hide() {
            this.htmlElement.classList.add("sp-controls--hidden");
        }
        draw() {
            super.draw();
            this.shadowElement = new GraphicElement_5.GraphicElement(this.stormPlayer, "sp-header__shadow");
            this.htmlElement.appendChild(this.shadowElement.getHtmlElement());
            this.wrapperElement = new GraphicElement_5.GraphicElement(this.stormPlayer, "sp-header__wrapper");
            this.htmlElement.appendChild(this.wrapperElement.getHtmlElement());
            this.wrapperElement.getHtmlElement().innerHTML = '<h2 class="sp-header__text sp-header__title"></h2><p class="sp-header__text sp-header__sub-title"></p>';
            this.liveIconElement = new GraphicElement_5.GraphicElement(this.stormPlayer, "sp-live-icon");
            this.htmlElement.appendChild(this.liveIconElement.getHtmlElement());
            this.liveIconElement.getHtmlElement().innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g fill="none" fill-rule="evenodd">
                <g>
                  <g>
                    <path d="M0 0H24V24H0z" transform="translate(-1301 -243) translate(1301 243)" />
                    <path fill="#df0f33" fill-rule="nonzero"
                      d="M7.76 16.24C6.67 15.16 6 13.66 6 12c0-1.66.67-3.16 1.76-4.24l1.42 1.42C8.45 9.9 8 10.9 8 12c0 1.1.45 2.1 1.17 2.83l-1.41 1.41zm8.48 0C17.33 15.16 18 13.66 18 12c0-1.66-.67-3.16-1.76-4.24l-1.42 1.42C15.55 9.9 16 10.9 16 12c0 1.1-.45 2.1-1.17 2.83l1.41 1.41zM12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 2c0 2.21-.9 4.21-2.35 5.65l1.42 1.42C20.88 17.26 22 14.76 22 12c0-2.76-1.12-5.26-2.93-7.07l-1.42 1.42C19.1 7.79 20 9.79 20 12zM6.35 6.35L4.93 4.93C3.12 6.74 2 9.24 2 12c0 2.76 1.12 5.26 2.93 7.07l1.42-1.42C4.9 16.21 4 14.21 4 12c0-2.21.9-4.21 2.35-5.65z"
                      transform="translate(-1301 -243) translate(1301 243)" />
                  </g>
                </g>
              </g>
            </svg>

            <span class="sp-live-icon__text" id="sp-live-icon-text">${this.stormPlayer.getGuiConfig().getLiveText()}</span>`;
        }
        setTitle(title) {
            this.wrapperElement.getHtmlElement().querySelector("h2").innerHTML = title;
            this.stormPlayer.dispatch(EventType_5.EventType.TITLE_SETTED, title);
        }
        setSubtitle(subtitle) {
            this.wrapperElement.getHtmlElement().querySelector("p").innerHTML = subtitle;
            this.stormPlayer.dispatch(EventType_5.EventType.SUBTITLE_SETTED, subtitle);
        }
        attachListeners() {
            let that = this;
            this.stormPlayer.addEventListener(EventType_5.EventType.GUI_SHOWN, function () {
                that.show();
            });
            this.stormPlayer.addEventListener(EventType_5.EventType.GUI_HIDED, function () {
                that.hide();
            });
        }
    }
    exports.HeaderElement = HeaderElement;
});
define("ui/CuePointElement", ["require", "exports", "ui/GraphicElement"], function (require, exports, GraphicElement_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CuePointElement = void 0;
    class CuePointElement extends GraphicElement_6.GraphicElement {
        constructor(stormPlayer, title, time) {
            super(stormPlayer, "sp-cue-points__item", "span");
            this.time = time;
            this.title = title;
            this.htmlElement.setAttribute("data-title", this.title);
            this.htmlElement.addEventListener('mousedown', function (e) {
                stormPlayer.getLibrary().seek(time);
            });
            this.hide();
        }
        getTitle() {
            return this.title;
        }
        getTime() {
            return this.time;
        }
        draw() {
            super.draw();
            this.htmlElement.innerHTML = `<svg width="32" height="29" viewBox="0 0 32 29">
                        <defs>
                            <linearGradient id="j7tevhbxvc" x1="4.09%" x2="102%" y1="34.996%" y2="66.653%">
                                <stop offset="0%" stop-color="#FFAA5A"></stop>
                                <stop offset="100%" stop-color="#FF785A"></stop>
                            </linearGradient>
                            <filter id="33nbyogp2a" width="347.1%" height="556%" x="-123.5%" y="-174.8%" filterUnits="objectBoundingBox">
                                <feOffset dy="4" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                                <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="5.5"></feGaussianBlur>
                                <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0.845910114 0 0 0 0 0.344176545 0 0 0 0 0.0722088167 0 0 0 0.254263284 0"></feColorMatrix>
                            </filter>
                            <path id="qxoxvdy78b" d="M735.753 913.86l4.796 5.481c.363.416.321 1.048-.094 1.412-.183.16-.417.247-.659.247h-9.592c-.553 0-1-.448-1-1 0-.242.088-.476.247-.659l4.796-5.48c.364-.417.996-.459 1.412-.095.033.03.064.06.094.094z"></path>
                        </defs>
                        <g fill="none" fill-rule="evenodd">
                            <g>
                                <g transform="translate(-719 -898) matrix(1 0 0 -1 0 1834)">
                                    <use fill="#000" filter="url(#33nbyogp2a)" xlink:href="#qxoxvdy78b"></use>
                                    <use fill="url(#j7tevhbxvc)" xlink:href="#qxoxvdy78b"></use>
                                </g>
                            </g>
                        </g>
                    </svg>`;
        }
    }
    exports.CuePointElement = CuePointElement;
});
define("ui/CuePointsElement", ["require", "exports", "ui/GraphicElement", "ui/CuePointElement", "events/EventType"], function (require, exports, GraphicElement_7, CuePointElement_1, EventType_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CuePointsElement = void 0;
    class CuePointsElement extends GraphicElement_7.GraphicElement {
        constructor(stormPlayer, progressbarElement) {
            super(stormPlayer, "sp-cue-points");
            this.list = new Array();
            this.progressbarElement = progressbarElement;
        }
        addCuePoint(title, time) {
            let cuePoint = new CuePointElement_1.CuePointElement(this.stormPlayer, title, time);
            this.list.push(cuePoint);
            this.htmlElement.appendChild(cuePoint.getHtmlElement());
        }
        removeCuePoint(time) {
            let indexesToRemove = [];
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].getTime() == time) {
                    this.list[i].remove();
                    indexesToRemove.push(i);
                }
            }
            for (let i = 0; i < indexesToRemove.length; i++) {
                this.list.splice(indexesToRemove[i], 1);
            }
        }
        refreshCuePointsPosition() {
            for (let i = 0; i < this.list.length; i++) {
                let cuePointPercentPosition = this.timeToPercent(this.list[i].getTime());
                let xPosition = (cuePointPercentPosition * this.htmlElement.clientWidth) / 100;
                this.list[i].getHtmlElement().style.left = `${xPosition}px`;
                this.list[i].show();
                if (xPosition < 0)
                    this.removeCuePoint(this.list[i].getTime());
            }
        }
        timeToPercent(time) {
            time -= this.progressbarElement.getProgressBarStartTime();
            let progressBarEndTime = this.progressbarElement.getProgressBarEndTime() - this.progressbarElement.getProgressBarStartTime();
            let percent = (time * 100) / progressBarEndTime;
            return percent;
        }
        attachListeners() {
            let that = this;
            this.stormPlayer.addEventListener(EventType_6.EventType.CUEPOINT_ADDED, function (e) {
                that.addCuePoint(e.title, e.time);
            });
            this.stormPlayer.addEventListener(EventType_6.EventType.CUEPOINT_REMOVED, function (e) {
                that.removeCuePoint(e.time);
            });
        }
    }
    exports.CuePointsElement = CuePointsElement;
});
define("ui/ProgressbarElement", ["require", "exports", "ui/GraphicElement", "ui/CuePointsElement", "events/EventType"], function (require, exports, GraphicElement_8, CuePointsElement_1, EventType_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProgressbarElement = void 0;
    class ProgressbarElement extends GraphicElement_8.GraphicElement {
        constructor(stormPlayer) {
            super(stormPlayer, "sp-progress");
            this.stopRefreshBar = false;
        }
        percentToTime(percent) {
            if (percent < 0)
                percent = 0;
            if (percent > 100)
                percent = 100;
            percent = 100 - percent;
            let endTime = this.dvrCacheSize;
            let percentTime = Math.round((endTime * percent) / 100);
            return percentTime;
        }
        setPosition(percent) {
            let maxThumbPos = this.seekElement.clientWidth;
            maxThumbPos -= 15;
            let thumbPos = (maxThumbPos * percent) / 100;
            thumbPos += 5;
            this.thumbElement.getHtmlElement().style.transform = `translateX(${thumbPos}px)`;
            this.progressElement.setAttribute("min", "0");
            this.progressElement.setAttribute("max", "100");
            this.progressElement.setAttribute("value", percent.toString());
        }
        seekTo(percent) {
            let percentTime = this.percentToTime(percent);
            let seekTime = this.progressBarEndTime - percentTime;
            let seekDate = new Date(seekTime);
            let seekHours = seekDate.getHours();
            let seekMinutes = "0" + seekDate.getMinutes();
            let seekSeconds = "0" + seekDate.getSeconds();
            let formattedSeekTime = seekHours + ':' + seekMinutes.substr(-2) + ':' + seekSeconds.substr(-2);
            if (this.lastSeekUpdateTime == seekTime)
                return;
            this.lastSeekUpdateTime = seekTime;
            this.stormPlayer.dispatch(EventType_7.EventType.SEEK_SETTED, { seekToTime: seekTime });
        }
        refreshBar() {
            if (this.stopRefreshBar)
                return;
            if (!this.stormPlayer.getGuiConfig().getTimeline() || this.dvrCacheSize < 1000 * 5)
                this.hide();
            else {
                this.show();
                this.progressElement.setAttribute("min", "0");
                this.progressElement.setAttribute("max", (this.progressBarEndTime - this.progressBarStartTime).toString());
                this.progressElement.setAttribute("value", (this.progressBarCurrTime - this.progressBarStartTime).toString());
                let maxThumbPos = this.seekElement.clientWidth;
                maxThumbPos -= 15;
                let thumbPos = maxThumbPos * (this.progressBarCurrTime - this.progressBarStartTime) / (this.progressBarEndTime - this.progressBarStartTime);
                thumbPos += 5;
                this.thumbElement.getHtmlElement().style.transform = `translateX(${thumbPos}px)`;
                this.thumbElement.show();
                this.cuePointsElement.refreshCuePointsPosition();
            }
        }
        parseServerData(data) {
            this.streamDuration = data.streamDuration;
            this.sourceDuration = data.sourceDuration;
            this.sourceStartTime = data.sourceStartTime;
            this.streamStartTime = data.streamStartTime;
            this.dvrCacheSize = data.dvrCacheSize;
            this.progressBarStartTime = this.sourceStartTime + this.sourceDuration - this.dvrCacheSize;
            this.progressBarEndTime = this.sourceStartTime + this.sourceDuration;
            this.progressBarCurrTime = this.streamStartTime + this.streamDuration;
            if (this.progressBarCurrTime > this.progressBarEndTime)
                this.progressBarCurrTime = this.progressBarEndTime;
            let startDVR = this.progressBarStartTime;
            let endDVR = this.progressBarEndTime;
            let currTimePos = this.progressBarCurrTime;
            let startDVRDate = new Date(startDVR);
            let endDVRDate = new Date(endDVR);
            let dvrSize = new Date(this.dvrCacheSize);
            let currTimePosDate = new Date(currTimePos);
            let startHours = startDVRDate.getHours();
            let startMinutes = "0" + startDVRDate.getMinutes();
            let startSeconds = "0" + startDVRDate.getSeconds();
            let endHours = endDVRDate.getHours();
            let endMinutes = "0" + endDVRDate.getMinutes();
            let endSeconds = "0" + endDVRDate.getSeconds();
            let dvrMinutes = "0" + dvrSize.getMinutes();
            let dvrSeconds = "0" + dvrSize.getSeconds();
            let currHours = currTimePosDate.getHours();
            let currMinutes = "0" + currTimePosDate.getMinutes();
            let currSeconds = "0" + currTimePosDate.getSeconds();
            let formattedStartTime = startHours + ':' + startMinutes.substr(-2) + ':' + startSeconds.substr(-2);
            let formattedEndTime = endHours + ':' + endMinutes.substr(-2) + ':' + endSeconds.substr(-2);
            let formattedSize = dvrMinutes.substr(-2) + ':' + dvrSeconds.substr(-2);
            let formattedCurrTime = currHours + ':' + currMinutes.substr(-2) + ':' + currSeconds.substr(-2);
            this.refreshBar();
        }
        updateTooltip(mouseX) {
            if (mouseX < 0)
                mouseX = 0;
            else if (mouseX > this.seekElement.clientWidth)
                mouseX = this.seekElement.clientWidth;
            let maxPos = this.seekElement.clientWidth;
            let percentPosition = (mouseX * 100) / maxPos;
            let percentTimeSeconds = this.percentToTime(percentPosition) / 1000;
            let tooltipText = percentTimeSeconds > 0 ? "-" + this.secondsToNicetime(percentTimeSeconds) : this.stormPlayer.getGuiConfig().getLiveText();
            this.seekTooltipElement.getHtmlElement().innerHTML = tooltipText;
            if (mouseX < 34)
                mouseX = 34;
            else if (mouseX > maxPos - 25)
                mouseX = maxPos - 25;
            this.seekTooltipElement.getHtmlElement().style.left = `${mouseX + 5}px`;
        }
        secondsToNicetime(seconds) {
            const h = Math.floor(seconds / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            const s = Math.round(seconds % 60);
            return [
                h,
                m > 9 ? m : (h ? '0' + m : m || '0'),
                s > 9 ? s : '0' + s
            ].filter(Boolean).join(':');
        }
        draw() {
            super.draw();
            this.cuePointsElement = new CuePointsElement_1.CuePointsElement(this.stormPlayer, this);
            this.htmlElement.appendChild(this.cuePointsElement.getHtmlElement());
            this.thumbElement = new GraphicElement_8.GraphicElement(this.stormPlayer, "sp-progress-thumb");
            this.htmlElement.appendChild(this.thumbElement.getHtmlElement());
            this.thumbElement.hide();
            this.progressElement = document.createElement('progress');
            this.progressElement.className = 'sp-progress-bar';
            this.progressElement.setAttribute("value", "0");
            this.progressElement.setAttribute("min", "0");
            this.progressElement.setAttribute("max", "100");
            this.htmlElement.appendChild(this.progressElement);
            this.progressEndElement = new GraphicElement_8.GraphicElement(this.stormPlayer, "sp-progress-bar__end", "span");
            this.htmlElement.appendChild(this.progressEndElement.getHtmlElement());
            this.seekElement = document.createElement('input');
            this.seekElement.className = 'sp-seek';
            this.seekElement.setAttribute("min", "0");
            this.seekElement.setAttribute("type", "range");
            this.seekElement.setAttribute("step", "0.001");
            this.seekElement.setAttribute("max", "100");
            this.htmlElement.appendChild(this.seekElement);
            this.seekTooltipElement = new GraphicElement_8.GraphicElement(this.stormPlayer, 'sp-seek__tooltip');
            this.htmlElement.appendChild(this.seekTooltipElement.getHtmlElement());
            this.hide();
        }
        getProgressBarStartTime() {
            return this.progressBarStartTime;
        }
        getProgressBarEndTime() {
            return this.progressBarEndTime;
        }
        getProgressBarCurrTime() {
            return this.progressBarCurrTime;
        }
        attachListeners() {
            let that = this;
            this.stormPlayer.addEventListener(EventType_7.EventType.LIBRARY_CREATED, function () {
                that.stormPlayer.getLibrary().addEventListener("videoProgress", function (e) {
                    that.parseServerData(e);
                });
            });
            this.seekElement.addEventListener('input', function (e) {
                that.setPosition(parseFloat(this.value));
            });
            this.seekElement.addEventListener('mousemove', function (e) {
                let rect = that.seekElement.getBoundingClientRect();
                let xPosition = e.clientX - rect.left;
                that.updateTooltip(xPosition);
            });
            this.seekElement.addEventListener('mousedown', function (e) {
                that.stopRefreshBar = true;
                that.stormPlayer.dispatch(EventType_7.EventType.SEEK_STARTED);
            });
            this.seekElement.addEventListener('mouseup', function (e) {
                that.stopRefreshBar = false;
                that.seekTo(parseFloat(this.value));
                that.stormPlayer.dispatch(EventType_7.EventType.SEEK_ENDED);
            });
        }
    }
    exports.ProgressbarElement = ProgressbarElement;
});
define("ui/controlbuttons/PlayElement", ["require", "exports", "ui/GraphicElement", "events/EventType"], function (require, exports, GraphicElement_9, EventType_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PlayElement = void 0;
    class PlayElement extends GraphicElement_9.GraphicElement {
        constructor(stormPlayer) {
            super(stormPlayer, 'sp-play');
        }
        draw() {
            super.draw();
            this.playButtonElement = document.createElement("button");
            this.playButtonElement.className = 'sp-play__button';
            this.playButtonElement.innerHTML = `<svg class="sp-play-icon" width="17" height="22" viewBox="0 2 21 26">
                    <g fill="none" fill-rule="evenodd">
                      <g fill="#000">
                        <g>
                          <path
                            d="M13.51 7.681l9.252 13.57c.945 1.386.587 3.276-.799 4.221-.504.344-1.1.528-1.711.528H1.748C.07 26-1.29 24.64-1.29 22.962c0-.61.184-1.207.528-1.711L8.49 7.68c.945-1.386 2.835-1.743 4.221-.798.314.214.585.485.8.798z"
                            transform="translate(-221 -954) translate(221 954) rotate(90 11 15)" />
                        </g>
                      </g>
                    </g>    
                  </svg>
                  <svg class="sp-pause-icon sp-hidden" width="17" height="22" viewBox="6 4 12 16">
                    <path d="M14.016 5.016h3.984v13.969h-3.984v-13.969zM6 18.984v-13.969h3.984v13.969h-3.984z"></path>
                  </svg>`;
            this.htmlElement.append(this.playButtonElement);
        }
        showPlay() {
            this.playButtonElement.querySelector(".sp-play-icon").classList.remove("sp-hidden");
            this.playButtonElement.querySelector(".sp-pause-icon").classList.add("sp-hidden");
        }
        showPause() {
            this.playButtonElement.querySelector(".sp-play-icon").classList.add("sp-hidden");
            this.playButtonElement.querySelector(".sp-pause-icon").classList.remove("sp-hidden");
        }
        attachListeners() {
            let that = this;
            this.stormPlayer.addEventListener(EventType_8.EventType.LIBRARY_CREATED, function () {
                that.stormPlayer.getLibrary().addEventListener("interactionRequired", function (e) {
                    that.showPlay();
                });
                that.stormPlayer.getLibrary().addEventListener("videoConnecting", function () {
                    that.showPause();
                });
                that.stormPlayer.getLibrary().addEventListener("videoPlay", function () {
                    that.showPause();
                });
                that.stormPlayer.getLibrary().addEventListener("videoConnecting", function () {
                    that.showPause();
                });
                that.stormPlayer.getLibrary().addEventListener("videoPause", function () {
                    that.showPlay();
                });
            });
            this.playButtonElement.addEventListener("click", function (e) {
                if (!that.playButtonElement.querySelector(".sp-play-icon").classList.contains('sp-hidden'))
                    that.stormPlayer.dispatch(EventType_8.EventType.PLAY_CLICKED);
                else
                    that.stormPlayer.dispatch(EventType_8.EventType.PAUSE_CLICKED);
            });
        }
    }
    exports.PlayElement = PlayElement;
});
define("ui/controlbuttons/VolumeElement", ["require", "exports", "ui/GraphicElement", "events/EventType"], function (require, exports, GraphicElement_10, EventType_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VolumeElement = void 0;
    class VolumeElement extends GraphicElement_10.GraphicElement {
        constructor(stormPlayer) {
            super(stormPlayer, 'sp-volume');
            this.hideTimeoutSeconds = 3;
        }
        showMute() {
            this.volumeButtonElement.querySelector(".sp-mute-icon").classList.remove("sp-hidden");
            this.volumeButtonElement.querySelector(".sp-unmute-icon").classList.add("sp-hidden");
        }
        showUnMute() {
            this.volumeButtonElement.querySelector(".sp-mute-icon").classList.add("sp-hidden");
            this.volumeButtonElement.querySelector(".sp-unmute-icon").classList.remove("sp-hidden");
        }
        setVolume(percent) {
            if (this.stormPlayer.getLibraryManager().getConfig().settings.audio && this.stormPlayer.getLibraryManager().getConfig().settings.audio.maxVolume && percent > this.stormPlayer.getLibraryManager().getConfig().settings.audio.maxVolume)
                percent = this.stormPlayer.getLibraryManager().getConfig().settings.audio.maxVolume;
            let px = (percent * 70) / 100;
            this.volumeProgressElement.style.transform = `translateX(${px}px)`;
            this.stormPlayer.dispatch(EventType_9.EventType.VOLUME_CHANGED, { volume: percent });
        }
        resetHideTimeout() {
            if (this.hideTimeout)
                clearTimeout(this.hideTimeout);
            var that = this;
            this.hideTimeout = setTimeout(function () {
                that.volumeButtonElement.classList.remove("sp-active");
                that.volumeControlWrapperElement.classList.add('sp-hidden');
            }, this.hideTimeoutSeconds * 1000);
        }
        draw() {
            super.draw();
            this.volumeButtonElement = document.createElement("button");
            this.volumeButtonElement.className = 'sp-volume__button';
            this.volumeButtonElement.innerHTML = `
                <svg class="sp-mute-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="21" viewBox="0 0 28 21">
                    <g transform="translate(0 0)">
                        <path d="M22.486,20.649l-.161-.157a1.183,1.183,0,0,1-.072-1.622,12.59,12.59,0,0,0-.216-16.715A1.182,1.182,0,0,1,22.086.511l.16-.157a1.2,1.2,0,0,1,.9-.353,1.235,1.235,0,0,1,.881.4,15.171,15.171,0,0,1,.257,20.171A1.237,1.237,0,0,1,23.4,21h-.051A1.236,1.236,0,0,1,22.486,20.649Zm-11.419-.916-6.45-5.259H1.18A1.171,1.171,0,0,1,0,13.313V8.688A1.17,1.17,0,0,1,1.18,7.527H4.616l6.45-5.26a1.2,1.2,0,0,1,1.255-.157A1.162,1.162,0,0,1,13,3.162V18.839a1.158,1.158,0,0,1-.679,1.05,1.193,1.193,0,0,1-1.255-.157Zm7.2-3.217-.165-.161a1.182,1.182,0,0,1-.118-1.564,6.863,6.863,0,0,0-.189-8.554,1.182,1.182,0,0,1,.085-1.606l.164-.16a1.212,1.212,0,0,1,.928-.35,1.234,1.234,0,0,1,.888.439,9.455,9.455,0,0,1,.256,11.825,1.233,1.233,0,0,1-.895.479c-.03,0-.059,0-.088,0A1.239,1.239,0,0,1,18.266,16.516Z" fill="#fff"/>
                    </g>
                </svg>
                <svg class="sp-unmute-icon sp-hidden" version=“1.1” id=“Layer_1" xmlns=“http://www.w3.org/2000/svg” xmlns:xlink=“http://www.w3.org/1999/xlink” x=“0px” y=“0px” viewBox="0 -2 28 21" xml:space=“preserve”>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="PLAYER-@go-back" transform="translate(-255.000000, -966.000000)" fill="#FFFFFF">
                            <g id="Group-4" transform="translate(255.000000, 966.000000)">
                                <polygon id="Fill-1" points="24.364 5 22.066 7.298 19.768 5 18 6.768 20.298 9.065 18 11.364 19.768 13.132 22.066 10.834 24.364 13.132 26.132 11.364 23.834 9.065 26.132 6.768"></polygon>
                                <g id="VOLUME-CONTROLLER" fill-rule="nonzero">
                                    <path d="M12.3213457,17.8895415 C12.1613173,17.9640048 11.9898384,18 11.8194767,18 C11.5496906,18 11.2824181,17.9087756 11.0665335,17.7326465 L4.61568703,12.4735047 L1.17996477,12.4735047 C0.528400791,12.4740542 0,11.9539102 0,11.3128665 L0,6.68762428 C0,6.04630572 0.528400791,5.52643653 1.17996477,5.52643653 L4.61596631,5.52643653 L11.0668128,0.267294644 C11.4192661,-0.020117185 11.9080089,-0.0813914086 12.321625,0.110949204 C12.735241,0.301915954 13,0.711326686 13,1.16140372 L12.9997207,16.839087 C12.9997207,17.2894388 12.735241,17.6985748 12.3213457,17.8895415 Z" id="volume-icon"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            `;
            this.htmlElement.append(this.volumeButtonElement);
            this.volumeControlWrapperElement = document.createElement("div");
            this.volumeControlWrapperElement.className = 'sp-volume__wrapper sp-hidden';
            this.htmlElement.append(this.volumeControlWrapperElement);
            this.volumeInputElement = document.createElement("input");
            this.volumeInputElement.className = 'sp-volume__input';
            this.volumeInputElement.setAttribute("value", "1");
            this.volumeInputElement.setAttribute("data-mute", "0.5");
            this.volumeInputElement.setAttribute("type", "range");
            this.volumeInputElement.setAttribute("max", "1");
            this.volumeInputElement.setAttribute("min", "0");
            this.volumeInputElement.setAttribute("step", "0.01");
            this.volumeControlWrapperElement.append(this.volumeInputElement);
            this.volumeProgressWrapperElement = document.createElement("div");
            this.volumeProgressWrapperElement.className = 'sp-volume__progress';
            this.volumeControlWrapperElement.append(this.volumeProgressWrapperElement);
            this.volumeProgressElement = document.createElement("div");
            this.volumeProgressElement.className = 'sp-volume__thumb';
            this.volumeProgressElement.style.transform = 'translateX(24px)';
            this.volumeProgressWrapperElement.appendChild(this.volumeProgressElement);
        }
        attachListeners() {
            let that = this;
            if (!this.stormPlayer.isTouchDevice()) {
                this.htmlElement.addEventListener("mousemove", function () {
                    if (!that.stormPlayer.getLibrary().isMute()) {
                        that.volumeControlWrapperElement.classList.remove('sp-hidden');
                        that.resetHideTimeout();
                    }
                });
                this.volumeInputElement.addEventListener("mousemove", function () {
                    that.resetHideTimeout();
                });
                this.stormPlayer.addEventListener(EventType_9.EventType.MUTE_CLICKED, function () {
                    that.volumeButtonElement.classList.remove("sp-active");
                    that.volumeControlWrapperElement.classList.add('sp-hidden');
                });
                this.stormPlayer.addEventListener(EventType_9.EventType.UNMUTE_CLICKED, function () {
                });
            }
            this.stormPlayer.addEventListener(EventType_9.EventType.GUI_HIDED, function () {
                that.volumeButtonElement.classList.remove("sp-active");
                that.volumeControlWrapperElement.classList.add('sp-hidden');
            });
            this.volumeInputElement.addEventListener("input", function () {
                that.setVolume(parseFloat(this.value) * 100);
                that.resetHideTimeout();
            });
            this.volumeButtonElement.addEventListener("click", function (e) {
                if (that.volumeButtonElement.querySelector(".sp-mute-icon").classList.contains('sp-hidden'))
                    that.stormPlayer.dispatch(EventType_9.EventType.UNMUTE_CLICKED);
                else
                    that.stormPlayer.dispatch(EventType_9.EventType.MUTE_CLICKED);
            });
            this.stormPlayer.addEventListener(EventType_9.EventType.LIBRARY_INITIALIZED, function () {
                that.stormPlayer.getLibrary().addEventListener("volumeChange", function (event) {
                    that.setVolume(event.volume);
                    if (event.isMuted)
                        that.showUnMute();
                    else
                        that.showMute();
                });
            });
        }
    }
    exports.VolumeElement = VolumeElement;
});
define("ui/controlbuttons/QualityMenuElement", ["require", "exports", "ui/GraphicElement", "events/EventType"], function (require, exports, GraphicElement_11, EventType_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.QualityMenuElement = void 0;
    class QualityMenuElement extends GraphicElement_11.GraphicElement {
        constructor(stormPlayer) {
            super(stormPlayer, 'sp-menu sp-menu__quality sp-menu--hidden');
            this.listItems = [];
        }
        setCurrentItem() {
            let currentLabel = this.stormPlayer.getLibrary().getCurrentQuality();
            for (let i = 0; i < this.listItems.length; i++) {
                if (this.listItems[i].getAttribute("data-label") == currentLabel)
                    this.listItems[i].classList.add('sp-menu__list-item__active');
                else
                    this.listItems[i].classList.remove('sp-menu__list-item__active');
            }
        }
        refreshList() {
            this.spMenuBoxElement.getHtmlElement().querySelector("ul").innerHTML = '';
            this.listItems = [];
            let that = this;
            let list = this.stormPlayer.getLibrary().getAllSources();
            for (let i = 0; i < list.length; i++) {
                let menuPosition = document.createElement('li');
                menuPosition.setAttribute("data-label", list[i].streamInfo.label);
                menuPosition.classList.add('sp-menu__list-item');
                menuPosition.innerHTML = `<span>${list[i].streamInfo.label}</span>
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <g fill="none" fill-rule="evenodd">
                                <g>
                                    <g>
                                        <g>
                                            <path d="M0 0L24 0 24 24 0 24z" transform="translate(-400 -664) translate(234 554) translate(166 110)"></path>
                                            <path fill="#FFF" fill-rule="nonzero" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" transform="translate(-400 -664) translate(234 554) translate(166 110)"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>`;
                this.listItems.push(menuPosition);
                this.spMenuBoxElement.getHtmlElement().querySelector("ul").appendChild(menuPosition);
                menuPosition.addEventListener("click", function () {
                    that.stormPlayer.dispatch(EventType_10.EventType.QUALITY_CHANGED, { label: this.getAttribute("data-label") });
                    that.getHtmlElement().classList.add("sp-menu--hidden");
                });
            }
            this.setCurrentItem();
        }
        draw() {
            super.draw();
            this.spMenuBoxElement = new GraphicElement_11.GraphicElement(this.stormPlayer, 'sp-menu__box');
            this.htmlElement.appendChild(this.spMenuBoxElement.getHtmlElement());
            this.spMenuBoxElement.getHtmlElement().innerHTML = `<ul class="sp-menu__list"></ul>`;
        }
        attachListeners() {
            let that = this;
            this.stormPlayer.addEventListener(EventType_10.EventType.LIBRARY_INITIALIZED, function () {
                that.refreshList();
                that.stormPlayer.getLibrary().addEventListener("newStreamSourceAdded", function () {
                    that.refreshList();
                });
                that.stormPlayer.getLibrary().addEventListener("videoConnecting", function () {
                    that.setCurrentItem();
                });
                that.stormPlayer.getLibrary().addEventListener("videoPlay", function () {
                    that.setCurrentItem();
                });
            });
            this.stormPlayer.addEventListener(EventType_10.EventType.QUALITY_CLICKED, function () {
                that.getHtmlElement().classList.toggle("sp-menu--hidden");
            });
            this.stormPlayer.addEventListener(EventType_10.EventType.GUI_HIDED, function () {
                that.getHtmlElement().classList.add("sp-menu--hidden");
            });
            document.addEventListener("click", function (e) {
                if (!e.target.classList.contains("sp-controls__button"))
                    that.getHtmlElement().classList.add("sp-menu--hidden");
            });
        }
    }
    exports.QualityMenuElement = QualityMenuElement;
});
define("ui/controlbuttons/QualityElement", ["require", "exports", "ui/GraphicElement", "events/EventType", "ui/controlbuttons/QualityMenuElement"], function (require, exports, GraphicElement_12, EventType_11, QualityMenuElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.QualityElement = void 0;
    class QualityElement extends GraphicElement_12.GraphicElement {
        constructor(stormPlayer) {
            super(stormPlayer, 'sp-resolution sp-hidden');
        }
        refreshButton() {
            if (this.stormPlayer.getLibrary().getAllSources().length == 1)
                this.hide();
            else
                this.show();
            this.qualityButtonElement.innerHTML = `<span>${this.stormPlayer.getLibrary().getCurrentQuality()}</span>`;
        }
        draw() {
            super.draw();
            this.qualityButtonElement = document.createElement("button");
            this.qualityButtonElement.className = 'sp-controls__button';
            this.htmlElement.append(this.qualityButtonElement);
            this.qualityMenuElement = new QualityMenuElement_1.QualityMenuElement(this.stormPlayer);
            this.htmlElement.appendChild(this.qualityMenuElement.getHtmlElement());
        }
        attachListeners() {
            let that = this;
            this.qualityButtonElement.addEventListener("click", function () {
                that.stormPlayer.dispatch(EventType_11.EventType.QUALITY_CLICKED);
            });
            this.stormPlayer.addEventListener(EventType_11.EventType.LIBRARY_INITIALIZED, function () {
                that.refreshButton();
                that.stormPlayer.getLibrary().addEventListener("newStreamSourceAdded", function () {
                    that.refreshButton();
                });
                that.stormPlayer.getLibrary().addEventListener("videoConnecting", function () {
                    that.refreshButton();
                });
                that.stormPlayer.getLibrary().addEventListener("videoPlay", function () {
                    that.refreshButton();
                });
            });
        }
    }
    exports.QualityElement = QualityElement;
});
define("ui/controlbuttons/SubtitlesElement", ["require", "exports", "ui/GraphicElement"], function (require, exports, GraphicElement_13) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SubtitlesElement = void 0;
    class SubtitlesElement extends GraphicElement_13.GraphicElement {
        constructor(stormPlayer) {
            super(stormPlayer, 'sp-controls__button', 'button');
        }
        draw() {
            super.draw();
            this.htmlElement.innerHTML = '<span>CC</span>';
            this.htmlElement.setAttribute('data-title', "Subtitles");
        }
    }
    exports.SubtitlesElement = SubtitlesElement;
});
define("ui/controlbuttons/FullscreenElement", ["require", "exports", "ui/GraphicElement", "events/EventType"], function (require, exports, GraphicElement_14, EventType_12) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FullscreenElement = void 0;
    class FullscreenElement extends GraphicElement_14.GraphicElement {
        constructor(stormPlayer) {
            super(stormPlayer, 'sp-controls__fullscreen', 'button');
        }
        draw() {
            super.draw();
            this.htmlElement.innerHTML = `
                <svg class="fullscreen-icon" xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27">
                  <g fill="none" fill-rule="evenodd">
                    <g fill="#FFF" fill-rule="nonzero">
                      <path
                        d="M1.5 17c.828 0 1.5.672 1.5 1.5v5h5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5H1.5C.672 26.5 0 25.828 0 25v-6.5c0-.828.672-1.5 1.5-1.5zM25 17c.828 0 1.5.672 1.5 1.5V25c0 .828-.672 1.5-1.5 1.5h-6.5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5h5v-5c0-.828.672-1.5 1.5-1.5zM8 0c.828 0 1.5.672 1.5 1.5S8.828 3 8 3H3v5c0 .828-.672 1.5-1.5 1.5S0 8.828 0 8V1.5C0 .672.672 0 1.5 0zm17 0c.828 0 1.5.672 1.5 1.5V8c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5V3h-5c-.828 0-1.5-.672-1.5-1.5S17.672 0 18.5 0H25z"
                        transform="translate(-1358 -956) translate(1358 956)" />
                    </g>
                  </g>
                </svg>
                
                <svg class="close-fullscreen-icon" xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27">
                <path d="M17.321,25.471V18.849a1.528,1.528,0,0,1,1.528-1.528h6.622a1.528,1.528,0,1,1,0,3.056H20.377v5.094a1.528,1.528,0,1,1-3.056,0Zm-10.7,0V20.377H1.529a1.528,1.528,0,1,1,0-3.056H8.151A1.528,1.528,0,0,1,9.68,18.849v6.622a1.528,1.528,0,1,1-3.056,0ZM18.849,9.68a1.528,1.528,0,0,1-1.528-1.528V1.529a1.528,1.528,0,1,1,3.056,0V6.623h5.094a1.528,1.528,0,1,1,0,3.056Zm-17.32,0a1.528,1.528,0,1,1,0-3.056H6.623V1.529a1.528,1.528,0,1,1,3.056,0V8.151A1.528,1.528,0,0,1,8.151,9.68Z" fill="#fff"/>
                </svg>
        `;
        }
        attachListeners() {
            let that = this;
            this.htmlElement.addEventListener("click", function (e) {
                let enterFullscreen = document.webkitIsFullScreen === false || document.mozFullScreen === false || document.msFullscreenElement === false;
                if (enterFullscreen)
                    that.stormPlayer.dispatch(EventType_12.EventType.FULLSCREEN_ENTERED);
                else
                    that.stormPlayer.dispatch(EventType_12.EventType.FULLSCREEN_EXITED);
            });
            this.stormPlayer.addEventListener(EventType_12.EventType.FULLSCREEN_ENTERED, function () {
                that.htmlElement.classList.add('sp-active');
            });
            this.stormPlayer.addEventListener(EventType_12.EventType.FULLSCREEN_EXITED, function () {
                that.htmlElement.classList.remove('sp-active');
            });
        }
    }
    exports.FullscreenElement = FullscreenElement;
});
define("ui/controlbuttons/ControlButtonsElement", ["require", "exports", "ui/GraphicElement", "ui/controlbuttons/PlayElement", "ui/controlbuttons/VolumeElement", "ui/controlbuttons/QualityElement", "ui/controlbuttons/FullscreenElement"], function (require, exports, GraphicElement_15, PlayElement_1, VolumeElement_1, QualityElement_1, FullscreenElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ControlButtonsElement = void 0;
    class ControlButtonsElement extends GraphicElement_15.GraphicElement {
        constructor(stormPlayer) {
            super(stormPlayer, 'sp-controls__bottom');
        }
        draw() {
            super.draw();
            this.leftWrapper = new GraphicElement_15.GraphicElement(this.stormPlayer, "sp-controls__left");
            this.htmlElement.appendChild(this.leftWrapper.getHtmlElement());
            this.rightWrapper = new GraphicElement_15.GraphicElement(this.stormPlayer, "sp-controls__right");
            this.htmlElement.appendChild(this.rightWrapper.getHtmlElement());
            this.playElement = new PlayElement_1.PlayElement(this.stormPlayer);
            this.leftWrapper.getHtmlElement().appendChild(this.playElement.getHtmlElement());
            this.volumeElement = new VolumeElement_1.VolumeElement(this.stormPlayer);
            this.leftWrapper.getHtmlElement().appendChild(this.volumeElement.getHtmlElement());
            this.qualityElement = new QualityElement_1.QualityElement(this.stormPlayer);
            this.leftWrapper.getHtmlElement().appendChild(this.qualityElement.getHtmlElement());
            this.fullscreenElement = new FullscreenElement_1.FullscreenElement(this.stormPlayer);
            this.rightWrapper.getHtmlElement().appendChild(this.fullscreenElement.getHtmlElement());
        }
    }
    exports.ControlButtonsElement = ControlButtonsElement;
});
define("ui/ControlElement", ["require", "exports", "ui/GraphicElement", "ui/ProgressbarElement", "ui/controlbuttons/ControlButtonsElement", "events/EventType"], function (require, exports, GraphicElement_16, ProgressbarElement_1, ControlButtonsElement_1, EventType_13) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ControlElement = void 0;
    class ControlElement extends GraphicElement_16.GraphicElement {
        constructor(stormPlayer) {
            super(stormPlayer, 'sp-controls');
        }
        show() {
            this.htmlElement.classList.remove("sp-controls--hidden");
        }
        hide() {
            this.htmlElement.classList.add("sp-controls--hidden");
        }
        draw() {
            super.draw();
            this.shadowElement = new GraphicElement_16.GraphicElement(this.stormPlayer, "sp-controls__shadow");
            this.htmlElement.appendChild(this.shadowElement.getHtmlElement());
            this.progressbarElement = new ProgressbarElement_1.ProgressbarElement(this.stormPlayer);
            this.htmlElement.appendChild(this.progressbarElement.getHtmlElement());
            this.controlButtonsElement = new ControlButtonsElement_1.ControlButtonsElement(this.stormPlayer);
            this.htmlElement.appendChild(this.controlButtonsElement.getHtmlElement());
            let that = this;
            this.stormPlayer.addEventListener(EventType_13.EventType.GUI_SHOWN, function () {
                that.show();
            });
            this.stormPlayer.addEventListener(EventType_13.EventType.GUI_HIDED, function () {
                that.hide();
            });
        }
    }
    exports.ControlElement = ControlElement;
});
define("ui/UnmuteElement", ["require", "exports", "ui/GraphicElement", "events/EventType"], function (require, exports, GraphicElement_17, EventType_14) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UnmuteElement = void 0;
    class UnmuteElement extends GraphicElement_17.GraphicElement {
        constructor(stormPlayer) {
            super(stormPlayer, 'sp-unmute sp-unmute__afterheader');
        }
        draw() {
            super.draw();
            this.htmlElement.innerHTML =
                `
                <svg class="sp-unmute-icon" version=“1.1” id=“Layer_1" xmlns=“http://www.w3.org/2000/svg” xmlns:xlink=“http://www.w3.org/1999/xlink” x=“10px” y=“10px” viewBox="0 -2 28 21" xml:space=“preserve”>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="PLAYER-@go-back" transform="translate(-255.000000, -966.000000)" fill="#000">
                            <g id="Group-4" transform="translate(255.000000, 966.000000)">
                                <polygon id="Fill-1" points="24.364 5 22.066 7.298 19.768 5 18 6.768 20.298 9.065 18 11.364 19.768 13.132 22.066 10.834 24.364 13.132 26.132 11.364 23.834 9.065 26.132 6.768"></polygon>
                                <g id="VOLUME-CONTROLLER" fill-rule="nonzero">
                                    <path d="M12.3213457,17.8895415 C12.1613173,17.9640048 11.9898384,18 11.8194767,18 C11.5496906,18 11.2824181,17.9087756 11.0665335,17.7326465 L4.61568703,12.4735047 L1.17996477,12.4735047 C0.528400791,12.4740542 0,11.9539102 0,11.3128665 L0,6.68762428 C0,6.04630572 0.528400791,5.52643653 1.17996477,5.52643653 L4.61596631,5.52643653 L11.0668128,0.267294644 C11.4192661,-0.020117185 11.9080089,-0.0813914086 12.321625,0.110949204 C12.735241,0.301915954 13,0.711326686 13,1.16140372 L12.9997207,16.839087 C12.9997207,17.2894388 12.735241,17.6985748 12.3213457,17.8895415 Z" id="volume-icon"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
                ${this.stormPlayer.getGuiConfig().getUnmuteText()}
            `;
            if (!this.stormPlayer.getGuiConfig().getTitle() && this.stormPlayer.getGuiConfig().getTitle() == "" && this.stormPlayer.getGuiConfig().getSubtitle() && this.stormPlayer.getGuiConfig().getSubtitle() == "")
                this.getHtmlElement().classList.remove('sp-unmute__afterheader');
            this.hide();
        }
        attachListeners() {
            let that = this;
            this.stormPlayer.addEventListener(EventType_14.EventType.GUI_SHOWN, function () {
                if (that.stormPlayer.getGuiConfig().getTitle() || that.stormPlayer.getGuiConfig().getSubtitle())
                    that.getHtmlElement().classList.add('sp-unmute__afterheader');
            });
            this.stormPlayer.addEventListener(EventType_14.EventType.GUI_HIDED, function () {
                that.getHtmlElement().classList.remove('sp-unmute__afterheader');
            });
            this.htmlElement.addEventListener("click", function () {
                that.stormPlayer.dispatch(EventType_14.EventType.UNMUTE_CLICKED);
            });
            this.stormPlayer.addEventListener(EventType_14.EventType.LIBRARY_INITIALIZED, function () {
                that.stormPlayer.getLibrary().addEventListener("volumeChange", function (event) {
                    if (event.isMuted && event.type == 'browser')
                        that.show();
                    else
                        that.hide();
                });
            });
            this.stormPlayer.addEventListener(EventType_14.EventType.TITLE_SETTED, function () {
                if ((that.stormPlayer.getGuiConfig().getTitle() && that.stormPlayer.getGuiConfig().getTitle() != "") || (that.stormPlayer.getGuiConfig().getSubtitle() && that.stormPlayer.getGuiConfig().getSubtitle() != ""))
                    that.getHtmlElement().classList.add('sp-unmute__afterheader');
                else
                    that.getHtmlElement().classList.remove('sp-unmute__afterheader');
            });
            this.stormPlayer.addEventListener(EventType_14.EventType.SUBTITLE_SETTED, function () {
                if ((that.stormPlayer.getGuiConfig().getTitle() && that.stormPlayer.getGuiConfig().getTitle() != "") || (that.stormPlayer.getGuiConfig().getSubtitle() && that.stormPlayer.getGuiConfig().getSubtitle() != ""))
                    that.getHtmlElement().classList.add('sp-unmute__afterheader');
                else
                    that.getHtmlElement().classList.remove('sp-unmute__afterheader');
            });
        }
    }
    exports.UnmuteElement = UnmuteElement;
});
define("ui/MainElement", ["require", "exports", "ui/GraphicElement", "ui/VideoElement", "ui/LoaderElement", "ui/ErrorElement", "ui/PlaybackElement", "ui/HeaderElement", "ui/ControlElement", "events/EventType", "ui/UnmuteElement"], function (require, exports, GraphicElement_18, VideoElement_1, LoaderElement_1, ErrorElement_1, PlaybackElement_1, HeaderElement_1, ControlElement_1, EventType_15, UnmuteElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MainElement = void 0;
    class MainElement extends GraphicElement_18.GraphicElement {
        constructor(stormPlayer) {
            super(stormPlayer, 'sp-container__wrapper');
            this.hideGUITimeoutSeconds = stormPlayer.getGuiConfig().getGuiHideSeconds();
        }
        setSize(width, height) {
            this.htmlElement.style.maxWidth = width + 'px';
            this.spContainer.getHtmlElement().style.height = height + 'px';
            this.stormPlayer.getLibrary().setSize(width, height);
        }
        getHeaderElement() {
            return this.headerElement;
        }
        draw() {
            super.draw();
            this.spContainer = new GraphicElement_18.GraphicElement(this.stormPlayer, "sp-container");
            this.htmlElement.appendChild(this.spContainer.getHtmlElement());
            this.videoElement = new VideoElement_1.VideoElement(this.stormPlayer);
            this.spContainer.getHtmlElement().appendChild(this.videoElement.getHtmlElement());
            this.loaderElement = new LoaderElement_1.LoaderElement(this.stormPlayer);
            this.spContainer.getHtmlElement().appendChild(this.loaderElement.getHtmlElement());
            this.errorElement = new ErrorElement_1.ErrorElement(this.stormPlayer);
            this.spContainer.getHtmlElement().appendChild(this.errorElement.getHtmlElement());
            this.playbackElement = new PlaybackElement_1.PlaybackElement(this.stormPlayer);
            this.spContainer.getHtmlElement().appendChild(this.playbackElement.getHtmlElement());
            this.headerElement = new HeaderElement_1.HeaderElement(this.stormPlayer);
            this.spContainer.getHtmlElement().appendChild(this.headerElement.getHtmlElement());
            this.unmuteElement = new UnmuteElement_1.UnmuteElement(this.stormPlayer);
            this.spContainer.getHtmlElement().appendChild(this.unmuteElement.getHtmlElement());
            this.controlElement = new ControlElement_1.ControlElement(this.stormPlayer);
            this.spContainer.getHtmlElement().appendChild(this.controlElement.getHtmlElement());
        }
        attachListeners() {
            let that = this;
            let spContainerElement = this.spContainer.getHtmlElement();
            this.stormPlayer.addEventListener(EventType_15.EventType.LIBRARY_INITIALIZED, function () {
                that.stormPlayer.getLibrary().addEventListener("videoPlay", function () {
                    if (!that.hideGUITimeout) {
                        that.hideGUITimeout = setTimeout(function () {
                            if (that.stormPlayer.getLibrary().isPlaying())
                                that.stormPlayer.dispatch(EventType_15.EventType.GUI_HIDED);
                        }, that.hideGUITimeoutSeconds * 1000);
                    }
                });
            });
            this.htmlElement.addEventListener("mouseenter", function () {
                if (that.hideGUITimeout)
                    clearTimeout(that.hideGUITimeout);
                that.stormPlayer.dispatch(EventType_15.EventType.GUI_SHOWN);
            });
            this.htmlElement.addEventListener("mouseleave", function () {
                if (that.hideGUITimeout)
                    clearTimeout(that.hideGUITimeout);
                if (that.stormPlayer.getLibrary().isPlaying())
                    that.stormPlayer.dispatch(EventType_15.EventType.GUI_HIDED);
            });
            this.htmlElement.addEventListener("mousemove", function () {
                if (that.hideGUITimeout)
                    clearTimeout(that.hideGUITimeout);
                that.stormPlayer.dispatch(EventType_15.EventType.GUI_SHOWN);
                that.hideGUITimeout = setTimeout(function () {
                    if (that.stormPlayer.getLibrary().isPlaying())
                        that.stormPlayer.dispatch(EventType_15.EventType.GUI_HIDED);
                }, that.hideGUITimeoutSeconds * 1000);
            });
            this.stormPlayer.addEventListener(EventType_15.EventType.GUI_SHOWN, function () {
                that.spContainer.getHtmlElement().classList.remove('sp-container__disablecursor');
            });
            this.stormPlayer.addEventListener(EventType_15.EventType.GUI_HIDED, function () {
                that.spContainer.getHtmlElement().classList.add('sp-container__disablecursor');
            });
            this.stormPlayer.addEventListener(EventType_15.EventType.FULLSCREEN_ENTERED, function () {
                spContainerElement.classList.add('sp-fullscreen');
                const docElmWithBrowsersFullScreenFunctions = spContainerElement;
                if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
                    docElmWithBrowsersFullScreenFunctions.requestFullscreen();
                }
                else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) {
                    docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
                }
                else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) {
                    docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
                }
                else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) {
                    docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
                }
            });
            this.stormPlayer.addEventListener(EventType_15.EventType.FULLSCREEN_EXITED, function () {
                spContainerElement.classList.remove('sp-fullscreen');
                const docWithBrowsersExitFunctions = document;
                if (docWithBrowsersExitFunctions.exitFullscreen) {
                    docWithBrowsersExitFunctions.exitFullscreen();
                }
                else if (docWithBrowsersExitFunctions.mozCancelFullScreen) {
                    docWithBrowsersExitFunctions.mozCancelFullScreen();
                }
                else if (docWithBrowsersExitFunctions.webkitExitFullscreen) {
                    docWithBrowsersExitFunctions.webkitExitFullscreen();
                }
                else if (docWithBrowsersExitFunctions.msExitFullscreen) {
                    docWithBrowsersExitFunctions.msExitFullscreen();
                }
            });
            document.addEventListener('fullscreenchange', function () {
                if (document.webkitIsFullScreen === false || document.mozFullScreen === false || document.msFullscreenElement === false)
                    that.stormPlayer.dispatch(EventType_15.EventType.FULLSCREEN_EXITED);
            }, false);
            document.addEventListener('mozfullscreenchange', function () {
                if (document.webkitIsFullScreen === false || document.mozFullScreen === false || document.msFullscreenElement === false)
                    that.stormPlayer.dispatch(EventType_15.EventType.FULLSCREEN_EXITED);
            }, false);
            document.addEventListener('MSFullscreenChange', function () {
                if (document.webkitIsFullScreen === false || document.mozFullScreen === false || document.msFullscreenElement === false)
                    that.stormPlayer.dispatch(EventType_15.EventType.FULLSCREEN_EXITED);
            }, false);
            document.addEventListener('webkitfullscreenchange', function () {
                if (document.webkitIsFullScreen === false || document.mozFullScreen === false || document.msFullscreenElement === false)
                    that.stormPlayer.dispatch(EventType_15.EventType.FULLSCREEN_EXITED);
            }, false);
        }
    }
    exports.MainElement = MainElement;
});
define("StormPlayer", ["require", "exports", "events/Dispatcher", "ui/MainElement", "events/EventType", "LibraryManager", "GUIConfig"], function (require, exports, Dispatcher_1, MainElement_1, EventType_16, LibraryManager_1, GUIConfig_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StormPlayer = void 0;
    class StormPlayer extends Dispatcher_1.Dispatcher {
        constructor(guiConfig, stormLibraryConfig, cuepoints) {
            super();
            this.instanceID = "StormPlayer-" + Math.random().toString(36).substr(2, 9);
            this.guiConfig = new GUIConfig_1.GUIConfig(guiConfig);
            this.libraryManager = new LibraryManager_1.LibraryManager(stormLibraryConfig, this);
            this.mainElement = new MainElement_1.MainElement(this);
            document.getElementById(this.guiConfig.getContainerID()).appendChild(this.mainElement.getHtmlElement());
            this.dispatch(EventType_16.EventType.GUI_INITIALIZED);
            this.setSize(guiConfig.width, guiConfig.height);
            this.setTitle(this.guiConfig.getTitle());
            this.setSubtitle(this.guiConfig.getSubtitle());
            let that = this;
            this.addEventListener(EventType_16.EventType.LIBRARY_INITIALIZED, function () {
                for (let i = 0; i < cuepoints.length; i++) {
                    that.addCuePoint(cuepoints[i].title, cuepoints[i].time);
                }
            });
        }
        addCuePoint(title, time) {
            this.dispatch(EventType_16.EventType.CUEPOINT_ADDED, { title: title, time: time });
        }
        removeCuePoint(time) {
            this.dispatch(EventType_16.EventType.CUEPOINT_REMOVED, { time: time });
        }
        getLibrary() {
            return this.libraryManager.getLibrary();
        }
        getInstanceID() {
            return this.instanceID;
        }
        setSize(width, height) {
            this.mainElement.setSize(width, height);
        }
        setTitle(title) {
            this.guiConfig.setTitle(title);
            this.mainElement.getHeaderElement().setTitle(title);
        }
        setSubtitle(subtitle) {
            this.guiConfig.setSubtitle(subtitle);
            this.mainElement.getHeaderElement().setSubtitle(subtitle);
        }
        getGuiConfig() {
            return this.guiConfig;
        }
        getLibraryManager() {
            return this.libraryManager;
        }
        isTouchDevice() {
            return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
        }
    }
    exports.StormPlayer = StormPlayer;window.StormPlayer = StormPlayer;
});
define("LibraryManager", ["require", "exports", "events/EventType"], function (require, exports, EventType_17) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LibraryManager = void 0;
    class LibraryManager {
        constructor(config, stormPlayer) {
            this.stormPlayer = stormPlayer;
            this.config = config;
            this.config.settings.video.containerID = stormPlayer.getInstanceID();
            this.config.settings.video.width = stormPlayer.getGuiConfig().getWitdth();
            this.config.settings.video.height = stormPlayer.getGuiConfig().getHeight();
            this.attachListeners();
        }
        getConfig() {
            return this.config;
        }
        getLibrary() {
            return this.library;
        }
        initializeLibrary() {
            this.library = new StormLibrary(this.config);
            this.stormPlayer.dispatch(EventType_17.EventType.LIBRARY_CREATED);
            this.library.initialize();
            this.stormPlayer.dispatch(EventType_17.EventType.LIBRARY_INITIALIZED);
        }
        attachListeners() {
            let that = this;
            this.stormPlayer.addEventListener(EventType_17.EventType.GUI_INITIALIZED, function () {
                that.initializeLibrary();
            });
            this.stormPlayer.addEventListener(EventType_17.EventType.LIBRARY_CREATED, function () {
                that.getLibrary().addEventListener("videoObjectCreation", function () {
                    document.querySelector('#' + that.stormPlayer.getInstanceID() + ' video').classList.add('sp-video');
                });
            });
            this.stormPlayer.addEventListener(EventType_17.EventType.LIBRARY_INITIALIZED, function () {
                that.stormPlayer.addEventListener(EventType_17.EventType.PLAY_CLICKED, function () {
                    that.getLibrary().play();
                });
                that.stormPlayer.addEventListener(EventType_17.EventType.PAUSE_CLICKED, function () {
                    that.getLibrary().pause();
                });
                that.stormPlayer.addEventListener(EventType_17.EventType.MUTE_CLICKED, function () {
                    that.getLibrary().mute();
                });
                that.stormPlayer.addEventListener(EventType_17.EventType.UNMUTE_CLICKED, function () {
                    that.getLibrary().unmute();
                });
                that.stormPlayer.addEventListener(EventType_17.EventType.TOGGLE_CLICKED, function () {
                    that.getLibrary().togglePlay();
                });
                that.stormPlayer.addEventListener(EventType_17.EventType.VOLUME_CHANGED, function (e) {
                    that.getLibrary().setVolume(e.volume);
                });
                that.stormPlayer.addEventListener(EventType_17.EventType.QUALITY_CHANGED, function (e) {
                    that.getLibrary().setQuality(e.label);
                });
                that.stormPlayer.addEventListener(EventType_17.EventType.SEEK_SETTED, function (e) {
                    that.getLibrary().seek(e.seekToTime);
                });
                that.stormPlayer.addEventListener(EventType_17.EventType.FULLSCREEN_ENTERED, function () {
                    that.getLibrary().setSize(window.screen.width, window.screen.height);
                });
                that.stormPlayer.addEventListener(EventType_17.EventType.FULLSCREEN_EXITED, function () {
                    that.getLibrary().setSize(that.getConfig().settings.video.width, that.getConfig().settings.video.height);
                });
            });
        }
    }
    exports.LibraryManager = LibraryManager;
});

//# sourceMappingURL=stormplayer.js.map
