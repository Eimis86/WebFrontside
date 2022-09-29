import {api} from '@app/requests';
import {useRecoilState} from 'recoil';
import {useEffect, useState} from 'react';
import {useLocalStorage} from '@app/utils/storage';
import {useLoadingState} from '@app/store/layout';
import {shiftDate} from '@app/utils/dateUtils';
import {AuthenticateError, UserAuthenticateInfo} from './types';
import {userAuthAtom} from './atoms';
import {log} from '@app/utils/debug';


const AuthenticateErrorsMap: Record<AuthenticateError, string> = {
    Success: 'Success',
    Unknown: 'Unknown error',
    NotActivated: 'User not activated',
    BadPassword: 'BadPassword',
    Locked: 'Locked',
    NotFound: 'User not found or incorrect password',
    AlreadyExists: 'We already have one user with such E-Mail',
    PasswordNotStrong: 'PasswordNotStrong',
    TooOften: 'TooOften',
    NotValid: 'NotValid',
    Expired: 'Expired'
};

function getAuthenticateError(data: { result: AuthenticateError; } | void) {
    return data ? AuthenticateErrorsMap[data.result] : 'Unknown error';
}

interface UserStoredInfo {
    readonly email: string;
    readonly passwordHash?: string;
    readonly jwtToken: string;
    readonly jwtTokenValidity: string;
    readonly expiredTime?: string;
}

function isSessionExpired(userData: UserStoredInfo) {
    if (userData.expiredTime) {
        return new Date(userData.expiredTime) < new Date();
    }

    return false;
}

export function useUserStorage() {
    const [storageData, setStorageData, deleteStorageData] =
        useLocalStorage<UserStoredInfo>('user', {
            email: '',
            passwordHash: '',
            expiredTime: '',
            jwtToken: '',
            jwtTokenValidity: ''
        });

    const loadUserInfo = () => storageData;

    const saveUserInfo = (userInfo: UserAuthenticateInfo & {email: string;} , expiredDate?: Date) => {
        if (userInfo.isSigned) {
            setStorageData({
                email: userInfo.email,
                passwordHash: userInfo.passwordHash,
                jwtToken: userInfo.jwtToken,
                jwtTokenValidity: userInfo.jwtTokenValidity,
                expiredTime: expiredDate?.toISOString()
            });
        }

    };

    const deleteUserInfo = () => {
        deleteStorageData();
    };

    return {loadUserInfo, saveUserInfo, deleteUserInfo};
}

export function useLogin() {
    const [, setUser] = useRecoilState(userAuthAtom);
    const {startLoading, stopLoading} = useLoadingState();

    const {saveUserInfo} = useUserStorage();

    const login = async (user: {email: string; password?: string; passwordHash?: string; remember?: boolean;}) => {
        startLoading();

        const data = await api.login({
            email: user.email,
            password: user.password || '',
            passwordHash: user.passwordHash || ''
        });

        if (data && data.result === 'Success' && data.passwordHash && data.jwtToken) {
            const userInfo: UserAuthenticateInfo = {
                isSigned: true,
                passwordHash: data.passwordHash,
                jwtToken: data.jwtToken,
                jwtTokenValidity: data.jwtTokenValidity
            };

            setUser(userInfo);
            saveUserInfo({...userInfo, email: user.email} , user.remember ? undefined : shiftDate(new Date(), {hour: 12}));
        }
        else {
            setUser({
                isSigned: false,
                error: getAuthenticateError(data)
            });
        }

        stopLoading();
    };

    return {login};
}

export type SignupState = 'Init' | 'Success' | 'Error';
export function useSignup() {
    const [, setUser] = useRecoilState(userAuthAtom);
    const {startLoading, stopLoading} = useLoadingState();
    const [state, setState] = useState<SignupState>('Init');

    const signup = (user: {name: string; email: string; password: string;}) => {
        startLoading();

        api.signup({
            name: user.name,
            email: user.email,
            password: user.password
        }).then(data => {
            if (data && data.result === 'Success') {
                setState('Success');
            }
            else {
                setState('Error');
                setUser({
                    isSigned: false,
                    error: getAuthenticateError(data)
                });
            }

            stopLoading();
        });
    };

    return {signup, state};
}

export type RecoverState = 'SendEmail' | 'VerifyPin' | 'ResetPassword' | 'Recovered';
export function useRecover() {
    const [, setUser] = useRecoilState(userAuthAtom);
    const {startLoading, stopLoading} = useLoadingState();
    const [recoverState, setRecoverState] = useState<RecoverState>('SendEmail');

    const sendEmail = (user: {email: string;}) => {
        startLoading();
        setRecoverState('SendEmail');

        api.sendRecoveryPin({
            email: user.email
        }).then(data => {
            if (data && data.result === 'Success') {
                setRecoverState('VerifyPin');
            }
            else {
                setUser({
                    isSigned: false,
                    error: getAuthenticateError(data)
                });
            }

            stopLoading();
        });
    };

    const checkPin = (user: {email: string; pin: string;}) => {
        startLoading();

        api.checkRecoveryPin({
            email: user.email,
            pin: user.pin
        }).then(data => {
            if (data && data.result === 'Success') {
                setRecoverState('ResetPassword');
            }
            else {
                setUser({
                    isSigned: false,
                    error: getAuthenticateError(data)
                });
            }

            stopLoading();
        });
    };

    const resetPassword = (user: {email: string; password: string; pin: string;}) => {
        startLoading();

        api.resetPassword({
            email: user.email,
            password: user.password,
            pin: user.pin
        }).then(data => {
            if (data && data.result === 'Success') {
                setRecoverState('Recovered');
            }
            else {
                setUser({
                    isSigned: false,
                    error: getAuthenticateError(data)
                });
            }

            stopLoading();
        });
    };

    const resetState = () => {
        setRecoverState('SendEmail');
    };

    return {sendEmail, checkPin, resetPassword, resetState, recoverState};
}

export function useLogout() {
    const [, setUser] = useRecoilState(userAuthAtom);
    const {deleteUserInfo} = useUserStorage();

    const logout = () => {
        setUser({
            isSigned: false,
            error: undefined
        });

        deleteUserInfo();
    };

    return {logout};
}

export function useUserAuthState() {
    const [user, setUser] = useRecoilState(userAuthAtom);
    const {loadUserInfo} = useUserStorage();
    const {login} = useLogin();

    const setError = (error?: string) => {
        if (!user.isSigned) {
            setUser({
                ...user,
                error: error
            });
        }
    };

    const clearErrors = () => setError('');

    useEffect(() => {
        if (!user.isSigned) {
            const userInfo = loadUserInfo();

            if (userInfo.email && userInfo.passwordHash && !isSessionExpired(userInfo)) {
                setUser({
                    passwordHash: userInfo.passwordHash,
                    isSigned: true,
                    jwtToken: userInfo.jwtToken,
                    jwtTokenValidity: userInfo.jwtTokenValidity
                });

                if (isSessionExpired(userInfo)) {
                    login({
                        email: userInfo.email,
                        passwordHash: userInfo.passwordHash
                    });
                }
            }
        }
    }, []);

    return {
        isSigned: user.isSigned,
        error: !user.isSigned ? user.error : undefined,
        clearErrors
    };
}
