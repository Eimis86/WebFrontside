import React, {useEffect, useState} from 'react';
import styles from './styles.scss';

import {CircularProgressBar} from '@app/components/ProgressBar';
import { Button } from '@app/components/Button';
import {useUnityPlayer, useUnityState} from '@app/pages/Viewer/unity';
import {log} from '@app/utils/debug';

interface UnityLoadingProgressProps {
    readonly onCancel: () => void;
}

export const UnityLoadingProgress: React.FC<UnityLoadingProgressProps> = (props) => {
    const {loading, ...unityState} = useUnityState();
    const {state: playerState, ...player} = useUnityPlayer();

    const [terminated, setTerminated] = useState(false);

    useEffect(() => {
        //in the player mode await manual loaded and only then terminate
        const isPlayerMode = !!playerState.position;

        if (terminated && !isPlayerMode) {
            log.Info('loading terminated');
            setTerminated(false);
            props.onCancel();
        }

        if (terminated && isPlayerMode && playerState.isReady) {
            log.Info('loading terminated', playerState);
            player.disable();
            setTerminated(false);
            props.onCancel();
        }


    }, [terminated, playerState]);

    if (!unityState.isReady) {
        return null;
    }

    //ToDo: include terminated into loading state
    if (!terminated && (loading.state !== 'progress')) {
        return null;
    }

    return (
        <div className={styles.unityLoadingOverlay}>
            <CircularProgressBar
                className={styles.unityLoadingProgress}
                progress={loading.progress * 100}
            />
            <div className={styles.upperText}>
                Loading model
            </div>
            <div className={styles.lowerText}>
                Downloading all needed assets...
            </div>
            <Button
                kind={'secondary'}
                className={styles.btnBelowLoading}
                onClick={()=> {
                    setTerminated(true);
                }}>
                Cancel
            </Button>
        </div>
    );
};
