import { atom, atomFamily } from 'recoil';
import {Hub, Hubs, Tag} from '@app/store/hubs/types';
import {Maybe} from '@app/utils/maybe';

export const hubAtom = atomFamily<Maybe<Hub>, string>({
    key: 'hubAtom',
    default: undefined,
});

export const hubsAtom = atom<Maybe<Hubs>>({
    key: 'hubsAtom',
    default: undefined,
});

export const userHubsAtom = atom<Maybe<Hubs>>({
    key: 'userHubsAtom',
    default: undefined,
});

export const hubTagsAtom = atomFamily<Maybe<Tag[]>, string>({
    key: 'hubTagsAtom',
    default: undefined,
});

export const allHubTagsAtom = atom<Maybe<Tag[]>>({
    key: 'allHubTagsAtom',
    default: undefined,
});
