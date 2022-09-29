import {useEffect, useMemo, useState} from 'react';
import {useRecoilState} from 'recoil';
import {useAuthRequest, useAuthRequestApi} from '@app/store/utils';
import {followedHubsAtom, favouriteModelsAtom} from '@app/store/favourites/atom';
import {api} from '@app/requests';
import {hubFromApi} from '@app/store/hubs/fromApi';


export function useUserFollowedHubs() {
    const [followedHubs, setFollowedHubs] = useRecoilState(followedHubsAtom);
    const {request} = useAuthRequest();

    const fetch = async () => {
        const data = await request(api.getFollowedHubs, {});
        if (data) {
            setFollowedHubs(data.map(item => hubFromApi(item)));
        }
    };

    useEffect(() => {
        if (!followedHubs) {
            fetch();
        }
    }, []);

    return {
        items: followedHubs || [],
        refresh: fetch
    };
}

export function addUserFollowedHub() {
    const followedHubs = useUserFollowedHubs();
    const {request} = useAuthRequest();

    return async (hubId:string) => {
        await request(api.addFollowedHub, {hubId});
        await followedHubs.refresh();
    };
}

export function deleteUserFollowedHub() {
    const followedHubs = useUserFollowedHubs();
    const {request} = useAuthRequest();

    return async (hubId:string) => {
        await request(api.deleteFollowedHub, {hubId});
        await followedHubs.refresh();
    };
}

export function useModelsFavorites() {
    const [favourites, setFavourites] = useRecoilState(favouriteModelsAtom);
    const {request} = useAuthRequest();

    useEffect(() => {
        if (!favourites) {
            fetch();
        }
    }, [favourites]);

    async function fetch() {
        const data = await request(api.getFavouritesModels,{});
        if (data) {
            setFavourites(data.map(item => (item.id!)));
            return favourites;
        }
        return  [];
    }

    const isModelFavorite = (modelId: string) => {
        return favourites ? favourites.some(item => item === modelId) : false;
    }

    const setIsModelFavorite = (modelId: string, newValue: boolean) => {
        if (newValue) {
            request(api.addFavouriteModel, {packageId: modelId})
            setFavourites([...favourites || [], modelId])
        } else {
            request(api.deleteFavouriteModel, {packageId: modelId})
            setFavourites(favourites ? favourites.filter(item => item !== modelId) : []);
        }
    }

    return {
        isLoaded: !!favourites,
        isModelFavorite,
        setIsModelFavorite
    };
}

export function useModelFavorites(modelId: string): [boolean, (newValue: boolean) => void] {
    const favourites = useModelsFavorites();
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        if (favourites.isLoaded) {
            setIsFavorite(favourites.isModelFavorite(modelId));
        }
    }, [favourites.isLoaded, modelId]);

    const updateModelFavoriteState = (newValue: boolean) => {
        favourites.setIsModelFavorite(modelId, newValue)
        setIsFavorite(newValue);
    }

    return [isFavorite, updateModelFavoriteState];
}
