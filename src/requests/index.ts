import {login} from '@app/requests/api/auth/login';
import {sendRecoveryPin} from '@app/requests/api/auth/getresetlink';
import {signup} from '@app/requests/api/auth/signup';
import {checkRecoveryPin} from '@app/requests/api/auth/resetpincheck';
import {resetPassword} from '@app/requests/api/auth/resetpassword';
import {
    fetchHubMembers,
    fetchNotifications
} from '@app/requests/mocks';
import {shareModel} from '@app/requests/api/shareModel';
import {
    getHubAll,
    getHubMy,
    getHub,
    getHubTags
} from '@app/requests/api/hub';
import {
    getFollowedHubs,
    addFollowedHub,
    deleteFollowedHub,
    getFavouritesModels,
    addFavouriteModel,
    deleteFavouriteModel,
} from '@app/requests/api/favourites';
import {
    getProfile,
    getProfileMy,
    updateProfileMy,
    addUserImage,
    deleteUserImage
} from '@app/requests/api/profile';
import {
    getModels,
    getModel,
} from '@app/requests/api/models';

export const api = {
    mock: {
        fetchHubMembers,
        fetchNotifications,
    },

    login,
    signup,
    sendRecoveryPin,
    checkRecoveryPin,
    resetPassword,
    shareModel,
    getHubAll,
    getHubMy,
    getHub,
    getHubTags,
    getProfile,
    getProfileMy,
    updateProfileMy,
    addUserImage,
    deleteUserImage,
    getFollowedHubs,
    addFollowedHub,
    deleteFollowedHub,
    getFavouritesModels,
    addFavouriteModel,
    deleteFavouriteModel,
    getModels,
    getModel,
};
