import crypto from 'crypto';
import fs from 'fs';
import Utility from './Utility.js'

const fingerprints = fs.readFileSync('./assets/fps.txt', 'utf-8')
    .split('\n')
    .map(line => {
        const [unmaskedRenderer, unmaskedVendor] = line.trim().split('|');
        return { unmaskedRenderer, unmaskedVendor }
    });

class XalUtility {
    static randomMd5Hash() {
        return crypto.createHash('md5').update(crypto.randomBytes(16)).digest('hex');
    }

    static randomTValues(total, min, max) {
        return Array.from({ length: total }, () => ({
            t: Utility.randomBetween(min, max)
        }));
    }

    static randomCoordValues(total, tRange, xRange, yRange) {
        return Array.from({ length: total }, () => ({
            t: Utility.randomBetween(tRange[0], tRange[1]),
            x: Utility.randomBetween(xRange[0], xRange[1]),
            y: Utility.randomBetween(yRange[0], yRange[1])
        }));
    }

    static RC4Cipher(a) {
        const Kb = 'FZMÛSê/·V«xÞhí¢³4<`ô2ª,µ¦Yû';

        var b;
        var c = unescape(encodeURIComponent(JSON.stringify(a)));
        var d = [];
        var e = 0;
        var f = '';

        for (var g = 0; g < 256; g++) {
            d[g] = g;
        }

        for (var h = 0; h < 256; h++) {
            e = (e + d[h] + Kb.charCodeAt(h % Kb.length)) % 256;
            b = d[h];
            d[h] = d[e];
            d[e] = b;
        }

        var j = 0;
        e = 0;

        for (var l = 0; l < c.length; l++) {
            e = (e + d[j = (j + 1) % 256]) % 256;
            b = d[j];
            d[j] = d[e];
            d[e] = b;
            f += String.fromCharCode(c.charCodeAt(l) ^ d[(d[j] + d[e]) % 256]);
        }

        return Buffer.from(f).toString('base64');
    }
}

