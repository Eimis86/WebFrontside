import React from 'react';
import styles from './styles.scss';

import { Icon } from '../Icon';

export const CircularProgressBar: React.FC<{
    readonly className?: string;
    readonly progress?: number;
}> = ({ className, progress }) => {
    return (
        <div className={className}>
            <Icon name='AnimationCircle' className={styles.circularAnimation}></Icon>
            {(progress !== undefined) && (<div className={styles.circularText}>{`${Math.floor(progress)}%`}</div>)}
        </div>
    );
};
