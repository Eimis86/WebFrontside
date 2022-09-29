import {binaryRequest, createRequest} from '@app/requests/request';
import {ApiResponse, Paths} from '@app/requests/types';


export const getProfile = createRequest('/api/auth/profile/{id}', 'get');
export const getProfileMy = createRequest('/api/auth/profile/my', 'get');
export const updateProfileMy = createRequest('/api/auth/profile/my', 'put');
// export const addUserImage = createRequest('/api/auth/profile/myImage', 'post');
export const deleteUserImage = createRequest('/api/auth/profile/myImage', 'delete');

export async function addUserImage(token: string, imageStr: string) {
    return await binaryRequest<ApiResponse<Paths['/api/auth/profile/myImage']['post']>>({
        method: 'POST',
        url: 'api/auth/profile/myImage',
        contentType: 'image/png',
        data: imageStr,
        token
    });
}
