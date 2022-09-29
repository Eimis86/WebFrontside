import React from 'react';
import styles from './styles.scss';
import {useUserAuthState} from '@app/store/user';


export const AuthenticateErrorMessage: React.FC = () => {
    const {isSigned, error} = useUserAuthState();

    if (isSigned || !error) {
        return null;
    }

    return (<div className={styles.error}>{error}</div>);
};
