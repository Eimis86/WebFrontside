import React from 'react';

import styles from './styles.scss';
import {Icon} from '@app/components/Icon';
import classnames from 'classnames';


export const Favorite: React.FC<{
    readonly isFavorite: boolean;
    readonly setIsFavorite: (value: boolean) => void;
    readonly className?: string;
}> = ({isFavorite, setIsFavorite, className}) => {
    return (
        <button className={classnames(styles.favorite, className)} onClick={(e) => {
            setIsFavorite(!isFavorite);
        }}>
            <Icon name={isFavorite ? 'heartActive' : 'heartPassive'}/>
        </button>
    );
};
