import {atom} from 'recoil';
import {Maybe} from '@app/utils/maybe';
import {Hub} from '@app/store/hubs';


export const followedHubsAtom = atom<Maybe<Hub[]>>({
    key: 'followedHubsAtom',
    default: undefined,
});

export const favouriteModelsAtom = atom<Maybe<string[]>>({
    key: 'favouriteModelsAtom',
    default: undefined,
});
