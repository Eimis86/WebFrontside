import {createRequest} from '@app/requests/request';

export const getHubAll = createRequest('/api/hub/all', 'get');
export const getHubMy = createRequest('/api/hub/my', 'get');
export const getHub = createRequest('/api/hub/{hubId}', 'get');
export const getHubTags = createRequest('/api/tags/byHub/{HubId}/list', 'get');
