import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {BandwidthGraph} from "@stormstreaming/stormlibrary/dist/types/graph/BandwidthGraph";
import {BufferGraph} from "@stormstreaming/stormlibrary/dist/types/graph/BufferGraph";
import {BufferStabilityGraph} from "@stormstreaming/stormlibrary/dist/types/graph/BufferStabilityGraph";

/**
 * Class representing stat box
 */
export class StatBox extends GraphicElement {
    private isOpen: boolean = false;
    private interval: NodeJS.Timeout | null = null;
    private stormPlayerBwGraph: BandwidthGraph = null;
    private stormPlayerBufferGraph: BufferGraph = null;
    private stormPlayerBufferStabilityGraph: BufferStabilityGraph = null;


    /**
     * Constructor
     * @param stormPlayer reference to the main player class
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-stat-box");
    }

    /**
     * Draw graphics for the element
     * @protected
     */
    protected override draw(): void {
        super.draw();

        this.htmlElement.classList.add("sp-hidden");
        this.htmlElement.innerHTML =`
         <span class="sp-stat-box__close-btn">
             <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="sss_home_cart" transform="translate(-1570.000000, -190.000000)" fill="#FFFFFF">
                        <g id="produkt" transform="translate(1333.000000, 179.000000)">
                            <g id="Group-3" transform="translate(244.020815, 18.020815) rotate(-315.000000) translate(-244.020815, -18.020815) translate(235.520815, 9.520815)">
                                <rect id="Rectangle" x="0" y="7.5" width="17" height="2" rx="1"></rect>
                                <rect id="Rectangle-Copy-12" transform="translate(8.500000, 8.500000) rotate(-270.000000) translate(-8.500000, -8.500000) " x="0" y="7.5" width="17" height="2" rx="1"></rect>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </span>
         <span class="sp-stat-box__title">Statistics</span>
         <div class="sp-stat-box__stats">
             <div>
                 <span>PLAYER</span>
                 <div>
                    <div>
                        <span>Stream Key</span>
                        <span id="stormPlayer-streamKeyValue"></span>
                    </div>
                    <div>
                        <span>Playback Status</span>
                        <span id="stormPlayer-playbackStateValue"></span>
                    </div>
                    <div>
                        <span>Stream Status</span>
                        <span id="stormPlayer-streamStateValue"></span>
                    </div>
                    <div>
                        <span>Volume</span>
                        <span id="stormPlayer-volumeValue"></span>
                    </div>
                    <div>
                        <span>Muted</span>
                        <span id="stormPlayer-mutedValue"></span>
                    </div>
                    <div>
                        <span>Muted By</span>
                        <span id="stormPlayer-mutedByValue"></span>
                    </div>
                 </div>
             </div>
             <div>
                 <span>BANDWIDTH</span>
                 <div>
                   <div>
                        <span>BW Graph.</span>
                        <span id="stormPlayer-bwGraph" style="width:100px;height:20px"></span>
                    </div>
                     <div>
                        <span>Current Bandwidth</span>
                        <span id="stormPlayer-currBandwidthValue"></span>
                    </div>
                     <div>
                        <span>Min. Bandwidth</span>
                        <span id="stormPlayer-minBandwidthValue"></span>
                    </div>
                     <div>
                        <span>Max. Bandwidth</span>
                        <span id="stormPlayer-maxBandwidthValue"></span>
                    </div>
                     <div>
                        <span>BW. Stability Trend</span>
                        <span id="stormPlayer-bwStabilityTrend"></span>
                    </div>
                 </div>
             </div>
             <div>
                 <span>BUFFER</span>
                 <div>
                    <div>
                        <span>Buffer Graph</span>
                        <span id="stormPlayer-BufferGraph" style="width:100px;height:20px"></span>
                    </div>
                    <div>
                        <span>Buffer Size</span>
                        <span id="stormPlayer-bufferSizeValue"></span>
                    </div>
                    <div>
                        <span>Buffer Stability Graph</span>
                        <span id="stormPlayer-BufferStabilityGraph" style="width:100px;height:20px"></span>
                    </div>
                    <div>
                        <span>Buffer Stability Trend</span>
                        <span id="stormPlayer-bufferStabilityTrend"></span>
                    </div>
                    <div>
                        <span>Buffer Stability Dev</span>
                        <span id="stormPlayer-bufferStabilityDev"></span>
                    </div>
                 </div>
             </div>
             <div>
                 <span>PLAYBACK</span>
                 <div>
                    <div>
                        <span>Playback Rate</span>
                        <span id="stormPlayer-playbackRateValue"></span>
                    </div>
                    <div>
                        <span>Playback Duration</span>
                        <span id="stormPlayer-playbackDurationValue"></span>
                    </div>
                    <div>
                        <span>Playback Start Time</span>
                        <span id="stormPlayer-playbackStartTimeValue"></span>
                    </div>
                    <div>
                        <span>Stream Duration</span>
                        <span id="stormPlayer-streamDurationValue"></span>
                    </div>
                    <div>
                        <span>Stream Start Time</span>
                        <span id="stormPlayer-streamStartTimeValue"></span>
                    </div>
                 </div>
             </div>
        </div>
        `;
    }

