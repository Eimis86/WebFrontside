import React from 'react';
import styles from './styles.scss';
import {Link} from 'react-router-dom';
import {Hub} from '@app/store/hubs';
import {RawImage} from '@app/components/RawImage';

export const HubCard: React.FC<Hub> = ({id, name, imagePreview}) => {
    return (
        <div className={styles.hubCard}>
            <Link to={`/hub/${id}`} className={styles.hubCard__link}/>
            <div className={styles.hubCard__image}>
                <RawImage src={imagePreview} alt={name}/>
            </div>
            <div className={styles.hubCard__title}>{name}</div>
        </div>
    );
};
