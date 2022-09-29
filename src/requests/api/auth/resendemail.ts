import {baseRequest} from '@app/requests/request';

interface ResendEmailRequest {
    readonly email: string;
}

interface ResendEmailResponse {
    readonly result: 'Unknown' | 'Success' | 'TooOften' | 'NotFound';
}

export async function resendEmail(
    data: ResendEmailRequest
) {
    return await baseRequest<ResendEmailRequest, ResendEmailResponse>({
        method: 'POST',
        url: 'api/auth/resendemail',
        data
    });
}
