import React from 'react';
import styles from './styles.scss';

import {useUserFollowedHubs} from '@app/store/favourites/actions';
import {Description} from '@app/layout';
import {Button} from '@app/components/Button';
import {HubList} from '@app/layout/HubList';
import {useNavigate} from 'react-router-dom';

export const FollowedHubs: React.FC = () => {
    const {items} = useUserFollowedHubs();
    const navigate = useNavigate();


    if (!items.length) {
        return (
            <div className={styles.container}>
                <Description className={styles.text}>It feels empty in here</Description>
                <Button
                    kind='primary'
                    size='medium'
                    onClick={() => {navigate('/searchHub');}}
                >
                    Search for Hubs
                </Button>
            </div>
        );
    }

    return (
        <HubList items={items}/>
    );
};
