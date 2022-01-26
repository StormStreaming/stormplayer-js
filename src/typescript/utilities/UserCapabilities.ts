/**
 * Class for detecting user device, browser, etc.
 */
export class UserCapabilities {

    /**
     * Returns true or false depending on availability of WebSockets
     */
    public static hasWebSocketsSupport(): boolean {
        return (window.WebSocket != null);
    }

    /**
     * Returns true if user is using a mobile browser
     */
    public static isMobile(): boolean {
        return /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(navigator.userAgent);
    }

    /**
     * Returns true if cookies are enabled for this browser/device
     */
    public static isCookieEnabled(): boolean {

        let cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
            document.cookie = 'testcookie';
            cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
        }

        return cookieEnabled;

    }

    /**
     * Returns an OS Version
     */
    public static getOSVersion(): string {

        let osVersion: string | null = "Unknown version"
        let os: string = UserCapabilities.getOS();

        if (os != null) {
            if (/Windows/.test(os)) {
                // @ts-ignore
                osVersion = (/Windows (.*)/.exec(os)[1] != null) ? /Windows (.*)/.exec(os)[1] : osVersion;
                // @ts-ignore
                os = 'Windows';
            }

            switch (os) {
                case 'Mac OS':
                case 'Mac OS X':
                case 'Android':
                    // @ts-ignore
                    osVersion = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(navigator.userAgent)[1];
                    break;

                case 'iOS':
                    // @ts-ignore
                    osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(navigator.userAgent);
                    // @ts-ignore
                    osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                    break;
            }
        }

        return osVersion;

    }

    /**
     * Returns a browser name
     */
    public static getBrowserName(): string {
        return UserCapabilities.getFullBrowser().name;
    }

    /**
     * Returns a browser version
     */
    public static getBrowserVersion(): number {
        return UserCapabilities.getFullBrowser().version
    }

    /**
     * Returns a full browser name
     */
    public static getFullBrowser(): { name: string, fullVersion: string, version: number } {

        //browser
        let nAgt: string = navigator.userAgent;
        let browser: string = navigator.appName;
        let version: string = '' + parseFloat(navigator.appVersion);
        let majorVersion: number = parseInt(navigator.appVersion, 10);
        let nameOffset: number, verOffset: number, ix: number;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        } else if ((browser == 'Netscape') && (nAgt.indexOf('Trident/') != -1)) {

            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
            if ((verOffset = nAgt.indexOf('rv:')) != -1) {
                version = nAgt.substring(verOffset + 3);
            }

        }

        // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browser = 'Chrome';
            if(nAgt.indexOf("FBAV") > -1 || nAgt.indexOf("FBAN") >-1)
                browser = 'Facebook';

            if(nAgt.indexOf("OPR") > -1)
                browser = 'Opera';

            if(nAgt.indexOf("SamsungBrowser") > -1)
                browser = 'Samsung';

            version = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }

            // Chrome on iPad identifies itself as Safari. Actual results do not match what Google claims
            //  at: https://developers.google.com/chrome/mobile/docs/user-agent?hl=ja
            //  No mention of chrome in the user agent string. However it does mention CriOS, which presumably
            //  can be keyed on to detect it.
            if (nAgt.indexOf('CriOS') != -1) {
                //Chrome on iPad spoofing Safari...correct it.
                browser = 'Chrome';
                //Don't believe there is a way to grab the accurate version number, so leaving that for now.
            }

            if(nAgt.indexOf('FxiOS') != -1){
                browser = "Firefox";
            }

        }
        // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() == browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }

        // trim the version string
        if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        return {"name": browser, "fullVersion": version, "version": majorVersion};

    }

    /**
     * Returns Operating System name
     */
    public static getOS(): string {

        let os: string = "Unknown OS";

        let oscodes: { os: string, code: RegExp }[] = [
            {"os": 'Windows 10', "code": /(Windows 10.0|Windows NT 10.0)/},
            {"os": 'Windows 8.1', "code": /(Windows 8.1|Windows NT 6.3)/},
            {"os": 'Windows 8', "code": /(Windows 8|Windows NT 6.2)/},
            {"os": 'Windows 7', "code": /(Windows 7|Windows NT 6.1)/},
            {"os": 'Windows Vista', "code": /Windows NT 6.0/},
            {"os": 'Windows Server 2003', "code": /Windows NT 5.2/},
            {"os": 'Windows XP', "code": /(Windows NT 5.1|Windows XP)/},
            {"os": 'Windows 2000', "code": /(Windows NT 5.0|Windows 2000)/},
            {"os": 'Windows ME', "code": /(Win 9x 4.90|Windows ME)/},
            {"os": 'Windows 98', "code": /(Windows 98|Win98)/},
            {"os": 'Windows 95', "code": /(Windows 95|Win95|Windows_95)/},
            {"os": 'Windows NT 4.0', "code": /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
            {"os": 'Windows CE', "code": /Windows CE/},
            {"os": 'Windows 3.11', "code": /Win16/},
            {"os": 'Android', "code": /Android/},
            {"os": 'Open BSD', "code": /OpenBSD/},
            {"os": 'Sun OS', "code": /SunOS/},
            {"os": 'Chrome OS', "code": /CrOS/},
            {"os": 'Linux', "code": /(Linux|X11(?!.*CrOS))/},
            {"os": 'iOS', "code": /(iPhone|iPad|iPod)/},
            {"os": 'Mac OS X', "code": /Mac OS X/},
            {"os": 'Mac OS', "code": /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
            {"os": 'QNX', "code": /QNX/},
            {"os": 'UNIX', "code": /UNIX/},
            {"os": 'BeOS', "code": /BeOS/},
            {"os": 'OS/2', "code": /OS\/2/},
            {
                "os": 'Search Bot',
                "code": /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
            }
        ];

        for (var id in oscodes) {
            var cs: { os: string, code: RegExp } = oscodes[id];
            if (cs.code.test(navigator.userAgent)) {
                os = cs.os;
                break;
            }
        }

        return os;

    }

    /**
     * Returns true whenever device supports WebRTC
     */
    public static hasWebRTCSupport():boolean {

        //if(this.getBrowserName() == "Facebook" && this.getOS() == "Android")
            //return false;

        let isSupported:boolean = false;

        try {
            // @ts-ignore
            let webrtc = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || window.RTCPeerConnection;
            isSupported = true;
        } catch(error){
            isSupported = false;
        }

        return isSupported;

    }

    /**
     * Checks whenever player support "out-of-box" HLS (mobile browsers mostly do)
     * @param videoObject html element video
     */
    public static hasHLSSupport(videoObject: HTMLVideoElement | null): boolean {

        //if(this.getBrowserName() == "Facebook" && this.getOS() == "Android")
            //return false;

        if (videoObject !== null) {
            return Boolean(videoObject.canPlayType('application/vnd.apple.mpegURL') || videoObject.canPlayType('audio/mpegurl'))
        } else
            return false;
    }

    /**
     * Returns true or false depending on availability of Media Source Extensions (MSE)
     */
    public static hasMSESupport(): boolean {

        //if(this.getBrowserName() == "Facebook" && this.getOS() == "Android")
            //return false;

        // @ts-ignore
        const mediaSource = window.MediaSource = window.MediaSource || window.WebKitMediaSource;
        // @ts-ignore
        const sourceBuffer = window.SourceBuffer = window.SourceBuffer || window.WebKitSourceBuffer;

        return mediaSource && typeof mediaSource.isTypeSupported === 'function';
    }

    /**
     * Returns true whenever user is connected via HTTPS
     */
    public static isSSL():boolean {
        if (location.protocol === 'https:')
            return true;
        else
            return false;
    }

}

