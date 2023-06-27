import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {EventType} from "@app/typescript/events/EventType";

/**
 * Class representing stat box
 */
export class ContextMenu extends GraphicElement {

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
         <li class="sp-context-menu__statistics">statystyki</li>
        `;

    }

    /**
     * Shows context menu
     */
    public showContextMenu(e: MouseEvent, element: HTMLElement): void {


            const rect = element.getBoundingClientRect();

            if (element.offsetHeight >= this.htmlElement.offsetHeight + e.clientY)
                this.htmlElement.style.top = (e.clientY - rect.top).toString() + 'px';
            else
                this.htmlElement.style.top = (e.clientY - rect.top - this.htmlElement.offsetHeight).toString() + 'px';

            if (element.offsetWidth >= this.htmlElement.offsetWidth + e.clientX)
                this.htmlElement.style.left = (e.clientX - rect.left).toString() + 'px';
            else
                this.htmlElement.style.left = (e.clientX - rect.left - this.htmlElement.offsetWidth).toString() + 'px';

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


        that.htmlElement.querySelector('.sp-context-menu__statistics').addEventListener('click', function () {
            that.stormPlayer.dispatch(EventType.BOX_STAT_SHOWN);
            that.stormPlayer.dispatch(EventType.CONTEXT_MENU_HIDED);
        });

        this.stormPlayer.addEventListener(EventType.CONTEXT_MENU_SHOWN, function (e: {e: MouseEvent, element: HTMLElement}) {
            that.showContextMenu(e.e, e.element);
        });

        this.stormPlayer.addEventListener(EventType.CONTEXT_MENU_HIDED, function () {
            that.hideContextMenu();
        });

    }
}
