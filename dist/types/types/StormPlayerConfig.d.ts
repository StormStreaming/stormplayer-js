export type StormPlayerConfig = {
    containerID: string;
    width: number;
    height: number;
    title: string;
    subtitle: string;
    unmuteText: string;
    demoMode: boolean;
    translations: {
        broadcastRemainingTime: string;
        broadcastStartTime: string;
        timeDays: string;
        timeHours: string;
        timeMinutes: string;
        timeSeconds: string;
    };
    waitingRoom: {
        createDate: string;
        startDate: string;
        posterURL: string;
    };
    watermark: {
        imgURL: string;
        position: string;
    };
    style: {
        progressBar: {
            gradientColor1: string;
            gradientColor2: string;
        };
        cuePoint: {
            gradientColor1: string;
            gradientColor2: string;
        };
        unmuteLabel: {
            backgroundColor: string;
            fontColor: string;
        };
        icons: {
            primaryColor: string;
            secondaryColor: string;
            activeColor: string;
            errorColor: string;
        };
        backgroundColor: string;
        text: {
            titleColor: string;
            descColor: string;
            errorColor: string;
        };
    };
};
