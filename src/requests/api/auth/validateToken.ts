import {baseRequest,} from '@app/requests/request';

interface ValidateTokenRequest {
    readonly token: string;
}

interface ValidateTokenResponse {
    readonly result: 'Unknown' | 'Success' | 'NotActivated' | 'BadPassword' | 'Locked' | 'NotFound';
    readonly passwordHash?: string;
    readonly name?: string;
    readonly isAdmin: boolean;
    readonly jwtToken: string;
    readonly jwtTokenValidity: string;
}

export async function validateToken(
    data: ValidateTokenRequest
) {
    return await baseRequest<ValidateTokenRequest, ValidateTokenResponse>({
        method: 'POST',
        url: 'api/auth/validateToken',
        data
    });
}
