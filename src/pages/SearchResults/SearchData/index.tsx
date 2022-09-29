import { RawImage } from '@app/components/RawImage';
import { FlexRow } from '@app/layout/Flexbox';
import { Hubs } from '@app/store/hubs';
import { Models } from '@app/store/models';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.scss';
import {HubList} from '@app/layout/HubList/hubList';

interface data {
    hubs: Hubs;
    models: Models;
}

export const SearchData: React.FC<data> = (item) => {
    const navigate = useNavigate();

    return (
        <div>
            <p className={styles.padding}>Hubs:</p>
            {item.hubs.length
                ? <HubList items={item.hubs}/>
                : <p>No result found.</p>
            }

            <FlexRow gap='large' wrap className={styles.containerForItems}>
                {item.models.length
                    ? item.models.map((item) => (
                        <div
                            className={styles.itemsContainer}
                            key={item.id}
                            onClick={() => navigate(`/models/${item.id}`)}
                        >
                            <div className={styles.itemsContainer__backgroundColor}>
                                <img src={item.image} alt={item.name} className={styles.itemsContainer__imageSize} />
                            </div>
                            <div className={styles.itemsContainer__name}>{item.name}</div>
                        </div>
                    ))
                    : <p>No result found.</p>
                }
            </FlexRow>
        </div>
    );
};
