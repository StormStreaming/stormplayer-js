import {StormLibraryConfig} from "@stormstreaming/stormlibrary";
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
    private storm: StormPlayer;

    /**
     * StormLibrary configuration
     * @private
     */
    private libraryConfig: StormLibraryConfig;

    /**
     * StormPlayer GUI Configuration
     * @private
     */
    private guiConfig: StormPlayerConfig;

    /**
     * Returns observed Attributes
     */
    static get observedAttributes() {
        return [
            "config",
            "title",
            "containerID",
            "width",
            "height",
            "title",
            "subtitle",
            "unmuteText",
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
        try {
            this.setLibraryConfig(JSON.parse(this.getAttribute("config") || ""));
        } catch {
            throw new Error(`config attribute supplied to containerId=["${this.getAttribute("containerID")}"] must be a valid JSON object`);
        }

        this.setGuiConfig({
            containerID: this.getAttribute("containerID") || "",
            width: parseInt(this.getAttribute("width") || "0"),
            height: parseInt(this.getAttribute("height") || "0"),
            title: this.getAttribute("title") || "",
            subtitle: this.getAttribute("subtitle") || "",
            unmuteText: this.getAttribute("unmuteText") || "", // label for unmute button
        });
    };

    /**
     * Initializes the player (here it gets created)
     * @private
     */
    private initialize():void {
        this.setupContainer({containerID: this.guiConfig.containerID});
        this.storm = new StormPlayer(this.guiConfig, this.libraryConfig);
    };

    private setupContainer = ({containerID}: Pick<StormPlayerConfig, "containerID">) => {
        this.wrapper = document.createElement("div");
        this.wrapper.setAttribute("id", containerID);
        this.appendChild(this.wrapper);
    };

    private setGuiConfig = ({
                                containerID,
                                width,
                                height,
                                title,
                                subtitle,
                                unmuteText,
                            }: StormPlayerConfig) => {
        this.guiConfig = {
            containerID: containerID,
            width: width,
            height: height,
            title: title,
            subtitle: subtitle,
            unmuteText: unmuteText,
        };
    };

    private setLibraryConfig = (config: StormLibraryConfig) =>
        (this.libraryConfig = config);

    public connectedCallback() {
        if (this.libraryConfig) {
            this.initialize();
        }
    }

    /**
     * Callback for destoying html element
     */
    public disconnectedCallback() {
        this.storm.destroy();
    }

    /**
     * This method is called on attribute change
     * @param name name of the attribute
     * @param _oldValue old value of the attribute
     * @param newValue new value of the attribute
     */
    public attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
        if (this.storm) {
            const formattedNewValue =
                name === "width" || name === "height" ? parseInt(newValue) : newValue;

            switch (name) {
                case "width":
                    this.storm.setSize(
                        formattedNewValue as number,
                        this.guiConfig.height
                    );
                    break;
                case "height":
                    this.storm.setSize(
                        this.guiConfig.height,
                        formattedNewValue as number
                    );
                    break;
                case "title":
                    this.storm.setTitle(newValue);
                    break;
                case "subtitle":
                    this.storm.setSubtitle(newValue);
                    break;
            }

            this.setGuiConfig({...this.guiConfig, [name]: formattedNewValue});
        } else if (name === "config") {
            //We need to push these action to the end of stack, to make sure to not create two players
            setTimeout(() => {
                this.storm?.destroy();
                this.prepare();
                this.initialize();
            }, 0);
        }
    }
}
