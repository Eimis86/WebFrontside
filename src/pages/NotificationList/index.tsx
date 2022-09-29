import React, { useEffect, useMemo, useState } from 'react';
import styles from './styles.scss';
import { ContentNarrow, Title, Description } from '@app/layout';
import { Notification, NotificationKind } from '@app/components/Notification';
import { RoundButton } from '@app/components/Button';
import { getNotifications, NotificationItems } from '@app/store/notification';
import { useRecoilValue } from 'recoil';

const notificationNames: string[] = ['All', 'Unread'];

export const NotificationList: React.FC = () => {

    const notifications = useRecoilValue(getNotifications);

    const [selectedNotificationNames, setSelectedNotificationNames] = useState<string>(notificationNames[0]);

    const allNotifications = useMemo(() => notifications.filter(item => (selectedNotificationNames === 'All') ||  !item.isRead),
        [notifications, selectedNotificationNames]
    );

    return (
        <ContentNarrow className={styles.notificationSize}>
            <div className={styles.notificationsHeader} >
                <Title>Notifications</Title>
                <Description className={styles.notificationDetail}>Manage your settings and preferences here.</Description>
                <div className={styles.buttonContainer}>
                    {notificationNames.map(e => (
                        <RoundButton
                            key={e}
                            title={e}
                            isSelected={e === selectedNotificationNames}
                            onClick={() => setSelectedNotificationNames(e)}
                        />
                    ))}
                </div>
            </div>
            <Description className={styles.notificationBody}>Recent:</Description>
            {
                allNotifications.map((notifications, idx) => (
                    <Notification
                        key={idx}
                        kind={notifications.kind as NotificationKind}
                        isRead={notifications.isRead}
                    >
                        <div className={styles.header}>{notifications.header + ' '}
                            <span className={styles.detail}>{notifications.detail}</span>
                        </div>
                    </Notification>
                ))}
        </ContentNarrow>
    );
};
