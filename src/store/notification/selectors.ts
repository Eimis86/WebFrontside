import { api } from '@app/requests';
import { selector } from 'recoil';
import { NotificationItems } from './types';

export const getNotifications = selector<NotificationItems>({
    key:'getNotifications',
    get: api.mock.fetchNotifications
});
