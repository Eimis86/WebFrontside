import React, {useEffect, useMemo, useState} from 'react';

import './styles.scss';
import {useLocation, useNavigate} from 'react-router-dom';
import classnames from 'classnames';
import {ViewerOverlay, PreviewOverlay} from '@app/pages/Viewer/overlays';
import {
    PREVIEW_HEIGHT,
    PREVIEW_WIDTH,
    useModelInfo,
    usePreviewPosition,
    ViewerMode
} from '@app/pages/Viewer/utils';
import {UnityCanvas, useUnityPlayer, PlayerPosition} from '@app/pages/Viewer/unity';
import {parseQueryParams} from '@app/utils/useQueryParams';
import {UnityLoadingProgress} from '@app/pages/Viewer/components/Loading';
import {log} from '@app/utils/debug';

type ViewerState = {
    mode: ViewerMode;
    id?: string;
    position?: PlayerPosition;
    headless?: boolean;
};

function parseManualTarget(manual: string) {
    if (manual) {
        const p = manual.match(/c([0-9]+)s([0-9]+)/);

        if (Array.isArray(p) && p.length === 3) {
            const chapter = parseInt(p[1]);
            const step = parseInt(p[2]);
            return {chapter, step};
        }
    }

    return {chapter: 0, step: 0};
}

const ViewerURLRegEx = /^\/(headless-)?viewer\/([\w|-]*)$/;

function stateFromUrl(url: string): ViewerState {
    const [pathname, search] = url.split('?');

    const match = pathname.match(ViewerURLRegEx);

    log.Info('viewer params', match);

    if (!match) {
        return {
            mode: 'preview'
        };
    }


    const headless = !!match[1];
    const id = match[2];

    if (search) {
        const queryParams = parseQueryParams(search);

        if (queryParams.manual) {
            const playerState = parseManualTarget(queryParams.manual);
            return {
                mode: 'player',
                id,
                position: playerState,
                headless
            };
        }
    }

    return {
        mode: 'full',
        id,
        headless
    };
}

function urlFromState(state: ViewerState, position: PlayerPosition): string {
    const baseUrl = state.headless ? '/headless-viewer' : '/viewer';

    if (state.mode === 'full') {
        return `${baseUrl}/${state.id}`;
    }

    if (state.mode === 'player') {
        return `${baseUrl}/${state.id}?manual=c${position.chapter}s${position.step}`;
    }

    return '';
}

export const Viewer: React.FC = () => {
    const navigate = useNavigate();
    const {pathname, search} = useLocation();

    const url = `${pathname}${search}`;
    const params = useMemo(() => {
        const p = stateFromUrl(url);
        log.Info('Viewer', p);
        return p;
    }, [url]);

    const [model, clearModel] = useModelInfo(params.id);
    const [previewPosition, setPreviewPosition] = usePreviewPosition(params.mode);

    //TODO: replace with state inferred from URL
    const [viewerUrl, setViewerUrl] = useState('');

    const {state: playerState, ...player} = useUnityPlayer();

    //when player reopened do update position (if it was also changed)
    useEffect(() => {
        if (params.mode === 'player' && params.position &&
            (params.position?.chapter !== playerState.position?.chapter || params.position?.step !== playerState.position?.step))
        {
            player.setPosition(params.position);
        }

    }, [params.mode]);

    useEffect(() => {
        if (params.mode === 'player' && playerState.position) {
            navigate(urlFromState(params, playerState.position), {replace: true});
        }
    }, [playerState.position]);

    useEffect(() => {
        if (params.mode === 'full' && playerState.isPlaying) {
            player.disable();
        }
    }, [params.mode]);

    const isPreview = (params.mode === 'preview');

    const doAction = (action: string) => {
        switch (action) {
            case 'close':
                player.disable();
                clearModel();
                break;
            case 'restore':
                // model && navigate(`/viewer/${model.id}`, {replace: true});
                model && navigate(viewerUrl, {replace: true});
                break;
            case 'minimize':
                setViewerUrl(url);
                navigate('/', {replace: true});
                break;
        }
    };

    const renderOverlay = () => {
        if (isPreview) {
            return (
                <PreviewOverlay
                    title={model?.name}
                    position={previewPosition}
                    onPositionChanged={setPreviewPosition}
                    onAction={doAction}
                />
            );
        }
        else {
            return (
                <ViewerOverlay
                    onAction={doAction}
                    mode={params.mode}
                    manualUrl={model?.manual}
                />
            );
        }
    };

    return (
        <div
            className={classnames({
                'viewer': true,
                'viewer-full': !isPreview && !params.headless,
                'viewer-preview': isPreview,
                'viewer-headless': params.headless
            })}
            style={isPreview
                ? {
                    width: `${PREVIEW_WIDTH}px`,
                    height: `${PREVIEW_HEIGHT}px`,
                    left: `${previewPosition.x}px`,
                    top: `${previewPosition.y}px`,
                    display: model ? 'block' : 'none'
                }
                : undefined
            }
        >
            {renderOverlay()}
            <UnityLoadingProgress onCancel={() => {
                log.Info('Canceled model loading');
                clearModel();
                navigate(-1);
            }}/>
            <UnityCanvas
                model={model?.url}
            />
        </div>
    );
};
