import React, {useEffect} from 'react';
import Unity from 'react-unity-webgl';
import {unity, unityContext} from '@app/pages/Viewer/unity/api';
import {useRecoilState} from 'recoil';
import {playerStateAtom, unityStateAtom, useUnityFeaturesState} from '@app/pages/Viewer/unity/atoms';
import {log} from '@app/utils/debug';
import {useUnityFeature, useUnityFeatures} from '@app/pages/Viewer/unity/features';
import {UnityFeatures} from '@app/pages/Viewer/unity/types';
import {enumKeys} from '@app/utils';

const DEFINES: {readonly [key in string]: boolean} = {
    AUTO_START_MANUAL: true,
    UNLOAD_MODEL_BEFORE_MANUAL: false
};

export function useUnityState() {
    const [unityState] = useRecoilState(unityStateAtom);

    return unityState;
}

function useUnityPlayerController() {
    const [state, setState] = useRecoilState(playerStateAtom);

    useEffect(() => {
        unity.onManualReady(() => {
            setTimeout(() => {
                setState(oldState => ({...oldState, isReady: true}));
            }, 250);
        });

    }, [])

    useEffect(() => {
        if (state.isReady) {
            unity.play(state.isPlaying);
        }
    }, [state.isReady, state.isPlaying]);


    useEffect(() => {
        if (state.isReady && state.position) {
            unity.gotoChapter(state.position.chapter.toString());
            unity.gotoStep(state.position.step.toString());

            if (DEFINES.AUTO_START_MANUAL) {
                setState(oldState => ({...oldState, isPlaying: true}));
                unity.play(true);
            }
        }
    }, [state.isReady, state.position]);
}

function useUnityController(model?: string) {
    const [unityState, setUnityState] = useRecoilState(unityStateAtom);

    useEffect(function () {
        unity.onViewerReady(() => {
            setUnityState(oldState => ({...oldState, isReady: true}));
        });

        unity.onProgress(() => {
        });

        unity.onLoadingStarted(() => {
            setUnityState(oldState => ({
                ...oldState,
                loading: {state: 'progress', progress: 0}
            }));
        });

        unity.onLoadingProgress((progress) => {
            setUnityState(oldState => ({
                ...oldState,
                loading: {state: 'progress', progress: progress}
            }));
        });

        unity.onLoadingCompleted( () => {
            setUnityState(oldState => ({
                ...oldState,
                loading: {state: 'loaded', progress: 100},
            }));
        });

        unity.onManualText((...args) => {
        });

    }, []);

    useEffect(() => {
        if (unityState.loading.state === 'progress') {
            return;
        }

        log.Info('[unity state]', model, unityState);
        //model has been changed
        if (unityState.isReady && (model !== unityState.model)) {
            if (unityState.model) {
                unity.unloadAllContent();
            }

            setUnityState(oldState => ({
                ...oldState,
                model: model,
                loading: {state: 'empty', progress: 0}
            }));

            if (model) {
                unity.LoadPackage(model);
            }
        }
    }, [unityState.loading.state, unityState.isReady, unityState.model, model]);
}

export const UnityCanvas: React.FC<{
    readonly model?: string;
}> = ({model}) => {
    useUnityController(model);
    useUnityPlayerController();

    const features = useUnityFeatures();

    //disable all features on model change
    useEffect(() => {
        enumKeys(UnityFeatures).map(item => {
            if (features.getIsActive(UnityFeatures[item])) {
                features.setIsActive(UnityFeatures[item], false)
            }
        })

    }, [model]);

    return (
        <Unity
            className='unity'
            unityContext={unityContext}
        />
    );
};


