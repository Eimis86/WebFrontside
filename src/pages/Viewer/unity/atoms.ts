import {atom, useRecoilState} from 'recoil';
import {FeaturesState, PlayerState, UnityState, UnityFeatures} from '@app/pages/Viewer/unity/types';

export const unityStateAtom = atom<UnityState>({
    key: 'unityState',
    default: {
        model: undefined,
        isReady: false,
        loading: {
            state: 'empty',
            progress: 0
        }
    }
});

export const unityFeaturesAtom = atom<FeaturesState>({
    key: 'unityFeaturesAtom',
    default: {}
});

export const playerStateAtom = atom<PlayerState>({
    key: 'manualPlayerState',
    default: {
        isReady: false,
        isPlaying: false
    }
});

export function useUnityFeaturesState() {
    return useRecoilState(unityFeaturesAtom);
}
