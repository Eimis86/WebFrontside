import {baseRequest} from '@app/requests/request';

interface ShareModelRequest {
    emailList: string[];
    modelId: string;
}

export async function shareModel(token: string, data: ShareModelRequest) {
    return await baseRequest<ShareModelRequest, undefined>({
        method: 'POST',
        url: 'api/notification/share/model',
        data: data
    });
}
