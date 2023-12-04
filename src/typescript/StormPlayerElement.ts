import {StormStreamConfig} from "@stormstreaming/stormlibrary";
import {StormPlayer} from "./StormPlayer";
import {StormPlayerConfig} from "./types/StormPlayerConfig";

/**
 * A custom HTML player element
 */
export default class StormPlayerElement extends HTMLElement {

    /**
     * Main wrapper for HTML element
     * @private
     */
    private wrapper: HTMLDivElement;

    /**
     * StormPlayer instance
     * @private
     */
    private player: StormPlayer;

    /**
     * StormLibrary configuration
     * @private
     */
    private streamConfig: StormStreamConfig;

    /**
     * StormPlayer GUI Configuration
     * @private
     */
    private playerConfig: StormPlayerConfig;

    /**
     * Name of the container
     * @private
     */
    private containerID:string

    /**
     * Element width
     * @private
     */
    private width:number;

    /**
     * Element height
     * @private
     */
    private height:number;

    /**
     * Returns observed Attributes
     */
    static get observedAttributes() {
        return [
            "streamConfig",
            "playerConfig",
            "containerID",
            "width",
            "height"
        ];
    }

    /**
     * Constructor
     */
    constructor() {
        super();
        this.prepare();
    }

    /**
     * Prepares new HTML element
     * @private
     */
    private prepare():void {

        // checking for container ID
        if(this.getAttribute("containerID"))
            this.containerID = this.getAttribute("containerID")
        else
            throw new Error(`containerID attribute was not supplied the strom player element`);

        // checking for width
        if(this.getAttribute("width")){
            if(this.containsOnlyNumbers(this.getAttribute("width")))
                this.width = Number(this.getAttribute("width"))
            else
                throw new Error(`width attribute supplied to containerId=["${this.getAttribute("containerID")}"] must be a number`);
        } else
            throw new Error(`width attribute was not supplied to containerId=["${this.getAttribute("containerID")}"]`);

        // checking for height
        if(this.getAttribute("height")){
            if(this.containsOnlyNumbers(this.getAttribute("height")))
                this.height = Number(this.getAttribute("height"))
            else
                throw new Error(`height attribute supplied to containerId=["${this.getAttribute("containerID")}"] must be a number`);
        } else
            throw new Error(`height attribute was not supplied to containerId=["${this.getAttribute("containerID")}"]`);

        // checking for streamConfig
        if(this.getAttribute("streamConfig")){
            try {
                console.log("atrybut html streamConfig zmieniony")
                this.setStreamConfig(JSON.parse(this.getAttribute("streamConfig")));
            } catch {
                throw new Error(`streamConfig attribute supplied to containerId=["${this.getAttribute("containerID")}"] must be a valid JSON object`);
            }
        }

        // checking for streamConfig
        if(this.getAttribute("playerConfig")){
            try {
                console.log("atrybut html playerConfig zmieniony")
                this.setPlayerConfig(JSON.parse(this.getAttribute("playerConfig")));
                this.playerConfig.width = this.width;
                this.playerConfig.height = this.height;
                this.playerConfig.containerID = this.containerID;
            } catch {
                throw new Error(`playerConfig attribute supplied to containerId=["${this.getAttribute("containerID")}"] must be a valid JSON object`);
            }
        } else {
            this.playerConfig = {width:this.width, height:this.height, containerID:this.containerID};
        }

    };

    private setupContainer = ({containerID}: Pick<StormPlayerConfig, "containerID">) => {
        this.wrapper = document.createElement("div");
        this.wrapper.setAttribute("id", containerID);
        this.appendChild(this.wrapper);
    };

    /**
     * Initializes the player (here it gets created)
     * @private
     */
    private initialize():void {
        this.setupContainer({containerID: this.playerConfig.containerID});
        this.player = new StormPlayer(this.playerConfig, this.streamConfig);
    };

    private setStreamConfig = (streamConfig: StormStreamConfig) =>
        (this.streamConfig = streamConfig);


    private setPlayerConfig = (playerConfig: StormPlayerConfig) =>
        (this.playerConfig = playerConfig);

    public connectedCallback() {
        if (this.streamConfig) {
            this.initialize();
        }
    }

    /**
     * Callback for destoying html element
     */
    public disconnectedCallback() {
        this.player.destroy();
    }

    /**
     * This method is called on attribute change
     * @param name name of the attribute
     * @param _oldValue old value of the attribute
     * @param newValue new value of the attribute
     */
    public attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
        if (this.player) {
            const formattedNewValue = name === "width" || name === "height" ? parseInt(newValue) : newValue;

            switch (name) {
                case "width":
                    this.player.setSize(
                        formattedNewValue as number,
                        this.playerConfig.height
                    );
                    this.playerConfig.width = formattedNewValue as number;
                    break;
                case "height":
                    this.player.setSize(
                        this.playerConfig.width,
                        formattedNewValue as number
                    );
                    this.playerConfig.height = formattedNewValue as number;
                    break;
            }

        } else if (name === "streamConfig" || name === "playerConfig") {
            //We need to push these action to the end of stack, to make sure to not create two players
            setTimeout(() => {
                this.player?.destroy();
                this.prepare();
                this.initialize();
            }, 0);
        }
    }

    /**
     * Check if string is made of numbers
     * @param str string value
     * @private
     */
    private containsOnlyNumbers(str:string) {
        return /^\d+$/.test(str);
    }

}
