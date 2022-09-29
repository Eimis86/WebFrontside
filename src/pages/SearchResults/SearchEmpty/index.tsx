import { Icon } from '@app/components/Icon';
import React from 'react';
import styles from './styles.scss';

export const SearchEmpty: React.FC = () => (
    <div className={styles.textAlignment}>
        <Icon name='search_notfound'/>
        <p className={styles.header}>None of files or hubs matched this search</p>
        <p>Try searching something different</p>
    </div>
);
