import React, { useContext, useRef, useState } from 'react';
import styles from './styles.scss';
// import { SearchBox } from './SearchBox';
import {Icon, Image, Logo} from '@app/components/Icon';
import { Link, useNavigate } from 'react-router-dom';
import { NavTab, Tabs } from '@app/components/Tabs';
import { UserMenu } from '@app/pages/Header/UserMenu';
import { ApplicationContext } from '@app/AppContext';
import { ToolButton } from '@app/components/Button';
import { useMouseDownOutside } from '@app/utils/useMouseDownOutside';
import { Collapse } from '@app/components/Collapse';
import { useUserAuthState } from '@app/store/user/actions';
import { UserMeeting } from './UserMeeting';
import classnames from 'classnames';
import { useFocusOut } from '@app/utils/useFocusOut';
import {useUserProfile} from '@app/store/profile';
import {SearchBox} from '@app/pages/Header/SearchBox';

const UserMenuButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {data: profileInfo} = useUserProfile();

    const ref = useRef<HTMLDivElement>(null);

    useMouseDownOutside(ref, () => setIsOpen(false), [isOpen]);

    if (!profileInfo) {
        return null;
    }

    const profileImage = profileInfo.imageUrl || '/resources/img/no-avatar.png';

    return (
        <div className={styles.userMenuButton} ref={ref}>
            <ToolButton onClick={() => setIsOpen(!isOpen)}>
                <img src={profileImage} className={styles.avatar} alt='avatar'/>
            </ToolButton>

            <Collapse isOpen={isOpen} className={styles.userMenuContainer} overflowOnExpanded={true}>
                <UserMenu profile={profileInfo}/>
            </Collapse>
        </div>
    );
};

const UserLoginButton: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.userMenuButton}>
            <ToolButton onClick={() => navigate('/login')}>
                <Image name={'userUnsigned'} className={styles.avatar} alt='avatar' />
            </ToolButton>
        </div>
    );
};

const UserMeetingButton: React.FC = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    useFocusOut(ref, ()=> setIsOpen(false), [isOpen]);

    return (
        <div className={styles.userMenuButton} ref={ref}>
            <ToolButton onClick={() => { setIsOpen(!isOpen); }}>
                <Icon name='sessionPassive' />
            </ToolButton>
            <Collapse isOpen={isOpen} className={classnames(styles.userMenuContainer, styles.userMediaContainer)}>
                <UserMeeting/>
            </Collapse>
        </div>
    );
};

export const Header: React.FC = () => {
    const { isSigned } = useUserAuthState();
    const { isMobile } = useContext(ApplicationContext);

    return (
        <header className={styles.header}>
            <div className={styles.header__left}>
                <Link className={styles.logo} to='/'>
                    <Logo name={ isMobile ? 'logoSm' : 'logoNavigation'} className={styles.logoIcon}/>
                </Link>
                <Tabs className={styles.headerTabs}>
                    <NavTab to='/' end={true}>Home</NavTab>
                    <NavTab to='/hubs' end={true}> My Hubs</NavTab>
                </Tabs>
            </div>
            <div className={styles.header__right}>
                {!isMobile && (
                    <SearchBox />
                )}
                <div className={styles.toolbox}>
                    {/*<Notifications />*/}
                    {isSigned
                        ? <UserMenuButton />
                        : <UserLoginButton />
                    }
                </div>
            </div>
        </header>
    );
};
