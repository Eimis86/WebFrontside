import React, {useMemo} from 'react';
import styles from './styles.scss';

import classnames from 'classnames';

export interface ProgressBarProps {
    readonly value?: number;
    readonly max: number;
    readonly className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({value = 0, max, className}) => {

    const fillValue = useMemo(() => value / max * 100, [value, max]);

    return (
        <div className={classnames(styles.progressBar, className)}>
            <div className={styles.progressBar__fill} style={{width: `${fillValue}%`}}/>
        </div>
    );
};
