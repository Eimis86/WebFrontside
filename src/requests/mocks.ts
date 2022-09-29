import {HubMembers} from '@app/store/hubs';
import {NotificationItems} from '@app/store/notification';
import {mockRequest} from '@app/requests/request';

export async function fetchHubMembers() {
    return await mockRequest<HubMembers>('/resources/Members.json') || [];
}

export async function fetchNotifications() {
    return await mockRequest<NotificationItems>('/resources/Notifications.json') || [];
}
