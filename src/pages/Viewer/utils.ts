import {useEffect, useState} from 'react';

import {useAuthRequestApi} from '@app/store/utils';
import {api} from '@app/requests';
import {CONST} from '@app/const';

export const PREVIEW_WIDTH = 325;
export const PREVIEW_HEIGHT = 195;

function getScreenExtents() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
}

export type ViewerMode = 'preview' | 'full' | 'player';

export function usePreviewPosition(mode: ViewerMode): [{x: number; y: number;}, (x: number, y: number) => void] {
    const screen = getScreenExtents();
    const [previewPosition, setPreviewPosition] = useState({x: screen.width - PREVIEW_WIDTH - 16, y: screen.height - PREVIEW_HEIGHT - 48});

    //refresh position when minimized/restored
    useEffect(() => {
        setPreviewPosition({x: screen.width - PREVIEW_WIDTH - 16, y: screen.height - PREVIEW_HEIGHT - 48});
    }, [mode]);

    const updatePosition = (x: number, y: number) => {
        setPreviewPosition({
            x: Math.min(Math.max(x, 0), screen.width - PREVIEW_WIDTH),
            y: Math.min(Math.max(y, 0), screen.height - PREVIEW_HEIGHT)
        });
    };

    return [previewPosition, updatePosition];
}
type UnityModel = {
    readonly url: string;
    readonly name: string;
    readonly manual?: string;
};

function modelUrl(modelId: string) {
    return `${CONST.API_BASE_URL}/api/ixr/${modelId}`;
}

export function useModelInfo(id?: string): [UnityModel | undefined, () => void] {
    const {request} = useAuthRequestApi(api.getModel);
    const [model, setModel] = useState<UnityModel>();

    useEffect(() => {
        if (id) {
            setModel(prevState => ({
                ...prevState,
                name: 'loading...',
                url: modelUrl(id)
            }));
            request({packageId: id}).then(data => {
                if (data) {
                    const assets = data.assets;
                    const manual = assets?.find(item => item.contentType==='application/json')?.url;

                    setModel({
                        url: modelUrl(id),
                        name: data.name || '',
                        manual: manual || undefined,
                    });
                }
            });
        }

    }, [id]);

    const clear = () => setModel(undefined);

    return [model, clear];
}
