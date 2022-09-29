import {unity} from '@app/pages/Viewer/unity/api';
import {useUnityFeaturesState} from '@app/pages/Viewer/unity/atoms';
import {UnityFeatures} from '@app/pages/Viewer/unity/types';
import {useMemo} from 'react';


export function useUnityFeatures() {
    const [state, setState] = useUnityFeaturesState();

    const getIsActive = (feature: UnityFeatures) => !!state[feature];

    const setIsActive = (feature: UnityFeatures, newState: boolean) => {
        unity.setFeature(feature, newState);
        setState(oldState => ({...oldState, [feature]: newState}));
    };

    return {getIsActive, setIsActive};
}

export function useUnityFeature(feature: UnityFeatures): [boolean, (newState: boolean) => void] {
    const states = useUnityFeatures();

    const isActive = states.getIsActive(feature);

    const setIsActive = (newState: boolean) => states.setIsActive(feature, newState);

    return [isActive, setIsActive];
}
