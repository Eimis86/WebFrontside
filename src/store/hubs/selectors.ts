import {selector, selectorFamily} from 'recoil';
import {Maybe} from '@app/utils/maybe';
import {api} from '@app/requests';
import {HubMember, HubMembers} from './types';


export const getHubMembers = selector<HubMembers>({
    key: 'getHubMembers',
    get: api.mock.fetchHubMembers
});

export const getHubMemberById = selectorFamily<Maybe<HubMember>, number>({
    key: 'getHubMemberById',
    get: (id: number) => ({get}) => get(getHubMembers).find(m => m.id === id)
});
