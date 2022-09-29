import React from 'react';
import styles from './styles.scss';

import {Description} from '@app/layout';
import {Button} from '@app/components/Button';
import {HubList} from '@app/layout/HubList';
import {FlexCol} from '@app/layout/Flexbox';
import {useUserHubs} from '@app/store/hubs';

export const OwnHubs: React.FC = () => {
    const hubs = useUserHubs();

    if (!hubs) {
        return (
            <FlexCol kind='center'>
                <Description>It feels empty in here</Description>
                <Button
                    kind='primary'
                    onClick={() => {}}
                >
                    Create a new hub
                </Button>
            </FlexCol>
        );
    }

    return (
        <HubList items={hubs}/>
    );
};
