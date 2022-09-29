export type NotificationItems = NotificationItem[];
export type NotificationItem = {
    readonly kind: string;
    readonly header: string;
    readonly detail: string;
    readonly isRead: boolean;
}
