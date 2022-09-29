import React from 'react';
import styles from './styles.scss';

export const AppLanguage: React.FC = () => {
    return (
        <div className={styles.appLanguage}>
            <div className={styles.appLanguage__header}>
                <div className={styles.headerTitle}>App language</div>
                <div className={styles.headerDescription}>Select your preffered language</div>
            </div>
            <div className={styles.appLanguage__main}>
                <ul className={styles.appLanguage__actions}>
                    <li className={styles.actionItem_active}>English</li>
                    <li className={styles.actionItem}>Lithuanian</li>
                    <li className={styles.actionItem}>Russian</li>
                    <li className={styles.actionItem}>Spanish</li>
                </ul>
            </div>
        </div>
    );
};