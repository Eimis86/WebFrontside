import {baseRequest} from '@app/requests/request';

interface SignupRequest {
    readonly name: string;
    readonly email: string;
    readonly password: string;
}

interface SignupResponse {
    readonly result: 'Success' | 'AlreadyExists' | 'PasswordNotStrong';
}

export async function signup(data: SignupRequest) {
    return await baseRequest<SignupRequest, SignupResponse>({
        method: 'POST',
        url: 'api/auth/signup',
        data
    });
}
