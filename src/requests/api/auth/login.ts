import {baseRequest} from '@app/requests/request';

interface LoginRequest {
    readonly email: string;
    readonly password: string;
    readonly passwordHash: string;
}

interface LoginResponse {
    readonly passwordHash?: string;
    readonly isAdmin: boolean;
    readonly name?: string;
    readonly result: 'Unknown' | 'Success' | 'NotActivated' | 'BadPassword' | 'Locked' | 'NotFound';
    readonly jwtToken?: string;
    readonly jwtTokenValidity: string;
}

export async function login(
    data: LoginRequest
) {
    return await baseRequest<LoginRequest, LoginResponse>({
        method: 'POST',
        url: 'api/auth/login',
        data
    });
}
