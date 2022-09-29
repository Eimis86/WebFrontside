import {useRecoilState} from 'recoil';
import {loadingStateAtom} from './atoms';

export function useLoadingState() {
    const [isLoading, setIsLoading] = useRecoilState(loadingStateAtom);

    const startLoading = () => setIsLoading(isLoading => isLoading + 1);
    const stopLoading = () => setIsLoading(isLoading => Math.max(isLoading - 1, 0));

    return {startLoading, stopLoading, isLoading};
}
