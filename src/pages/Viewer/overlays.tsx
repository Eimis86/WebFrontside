import React, {useMemo, useState} from 'react';
import classnames from 'classnames';
import {Icon} from '@app/components/Icon';
import {UnityHighlightButton, UnityXRayButton, UnityExpandButton, UnityCrossSectionButton} from '@app/pages/Viewer/components/buttons';
import {Draggable} from '@app/pages/Viewer/components/Draggable';
import {UnityManual} from '@app/pages/Viewer/components/Manual';
import {ViewerMode} from '@app/pages/Viewer/utils';

import {log} from '@app/utils/debug';
import {useUnityState} from '@app/pages/Viewer/unity';

export const PreviewOverlay: React.FC<{
    readonly title?: string;
    readonly position: {x: number; y: number;};
    readonly onPositionChanged: (x: number, y: number) => void;
    readonly onAction: (action: 'restore' | 'close') => void;
}> = ({title, position, onPositionChanged, onAction}) => {
    const [moveOffset, setMoveOffset] = useState({x: 0, y: 0});

    return (
        <>
            <Draggable
                onMoveStart={((x, y) => setMoveOffset({x: position.x - x, y: position.y - y}))}
                onMove={(x, y) => onPositionChanged(x + moveOffset.x, y + moveOffset.y)}
                onMoveEnd={_ => {}}
            />
            <button
                type='button'
                className='button btn-close'
                onClick={() => onAction('close')}
            >
                <Icon name={'close'}/>
            </button>

            <button
                type='button'
                className='button btn-restore'
                onClick={() => onAction('restore')}
            >
                <Icon name={'restore'}/>
            </button>

            <div className={'title'}>
                {title}
            </div>
        </>
    );
};


export const ViewerOverlay: React.FC<{
    readonly onAction: (action: 'minimize' | 'hide-buttons') => void;
    readonly mode: ViewerMode;
    readonly manualUrl?: string;
}> = ({onAction, mode, manualUrl}) => {
    const [uiButtonsVisible, setUIButtonsVisible] = useState(true);

    const unityState = useUnityState();

    const minimizeButton = useMemo(() => (
        <button
            type='button'
            className='button btn-minimize'
            onClick={() => onAction('minimize')}
        >
            <Icon name={'viewerMinimize'}/>
        </button>
    ), []);

    //minimize only, while no model fully loaded
    if (!unityState.isReady || unityState.loading.state !== 'loaded') {
        return (<>
            {minimizeButton}
        </>);
    }

    return (
        <>
            {uiButtonsVisible &&
                <>
                    {minimizeButton}
                    {mode === 'full' && (
                        <div className={classnames('vertical-tools-block', 'vertical-tools-block--visible')}>
                            <UnityXRayButton/>
                            <UnityHighlightButton/>
                            <UnityCrossSectionButton/>
                            <UnityExpandButton/>
                        </div>
                    )}

                    {mode === 'player' && (
                        <div className={classnames('vertical-tools-block', 'vertical-tools-block--visible')}>
                            <UnityXRayButton/>
                            <UnityHighlightButton/>
                        </div>
                    )}
                </>
            }
            <button
                type='button'
                className='button btn-hide-buttons'
                onClick={() => setUIButtonsVisible(!uiButtonsVisible)}
            >
                {uiButtonsVisible
                    ? <Icon name={'viewerHideUI'}/>
                    : <Icon name={'viewerShowUI'}/>
                }
            </button>

            {uiButtonsVisible && (mode === 'player') && manualUrl &&
                <UnityManual manualUrl={manualUrl} className={'manual-container'}/>
            }
        </>
    );
};
