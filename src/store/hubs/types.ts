import {Model} from '@app/store/models';

export type Hubs = Hub[];
export type Hub = {
    readonly id: string;
    readonly name: string;
    readonly description?: string;
    readonly imagePreview?: string;
    readonly isDefault: boolean;
}

export type HubDetails = {
    readonly id?: string;
    readonly name?: string;
    readonly description?: string;
    readonly models?: readonly Model[];
}

export type HubMembers = HubMember[];
export type HubMember = {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly image: string;
    readonly roleId: number;
}

export type Tag = {
    readonly id: string;
    readonly name: string;
}