    public update():void {

        let that:StatBox = this;

        if(!this.stormPlayerBufferGraph)
            this.stormPlayerBufferGraph = this.stormPlayer.getLibrary().createBufferGraph("stormPlayer-BufferGraph", 50);

        if(!this.stormPlayerBwGraph)
            this.stormPlayerBwGraph = this.stormPlayer.getLibrary().createBandwidthGraph("stormPlayer-bwGraph", 50);

        if(!this.stormPlayerBufferStabilityGraph)
            this.stormPlayerBufferStabilityGraph = this.stormPlayer.getLibrary().createBufferStabilityGraph("stormPlayer-BufferStabilityGraph", 50);

        this.interval = setInterval(() => {
            document.getElementById("stormPlayer-playbackRateValue").innerHTML = this.stormPlayer.getLibrary().getPlaybackRate().toString() ?? "Unknown";

            document.getElementById("stormPlayer-currBandwidthValue").innerHTML = ((this.stormPlayer.getLibrary().getBandwidthMeter().currentBandwidth ?? 0) / 1000).toFixed(2) + " kbps";

            document.getElementById("stormPlayer-minBandwidthValue").innerHTML = ((this.stormPlayer.getLibrary().getBandwidthMeter().minBandwidth ?? 0) / 1000).toFixed(2) + " kbps";

            document.getElementById("stormPlayer-maxBandwidthValue").innerHTML = ((this.stormPlayer.getLibrary().getBandwidthMeter().maxBandwidth ?? 0) / 1000).toFixed(2) + " kbps";

            document.getElementById("stormPlayer-bwStabilityTrend").innerHTML = (this.stormPlayer.getLibrary().getBandwidthAnalyser().currentTrend ?? "unknown") + " (" + (this.stormPlayer.getLibrary().getBandwidthAnalyser().trendDuration ?? 0).toFixed(3) + " s)";

            document.getElementById("stormPlayer-bufferSizeValue").innerHTML = (this.stormPlayer.getLibrary().getBufferAnalyser().bufferSize ?? 0).toFixed(2) + " s";

            document.getElementById("stormPlayer-bufferStabilityTrend").innerHTML = this.stormPlayer.getLibrary().getBufferAnalyser().stability ?? "unknown";

            document.getElementById("stormPlayer-bufferStabilityDev").innerHTML = (this.stormPlayer.getLibrary().getBufferAnalyser().bufferDeviation ?? 0).toFixed(3);
        }, 100)

        that.htmlElement.querySelector('.sp-stat-box__close-btn').addEventListener('click', function () {
            that.stormPlayer.dispatchEvent("boxStatHid", {ref:that.stormPlayer});
        });

    }

    /**
     * Shows context menu
     */
    public showStatBox(): void {
        if (!this.htmlElement) {
            return;
        }

        this.htmlElement.classList.remove("sp-hidden");
    }

    /**
     * Hide context menu
     */
    public hideStatBox(): void {
        if (!this.htmlElement) {
            return;
        }

        this.htmlElement.classList.add("sp-hidden");
    }

    /**
     * Attaches listeners to the element
     * @protected
     */
    protected override attachListeners(): void {

        let that:StatBox = this;

        this.stormPlayer.addEventListener("boxStatShown", function (event) {
            if (that.isOpen) {
                return
            }
            that.update();
            that.showStatBox();
            document.getElementById("stormPlayer-streamKeyValue").innerHTML = that.stormPlayer.getLibrary().getCurrentSourceItem().getStreamKey();
            document.getElementById("stormPlayer-playbackStateValue").innerHTML = that.stormPlayer.getLibrary().getPlaybackState();
            document.getElementById("stormPlayer-volumeValue").innerHTML = that.stormPlayer.getLibrary().getVolume().toString();
            document.getElementById("stormPlayer-mutedValue").innerHTML = that.stormPlayer.getLibrary().isMute().toString();

            if(that.stormPlayerBufferGraph)
                that.stormPlayerBufferGraph.start();

            if(that.stormPlayerBwGraph)
                that.stormPlayerBwGraph.start();

            if(that.stormPlayerBufferStabilityGraph)
                that.stormPlayerBufferStabilityGraph.start();

            that.isOpen = !that.isOpen
        });

        this.stormPlayer.addEventListener("boxStatHid", function () {
            if (!that.isOpen) {
                return
            }

            that.hideStatBox();
            clearInterval(that.interval);

            if(that.stormPlayerBufferGraph)
                that.stormPlayerBufferGraph.stop();

            if(that.stormPlayerBwGraph)
                that.stormPlayerBwGraph.stop();

            if(that.stormPlayerBufferStabilityGraph)
                that.stormPlayerBufferStabilityGraph.stop();

            that.isOpen = !that.isOpen
        });

        this.stormPlayer.addEventListener("volumeChange", function (event) {
            document.getElementById("stormPlayer-volumeValue").innerHTML = event.volume.toString();
            document.getElementById("stormPlayer-mutedValue").innerHTML = event.muted.toString();
            document.getElementById("stormPlayer-mutedByValue").innerHTML = event.invokedBy.toString();
        })

        this.stormPlayer.addEventListener("playbackProgress", function (event) {
            document.getElementById("stormPlayer-playbackStartTimeValue").innerHTML = event.playbackStartTime.toString();
            document.getElementById("stormPlayer-playbackDurationValue").innerHTML = event.playbackDuration.toString();
            document.getElementById("stormPlayer-streamDurationValue").innerHTML = event.streamDuration.toString();
            document.getElementById("stormPlayer-streamStartTimeValue").innerHTML = event.streamStartTime.toString();
        })

        this.stormPlayer.addEventListener("streamStateChange", function (event) {
            document.getElementById("stormPlayer-streamStateValue").innerHTML = event.state;
        })

        this.stormPlayer.addEventListener("playbackStateChange", function (event) {
            document.getElementById("stormPlayer-streamKeyValue").innerHTML = event.streamKey;
            document.getElementById("stormPlayer-playbackStateValue").innerHTML = event.state;
        })
    }
}