class Xal {
    static createFingerprint() {
        const web_gl = fingerprints[Math.floor(Math.random() * fingerprints.length)];
        const fp = {
            fingerprint_version: 42,
            timestamp: new Date().toISOString(),
            math_rand: Utility.randomString(13),
            webasm: true,
            document: {
                title: 'Register for an Epic Games account | Epic Games',
                referrer: 'https://store.epicgames.com/'
            },
            navigator: {
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
                platform: 'Win32',
                language: 'en-GB',
                languages: [
                    'en-GB'
                ],
                hardware_concurrency: 3,
                device_memory: 1,
                product: 'Gecko',
                product_sub: '20030107',
                vendor: 'Google Inc.',
                vendor_sub: '',
                webdriver: false,
                max_touch_points: 0,
                cookie_enabled: true,
                property_list: [
                    'vendorSub', 'productSub', 'vendor', 'maxTouchPoints', 'scheduling', 'userActivation', 'doNotTrack', 'geolocation', 'plugins', 'mimeTypes',
                    'pdfViewerEnabled', 'webkitTemporaryStorage', 'webkitPersistentStorage', 'brave', 'globalPrivacyControl', 'windowControlsOverlay',
                    'hardwareConcurrency', 'cookieEnabled', 'appCodeName', 'appName', 'appVersion', 'platform', 'product', 'userAgent', 'language',
                    'languages', 'onLine', 'getGamepads', 'javaEnabled', 'sendBeacon', 'vibrate', 'bluetooth', 'storageBuckets', 'clipboard',
                    'credentials', 'keyboard', 'managed', 'mediaDevices', 'storage', 'serviceWorker', 'virtualKeyboard', 'wakeLock', 'deviceMemory',
                    'userAgentData', 'ink', 'mediaCapabilities', 'hid', 'locks', 'gpu', 'mediaSession', 'permissions', 'presentation', 'usb', 'xr',
                    'canShare', 'share', 'clearAppBadge', 'getBattery', 'getUserMedia', 'requestMIDIAccess', 'requestMediaKeySystemAccess', 'setAppBadge',
                    'webkitGetUserMedia', 'getInstalledRelatedApps', 'registerProtocolHandler', 'unregisterProtocolHandler'
                ]
            },
            web_gl: {
                canvas_fingerprint: {
                    length: 32214,
                    num_colors: 4426,
                    md5: XalUtility.randomMd5Hash(),
                    tlsh: Utility.randomString(70).toUpperCase()
                },
                parameters: {
                    renderer: web_gl.unmaskedRenderer,
                    vendor: web_gl.unmaskedVendor
                }
            },
            window: {
                location: {
                    origin: 'https://www.epicgames.com',
                    pathname: '/id/register/epic',
                    href: 'https://www.epicgames.com/id/register/epic?lang=en-US&redirect_uri=https%3A%2F%2Fstore.epicgames.com%2Fen-US%2F&client_id=875a3b57d3a640a6b7f9b4e883463ab4'
                },
                history: {
                    length: 3
                },
                screen: {
                    avail_height: 1032,
                    avail_width: 1920,
                    avail_top: 0,
                    height: 1080,
                    width: 1920,
                    color_depth: 24
                },
                performance: {
                    memory: {
                        js_heap_size_limit: Utility.randomBetween(1234567899, 999999999),
                        total_js_heap_size: Utility.randomBetween(1234567899, 999999999),
                        used_js_heap_size: Utility.randomBetween(1234567899, 999999999)
                    },
                    resources: [
                        'https://static-assets-prod.unrealengine.com/account-portal/static/static/css/main.c19873d8.css',
                        'https://static-assets-prod.unrealengine.com/account-portal/static/static/js/main.1f766214.js',
                        'https://tracking.epicgames.com/tracking.js',
                        'https://static-assets-prod.unrealengine.com/account-portal/static/static/js/7947.50df8dbf.chunk.js',
                        'https://static-assets-prod.unrealengine.com/account-portal/static/static/css/polyfills.fdeb4d23.chunk.css',
                        'https://static-assets-prod.unrealengine.com/account-portal/static/static/js/polyfills.7de817c8.chunk.js',
                        'https://www.epicgames.com/id/api/reputation',
                        'https://www.epicgames.com/id/api/i18n?ns=messages&lang=en-US',
                        'https://www.epicgames.com/id/api/i18n?ns=epic-consent-dialog&lang=en-US',
                        'https://sentry.io/api/1333512/envelope/?sentry_key=7a13b97c16f4455f92376d5c1e27f102&sentry_version=7&sentry_client=sentry.javascript.react%2F7.106.1',
                        'https://www.epicgames.com/id/api/location',
                        'https://tracking.epicgames.com/track.png?referringUrl=https%3A%2F%2Fstore.epicgames.com%2F&location=https%3A%2F%2Fwww.epicgames.com%2Fid%2Flogin%3Flang%3Den-US%26noHostRedirect%3Dtrue%26redirectUrl%3Dhttps%253A%252F%252Fstore.epicgames.com%252Fen-US%252F%26client_id%3D875a3b57d3a640a6b7f9b4e883463ab4&now=1716219525913&eventType=pageView',
                        'https://www.epicgames.com/id/api/analytics',
                        'https://www.epicgames.com/id/api/analytics',
                        'https://www.epicgames.com/id/api/client/875a3b57d3a640a6b7f9b4e883463ab4?redirectUrl=https%3A%2F%2Fstore.epicgames.com%2Fen-US%2F',
                        'https://www.epicgames.com/id/api/analytics',
                        'https://www.epicgames.com/id/api/authenticate',
                        'https://static-assets-prod.unrealengine.com/account-portal/static/manifest.json',
                        'https://static-assets-prod.unrealengine.com/account-portal/static/epic-favicon-96x96.png',
                        'https://www.epicgames.com/id/api/analytics',
                        'https://www.epicgames.com/id/api/analytics',
                        'https://static-assets-prod.unrealengine.com/account-portal/static/static/js/2893.1b7db46f.chunk.js',
                        'https://static-assets-prod.unrealengine.com/account-portal/static/static/js/8903.1a87d99d.chunk.js',
                        'https://static-assets-prod.unrealengine.com/account-portal/static/static/js/9896.6f646c07.chunk.js',
                        'https://talon-website-prod.ecosec.on.epicgames.com/talon_sdk.js',
                        'https://talon-service-prod.ecosec.on.epicgames.com/v1/init',
                        'https://js.hcaptcha.com/1/api.js?onload=hCaptchaLoaded&render=explicit',
                        'https://newassets.hcaptcha.com/captcha/v1/7329d5a/static/hcaptcha.html#frame=challenge&id=0p4tqxdcb1p&host=www.epicgames.com&sentry=true&reportapi=https%3A%2F%2Faccounts.hcaptcha.com&recaptchacompat=true&custom=false&hl=en&tplinks=on&pstissuer=https%3A%2F%2Fpst-issuer.hcaptcha.com&sitekey=5928de2d-2800-4c58-be91-060e5a6aa117&theme=dark&size=invisible&challenge-container=h_captcha_challenge_email_exists_prod&origin=https%3A%2F%2Fwww.epicgames.com',
                        'https://sentry.io/api/1333512/envelope/?sentry_key=7a13b97c16f4455f92376d5c1e27f102&sentry_version=7&sentry_client=sentry.javascript.react%2F7.106.1',
                        'https://talon-service-prod.ecosec.on.epicgames.com/v1/phaser/batch',
                        'https://api.hcaptcha.com/',
                        'https://talon-service-prod.ecosec.on.epicgames.com/v1/init/execute',
                        'https://api.hcaptcha.com/',
                        'https://www.epicgames.com/id/api/email/exists',
                        'https://talon-service-prod.ecosec.on.epicgames.com/v1/phaser/batch',
                        'https://static-assets-prod.unrealengine.com/account-portal/static/static/js/2990.911f29c6.chunk.js',
                        'https://tracking.epicgames.com/track.png?referringUrl=https%3A%2F%2Fstore.epicgames.com%2F&location=https%3A%2F%2Fwww.epicgames.com%2Fid%2Fregister%2Fepic%3Flang%3Den-US%26redirect_uri%3Dhttps%253A%252F%252Fstore.epicgames.com%252Fen-US%252F%26client_id%3D875a3b57d3a640a6b7f9b4e883463ab4&now=1716219553327&eventType=pageView',
                        'https://www.epicgames.com/id/api/analytics',
                        'https://www.epicgames.com/id/api/client/875a3b57d3a640a6b7f9b4e883463ab4?redirectUrl=https%3A%2F%2Fstore.epicgames.com%2Fen-US%2F',
                        'https://www.epicgames.com/id/api/analytics',
                        'https://www.epicgames.com/id/api/analytics',
                        'https://www.epicgames.com/id/api/age-gate',
                        'https://static-assets-prod.unrealengine.com/account-portal/static/static/js/6855.67b6d7e9.chunk.js',
                        'https://sentry.io/api/1333512/envelope/?sentry_key=7a13b97c16f4455f92376d5c1e27f102&sentry_version=7&sentry_client=sentry.javascript.react%2F7.106.1',
                        'https://sentry.io/api/1333512/envelope/?sentry_key=7a13b97c16f4455f92376d5c1e27f102&sentry_version=7&sentry_client=sentry.javascript.react%2F7.106.1',
                        'https://tracking.epicgames.com/track.png?referringUrl=https%3A%2F%2Fstore.epicgames.com%2F&location=https%3A%2F%2Fwww.epicgames.com%2Fid%2Fregister%2Fdate-of-birth%3Flang%3Den-US%26redirect_uri%3Dhttps%253A%252F%252Fstore.epicgames.com%252Fen-US%252F%26client_id%3D875a3b57d3a640a6b7f9b4e883463ab4&now=1716219553766&eventType=pageView',
                        'https://www.epicgames.com/id/api/analytics',
                        'https://www.epicgames.com/id/api/client/875a3b57d3a640a6b7f9b4e883463ab4?redirectUrl=https%3A%2F%2Fstore.epicgames.com%2Fen-US%2F',
                        'https://www.epicgames.com/id/api/analytics',
                        'https://www.epicgames.com/id/api/analytics',
                        'https://www.epicgames.com/id/api/analytics',
                        'https://sentry.io/api/1333512/envelope/?sentry_key=7a13b97c16f4455f92376d5c1e27f102&sentry_version=7&sentry_client=sentry.javascript.react%2F7.106.1',
                        'https://sentry.io/api/1333512/envelope/?sentry_key=7a13b97c16f4455f92376d5c1e27f102&sentry_version=7&sentry_client=sentry.javascript.react%2F7.106.1',
                        'https://tracking.epicgames.com/track.png?referringUrl=https%3A%2F%2Fstore.epicgames.com%2F&location=https%3A%2F%2Fwww.epicgames.com%2Fid%2Fregister%2Fepic%3Flang%3Den-US%26redirect_uri%3Dhttps%253A%252F%252Fstore.epicgames.com%252Fen-US%252F%26client_id%3D875a3b57d3a640a6b7f9b4e883463ab4&now=1716219568831&eventType=pageView',
                        'https://www.epicgames.com/id/api/analytics',
                        'https://www.epicgames.com/id/api/client/875a3b57d3a640a6b7f9b4e883463ab4?redirectUrl=https%3A%2F%2Fstore.epicgames.com%2Fen-US%2F',
                        'https://www.epicgames.com/id/api/analytics',
                        'https://www.epicgames.com/id/api/analytics',
                        'https://talon-service-prod.ecosec.on.epicgames.com/v1/init',
                        'https://talon-service-prod.ecosec.on.epicgames.com/v1/phaser/batch',
                        'https://newassets.hcaptcha.com/captcha/v1/7329d5a/static/hcaptcha.html#frame=challenge&id=1gt12pt0qjlq&host=www.epicgames.com&sentry=true&reportapi=https%3A%2F%2Faccounts.hcaptcha.com&recaptchacompat=true&custom=false&hl=en&tplinks=on&pstissuer=https%3A%2F%2Fpst-issuer.hcaptcha.com&sitekey=b364b1fd-e3d8-4d24-8c41-77a19604b00d&theme=dark&size=invisible&challenge-container=h_captcha_challenge_registration_prod&origin=https%3A%2F%2Fwww.epicgames.com',
                        'https://talon-service-prod.ecosec.on.epicgames.com/v1/phaser/batch',
                        'https://www.epicgames.com/id/api/account/displayName/validate',
                        'https://api.hcaptcha.com/',
                        'https://talon-service-prod.ecosec.on.epicgames.com/v1/init/execute'
                    ]
                },
                device_pixel_ratio: 1,
                dark_mode: true,
                chrome: true,
                property_list: [
                    '0', '1', '2', '3', '4', 'window', 'self', 'document', 'name', 'location', 'customElements', 'history', 'navigation',
                    'locationbar', 'menubar', 'personalbar', 'scrollbars', 'statusbar', 'toolbar', 'status', 'closed', 'frames', 'length',
                    'top', 'opener', 'parent', 'frameElement', 'navigator', 'origin', 'external', 'screen', 'innerWidth', 'innerHeight',
                    'scrollX', 'pageXOffset', 'scrollY', 'pageYOffset', 'visualViewport', 'screenX', 'screenY', 'outerWidth', 'outerHeight',
                    'devicePixelRatio', 'clientInformation', 'screenLeft', 'screenTop', 'styleMedia', 'onsearch', 'isSecureContext', 'trustedTypes',
                    'performance', 'onappinstalled', 'onbeforeinstallprompt', 'crypto', 'indexedDB', 'sessionStorage', 'localStorage', 'onbeforexrselect',
                    'onabort', 'onbeforeinput', 'onbeforematch', 'onbeforetoggle', 'onblur', 'oncancel', 'oncanplay', 'oncanplaythrough', 'onchange',
                    'onclick', 'onclose', 'oncontentvisibilityautostatechange', 'oncontextlost', 'oncontextmenu', 'oncontextrestored', 'oncuechange',
                    'ondblclick', 'ondrag', 'ondragend', 'ondragenter', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop', 'ondurationchange',
                    'onemptied', 'onended', 'onerror', 'onfocus', 'onformdata', 'oninput', 'oninvalid', 'onkeydown', 'onkeypress', 'onkeyup', 'onload',
                    'onloadeddata', 'onloadedmetadata', 'onloadstart', 'onmousedown', 'onmouseenter', 'onmouseleave', 'onmousemove', 'onmouseout',
                    'onmouseover', 'onmouseup', 'onmousewheel', 'onpause', 'onplay', 'onplaying', 'onprogress', 'onratechange', 'onreset', 'onresize',
                    'onscroll', 'onsecuritypolicyviolation', 'onseeked', 'onseeking', 'onselect', 'onslotchange', 'onstalled', 'onsubmit', 'onsuspend',
                    'ontimeupdate', 'ontoggle', 'onvolumechange', 'onwaiting', 'onwebkitanimationend', 'onwebkitanimationiteration', 'onwebkitanimationstart',
                    'onwebkittransitionend', 'onwheel', 'onauxclick', 'ongotpointercapture', 'onlostpointercapture', 'onpointerdown', 'onpointermove',
                    'onpointerrawupdate', 'onpointerup', 'onpointercancel', 'onpointerover', 'onpointerout', 'onpointerenter', 'onpointerleave',
                    'onselectstart', 'onselectionchange', 'onanimationend', 'onanimationiteration', 'onanimationstart', 'ontransitionrun', 'ontransitionstart',
                    'ontransitionend', 'ontransitioncancel', 'onafterprint', 'onbeforeprint', 'onbeforeunload', 'onhashchange', 'onlanguagechange',
                    'onmessage', 'onmessageerror', 'onoffline', 'ononline', 'onpagehide', 'onpageshow', 'onpopstate', 'onrejectionhandled', 'onstorage',
                    'onunhandledrejection', 'onunload', 'crossOriginIsolated', 'scheduler', 'alert', 'atob', 'blur', 'btoa', 'cancelAnimationFrame',
                    'cancelIdleCallback', 'captureEvents', 'clearInterval', 'clearTimeout', 'close', 'confirm', 'createImageBitmap', 'fetch', 'find', 'focus',
                    'getComputedStyle', 'getSelection', 'matchMedia', 'moveBy', 'moveTo', 'open', 'postMessage', 'print', 'prompt', 'queueMicrotask',
                    'releaseEvents', 'reportError', 'requestAnimationFrame', 'requestIdleCallback', 'resizeBy', 'resizeTo', 'scroll', 'scrollBy', 'scrollTo',
                    'setInterval', 'setTimeout', 'stop', 'structuredClone', 'webkitCancelAnimationFrame', 'webkitRequestAnimationFrame', 'chrome', 'caches',
                    'cookieStore', 'ondevicemotion', 'ondeviceorientation', 'ondeviceorientationabsolute', 'launchQueue', 'documentPictureInPicture',
                    'getScreenDetails', 'queryLocalFonts', 'originAgentCluster', 'onpageswap', 'onpagereveal', 'credentialless', 'speechSynthesis', 'onscrollend',
                    'webkitRequestFileSystem', 'webkitResolveLocalFileSystemURL', 'solana', 'AppInit', '_epicEnableCookieGuard', '__tracking_base', '_sentryDebugIds',
                    'webpackChunkaccountportal_node_website', '__axiosInstance', 'regeneratorRuntime', '__core-js_shared__', 'core', '__axiosInstanceCached',
                    'IMask', '__store', '__SENTRY__', '_epicTrackingCookieDomainId', '_epicTrackingCountryCode', '_epicTracking', 'clearImmediate', 'setImmediate',
                    'recaptchaOptions', 'talon', 'hCaptchaLoaded', 'hCaptchaReady', 'Raven', 'hcaptcha', 'grecaptcha', 'k', 'i', 'TEMPORARY', 'PERSISTENT',
                    'addEventListener', 'dispatchEvent', 'removeEventListener'
                ]
            },
            date: {
                timezone_offset: -60, // Uk timezone offset
                format: {
                    calendar: 'gregory',
                    day: '2-digit',
                    locale: 'en-GB',
                    month: '2-digit',
                    numbering_system: 'latn',
                    time_zone: 'Europe/London',
                    year: 'numeric'
                }
            },
            runtime: {
                sd_recurse: false
            },
            fpjs: {
                version: '3.4.2',
                visitor_id: XalUtility.randomMd5Hash(),
                confidence: 0.7,
                hashes: {
                    fonts: XalUtility.randomMd5Hash(),
                    plugins: XalUtility.randomMd5Hash(),
                    audio: XalUtility.randomMd5Hash(),
                    canvas: XalUtility.randomMd5Hash(),
                    screen: XalUtility.randomMd5Hash()
                }
            },
            motion: {
                mousemove: XalUtility.randomCoordValues(15, [4000, 150000], [350, 600], [15, 300]),
                mousedown: XalUtility.randomCoordValues(2, [4000, 150000], [350, 600], [15, 300]),
                mouseup: XalUtility.randomCoordValues(16, [4000, 150000], [350, 600], [15, 300]),
                wheel: [],
                touchstart: [],
                touchend: [],
                touchmove: [],
                scroll: [],
                keydown: XalUtility.randomTValues(39, 7000, 9300),
                keyup: XalUtility.randomTValues(39, 7000, 9300),
                resize: [],
                paste: []
            },
            sdk: {
                caller_stack_trace: 'Error\n    at https://talon-website-prod.ecosec.on.epicgames.com/talon_sdk.js:7158:28\n    at Object.id [as execute] (https://talon-website-prod.ecosec.on.epicgames.com/talon_sdk.js:7162:14)\n    at Oe.updateIfNeeded (https://static-assets-prod.unrealengine.com/account-portal/static/static/js/main.1f766214.js:4:502453)\n    at Ie.updateIfNeeded (https://static-assets-prod.unrealengine.com/account-portal/static/static/js/main.1f766214.js:4:504387)\n    at submit (https://static-assets-prod.unrealengine.com/account-portal/static/static/js/main.1f766214.js:4:324980)\n    at Object.Me (https://static-assets-prod.unrealengine.com/account-portal/static/static/js/main.1f766214.js:4:1773749)\n    at Be (https://static-assets-prod.unrealengine.com/account-portal/static/static/js/main.1f766214.js:4:1773903)\n    at https://static-assets-prod.unrealengine.com/account-portal/static/static/js/main.1f766214.js:4:1793803\n    at jr (https://static-assets-prod.unrealengine.com/account-portal/static/static/js/main.1f766214.js:4:1793897)\n    at Ur (https://static-assets-prod.unrealengine.com/account-portal/static/static/js/main.1f766214.js:4:1794312)'
            },
            s: Utility.randomBetween(1234567899, 999999999),
            solve_token: true
        }

        return fp
    }

    static generate() {
        const sig = this.createFingerprint()
        return XalUtility.RC4Cipher(sig)
    }
}

export default Xal;