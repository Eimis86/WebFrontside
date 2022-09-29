import React, {useEffect, useState} from 'react';
import styles from './styles.scss';

import {Logo} from '@app/components/Icon';
import {ModalWindow} from '@app/components/ModalWindow';
import {useUserAuthState} from '@app/store/user';
import {LoginForm, SignupForm, RecoveryForm, AuthenticateState} from '@app/pages/Login/Forms';

export const AuthenticateModal: React.FC<{
    readonly isOpen: boolean;
    readonly close: () => void;
}> = ({isOpen, close}) => {
    const [state, setState] = useState<AuthenticateState>('Login');
    const {isSigned, clearErrors} = useUserAuthState();


    useEffect(() => {
        if (isOpen) {
            setState('Login');
            clearErrors();
        }
    }, [isOpen]);

    if (!isOpen || isSigned) {
        return null;
    }

    const changeState = (newState: AuthenticateState) => {
        setState(newState);
        clearErrors();
    };

    return (
        <ModalWindow
            onExit={() => close()}
        >
            <div className={styles.authenticateContainer}>
                <Logo name={'logoXl'} className={styles.logo}/>

                {state === 'Login' &&
                    <LoginForm doChangeState={changeState}/>
                }

                {state === 'SignUp' &&
                    <SignupForm doChangeState={changeState}/>
                }

                {state === 'Recovery' &&
                    <RecoveryForm doChangeState={changeState}/>
                }
            </div>
        </ModalWindow>
    );
};
