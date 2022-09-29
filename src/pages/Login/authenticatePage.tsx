import React, {useState} from 'react';
import styles from './styles.scss';
import {AuthenticateState, LoginForm, RecoveryForm, SignupForm} from '@app/pages/Login/Forms';
import {useUserAuthState} from '@app/store/user';
import {Icon} from '@app/components/Icon';
import {ToolButton} from '@app/components/Button';

export const AuthenticatePage: React.FC = () => {
    const [state, setState] = useState<AuthenticateState>('Login');
    const {clearErrors} = useUserAuthState();

    const changeState = (newState: AuthenticateState) => {
        setState(newState);
        clearErrors();
    };

    return (
        <div className={styles.authenticatePage}>
            <div className={styles.authenticatePage__image}>
                <div className={styles.logo}>
                    <img src={'/resources/img/cloyd_logo_bw.png'} alt='logo'/>
                </div>
                <div className={styles.imageOverlay}>
                    <div className={styles.title}>
                        Moving Reality Forward
                    </div>
                    <div className={styles.brandButtons}>
                        <ToolButton noBorder noBackground><Icon name='brandFacebook'/></ToolButton>
                        <ToolButton noBorder noBackground><Icon name='brandTwitter'/></ToolButton>
                        <ToolButton noBorder noBackground><Icon name='brandInstagram'/></ToolButton>
                    </div>
                    <div className={styles.bottomText}>
                        <span className={styles.muted}>@ Logo app all rights reserved</span>
                        <span>Privacy policy</span>
                    </div>
                </div>

            </div>
            <div className={styles.authenticatePage__content}>
                <div className={styles.authenticateContainer}>
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
            </div>
        </div>
    );
};
