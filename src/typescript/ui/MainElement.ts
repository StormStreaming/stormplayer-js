import {GraphicElement} from "./GraphicElement";
import {WaitingRoom} from "./WaitingRoom";
import {StatBox} from "./StatBox";
import {StormPlayer} from "../StormPlayer";
import {VideoElement} from "./VideoElement";
import {LoaderElement} from "./LoaderElement";
import {ErrorElement} from "./ErrorElement";
import {BigPlayElement} from "./BigPlayElement";
import {HeaderElement} from "./HeaderElement";
import {ControlElement} from "./ControlElement";
import {UnmuteElement} from "./UnmuteElement";
import {UserCapabilities} from "../utilities/UserCapabilities";
import {ContextMenu} from "./ContextMenu";
import {Watermark} from "@app/typescript/ui/Watermark";
import debounce from 'lodash.debounce';
import {PosterElement} from "@app/typescript/ui/PosterElement";

/**
 * Main graphical element
 */
export class MainElement extends GraphicElement {

    /**
     * Countdown element
     * @private
     */
    private watermark: Watermark;

    /**
     * Countdown element
     * @private
     */
    private waitingRoom: WaitingRoom;

    /**
     * StatBox element
     * @private
     */
    private statBox: StatBox;

    /**
     * StatBox element
     * @private
     */
    private contextMenu: ContextMenu;

    /**
     * Video element
     * @private
     */
    private videoElement: VideoElement;

    /**
     * Loader element
     * @private
     */
    private loaderElement: LoaderElement;

    /**
     * Error element
     * @private
     */
    private errorElement: ErrorElement;

    /**
     * Playback element
     * @private
     */
    private playbackElement: BigPlayElement;

    /**
     * Header element
     * @private
     */
    private headerElement: HeaderElement;

    /**
     * Control element (buttons)
     * @private
     */
    private controlElement: ControlElement;

    /**
     * Unmute element
     * @private
     */
    private unmuteElement: UnmuteElement;

    /**
     * Poster element
     * @private
     */
    private posterElement: PosterElement;

    /**
     * Wrapper for the element
     * @private
     */
    public spContainer: GraphicElement;

    /**
     * Number of seconds after which GUI will be hidden if there is no user interaction
     * @private
     */
    private hideGUITimeoutSeconds: number;

    /**
     * Whenever hiding gui is enabled or not
     * @private
     */
    private hideGUIEnabled: boolean;

    /**
     * Countdown element
     * @private
     */
    public isOpenMenu: boolean;

    /**
     * Timeout for hiding GUI
     * @private
     */
    private hideGUITimeout: ReturnType<typeof setTimeout>;

    /**
     * Fullscreen interval
     * @private
     */
    private fsInterval:any

    /**
     * Aspect ratio for the player;
     * @private
     */
    private aspectRatio:string = "none";

    /**
     * Player width in pixels
     * @private
     */
    private playerWidth:number;

    /**
     * Player height in pixels
     * @private
     */
    private playerHeight:number;

    /**
     * Stores player width for fullScreen time
     * @private
     */
    private copyPlayerWidth:number;

    /**
     * Stores player height for fullScreen time
     * @private
     */
    private copyPlayerHeight:number;

    /**
     * Original width value
     * @private
     */
    private widthOrigValue:number | string;

    /**
     * Original height value
     * @private
     */
    private heightOrigValue:number | string;

    /**
     * Whenever changes to resolution are locked due to FullScreen mode
     * @private
     */

    private resolutionLock:boolean = false;

    /**
     * Reference to the player parent container
     * @private
     */
    private parentContainer:HTMLElement | null;

    /**
     * Resize observer
     * @private
     */
    private resizeObserver:ResizeObserver;

    /**
     * Is currently gui hidden?
     * @private
     */
    private isGUIHidden:boolean = false;

    /**
     * Whenever fullscreen is on or not
     * @private
     */
    private isFullScreenOn:boolean =false;

    private isTransitioning:boolean = false;

