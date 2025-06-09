import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {BandwidthGraph} from "@stormstreaming/stormlibrary/dist/types/graph/BandwidthGraph";

/**
 * Class representing stat box
 */
export class StatBox extends GraphicElement {
    private interval: NodeJS.Timeout | null = null;


    /**
     * Constructor
     * @param stormPlayer reference to the main player class
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-stat-box");

        this.interval = null;

    }

    /**
     * Draw graphics for the element
     * @protected
     */
    protected override draw(): void {
        super.draw();

        this.htmlElement.classList.add("sp-hidden");
        this.htmlElement.innerHTML =`
         <span class="sp-stat-box__close-btn">x</span>
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
                        <span></span>
                    </div>
                    <div>
                        <span>Buffer Size</span>
                        <span id="stormPlayer-bufferSizeValue"></span>
                    </div>
                    <div>
                        <span>Buffer Stability Graph</span>
                        <span></span>
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

        let stormPlayerBwGraph:BandwidthGraph = this.stormPlayer.getLibrary().createBandwidthGraph("stormPlayer-bwGraph", 50).start();

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
            that.update();
            that.showStatBox();
            document.getElementById("stormPlayer-streamKeyValue").innerHTML = that.stormPlayer.getLibrary().getCurrentSourceItem().getStreamKey();
            document.getElementById("stormPlayer-playbackStateValue").innerHTML = that.stormPlayer.getLibrary().getPlaybackState();
            document.getElementById("stormPlayer-volumeValue").innerHTML = that.stormPlayer.getLibrary().getVolume().toString();
            document.getElementById("stormPlayer-mutedValue").innerHTML = that.stormPlayer.getLibrary().isMute().toString();
        });

        this.stormPlayer.addEventListener("boxStatHid", function () {
            that.hideStatBox();
            clearInterval(that.interval);
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
