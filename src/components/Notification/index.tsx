import React, { HTMLAttributes } from 'react';
import { Icon } from '../Icon';
import classNames from 'classnames';
import styles from './styles.scss';

export type NotificationKind = 'Error' | 'Done' | 'Info';
export type Icons = 'notificationError' | 'notificationDone' | 'notificationInfo';  

const NotificationIcons: Record<NotificationKind, Icons> = {
    Error: 'notificationError',
    Done: 'notificationDone',
    Info: 'notificationInfo'
};

interface Notifications {
    kind: NotificationKind;
    isRead: boolean;
}

export const Notification: React.FC<Notifications & HTMLAttributes<HTMLDivElement>> = ({
    kind,
    isRead,
    className,
    children
}) => (
    <div className={classNames(styles.notification, className)}>
        {!isRead && <div className={styles.notification__redDot}/>}
        <Icon name={NotificationIcons[kind] } className={styles.icons} />
        {children}
    </div>
);
