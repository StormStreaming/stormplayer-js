import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";


/**
 * Class representing countdown screen
 */
export class WaitingRoom extends GraphicElement {

    /**
     * Constructor
     * @param stormPlayer reference to the main player class
     */
    constructor(stormPlayer: StormPlayer) {
        super(stormPlayer, "sp-waiting-room");
        this.setTime();
        this.getHtmlElement().querySelector('#videoStartDate').innerHTML = this.stormPlayer.getPlayerConfig().getBroadcastStartDate();
        this.getHtmlElement().style.backgroundImage="url("+this.stormPlayer.getOrigGUIConfig().waitingRoom.posterURL+")";
    }

    public setTime(): void {

        let that:WaitingRoom = this;
        let nowTime:number, startTime:number, createTime:number;

        const countdown = setInterval( function () {

            createTime = new Date(that.parseDate(that.stormPlayer.getPlayerConfig().getBroadcastCreateDate())).getTime();
            startTime = new Date(that.parseDate(that.stormPlayer.getPlayerConfig().getBroadcastStartDate())).getTime();
            nowTime = new Date().getTime();

            let nowToStart = startTime-nowTime;
            let createToStart = startTime-createTime;

            let days = Math.floor(nowToStart / (1000 * 60 * 60 * 24));
            let hours = Math.floor(nowToStart / (1000 * 60 * 60) % 24);
            let minutes = Math.floor((nowToStart/1000/60) % 60 );
            let seconds = Math.floor((nowToStart/1000) % 60);

            if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
                clearInterval(countdown);
                setTimeout(() => {
                    that.stormPlayer.dispatchEvent("waitingRoomEnded", {ref:that.stormPlayer});
                }, 1000)
            }

            that.getHtmlElement().querySelector('#daysCounter > span').innerHTML = days <= 9 ? "0" + days.toString() : days.toString();
            that.getHtmlElement().querySelector('#hoursCounter > span').innerHTML = hours <= 9 ? "0" + hours.toString() : hours.toString();
            that.getHtmlElement().querySelector('#minutesCounter > span').innerHTML = minutes <= 9 ? "0" + minutes.toString() : minutes.toString();
            that.getHtmlElement().querySelector('#secondCounter > span').innerHTML = seconds <= 9 ? "0" + seconds.toString() : seconds.toString();

            that.getHtmlElement().querySelector<HTMLElement>('#daysCounter .progress-ring__circle').style.strokeDashoffset = String(nowToStart > 86400000 ? 376.98 - ((nowToStart - 86400000) * (376.98/(createToStart - 86400000))) : 376.98);
            that.getHtmlElement().querySelector<HTMLElement>('#hoursCounter .progress-ring__circle').style.strokeDashoffset = String(nowToStart < 86400000 && nowToStart > 3600000 ? 376.98 - ((nowToStart - 3600000) * (376.98/(86400000- 3600000))) : nowToStart < 3600000 ? 376.98 : 0);
            that.getHtmlElement().querySelector<HTMLElement>('#minutesCounter .progress-ring__circle').style.strokeDashoffset = String(nowToStart < 3600000 && nowToStart > 60000 ? 376.98 - ((nowToStart - 60000) * (376.98/(3600000- 60000))) : nowToStart < 60000 ? 376.98 : 0);
            that.getHtmlElement().querySelector<HTMLElement>('#secondCounter .progress-ring__circle').style.strokeDashoffset = String(nowToStart < 60000 && nowToStart > 1000 ? 376.98 - (nowToStart * (376.98/60000)) : nowToStart < 60000 ? 376.98 : 0);

        }, 1000)
    }

    /**
     * Draw graphics for the element
     * @protected
     */
    protected override draw(): void {
        super.draw();

        this.htmlElement.innerHTML = `
      <div class="sp-waiting-room__wrapper">
        <div class="countdown-container">
          <span class="title">${this.stormPlayer.getPlayerConfig().getBroadcastRemainingTimeText()}</span>
          <div class="countdown">
          <div class="counter" id="daysCounter">
            <svg
                class="progress-ring"
                width="128"
                height="128">
              <defs>
                <linearGradient id="gradient1" x1="2" y1="2" x2="-30.4812" y2="86.4152" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"/>
                  <stop offset="100%"/>
                </linearGradient>
              </defs>
              <circle class="progress-ring__track" r="60" />
              <circle class="progress-ring__circle" r="60" style="stroke: url(#gradient1);"/>
            </svg>
            <span>00</span>
            <span>${this.stormPlayer.getPlayerConfig().getTimeDaysText()}</span>
          </div>
          <div class="counter" id="hoursCounter">
            <svg
                class="progress-ring"
                width="128"
                height="128">
              <defs>
                <linearGradient id="gradient2" x1="2" y1="2" x2="-30.4812" y2="86.4152" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"/>
                  <stop offset="100%"/>
                </linearGradient>
              </defs>
              <circle class="progress-ring__track" r="60" />
              <circle class="progress-ring__circle" r="60" style="stroke: url(#gradient2);" />
            </svg>
            <span>00</span>
            <span>${this.stormPlayer.getPlayerConfig().getTimeHoursText()}</span>
          </div>
          <div class="counter" id="minutesCounter">
            <svg
                class="progress-ring"
                width="128"
                height="128">
             <defs>
                <linearGradient id="gradient3" x1="2" y1="2" x2="-30.4812" y2="86.4152" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"/>
                  <stop offset="100%"/>
                </linearGradient>
              </defs>
              <circle class="progress-ring__track" r="60" />
              <circle class="progress-ring__circle" r="60" style="stroke: url(#gradient3);"/>
            </svg>
            <span>00</span>
            <span>${this.stormPlayer.getPlayerConfig().getTimeMinutesText()}</span>
          </div>
          <div class="counter" id="secondCounter">
            <svg
                class="progress-ring"
                width="128"
                height="128">
              <defs>
                <linearGradient id="gradient4" x1="2" y1="2" x2="-30.4812" y2="86.4152" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"/>
                  <stop offset="100%"/>
                </linearGradient>
              </defs>
             <circle class="progress-ring__track" r="60" />
             <circle class="progress-ring__circle" r="60" style="stroke: url(#gradient4);" />
            </svg>
            <span id="timeSeconds">00</span>
            <span>${this.stormPlayer.getPlayerConfig().getTimeSecondsText()}</span>
          </div>
        </div>
          <span class="video-start">${this.stormPlayer.getPlayerConfig().getBroadcastStartTimeText()+" "} <span id="videoStartDate" class="video-start-date">11.2.2023 16:00</span></span>
        </div>
      </div>
      `;

    }

    /**
     * Attaches listeners to the element
     * @protected
     */
    protected override attachListeners(): void {

        let that:WaitingRoom = this;

        this.stormPlayer.addEventListener("waitingRoomCreated", function () {
            // nothing
        });

        this.stormPlayer.addEventListener("waitingRoomEnded", function () {
            that.stormPlayer.setLibraryManager();
            that.stormPlayer.getMainElement().createPlayer();
            that.stormPlayer.dispatchEvent("interfaceReady", {ref:that.stormPlayer});
            that.stormPlayer.setTitle(that.stormPlayer.getPlayerConfig().getTitle());
            that.stormPlayer.setSubtitle(that.stormPlayer.getPlayerConfig().getSubtitle());
        });

    }

    private parseDate(input:string):Date {
        const [date, time] = input.split(' ');
        const [year, month, day] = date.split('-').map(str => parseInt(str, 10));
        const [hour, minute, second] = time.split(':').map(str => parseInt(str, 10));
        return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    }

}
