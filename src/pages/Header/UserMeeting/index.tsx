import { ToolButton } from '@app/components/Button';
import { Icon } from '@app/components/Icon';
import React from 'react';
import styles from './styles.scss';

export const UserMeeting:React.FC = () => {

    return(
        <ul>
            <li className={styles.inlineMeetings}>
                <Icon name='MeetingStart' className={styles.icon}/>
                <div>Start an instant meeting</div>
            </li>
            <li className={styles.inlineMeetings}>
                <Icon name='MeetingJoin' className={styles.icon}/>
                <div>Join meeting</div>
            </li>
        </ul>
    );
};