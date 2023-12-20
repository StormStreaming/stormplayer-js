import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {WaitingRoom} from "@app/typescript/ui/WaitingRoom";

/**
 * Class represents error element
 */
export class ErrorElement extends GraphicElement {


    private waitingRoom:WaitingRoom;

    private isInAwaitingState:boolean = false;

    /**
     * Constructor
     * @param stormPlayer reference to the main player class
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-error");
    }

    /**
     * Displays given message as an error
     * @param message message that will be displayed as an error
     */
    public showErrorMessage(message: string) {
        this.htmlElement.querySelector("span").innerHTML = message;
        this.show();
    }

    /**
     * Draw graphics for the element
     * @protected
     */
    protected override draw(): void {
        super.draw();

        this.htmlElement.innerHTML = `
            <svg width="72" height="72" viewBox="0 0 72 72">
                <defs>
                    <filter id="ynnx5kr06a">
                        <feColorMatrix in="SourceGraphic" values="0 0 0 0 0.875877 0 0 0 0 0.056962 0 0 0 0 0.198697 0 0 0 1.000000 0" />
                    </filter>
                </defs>
                <g fill="none" fill-rule="evenodd">
                    <g filter="url(#ynnx5kr06a)" transform="translate(-764 -536)">
                        <g>
                            <path fill="#000" fill-rule="nonzero" d="M36 21c-9.93 0-18 8.07-18 18 0 4.98 2.04 9.45 5.28 12.72l4.26-4.26C25.35 45.3 24 42.33 24 39c0-6.63 5.37-12 12-12s12 5.37 12 12c0 3.33-1.35 6.3-3.54 8.46l4.26 4.26C51.96 48.45 54 43.98 54 39c0-9.93-8.07-18-18-18zm0-12C19.44 9 6 22.44 6 39c0 8.28 3.36 15.78 8.79 21.21l4.26-4.26C14.7 51.63 12 45.63 12 39c0-13.26 10.74-24 24-24 7.59 0 14.34 3.51 18.72 9h7.26C56.79 15.03 47.1 9 36 9zm0 24c-3.3 0-6 2.7-6 6 0 1.65.69 3.15 1.77 4.23C32.85 44.31 34.35 45 36 45c1.65 0 3.15-.69 4.23-1.77C41.31 42.15 42 40.65 42 39c0-3.3-2.7-6-6-6zm24-3h6v18h-6V30zm0 24h6v6h-6v-6z" transform="translate(764 536)" />
                        </g>
                    </g>
                </g>
            </svg>
            <span></span>`;

        this.hide();
    }

