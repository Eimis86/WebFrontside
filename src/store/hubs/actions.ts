import {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {allHubTagsAtom, hubAtom, hubsAtom, hubTagsAtom, userHubsAtom} from '@app/store/hubs/atoms';
import {useAuthRequestApi} from '@app/store/utils';
import {api} from '@app/requests';
import {hubFromApi, tagFromApi} from '@app/store/hubs/fromApi';
import {Tag} from '@app/store/hubs/types';



export function useHubsAll() {
    const [hubs, setHubs] = useRecoilState(hubsAtom);
    const {request} = useAuthRequestApi(api.getHubAll);

    useEffect(() => {
        if (!hubs) {
            fetch();
        }
    }, []);

    async function fetch() {
        const data = await request({});

        if (data) {
            setHubs(data.map(item => hubFromApi(item)));
        }
    }

    return hubs;
}

export function useUserHubs() {
    const [hubs, setHubs] = useRecoilState(userHubsAtom);
    const {request} = useAuthRequestApi(api.getHubMy);

    useEffect(() => {
        if (!hubs) {
            fetch();
        }
    }, []);

    async function fetch() {
        const data = await request({});

        if (data) {
            setHubs(data.map(item => hubFromApi(item)));
        }
    }

    return hubs;
}

export function useHub(hubId: string) {
    const [hub, setHub] = useRecoilState(hubAtom(hubId));
    const {request} = useAuthRequestApi(api.getHub);

    useEffect(() => {
        if (!hub) {
            fetch();
        }
    }, [hubId]);

    async function fetch() {
        const data = await request({hubId});

        if (data) {
            setHub(hubFromApi(data));
        }
    }

    return hub;
}

export function useAllHubTags() {
    const hubs = useHubsAll();
    const {request} = useAuthRequestApi(api.getHubTags);

    const [allTags, setAllTags] = useRecoilState(allHubTagsAtom);

    useEffect(() => {
        if (hubs && !allTags) {
            fetchAllTags().then(data => setAllTags(data));
        }
    }, [hubs])


    async function fetchAllTags() {
        if (!hubs) {
            return;
        }

        const result: Tag[] = [];

        const requests = hubs.map(({id}) => request({hubId: id}));
        const resolve = await Promise.all(requests);

        resolve.forEach(tags => {
            if (tags) {
                const tagList = tags.filter(item => !!item.name).map(item => tagFromApi(item));
                result.push(...tagList);
            }
        })

        return result;
    }

    return allTags;
}

export function useHubTags(hubId: string) {
    const [tags, setTags] = useRecoilState(hubTagsAtom(hubId));
    const {request} = useAuthRequestApi(api.getHubTags);

    useEffect(() => {
        if (!tags) {
            fetch().then(data => setTags(data));
        }
    }, [hubId]);

    async function fetch() {
        const data = await request({hubId});

        if (data) {
            return  data.filter(item => !!item.name).map(item => tagFromApi(item));
        }
    }

    return tags;
}

