import {atom} from 'recoil';
import {Maybe} from '@app/utils/maybe';
import {UserProfile} from '@app/store/profile/types';

export const userProfileAtom = atom<Maybe<UserProfile>>({
    key: 'userProfileAtom',
    default: undefined
});