    /**
     * Constructor
     * @param stormPlayer reference to the main player class
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-container__wrapper stormPlayer");
        this.initialize();
    }

    private initialize(): void {

        this.parentContainer = document.getElementById(this.stormPlayer.getPlayerConfigManager().getContainerID());

        this.getHtmlElement().setAttribute("id",this.stormPlayer.getInstanceName())

        this.aspectRatio = this.stormPlayer.getPlayerConfigManager().getAspectRatio();
        this.hideGUITimeoutSeconds = this.stormPlayer.getPlayerConfigManager().getGuiHideSeconds();
        this.hideGUIEnabled = this.stormPlayer.getPlayerConfigManager().getIfAutoGUIHide();

        this.widthOrigValue = this.stormPlayer.getPlayerConfigManager().getWidth();
        this.heightOrigValue = this.stormPlayer.getPlayerConfigManager().getHeight();

        this.resizeObserver = new ResizeObserver(debounce(()=> {
            if(!this.isTransitioning)
                this.setSize(this.widthOrigValue, this.heightOrigValue);
        },100));

        this.stormPlayer.addEventListener("authorizationComplete", ()=>{
            if (this.stormPlayer.getRawStreamConfig().configurationType == "gateway"){
               this.spContainer.show();
               this.loaderElement.hide();
            }
        })

        this.stormPlayer.addEventListener("authorizationError", ()=>{
            if (this.stormPlayer.getRawStreamConfig().configurationType == "gateway"){
                this.spContainer.show();
                this.loaderElement.hide();
            }
        })

        this.stormPlayer.addEventListener("serverConnectionError", ()=>{
            if (this.stormPlayer.getRawStreamConfig().configurationType == "gateway"){
                this.spContainer.show();
                this.loaderElement.hide();
            }
        })

        this.stormPlayer.addEventListener("streamNotFound", ()=>{
            if (this.stormPlayer.getRawStreamConfig().configurationType == "gateway"){
                this.spContainer.show();
                this.loaderElement.hide();
            }
        })

        this.stormPlayer.addEventListener("streamStateChange", ()=>{
            if (this.stormPlayer.getRawStreamConfig().configurationType == "gateway"){
                this.spContainer.show();
                this.loaderElement.hide();
            }
        })

        this.stormPlayer.addEventListener("streamStop", ()=>{
            if (this.stormPlayer.getRawStreamConfig().configurationType == "gateway"){
                this.spContainer.show();
                this.loaderElement.hide();
            }
        })

    }

    public setObserver():void{
        this.resizeObserver.observe(this.parentContainer);
        this.resizeObserver.observe(document.body);
    }

    /**
     * Sets size for the player
     * @param width player width in pixels
     * @param height player height in pixels
     */
    public setSize(width: number | string, height: number | string) {

        this.htmlElement.style.display = "none";

        let tempContainerWidth:number = this.parentContainer?.getBoundingClientRect().width;
        let tempContainerHeight:number = this.parentContainer?.getBoundingClientRect().height;

        this.htmlElement.style.display = "block";

        let widthValue:number = 0;
        let heightValue:number = 0;
        let isWidthInPixels:boolean = true;
        let isHeightInPixels:boolean = true;

        let finalPlayerWidth = 640;
        let finalPlayerHeight = 360;

        // width
        if (typeof width === "undefined") {

            widthValue = 100;
            isHeightInPixels = false;

        } else if (typeof width === "number") {

            widthValue = width;
            isWidthInPixels = true;

        } else if (typeof width === "string") {
            if (width.toLowerCase().endsWith('px')) {

                widthValue = parseInt(width);
                isWidthInPixels = true;

            } else if (width.toLowerCase().endsWith('%')) {

                widthValue = parseInt(width);
                isWidthInPixels = false;

            }
        }  else
            throw new Error("Unknown value for parameter \"width\" - it must be a number or a string, "+typeof width+" provided!")

        // height
        if (typeof height === "undefined") {

            heightValue = 100;
            isHeightInPixels = false;

        } else if (typeof height === "number") {

            heightValue = height;
            isHeightInPixels = true;

        } else if (typeof height === "string") {
            if (height.toLowerCase().endsWith('px')) {

                heightValue = parseInt(height);
                isHeightInPixels = true;

            } else if (height.toLowerCase().endsWith('%')) {

                heightValue = parseInt(height);
                isHeightInPixels = false;

            }
        }  else
            throw new Error("Unknown value for parameter \"height\" - it must be a number or a string, "+typeof width+" provided!")


        if(this.aspectRatio == "none"){

            if(isWidthInPixels){
                finalPlayerWidth = widthValue;
            } else {
                if(this.parentContainer != null)
                    finalPlayerWidth = (tempContainerWidth*widthValue/100);

            }

            if(isHeightInPixels){
                finalPlayerHeight = heightValue;
            } else {
                if(this.parentContainer != null)
                    finalPlayerHeight = (tempContainerHeight*heightValue/100);

            }

        } else {

            let aspectWRatio:number = Number(this.aspectRatio.split(":")[0]);
            let aspectHRatio:number = Number(this.aspectRatio.split(":")[1]);

            if(isWidthInPixels){
                finalPlayerWidth = widthValue;
            } else {
                if(this.parentContainer != null)
                    finalPlayerWidth = (tempContainerWidth*widthValue/100);

            }

            finalPlayerHeight = finalPlayerWidth * aspectHRatio / aspectWRatio;

        }

        this.widthOrigValue = width;
        this.heightOrigValue = height;

        if(this.resolutionLock){
            this.copyPlayerWidth = finalPlayerWidth;
            this.copyPlayerHeight = finalPlayerHeight;
            return;
        }

        this.calculateSize(finalPlayerWidth, finalPlayerHeight)

    }

