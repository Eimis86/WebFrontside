import React, {useRef, useState} from 'react';
import styles from './styles.scss';

import {useParams} from 'react-router-dom';
import {ContentWide, Description} from '@app/layout';
import {FlexRow} from '@app/layout/Flexbox';
import {Icon} from '@app/components/Icon';
import {Collapse, CollapseContainer} from '@app/components/Collapse';
import {HubMenu} from '@app/pages/Hub/HubMenu';
import {Button, ToolButton} from '@app/components/Button';
import {useHub, Hub} from '@app/store/hubs';
import {Breadcrumb} from '@app/components/Breadcrumb';
import {RawImage} from '@app/components/RawImage';
import {ModelList} from '@app/layout/ModelList';
import {Model, useHubModels} from '@app/store/models';
import {addUserFollowedHub, deleteUserFollowedHub, useUserFollowedHubs} from '@app/store/favourites/actions';


interface HubContentProps {
    readonly hub: Hub;
    readonly hubModels: Model[];
}

const HubIcon: React.FC<{hub: Hub;}> = ({hub}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <CollapseContainer className={styles.hubMenu} onClickOutside={() => setIsOpen(false)}>
            <ToolButton onClick={() => setIsOpen(true)}>
                <Icon name='horizontalDots'/>
            </ToolButton>
            <Collapse isOpen={isOpen} className={styles.hubMenuContainer} overflowOnExpanded={true}>
                <HubMenu/>
            </Collapse>
        </CollapseContainer>
    );
};

const HubContent: React.FC<HubContentProps> = ({hub, hubModels}) => {
    const followedHubs = useUserFollowedHubs();
    const isFollow = followedHubs.items?.find(item=>item.id === hub.id);

    const addHubToFollowed = addUserFollowedHub();
    const deleteHubFromFollowed = deleteUserFollowedHub();

    return (
        <ContentWide>
            <Breadcrumb path={[
                {text: 'Home', link: '/'}
            ]}>
                {hub.name}
            </Breadcrumb>
            <FlexRow className={styles.hubHeader} gap='large'>
                <div className={styles.logo}>
                    <RawImage src={hub.imagePreview} alt={hub.name}/>
                </div>
                <div>
                    <h5>{hub.name}</h5>
                    <Description>150 Members</Description>
                </div>
                <HubIcon hub={hub}/>
                <Button
                    kind='primary'
                    size='medium'
                    className={styles.btnFollowHub}
                    onClick={()=>{
                        isFollow ? deleteHubFromFollowed(hub.id) : addHubToFollowed(hub.id);
                    }}
                >
                    {isFollow ? 'Unfollow hub' : 'Follow hub'}
                </Button>
            </FlexRow>

            <div className={styles.hubCatalog}>
                <div className={styles.hubCatalog__header}>Models</div>
                <ModelList items={hubModels}></ModelList>
            </div>
        </ContentWide>
    );
};

export const HubContentRouted: React.FC = () => {
    const params = useParams();
    const id = params.id || '';

    const hub = useHub(id);
    const hubModels = useHubModels(id);

    if (!hub || !hubModels) {
        return null;
    }

    return (<HubContent hub={hub} hubModels={hubModels}/>);
};
