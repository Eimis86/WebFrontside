import {useState} from 'react';
import {userAuthAtom, useUserAuthState} from '@app/store/user';
import {log} from '@app/utils/debug';
import {RequestError} from '@app/requests/types';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useLogout} from '@app/store/user/actions';
import {useLoadingState} from '@app/store/layout';

type Request = <Req extends any[], Resp>(api: (token: string, ...args: Req) => Promise<Resp>, ...args: Req) => Promise<Resp | void>;

type LoadingState = 'Init' | 'Loading' | 'Success' | 'Failed'

export function useAuthRequest() {
    const {startLoading, stopLoading} = useLoadingState();
    const [state, setState] = useState<LoadingState>('Init');
    // const notification = useDisplayNotification();

    const {logout} = useLogout();
    const user = useRecoilValue(userAuthAtom);

    const request: Request = async (api, ...args) => {
        if (user.isSigned) {
            setState('Loading');
            startLoading();

            try {
                const data = await api(user.jwtToken, ...args);

                setState('Success');
                stopLoading();

                return data;
            }
            catch (e: unknown) {
                setState('Failed');
                stopLoading();

                const error = e as RequestError;
                if (error.status === 401) {
                    logout();
                } else {
                    //ToDo: replace with error dialog
                    // notification({
                    //     kind: 'error',
                    //     title: 'Network error',
                    //     description: Array.isArray(error.error) ? error.error.join(', ') : error.error
                    // });
                }

                // eslint-disable-next-line no-console
                log.Error('Request error', e);
            }
        }
    };

    return {
        request,
        state
    };

}


export function useAuthRequestApi<Req extends any[], Resp>(
    api: (token: string, ...args: Req) => Promise<Resp>,
) {
    const {request, state} = useAuthRequest();

    const requestApi = (...args: Req) => request(api, ...args);

    return {
        request: requestApi,
        state
    };

}
