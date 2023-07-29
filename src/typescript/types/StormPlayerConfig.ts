/**
 * Declaration for Player GUI Config
 */
export type StormPlayerConfig = {
  containerID: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?:string;
  title?:string;
  subtitle?:string;
  demoMode?:boolean;
  translations?: {
    broadcastRemainingTime?: string,
    broadcastStartTime?: string,
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
    posterURL: string
  },
  watermark?: {
    imgURL: string,
    position: string
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
      fontColor?: string
    },
    icons?: {
      primaryColor?: string,
      secondaryColor?: string,
      activeColor?: string,
      errorColor?: string
    },
    backgroundColor?: string,
    text?: {
      titleColor?: string,
      subtitleColor?: string,
      errorColor?: string,
    },
  }
};
