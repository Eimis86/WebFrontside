import {useState, useEffect, useMemo} from 'react';
import {api} from '@app/requests';
import {useAuthRequestApi} from '@app/store/utils';
import {useRecoilState, useRecoilValue} from 'recoil';
import {allModelsAtom, highlightsAtom, hubModelsAtom, modelDetailsAtom} from '@app/store/models/atoms';
import {modelFromApi, parseManual} from '@app/store/models/fromApi';
import {request} from '@app/requests/request';
import {Model, ModelManual} from '@app/store/models/types';
import {useHubsAll, useUserHubs} from '@app/store/hubs';


export function useLoadManual(manualSrc: string) {
    const [manual, setManual] = useState<ModelManual>();

    useEffect(() => {
        request<{Manuals: string[];}>({
            url: manualSrc,
            method: 'GET'
        }).then(data => {
            if (data && data.Manuals) {
                const manual = parseManual(data);
                setManual(manual);
            }
        });

    }, [manualSrc]);

    return manual;
}

export function useShareModel() {
    const {request} = useAuthRequestApi(api.shareModel);
    const [state, setState] = useState<{
        readonly status?: 'Sending' | 'Success' | 'Error';
        readonly error?: string;
    }>({});

    const send = async (modelId: string, emails: string | string[] ) => {
        setState({
            status: 'Sending'
        });

        try {
            await request({
                emailList: Array.isArray(emails) ? emails : [emails],
                modelId
            });

            setState({status: 'Success'});
        }
        catch (e) {
            setState({status: 'Error', error: 'Sending e-mail was failed. Please try again later.'});
        }
    };

    return {
        send,
        state
    };
}

export function useModel(packageId: string) {
    const [model, setModel] = useRecoilState(modelDetailsAtom(packageId));
    const {request} = useAuthRequestApi(api.getModel);

    useEffect(() => {
        if (!model) {
            fetch();
        }
    }, [packageId]);

    async function fetch() {
        const data = await request({packageId});

        if (data) {
            setModel(modelFromApi(data));
        }
    }

    return model;
}


export function useHubModels(hubId: string) {
    const [models, setModels] = useRecoilState(hubModelsAtom(hubId));
    const {request} = useAuthRequestApi(api.getModels);

    useEffect(() => {
        if (!models) {
            fetch();
        }
    }, [hubId]);

    async function fetch() {
        const data = await request({hubId});

        if (data) {
            setModels(data.packages?.map(item => modelFromApi(item)));
        }
    }

    return models;
}

export function useAllModels() {
    const hubs = useHubsAll();
    const {request} = useAuthRequestApi(api.getModels);

    const [allModels, setAllModels] = useRecoilState(allModelsAtom);

    useEffect(() => {
        if (hubs && !allModels) {
            loadAllModels().then(models => setAllModels(models));
        }
    }, [hubs]);

    async function loadAllModels() {
        if (!hubs) {
            return;
        }

        const result: Model[] = [];

        const requests = hubs.map(({id}) => request({hubId: id}));
        const resolve = await Promise.all(requests);

        resolve.forEach(models => {
            if (models && models.packages) {
                const modelList = models.packages?.map(item => modelFromApi(item));
                result.push(...modelList);
            }
        })

        return result;
    }

    return allModels;
}

export function useHighlightedModels() {
    const [highlightedModels, setHighlightedModels] = useState<Model[]>();
    const highlights = useRecoilValue(highlightsAtom) || [];
    const {request} = useAuthRequestApi(api.getModel);

    useEffect(() => {
        if (!highlightedModels) {
            fetchModels();
        }
    }, [highlights]);

    async function fetchModels() {
        const models: Model[] = [];

        for (let i = 0; i < highlights.length; i++) {
            const model = await request({packageId: highlights[i]});

            if (model) {
                models.push(modelFromApi(model));
            }
        }

        setHighlightedModels(models);
    }

    return highlightedModels;
}
