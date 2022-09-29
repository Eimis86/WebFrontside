import {UnityContext} from 'react-unity-webgl';
import {log} from '@app/utils/debug';
import {CONST} from '@app/const';
import {UnityFeatures} from '@app/pages/Viewer/unity/types';

declare global {
    interface Window {
        unityContext: UnityContext;
    }
}

export const unityContext = new UnityContext({
    loaderUrl: `${CONST.UNITY_BASE_PATH}/${CONST.UNITY_VERSION}/CloydModule.loader.js`,
    dataUrl: `${CONST.UNITY_BASE_PATH}/${CONST.UNITY_VERSION}/CloydModule.data.unityweb`,
    frameworkUrl: `${CONST.UNITY_BASE_PATH}/${CONST.UNITY_VERSION}/CloydModule.framework.js.unityweb`,
    codeUrl: `${CONST.UNITY_BASE_PATH}/${CONST.UNITY_VERSION}/CloydModule.wasm.unityweb`,
});

window.unityContext = unityContext;



function unityAPI(fn: string, ...params: (string | boolean)[]) {
    log.Info('[UNITY CALL]', fn, ...params);

    unityContext.send('API', fn, ...params);
}

function subscribe(event: string, callback: (...args: any[]) => void, doLog = true) {
    unityContext.on(event, (...args: any[]) => {
        doLog && log.Info('[UNITY EVENT]', event, ...args);

        callback(...args);
    });
}

function setFeature(feature: UnityFeatures, state: boolean) {
    unityAPI(state ? 'EnableFeature' : 'DisableFeature', feature);
}

function unloadAllContent() {
    unityAPI('UnloadAllContent');
}

function gotoChapter(chapter: string) {
    unityAPI('GotoChapter', chapter);
}

function gotoStep(step: string) {
    unityAPI('GotoStep', step);
}

function play(state: boolean) {
    unityAPI('Play', state ? '1' :  '0');
}

function LoadPackage(model: string) {
    unityAPI('LoadPackage', model);
}


function onViewerReady(fn: () => void) {
    subscribe('ViewerReady', () => fn());
}

function onManualText(fn: () => void) {
    subscribe('ManualText', fn);
}

function onManualReady(fn: () => void) {
    subscribe('ManualReady', fn);
}

function onProgress(fn: () => void) {
    subscribe('progress', fn, false);
}

function onLoadingStarted(fn: () => void) {
    subscribe('LoadingStarted', fn);
}

function onLoadingProgress(fn: (progress: number) => void) {
    subscribe('LoadingProgress', fn, false);
}

function onLoadingCompleted(fn: () => void) {
    subscribe('LoadingCompleted', fn);
}

export const unity = {
    //api
    setFeature,
    unloadAllContent,
    gotoChapter,
    gotoStep,
    play,
    LoadPackage,

    //events
    onViewerReady,
    onManualText,
    onManualReady,
    onProgress,
    onLoadingStarted,
    onLoadingProgress,
    onLoadingCompleted
};
