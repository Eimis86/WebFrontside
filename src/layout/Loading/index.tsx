import React, {useEffect, useState} from 'react';
import styles from './styles.scss';

import {useLoadingState} from '@app/store/layout';
import {log} from '@app/utils/debug';
import {CircularProgressBar} from '@app/components/ProgressBar';

export const Loading: React.FC = () => {
    const {isLoading} = useLoadingState();
    const [animationState, setAnimationState] = useState<'stop' | 'progress' | 'finishing'>('stop');
    const [timeOut, setTimeOut] = useState(false)

    useEffect(() => {
        if (isLoading === 0) {
            if (animationState === 'progress') {
                setAnimationState('finishing');
                setTimeOut(true)
                setTimeout(() => {
                    setTimeOut(false);
                }, 500);
            }
            if (animationState === 'finishing' && !timeOut) {
                setAnimationState('stop');
            }
        } else {
            setAnimationState('progress');
        }
    }, [isLoading, timeOut])

    return ((animationState !== 'stop')) ? (
        <div className={styles.spinnerContainer}>
            <div className={styles.spinner}>
                <div className={styles.spinner__dot1}></div>
                <div className={styles.spinner__dot2}></div>
            </div>
        </div>
    ) : null;
};
