import { GraphicElement } from "./GraphicElement";
import { StormPlayer } from "../StormPlayer";

/**
 * Class representing single cue-point element
 */
export class CuePointElement extends GraphicElement {

    /**
     * Time at which cue point is added
     * @private
     */
    private time: number;

    /**
     * Title related to this cue-point
     * @private
     */
    private title: string;

    /**
     * Constructor
     * @param stormPlayer reference to the main class of the player
     * @param title title for this cue-point
     * @param time time for this cue-point
     */
    constructor(stormPlayer: StormPlayer, title: string, time: number) {
        super(stormPlayer, "sp-cue-points__item", "span");

        this.time = time;
        this.title = title;

        this.htmlElement.setAttribute("data-title", this.title);
        this.htmlElement.addEventListener("mousedown", function (e) {
          stormPlayer.getLibrary().seek(time);
        });

        this.hide();
    }

    /**
     * Returns Cue-Point title
     */
    public getTitle(): string {
        return this.title;
    }

    /**
     * Returns Cue-Poin time (unix-time)
     */
    public getTime(): number {
        return this.time;
    }

    /**
     * Draw graphics for the element
     * @protected
     */
    protected override draw(): void {
        super.draw();

        this.htmlElement.innerHTML = `
            <svg width="32" height="29" viewBox="0 0 32 29">
                <defs>
                    <linearGradient id="cue-point-gradient" x1="4.09%" x2="102%" y1="34.996%" y2="66.653%">
                        <stop offset="0%"></stop>
                        <stop offset="100%"></stop>
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
                            <use xlink:href="#qxoxvdy78b" style="filter: url(#33nbyogp2a);"></use>
                            <use xlink:href="#qxoxvdy78b" style="fill: url(#cue-point-gradient);"></use>
                        </g>
                    </g>
                </g>
            </svg>`;
    }
}
