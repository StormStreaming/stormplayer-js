import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";

/**
 * Class representing stat box
 */
export class ContextMenu extends GraphicElement {

    /**
     * Whenver we're in fullscreen or not
     * @private
     */
    private isFullScreen: boolean = false;

    /**
     * Whenever it's cloud version or not
     * @private
     */
    private isStormCloud:boolean = false;

    /**
     * Constructor
     * @param stormPlayer reference to the main player class
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-context-menu hidden", 'ul');

    }

    /**
     * Draw graphics for the element
     * @protected
     */
    protected override draw(): void {
        super.draw();

        let firstItemLabel = "Storm Streaming Server";
        let secondItemLabel = "Copy Debug Log";

        try {

            const socketURL: string = this.stormPlayer.getRawStreamConfig().stream.serverList[0].host;
            if (socketURL != null) {
                if (socketURL.indexOf("stormstreaming.com") >= 0) {
                    this.isStormCloud = true;
                    firstItemLabel = "Storm Streaming Cloud";
                }
            }
        } catch(Error) {
            // nothing
        }

        this.htmlElement.innerHTML =`
         <li class="sp-context-menu__statistics storm">`+firstItemLabel+`</li>
         <li class="sp-context-menu__statistics debuglog">`+secondItemLabel+`</li>
        `;

    }

    /**
     * Shows context menu
     */
    public showContextMenu(e: MouseEvent): void {

        if (this.isFullScreen) {
            const rect = this.stormPlayer.getMainElement().getPlayerElement().querySelector('video').getBoundingClientRect()

            if (this.stormPlayer.getMainElement().getPlayerElement().querySelector('video').offsetHeight >= this.htmlElement.offsetHeight + e.clientY - rect.top )
                this.htmlElement.style.top = (e.clientY - rect.top).toString() + 'px';
            else
                this.htmlElement.style.top = (e.clientY - rect.top - this.htmlElement.offsetHeight).toString() + 'px';

            if (this.stormPlayer.getMainElement().getPlayerElement().querySelector('video').offsetWidth >= this.htmlElement.offsetWidth + e.clientX)
                this.htmlElement.style.left = (e.clientX - rect.left + 1).toString() + 'px';
            else
                this.htmlElement.style.left = (e.clientX - rect.left - this.htmlElement.offsetWidth - 1).toString() + 'px';

        } else {

            const rect = this.stormPlayer.getMainElement().getPlayerElement().getBoundingClientRect();

            if (this.stormPlayer.getMainElement().getPlayerElement().offsetHeight >= this.htmlElement.offsetHeight + e.clientY - rect.top )
                this.htmlElement.style.top = (e.clientY - rect.top).toString() + 'px';
            else
                this.htmlElement.style.top = (e.clientY - rect.top - this.htmlElement.offsetHeight).toString() + 'px';

            if (this.stormPlayer.getMainElement().getPlayerElement().offsetWidth >= this.htmlElement.offsetWidth + e.clientX)
                this.htmlElement.style.left = (e.clientX - rect.left + 1).toString() + 'px';
            else
                this.htmlElement.style.left = (e.clientX - rect.left - this.htmlElement.offsetWidth - 1).toString() + 'px';
        }

        this.htmlElement.classList.remove("hidden");
        this.stormPlayer.getMainElement().isOpenMenu = !this.stormPlayer.getMainElement().isOpenMenu;

    }

    /**
     * Hide context menu
     */
    public hideContextMenu(): void {
        if (!this.htmlElement) {
            return;
        }

        this.htmlElement.classList.add("hidden");
    }

    /**
     * Attaches listeners to the element
     * @protected
     */
    protected override attachListeners(): void {

        this.htmlElement.querySelector('.storm').addEventListener('click', () => {
            this.onLinkClick();
            this.stormPlayer.dispatchEvent("contextMenuHid", {ref:this.stormPlayer});
        });

        this.htmlElement.querySelector('.debuglog').addEventListener('click', () => {
            this.stormPlayer.dispatchEvent("contextMenuHid", {ref:this.stormPlayer});
            this.copyArrayToClipboard(this.stormPlayer.getLibrary().getLogger().getAllLogs());
        });

        this.stormPlayer.addEventListener("contextMenuShown",  (ref) => {
            this.showContextMenu(ref.e);
        });

        this.stormPlayer.addEventListener("contextMenuHid", () => {
            this.hideContextMenu();
        });

        this.stormPlayer.addEventListener("fullscreenEnter", () => {
            this.isFullScreen = true;
        });

        this.stormPlayer.addEventListener("fullscreenExit", () => {
            this.isFullScreen = false;
        });
    }

    private onLinkClick():void{

        try {

            const socketURL: string = this.stormPlayer.getRawStreamConfig().stream.serverList[0].host;
            if (socketURL != null) {
                if (socketURL.indexOf("stormstreaming.com") >= 0) {
                    window.open("https://www.stormstreaming.com/live-streaming-cloud", "_blank");
                } else {
                    window.open("https://www.stormstreaming.com/live-streaming-server", "_blank");
                }
            }
        } catch(Error) {
            // nothing
        }

    }

    /**
     * Copies array with logs to clipboard
     * @param array
     * @protected
     */
    protected async copyArrayToClipboard(array: string[]): Promise<void> {

        const textToCopy = array.join('\n');

        try {
            await navigator.clipboard.writeText(textToCopy);
        } catch (err) {
            console.log(textToCopy);
        }
    }
}
