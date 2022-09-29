import React from 'react';
import styles from './styles.scss';

import {Hub} from '@app/store/hubs';
import {HubCard} from './hubCard';
import classnames from 'classnames';

export interface HubListProps {
    readonly items: Hub[];
    readonly className?: string;
}

export const HubList: React.FC<HubListProps> = ({items, className}) => {
    return (
        <div className={classnames(className, styles.hubList)}>
            {items.map((item, idx) => (
                <HubCard key={item.id} {...item}/>
            ))}
        </div>
    );
};