    /**
     * Sets width for the player
     * @param width player width in pixels
     */
    public setWidth(width: number | string) {
       this.setSize(width, this.heightOrigValue);
    }

    /**
     * Internal mechanism for setting player height
     * @param height player width in pixels
     * @private
     */
    public setHeight(height:number | string){
      this.setSize(this.widthOrigValue, height);
    }

    /**
     * Internal mechanism for resizing
     * @param width player width in pixels
     * @param height player height in pixels
     * @private
     */
    private calculateSize(width:number, height:number){

        this.htmlElement.style.maxWidth = width + "px";
        this.spContainer.getHtmlElement().style.height = height + "px";
        this.loaderElement.getHtmlElement().style.height = height + "px";

        this.playerWidth = width;
        this.playerHeight = height;

        if (!this.stormPlayer.waitingRoom){
            if(this.stormPlayer.getLibrary() != null && this.stormPlayer.getLibrary().isInitialized())
                this.stormPlayer.getLibrary().setSize(width, height);
        }

        this.stormPlayer.dispatchEvent("resize",{ref: this.stormPlayer, newWidth: width, newHeight: height});
    }

    /**
     * Returns plauer width;
     */
    public getWidth():number {
        return this.playerWidth;
    }

    /**
     * Returns plauer height;
     */
    public getHeight():number {
        return this.playerHeight;
    }

    /**
     * Returns header element (top row with title/subtitle)
     */
    public getHeaderElement(): HeaderElement {
        return this.headerElement;
    }

    /**
     * Adds waiting screen
     */
    public createWaitingRoom() {
        this.waitingRoom = new WaitingRoom(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.waitingRoom.getHtmlElement());
    }

    /**
     * Creates and adds player elements
     */
    public createPlayer() {

        const waitingRoom = this.htmlElement.querySelector('.sp-waiting-room');
        this.stormPlayer.waitingRoom = false;

        if(waitingRoom){
            waitingRoom.remove();
        }

        this.videoElement = new VideoElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.videoElement.getHtmlElement());