    /**
     * Attaches listeners to the element
     * @protected
     */
    protected override attachListeners(): void {

        const that:ErrorElement = this;

        this.stormPlayer.addEventListener("libraryCreate", () => {

            this.stormPlayer.getLibrary().addEventListener("serverDisconnect", () => {
                if(!this.stormPlayer.getLibrary().getStreamConfig().getSettings().getIfRestartOnError())
                    this.showErrorMessage(this.stormPlayer.getPlayerConfigManager().getPlayerDisconnectedText());
            });

            this.stormPlayer.getLibrary().addEventListener("serverConnectionError", () => {
                if(!this.stormPlayer.getLibrary().getStreamConfig().getSettings().getIfRestartOnError())
                    this.showErrorMessage(this.stormPlayer.getPlayerConfigManager().getServersFailedText());
            });

            this.stormPlayer.getLibrary().addEventListener("allConnectionsFailed", () => {
                this.showErrorMessage(this.stormPlayer.getPlayerConfigManager().getServersFailedText());
            });

            this.stormPlayer.getLibrary().addEventListener("compatibilityError", () => {
                this.showErrorMessage(this.stormPlayer.getPlayerConfigManager().getCompatibilityErrorText());
            });

            this.stormPlayer.getLibrary().addEventListener("SSLError", () => {
                this.showErrorMessage(this.stormPlayer.getPlayerConfigManager().getNoSSLErrorText());
            });

            this.stormPlayer.getLibrary().addEventListener("playbackError", () => {
                this.showErrorMessage(this.stormPlayer.getPlayerConfigManager().getVideoErrorText());
            });

            this.stormPlayer.getLibrary().addEventListener("streamNotFound", () => {
                this.showErrorMessage(this.stormPlayer.getPlayerConfigManager().getVideoNotFoundText());
            });

            this.stormPlayer.getLibrary().addEventListener("incompatibleProtocol", () => {
                this.showErrorMessage(this.stormPlayer.getPlayerConfigManager().getIncorrectProtocolVersionText());
            });

            this.stormPlayer.getLibrary().addEventListener("invalidLicense", () => {
                this.showErrorMessage(this.stormPlayer.getPlayerConfigManager().getLicenseErrorText());
            });

            this.stormPlayer.getLibrary().addEventListener("SSLError", () => {
                this.showErrorMessage(this.stormPlayer.getPlayerConfigManager().getNoSSLErrorText());
            });

            this.stormPlayer.addEventListener("waitingRoomEnded", () => {
                this.showErrorMessage(this.stormPlayer.getPlayerConfigManager().getAwaitingText());
            });

            this.stormPlayer.addEventListener("streamStartNotification", () => {
                this.hide();
            })


            this.stormPlayer.getLibrary().addEventListener("playbackInitiate", () => {
                this.hide();
            });


            this.stormPlayer.getLibrary().addEventListener("streamStop", () => {

                if(that.stormPlayer.getPlayerConfigManager().getBroadcastStartDate() != null && that.stormPlayer.getPlayerConfigManager().getWaitingRoomTimeZone() != null) {
                    if (WaitingRoom.isWaitingApplicable(that.stormPlayer.getPlayerConfigManager().getBroadcastStartDate(), that.stormPlayer.getPlayerConfigManager().getWaitingRoomTimeZone())) {

                        that.waitingRoom = new WaitingRoom(that.stormPlayer);
                        that.stormPlayer.getMainElement().spContainer.getHtmlElement().appendChild(this.waitingRoom.getHtmlElement());

                    } else if(!this.stormPlayer.getLibrary().getStreamConfig().getSettings().getIfAutoStart()){

                        // console.log nic...

                    } else
                        this.showErrorMessage(this.stormPlayer.getPlayerConfigManager().getVideoStopText());
                } else
                    this.showErrorMessage(this.stormPlayer.getPlayerConfigManager().getVideoStopText());


            });


            this.stormPlayer.getLibrary().addEventListener("streamStateChange", (event) => {

                switch(event.state){
                    case "CLOSED":
                    case "UNPUBLISHED":

                        if(that.stormPlayer.getPlayerConfigManager().getBroadcastStartDate() != null && that.stormPlayer.getPlayerConfigManager().getWaitingRoomTimeZone() != null) {
                            if (WaitingRoom.isWaitingApplicable(that.stormPlayer.getPlayerConfigManager().getBroadcastStartDate(), that.stormPlayer.getPlayerConfigManager().getWaitingRoomTimeZone())) {

                                that.waitingRoom = new WaitingRoom(that.stormPlayer);
                                that.stormPlayer.getMainElement().spContainer.getHtmlElement().appendChild(this.waitingRoom.getHtmlElement());

                                return;

                            }
                        }

                        this.showErrorMessage(this.stormPlayer.getPlayerConfigManager().getVideoStopText());

                        break;
                    case "NOT_PUBLISHED":

                        if(that.stormPlayer.getPlayerConfigManager().getBroadcastStartDate() != null && that.stormPlayer.getPlayerConfigManager().getWaitingRoomTimeZone() != null) {
                            if (WaitingRoom.isWaitingApplicable(that.stormPlayer.getPlayerConfigManager().getBroadcastStartDate(), that.stormPlayer.getPlayerConfigManager().getWaitingRoomTimeZone())) {

                                that.waitingRoom = new WaitingRoom(that.stormPlayer);
                                that.stormPlayer.getMainElement().spContainer.getHtmlElement().appendChild(this.waitingRoom.getHtmlElement());

                                return;

                            }
                        }

                        this.showErrorMessage(this.stormPlayer.getPlayerConfigManager().getAwaitingText());

                        break;
                    case "AWAITING":
                        this.showErrorMessage(this.stormPlayer.getPlayerConfigManager().getAwaitingText());
                        break;
                    case "PUBLISHED":
                        this.hide();
                        break;

                }


            });

            this.stormPlayer.addEventListener("playClick",() => {
                if(this.stormPlayer.getLibrary().getPlaybackState() == "awaiting"){
                    this.showErrorMessage(this.stormPlayer.getPlayerConfigManager().getAwaitingText());
                    this.stormPlayer.getLibrary().getStreamConfig().getSettings().setAutoStart(true);
                }
            })

            this.stormPlayer.addEventListener("streamConfigUpdate", () => {
                this.hide();
            })

            this.stormPlayer.getLibrary().addEventListener("playbackInitiate", () => {

                if(that.waitingRoom != null){
                    that.waitingRoom.remove();
                }

            });

        });

    }
}
