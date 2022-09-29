import {baseRequest} from '@app/requests/request';

interface ResendEmailResponse {
    readonly result: 'Success' | 'AlreadyExists' | 'PasswordNotStrong';
}

export async function confirmEmail(email: string, hash: string) {
    return await baseRequest<undefined, ResendEmailResponse>({
        method: 'POST',
        url: `api/auth/emailconfirm?email=${email}&hash=${hash}`
    });
}
