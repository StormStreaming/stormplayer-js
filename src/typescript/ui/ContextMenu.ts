import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";

/**
 * Class representing stat box
 */
export class ContextMenu extends GraphicElement {

    private isFullScreen: boolean = false;

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

        this.htmlElement.innerHTML =`
         <li class="sp-context-menu__statistics storm">Storm JavaScript Player v${this.stormPlayer.getVersion()}</li>
         <li class="sp-context-menu__statistics debug">Debug</li>
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
        }

        else {
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


        console.log()



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

        let that:ContextMenu = this;

        that.htmlElement.querySelector('.storm').addEventListener('click', function () {
            window. open("https://stormstreaming.com", "_blank")
            that.stormPlayer.dispatchEvent("contextMenuHid", {ref:that.stormPlayer});
        });

        that.htmlElement.querySelector('.debug').addEventListener('click', function () {
            that.stormPlayer.dispatchEvent("boxStatShown", {ref:that.stormPlayer});
            that.stormPlayer.dispatchEvent("contextMenuHid", {ref:that.stormPlayer});
        });


        this.stormPlayer.addEventListener("contextMenuShown", function (ref) {
            that.showContextMenu(ref.e);
        });

        this.stormPlayer.addEventListener("contextMenuHid", function () {
            that.hideContextMenu();
        });

        this.stormPlayer.addEventListener("fullscreenEntered", function () {
            that.isFullScreen = true;
        });

        this.stormPlayer.addEventListener("fullscreenExited", function () {
            that.isFullScreen = false;
        });
    }
}
