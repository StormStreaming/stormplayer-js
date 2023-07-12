import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {EventType} from "@app/typescript/events/EventType";

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
        this.getHtmlElement().querySelector('#videoStartDate').innerHTML = this.stormPlayer.getGuiConfig().getBroadcastStartDate();
        this.getHtmlElement().style.backgroundImage="url("+this.stormPlayer.getOrigGUIConfig().waitingRoom.posterURL+")";
    }

    public setTime(): void {
        let that:WaitingRoom = this;
        let nowToStart:number, createToStart:number, days:number, hours:number, minutes:number, seconds:number;

        const countdown = setInterval( function () {

            nowToStart = new Date(that.stormPlayer.getGuiConfig().getBroadcastStartDate()).getTime();
            createToStart = new Date(that.stormPlayer.getGuiConfig().getBroadcastCreateDate()).getTime();

            nowToStart = nowToStart-createToStart;

            days = Math.floor(nowToStart / (1000 * 60 * 60 * 24));
            hours = Math.floor(nowToStart / (1000 * 60 * 60) % 24);
            minutes = Math.floor((nowToStart/1000/60) % 60 );
            seconds = Math.floor((nowToStart/1000) % 60);

            if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
                clearInterval(countdown);
                setTimeout(() => {
                    that.stormPlayer.dispatch(EventType.WAITING_ROOM_ENDED);
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
        <span class="title">${this.stormPlayer.getGuiConfig().getBroadcastRemainingTimeText()}</span>
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
            <span>${this.stormPlayer.getGuiConfig().getTimeDaysText()}</span>
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
            <span>${this.stormPlayer.getGuiConfig().getTimeHoursText()}</span>
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
            <span>${this.stormPlayer.getGuiConfig().getTimeMinutesText()}</span>
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
            <span>${this.stormPlayer.getGuiConfig().getTimeSecondsText()}</span>
          </div>
        </div>
        <span class="video-start">${this.stormPlayer.getGuiConfig().getBroadcastStartTimeText()+" "} <span id="videoStartDate" class="video-start-date">11.2.2023 16:00</span></span>
      </div>
      `;

    }

    /**
     * Attaches listeners to the element
     * @protected
     */
    protected override attachListeners(): void {

        let that:WaitingRoom = this;

        this.stormPlayer.addEventListener(EventType.WAITING_ROOM_CREATED, function () {

        });

        this.stormPlayer.addEventListener(EventType.WAITING_ROOM_ENDED, function () {
            that.stormPlayer.setLibraryManager();
            that.stormPlayer.getMainElement().createPlayer();
            that.stormPlayer.dispatch(EventType.GUI_INITIALIZED);
            that.stormPlayer.setTitle(that.stormPlayer.getGuiConfig().getTitle());
            that.stormPlayer.setSubtitle(that.stormPlayer.getGuiConfig().getSubtitle());
        });

    }
}
