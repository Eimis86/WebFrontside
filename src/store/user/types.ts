
export type AuthenticateError =
    'Success' | 'Unknown' | 'NotActivated' | 'BadPassword' | 'Locked' | 'NotFound' | 'AlreadyExists' |
    'PasswordNotStrong' | 'TooOften' | 'NotValid' | 'Expired';


export interface AuthResponse {
    readonly AuthHash: string;
    readonly Error: AuthenticateError;
    readonly Name: string;
    readonly Success: boolean;
}

export interface AuthRecoverResponse {
    readonly AuthHash: string;
    readonly Error: AuthenticateError;
    readonly PassChanged: boolean;
    readonly Success: boolean;
}

//AllOK
export type UserAuthenticateInfo = {
    readonly isSigned: true;
    readonly passwordHash: string;
    readonly jwtToken: string;
    readonly jwtTokenValidity: string;
} | {
    readonly isSigned: false;
    readonly error?: string;
}
