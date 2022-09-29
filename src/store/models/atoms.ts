import {atom, atomFamily} from 'recoil';
import {Model} from '@app/store/models';

export const hubModelsAtom = atomFamily<Model[] | undefined, string>({
    key: 'hubModelsAtom',
    default: undefined,
});

export const modelDetailsAtom = atomFamily<Model | undefined, string>({
    key: 'modelDetailsAtom',
    default: undefined,
});


export const allModelsAtom = atom<Model[] | undefined>({
    key: 'allModelsAtom',
    default: undefined,
});

export const highlightsAtom = atom<string[] | undefined>({
    key: 'highlightsAtom',
    default: ['cc9ec004-6834-4629-accc-038f61295a5e', 'd780ade7-f443-4dbc-8093-f0559928951e', 'a062bcab-f87d-428f-bfc0-96103397dd66']
});
