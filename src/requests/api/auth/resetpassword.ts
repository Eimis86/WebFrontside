import {baseRequest,} from '@app/requests/request';

interface ResetPasswordRequest {
    readonly email: string;
    readonly pin: string;
    readonly password: string;
}

interface ResetPasswordResponse {
    readonly result: 'Unknown' | 'Success' | 'NotFound' | 'NotValid' | 'Expired' | 'PasswordNotStrong';
}

//password recovery #3
export async function resetPassword(
    data: ResetPasswordRequest
) {
    return await baseRequest<ResetPasswordRequest, ResetPasswordResponse>({
        method: 'POST',
        url: 'api/auth/resetpassword',
        data
    });
}
