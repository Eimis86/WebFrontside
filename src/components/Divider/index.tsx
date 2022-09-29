import React from 'react';
import styles from './styles.scss';

export const Divider: React.FC<{
    readonly text?: string;
}> = ({text}) => (
    text
        ? (
            <div className={styles.dividerBlock}>
                <hr className={styles.dividerHorizontal}/>
                <span className={styles.dividerText}>{text}</span>
            </div>
        )
        : <hr className={styles.dividerHorizontal}/>

);
