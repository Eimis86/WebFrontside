import React, {useState, useRef} from 'react';
import styles from './styles.scss';

import {Button} from '@app/components/Button';
import {Icon} from '@app/components/Icon';
import {useMouseDownOutside} from '@app/utils/useMouseDownOutside';
import { useNavigate} from 'react-router-dom';
import {useLogout} from '@app/store/user/actions';
import {UserProfile} from '@app/store/profile/types';

export const UserMenu: React.FC<{
    readonly profile: UserProfile;
}> = ({profile}) => {
    const {logout} = useLogout();

    const navigate = useNavigate();

    const [isLanguage, setIsLanguage] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    useMouseDownOutside(ref, () => setIsLanguage(false), [isLanguage]);

    return (
        <div className={styles.userMenu}>
            <div className={styles.userMenu__header}>
                <div className={styles.userMenu__container}>
                    <div className={styles.userMenu__userInfo}>
                        <div className={styles.userName}>{profile.name}</div>
                        <div className={styles.userEmail}>{profile.email}</div>
                    </div>
                    <Button kind='link' className={styles.userProfile} onClick={() => navigate('/profile/details')}>
                        <Icon name='arrowRight' size={'medium'} className={styles.icon}/>
                    </Button>
                </div>
            </div>
            <div className={styles.userMenu__main} ref={ref}>
                <ul className={styles.userMenu__actions}>
                    {/*<li className={styles.actionItem_active}>
                        <span onClick={() => setIsLanguage(!isLanguage)} className={styles.actionItem_btn}>
                            Language
                        </span>
                        <Collapse isOpen={isLanguage} className={styles.languageContainer} overflowOnExpanded={true}>
                            <AppLanguage />
                        </Collapse>
                    </li>*/}
                    <li className={styles.actionItem}>FAQ</li>
                </ul>
            </div>
            <div className={styles.userMenu__logout}>
                <p className={styles.description}>Cloyd public web build 0.3</p>
                <Button
                    kind='outlined'
                    size='medium'
                    onClick={() => logout()}
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};
