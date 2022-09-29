import {baseRequest} from '@app/requests/request';

interface ResendEmailResponse {
    readonly result: 'Unknown' | 'Success' | 'NotActivated' | 'BadPassword' | 'Locked' | 'NotFound';
    readonly passwordHash?: string;
    readonly name?: string;
    readonly isAdmin: boolean;
    readonly jwtToken?: string;
    readonly jwtTokenValidity: string;
}

export async function confirmEmail() {
    return await baseRequest<undefined, ResendEmailResponse>({
        method: 'POST',
        url: 'api/auth/renewJwt'
    });
}


//renewJwt
