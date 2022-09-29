export type UserProfile = {
    readonly id: string;
    readonly email: string;
    readonly name: string;
    readonly imageUrl?: string;
}

export type UserProfileUpdate = {
    readonly email: string;
    readonly name: string;
    readonly oldPassword?: string;
    readonly newPassword?: string;
    readonly imageStr?: string;
}
