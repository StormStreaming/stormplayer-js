import {StormTimeZone} from "@app/typescript/utilities/StormTimeZone";

/**
 * Declaration for Player GUI Config
 */
export type StormPlayerConfig = {
  containerID: string;
  settings?: {
    autoStart?: boolean;
  }
  width?: number | string;
  height?: number | string;
  aspectRatio?:string;
  title?:string;
  subtitle?:string;
  demoMode?:boolean;
  posterURL?:string;
  translations?: {
    broadcastRemainingTime?: string,
    broadcastStartTime?: string,
    awaitingStart?:string,
    timeDays?:string,
    timeHours?:string,
    timeMinutes?:string,
    timeSeconds?:string
    disconnected?:string;
    connectionFailed?:string;
    compatibilityError?:string;
    noSSLError?:string;
    streamError?:string;
    streamNotFound?:string;
    streamStop?:string;
    live?:string;
    unmute?:string;
  },
  waitingRoom?: {
    createTime:string,
    startTime: string,
    timeZone:StormTimeZone,
    posterURL?: string
  },
  interface?:{
    showBigPlayBTN?:boolean;
    showTimeline?:boolean;
    autoGUIHide?:boolean;
    autoGUIHideTime?:number;
    nativeMobileGUI?:boolean;
  }
  style?: {
    loaderColor?:string,
    progressBar?: {
      gradientColor1?: string,
      gradientColor2?: string
    },
    cuePoint?: {
      gradientColor1?: string,
      gradientColor2?: string
    },
    unmuteLabel?: {
      backgroundColor?: string,
      primaryColor?: string
    },
    icons?: {
      primaryColor?: string,
      secondaryColor?: string,
      activeColor?: string,
      errorColor?: string
    },
    waitingRoomRings?: {
      gradientColor1?: string,
      gradientColor2?: string
    },
    backgroundColor?: string,
    borderRadius?:string,
    text?: {
      titleColor?: string,
      subtitleColor?: string,
      errorColor?: string,
    },
    font?: {
      fontRegular?:string,
      fontBold?:string,
    }
    watermark?: {
      imgURL?: string,
      position?: string
    },
  }
};
