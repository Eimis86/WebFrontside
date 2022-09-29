import {ApiTypes} from '@app/requests/types';
import {UserProfile} from '@app/store/profile/types';

export function profileFromApi(profile: ApiTypes['ProfileResponseData']): UserProfile {
    return {
        id: profile.id!,
        email: profile.email || '',
        name: profile.name || '',
        imageUrl: profile.imageUrl || undefined,
    };
}
