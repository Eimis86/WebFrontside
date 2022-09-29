import React, { useState, useRef, useEffect, useMemo } from 'react';
import styles from './styles.scss';
import { RoundButton, ToolButton } from '@app/components/Button';
import { Icon } from '@app/components/Icon';
import { useMouseDownOutside } from '@app/utils/useMouseDownOutside';
import { Collapse } from '@app/components/Collapse';
import { Link } from 'react-router-dom';
import { Notification, NotificationKind } from '@app/components/Notification';
import { getNotifications } from '@app/store/notification';
import { useRecoilValue } from 'recoil';

const notificationNames: string[] = ['All', 'Unread'];

export const Notifications: React.FC = () => {

    const notifications = useRecoilValue(getNotifications);

    const [selectedNotificationNames, setSelectedNotificationNames] = useState<string>(notificationNames[0]);

    const [isOpenNotification, setIsOpenNotification] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    useMouseDownOutside(ref, () => setIsOpenNotification(false), [isOpenNotification]);

    const allNotifications = useMemo(() => notifications.filter(item => (selectedNotificationNames === 'All') || !item.isRead),
        [notifications, selectedNotificationNames]
    );

    return (
        <div ref={ref}>
            <ToolButton onClick={() => setIsOpenNotification(!isOpenNotification)}>
                <Icon name='notification' />
            </ToolButton>
            <Collapse isOpen={isOpenNotification} className={styles.notificationContainer} overflowOnExpanded={true}>
                <div className={styles.notification}>
                    <div className={styles.notification__header}>
                        <h6 className={styles.notification__title}>Notifications</h6>
                        <div className={styles.notification__buttons}>
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
                    <div className={styles.notification__main}>
                        <div className={styles.main__header}>
                            <div className={styles.notification__sort}>Recent:</div>
                            <Link to={'/notifications'} className={styles.notification__underline}><div className={styles.notification__sortType}>See all</div></Link>
                        </div>
                        {
                            allNotifications.map((notifications, idx) => (
                                <Notification
                                    key={idx}
                                    kind={notifications.kind as NotificationKind}
                                    isRead={notifications.isRead}
                                >
                                    <div className={styles.notificationHeader}>{notifications.header + ' '}
                                        <span className={styles.notificationDescription}>{notifications.detail}</span>
                                    </div>
                                </Notification>
                            ))}
                    </div>
                </div>
            </Collapse>
        </div>
    );
};