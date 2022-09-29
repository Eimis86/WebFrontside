import {ApiTypes} from '@app/requests/types';
import {Hub, Tag} from '@app/store/hubs/types';

export function hubFromApi(hub: ApiTypes['HubStruct']): Hub {
    return {
        id: hub.id!,
        name: hub.name!,
        description: hub.description || '',
        imagePreview: hub.imagePreview || undefined,
        isDefault: !!hub.isDefault
    };
}

export function tagFromApi(tag: ApiTypes['TagStruct']): Tag {
    return {
        id: tag.id!,
        name: tag.name || ''
    }
}
