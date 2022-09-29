import {createRequest} from '@app/requests/request';

export const getModels = createRequest('/api/hub/{hubId}', 'get');
export const getModel = createRequest('/api/ixr/{packageId}', 'get');