import {atom} from 'recoil';

export const loadingStateAtom = atom({
    key: 'loadingStateAtom',
    default: 0
});

export const MobileStateAtom = atom({
    key: 'MobileStateAtom',
    default: false
});
