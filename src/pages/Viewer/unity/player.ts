import {useUnityFeature} from '@app/pages/Viewer/unity/features';
import {PlayerPosition, UnityFeatures} from '@app/pages/Viewer/unity/types';
import {useRecoilState} from 'recoil';
import {playerStateAtom} from '@app/pages/Viewer/unity/atoms';

export function useUnityPlayer() {
    const [state, setState] = useRecoilState(playerStateAtom);
    const [active, setActive] = useUnityFeature(UnityFeatures.manual);

    const setPosition = (position: PlayerPosition) => {
        if ((position.step !== state.position?.step) || (position.chapter !== state.position?.chapter)) {
            setState(oldState => ({...oldState, position}));
        }
    };

    const setPlaying = (isPlaying: boolean) => {
        setState(oldState => ({...oldState, isPlaying}));
    };

    const enable = () => {
        if (!active) {
            setActive(true);
        }
    };

    const disable = () => {
        if (active) {
            setActive(false);
            setState(oldState => ({...oldState, isReady: false, isPlaying: false, position: undefined}));
        }
    };

    const play = () => {
        enable();

        if (!state.isPlaying) {
            setPlaying(true);
        }
    };

    const pause = () => {
        if (state.isPlaying) {
            setPlaying(false);
        }
    };

    return {
        state, setPosition, enable, disable, play, pause
    };
}
