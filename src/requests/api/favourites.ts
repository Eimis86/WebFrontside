import {createRequest} from '@app/requests/request';

export const getFollowedHubs = createRequest('/api/favourites/hub', 'get');
export const addFollowedHub = createRequest('/api/favourites/hub/{hubId}', 'post');
export const deleteFollowedHub = createRequest('/api/favourites/hub/{hubId}', 'delete');

export const getFavouritesModels = createRequest('/api/favourites/package', 'get');
export const addFavouriteModel = createRequest('/api/favourites/package/{packageId}', 'post');
export const deleteFavouriteModel = createRequest('/api/favourites/package/{packageId}', 'delete');