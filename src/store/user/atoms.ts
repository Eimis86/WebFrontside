import {atom} from 'recoil';
import {UserAuthenticateInfo} from './types';

export const userAuthAtom = atom<UserAuthenticateInfo>({
    key: 'user',
    default: {
        isSigned: false
    }
});
