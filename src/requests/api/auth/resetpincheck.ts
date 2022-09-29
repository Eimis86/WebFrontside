import {baseRequest} from '@app/requests/request';

interface CheckPinRequest {
    readonly email: string;
    readonly pin: string;
}

interface CheckPinResponse {
    readonly result: 'Unknown' | 'Success' | 'NotFound' | 'NotValid' | 'Expired';
}

//password recovery #2
export async function checkRecoveryPin(
    data: CheckPinRequest
) {
    return await baseRequest<CheckPinRequest, CheckPinResponse>({
        method: 'POST',
        url: 'api/auth/resetpincheck',
        data
    });
}
