import {StormPlayer} from "../StormPlayer";

/**
 * Abstract graphic element
 */
export class GraphicElement {

    /**
     * Reference to the main player class
     * @protected
     */
    protected stormPlayer: StormPlayer;

    /**
     * HTML element
     * @protected
     */
    protected htmlElement: HTMLElement;

    /**
     * Tag name of this element
     * @protected
     */
    protected tagName: string;

    /**
     * Class name of this element
     * @protected
     */
    protected className: string;

    /**
     * Constructor
     * @param stormPlayer reference to the main player class
     * @param className className for this element
     * @param tagName tagName for this element
     */
    constructor(stormPlayer: StormPlayer, className: string = "", tagName: string = 'div') {
        this.className = className;
        this.tagName = tagName;
        this.stormPlayer = stormPlayer;
        this.draw();
        this.attachListeners();
    }

    /**
     * Returns HTML element
     */
    public getHtmlElement(): HTMLElement {
        return this.htmlElement;
    }

    /**
     * Removes element
     */
    public remove(): void {
        this.htmlElement.remove();
    }

    /**
     * Hides element
     */
    public hide(): void {
        this.htmlElement.classList.add("sp-hidden");
    }

    /**
     * Makes element visible again
     */
    public show(): void {
        this.htmlElement.classList.remove("sp-hidden");
    }

    /**
     * Draw graphics for the element
     * @protected
     */
    protected draw(): void {
        this.htmlElement = document.createElement(this.tagName);
        if (this.className != '')
            this.htmlElement.className = this.className;

        if(this.tagName == "button")
            this.htmlElement.setAttribute("type","button")

        this.htmlElement.innerHTML = ``;
    }

    /**
     * Attaches listeners to the button
     * @protected
     */
    protected attachListeners(): void {
        // for extension
    }

}