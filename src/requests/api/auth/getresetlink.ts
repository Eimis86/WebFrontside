import {baseRequest} from '@app/requests/request';


interface ResetLinkRequest {
    readonly email: string;
}

interface ResetLinkResponse {
    readonly result: 'Unknown' | 'Success' | 'Locked' | 'NotFound' | 'TooOften';
}

//password recovery #1
export async function sendRecoveryPin(
    data: ResetLinkRequest
) {
    return await baseRequest<ResetLinkRequest, ResetLinkResponse>({
        method: 'POST',
        url: 'api/auth/getresetlink',
        data
    });
}
