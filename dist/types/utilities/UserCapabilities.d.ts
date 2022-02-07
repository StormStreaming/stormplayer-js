export declare class UserCapabilities {
    static hasWebSocketsSupport(): boolean;
    static isMobile(): boolean;
    static isCookieEnabled(): boolean;
    static getOSVersion(): string;
    static getBrowserName(): string;
    static getBrowserVersion(): number;
    static getFullBrowser(): {
        name: string;
        fullVersion: string;
        version: number;
    };
    static getOS(): string;
    static hasWebRTCSupport(): boolean;
    static hasHLSSupport(videoObject: HTMLVideoElement | null): boolean;
    static hasMSESupport(): boolean;
    static isSSL(): boolean;
}
