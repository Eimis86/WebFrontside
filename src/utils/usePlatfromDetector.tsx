declare global {
    interface Window {
        readonly opera: string;
        readonly MSStream: boolean;
    }
}

function getMobileOperatingSystem() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
        return 'Android';
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'iOS';
    }

    return 'unknown';
}

//cloyd://connect?pin=1174
function openOnAndroid(path: string) {
    window.location.replace(`cloyd://connect?${path}`);

    setTimeout(
        () => window.location.replace('market://details?id=com.InlusionNetforms.CLOYD_Inlusion'),
        250
    );
}

function openOnIOS(path: string) {
    window.location.replace(`cloyd://${path}`);

    setTimeout(
        () => window.location.replace('https://apps.apple.com/us/app/cloyd'),
        250
    );
}

export function isMobileOS() {
    const os = getMobileOperatingSystem();

    return os === 'iOS' || os === 'Android';
}

export function redirectToMobileApp(path: string) {
    const os = getMobileOperatingSystem();

    switch (os) {
        case 'Android':
            openOnAndroid(path);
            break;
        case 'iOS':
            openOnIOS(path);
            break;
        // default: window.location.replace(path);
    }
}