        this.posterElement = new PosterElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.posterElement.getHtmlElement());

        if (!this.stormPlayer.getRawPlayerConfig().demoMode) {
            this.errorElement = new ErrorElement(this.stormPlayer);
            this.spContainer.getHtmlElement().appendChild(this.errorElement.getHtmlElement());
        }

        this.playbackElement = new BigPlayElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.playbackElement.getHtmlElement());

        this.headerElement = new HeaderElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.headerElement.getHtmlElement());

        this.unmuteElement = new UnmuteElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.unmuteElement.getHtmlElement());

        this.controlElement = new ControlElement(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.controlElement.getHtmlElement());

        this.statBox = new StatBox(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.statBox.getHtmlElement());

        this.watermark = new Watermark(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.watermark.getHtmlElement());


    }


    /**
     * Draw graphics for the element
     * @protected
     */
    protected override draw(): void {
        super.draw();

        this.stormPlayer.setMainElement(this);

        this.spContainer = new GraphicElement(this.stormPlayer, "sp-container");
        this.htmlElement.appendChild(this.spContainer.getHtmlElement());

        this.loaderElement = new LoaderElement(this.stormPlayer);

        if (this.stormPlayer.getRawStreamConfig().configurationType == "gateway"){
            this.htmlElement.appendChild(this.loaderElement.getHtmlElement());
            this.loaderElement.show();
            this.spContainer.hide();
        }

        this.contextMenu = new ContextMenu(this.stormPlayer);
        this.spContainer.getHtmlElement().appendChild(this.contextMenu.getHtmlElement());

        if (this.stormPlayer.waitingRoom) {
            this.createWaitingRoom();
        } else {
            this.createPlayer();
        }

    }

    /**
     * Attaches listeners to the element
     * @protected
     */
    protected override attachListeners(): void {

        const that = this;
        const spContainerElement = this.spContainer.getHtmlElement();

        this.stormPlayer.addEventListener("playerConfigUpdate", function () {

            that.aspectRatio = that.stormPlayer.getPlayerConfigManager().getAspectRatio();
            that.hideGUITimeoutSeconds = that.stormPlayer.getPlayerConfigManager().getGuiHideSeconds();
            that.hideGUIEnabled = that.stormPlayer.getPlayerConfigManager().getIfAutoGUIHide();
            clearTimeout(that.hideGUITimeout)
            that.stormPlayer.dispatchEvent("guiShow", {ref:that.stormPlayer});

            if(that.stormPlayer.getPlayerConfigManager().getIfAutoGUIHide() && that.stormPlayer.getRawPlayerConfig().demoMode == false) {
                that.hideGUITimeout = setTimeout(function () {
                    that.isGUIHidden = true;
                    that.stormPlayer.dispatchEvent("guiHide", {ref: that.stormPlayer});
                }, that.hideGUITimeoutSeconds * 1000);
            } else {
                clearTimeout(that.hideGUITimeout);
                that.isGUIHidden = false;
                that.stormPlayer.dispatchEvent("guiShow", {ref: that.stormPlayer});
            }
        });

        if(this.stormPlayer.getPlayerConfigManager().getIfAutoGUIHide()) {

            this.stormPlayer.addEventListener("libraryInitialize", function () {
                    that.stormPlayer.getLibrary().addEventListener("playbackStart", function () {
                        if (!that.hideGUITimeout && that.hideGUIEnabled) {
                            that.hideGUITimeout = setTimeout(function () {
                                if(that.stormPlayer.getLibrary() != null) {
                                    console.log("uu??");
                                    if (that.stormPlayer.getLibrary().isPlaying()) {
                                        that.isGUIHidden = true;
                                        that.stormPlayer.dispatchEvent("guiHide", {ref: that.stormPlayer});
                                    }
                                }
                            }, that.hideGUITimeoutSeconds * 1000);
                        }
                    });
                }
            );

            if (UserCapabilities.isMobile()) {

                this.htmlElement.addEventListener("touchstart", function () {

                    if (that.hideGUITimeout)
                        clearTimeout(that.hideGUITimeout);

                    if( that.isGUIHidden == true)
                        that.stormPlayer.dispatchEvent("guiShow", {ref:that.stormPlayer});

                    that.isGUIHidden = false;

                    that.hideGUITimeout = setTimeout(function () {
                        if(that.stormPlayer.getLibrary() != null) {
                            if (that.stormPlayer.getLibrary().isPlaying() && that.hideGUIEnabled) {
                                that.isGUIHidden = true;
                                that.stormPlayer.dispatchEvent("guiHide", {ref: that.stormPlayer});
                            }
                        }
                    }, that.hideGUITimeoutSeconds * 1000);

                });

                this.htmlElement.addEventListener("touchmove", function () {

                    if (that.hideGUITimeout)
                        clearTimeout(that.hideGUITimeout);

                    if(that.isGUIHidden == true)
                        that.stormPlayer.dispatchEvent("guiShow", {ref:that.stormPlayer});

                    that.isGUIHidden = false;

                    that.hideGUITimeout = setTimeout(function () {
                        if(that.stormPlayer.getLibrary() != null) {
                            if (that.stormPlayer.getLibrary().isPlaying()) {
                                that.isGUIHidden = true;
                                that.stormPlayer.dispatchEvent("guiHide", {ref: that.stormPlayer});
                            }
                        }
                    }, that.hideGUITimeoutSeconds * 1000);

                });

            } else {

                this.htmlElement.addEventListener("mouseenter", function () {
                    if (that.hideGUITimeout) clearTimeout(that.hideGUITimeout);

                    if(that.hideGUIEnabled) {
                        if (that.isGUIHidden == true) {
                            that.isGUIHidden = false;
                            that.stormPlayer.dispatchEvent("guiShow", {ref: that.stormPlayer});
                        }
                    }
                });

                this.htmlElement.addEventListener("mousemove", function () {

                    if (that.hideGUITimeout)
                        clearTimeout(that.hideGUITimeout);

                    if(that.hideGUIEnabled) {

                        if (that.isGUIHidden == true) {
                            that.stormPlayer.dispatchEvent("guiShow", {ref: that.stormPlayer});
                            that.isGUIHidden = false;
                        }

                        that.hideGUITimeout = setTimeout(function () {
                            if (that.stormPlayer.getLibrary() != null) {
                                if (that.stormPlayer.getLibrary().isPlaying()) {
                                    that.isGUIHidden = true;
                                    that.stormPlayer.dispatchEvent("guiHide", {ref: that.stormPlayer});
                                }
                            }
                        }, that.hideGUITimeoutSeconds * 1000);
                    }

                });

                this.htmlElement.addEventListener("mouseleave", function () {
                    if (that.hideGUITimeout) clearTimeout(that.hideGUITimeout);

                    if(that.hideGUIEnabled) {
                        if (!that.stormPlayer.waitingRoom) {
                            if (that.stormPlayer.getLibrary() != null) {
                                if (that.stormPlayer.getLibrary().isPlaying()) {

                                    that.hideGUITimeout = setTimeout(function () {
                                        if (that.stormPlayer.getLibrary() != null) {
                                            if (that.stormPlayer.getLibrary().isPlaying()) {
                                                that.isGUIHidden = true;
                                                that.stormPlayer.dispatchEvent("guiHide", {ref: that.stormPlayer});
                                            }
                                        }
                                    }, that.hideGUITimeoutSeconds * 1000);

                                }
                            }
                        }
                    }
                });

            }
        }

        window.addEventListener("click", function (e) {
            if (e.target !== null) {
                const element = e.target as Element;
                if (element.matches('.sp-context-menu') || element.matches('.sp-context-menu li'))
                    return
            }

            that.stormPlayer.dispatchEvent("contextMenuHid", {ref:that.stormPlayer});
        });

        window.addEventListener("contextmenu", function (e) {

            if (e.target !== null) {
                const element = e.target as Element;
                if (element.matches('.sp-context-menu') || element.matches('.sp-context-menu li'))
                    return
            }

            if (e.target === that.htmlElement || that.htmlElement.contains(e.target as HTMLElement)) {
                e.preventDefault();
                that.stormPlayer.dispatchEvent("contextMenuShown", {ref:that.stormPlayer, e});
            } else
                that.stormPlayer.dispatchEvent("contextMenuHid", {ref:that.stormPlayer});


        });

        this.stormPlayer.addEventListener("guiShow", function () {
            that.spContainer.getHtmlElement().classList.remove("sp-container__disablecursor");
        });

        this.stormPlayer.addEventListener("guiHide", function () {
            that.spContainer.getHtmlElement().classList.add("sp-container__disablecursor");
        });

        this.stormPlayer.addEventListener("fullscreenEnter", function () {

            that.isTransitioning = true;
            that.resolutionLock = true;
            that.isFullScreenOn = true;

            that.copyPlayerWidth = that.playerWidth;
            that.copyPlayerHeight = that.playerHeight;

            spContainerElement.classList.add("sp-fullscreen");

            that.htmlElement.style.setProperty("--sp-border-radius", "0px");

            if((UserCapabilities.isMobile() && that.stormPlayer.getPlayerConfigManager().getIfNativeMobileGUI() && !that.stormPlayer.getPlayerConfigManager().getIfDemoMode())){

                that.stormPlayer.getLibrary().enterFullScreen();

            } else if(UserCapabilities.isMobile()){

                that.htmlElement.classList.add("fs-mode");
                document.body.classList.add("fs-body-fix");

                if(that.fsInterval != null)
                    clearInterval(that.fsInterval);

                that.fsInterval = setInterval(function(){
                    that.updateResolution();
                },100)

                setTimeout(() => {
                    that.isTransitioning = false;
                    clearInterval(that.fsInterval);
                },1000)

            } else {

                try {

                    const docElmWithBrowsersFullScreenFunctions = spContainerElement as HTMLElement & {
                        mozRequestFullScreen(): Promise<void>;
                        webkitRequestFullscreen(): Promise<void>;
                        msRequestFullscreen(): Promise<void>;
                    };

                    if(that.fsInterval != null)
                        clearInterval(that.fsInterval);

                    that.fsInterval = setInterval(function(){
                        that.updateResolution();
                    },100)

                    if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
                        docElmWithBrowsersFullScreenFunctions.requestFullscreen();
                    } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) {
                        docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
                    } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) {
                        /* Chrome, Safari and Opera */
                        docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
                    } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) {
                        /* IE/Edge */
                        docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
                    }
                } catch(error:any){
                    console.log("error: "+error)
                }

            }

        });

        this.stormPlayer.addEventListener("fullscreenExit", function () {

            that.isTransitioning = true;
            spContainerElement.classList.remove("sp-fullscreen");

            if (that.stormPlayer.getRawPlayerConfig()?.style?.borderRadius != undefined)
                that.htmlElement.style.setProperty("--sp-border-radius", that.stormPlayer.getRawPlayerConfig().style.borderRadius);
            else
                that.htmlElement.style.removeProperty("--sp-border-radius");

            if((UserCapabilities.isMobile() && that.stormPlayer.getPlayerConfigManager().getIfNativeMobileGUI())) {

            } else if(UserCapabilities.isMobile()){

                that.htmlElement.classList.remove("fs-mode");
                document.body.classList.remove("fs-body-fix");

                if(that.fsInterval != null)
                    clearInterval(that.fsInterval);

            } else if (!UserCapabilities.isMobile()) {

                if(that.fsInterval != null)
                    clearInterval(that.fsInterval);

                try {

                    if(that.isFullScreenOn) {
                        const docWithBrowsersExitFunctions = document as Document & {
                            mozCancelFullScreen(): Promise<void>;
                            webkitExitFullscreen(): Promise<void>;
                            msExitFullscreen(): Promise<void>;
                        };

                        if (docWithBrowsersExitFunctions.exitFullscreen) {
                            docWithBrowsersExitFunctions.exitFullscreen();
                        } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) {
                            /* Firefox */
                            docWithBrowsersExitFunctions.mozCancelFullScreen();
                        } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) {
                            /* Chrome, Safari and Opera */
                            docWithBrowsersExitFunctions.webkitExitFullscreen();
                        } else if (docWithBrowsersExitFunctions.msExitFullscreen) {
                            /* IE/Edge */
                            docWithBrowsersExitFunctions.msExitFullscreen();
                        }
                    }

                } catch(error:any){
                    console.log("error: "+error)
                }

            }

            that.resolutionLock = false;
            that.playerWidth = that.copyPlayerWidth;
            that.playerHeight = that.copyPlayerHeight;

            that.calculateSize(that.playerWidth, that.playerHeight);

            setTimeout(() => {
                that.isTransitioning = false;
                that.calculateSize(that.playerWidth, that.playerHeight);
            },1000)

        });


        document.addEventListener("fullscreenchange", function () {
            if (document.webkitIsFullScreen === false || document.mozFullScreen === false || document.msFullscreenElement === false) {
                that.isFullScreenOn = false;
                that.stormPlayer.dispatchEvent("fullscreenExit", {ref: that.stormPlayer});
            }
        }, false);


        document.addEventListener("visibilitychange", ()=>{

            if (document.visibilityState === 'visible') {

                if(that.stormPlayer.getPlayerConfigManager().getIfAutoGUIHide()) {

                    setTimeout(function () {
                        that.isGUIHidden = true;
                        that.stormPlayer.dispatchEvent("guiHide", {ref: that.stormPlayer});
                    }, that.hideGUITimeoutSeconds * 1000);

                }

            }
        });


    }

    private updateResolution():void {

        if((this.playerWidth != window.innerWidth) || (this.playerHeight != window.innerHeight)){
            this.calculateSize(window.innerWidth, window.innerHeight)
            this.stormPlayer.dispatchEvent("resize",{ref: this.stormPlayer, newWidth: window.innerWidth, newHeight: window.innerHeight});
        }

    }

    /**
     * Returns the reference to the player HTML element
     */
    public getPlayerElement():HTMLElement | null {
        return this.getHtmlElement();
    }

    public getParentContainer():HTMLElement | null {
        return this.parentContainer;
    }

    public getControlElement():ControlElement {
        return this.controlElement;
    }

}