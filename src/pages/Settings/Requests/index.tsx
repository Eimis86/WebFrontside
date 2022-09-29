import React from 'react';
import styles from './styles.scss';

import {useRecoilValue} from 'recoil';
import {getHubMembers} from '@app/store/hubs';
import {MemberCard} from '@app/pages/Settings/Common/member';
import {FlexRow} from '@app/layout/Flexbox';
import {Button} from '@app/components/Button';
import {Divider} from '@app/components/Divider';
import {ContentNarrow} from '@app/layout';

export const AccessRequests: React.FC = () => {
    const hubMembers = useRecoilValue(getHubMembers);

    return (
        <ContentNarrow className={styles.pageContent}>
            <div className={styles.contentWrapper}>
                <ul>
                    {hubMembers.map((item, index) => (
                        <li key={index}>
                            <FlexRow kind='wide'>
                                <MemberCard
                                    name={item.name}
                                    email={item.email}
                                    roleId={item.roleId}
                                    image={item.image}
                                />
                                <FlexRow gap='medium'>
                                    <Button kind='primary' size='medium'>Approve</Button>
                                    <Button kind='secondary' size='medium'>Discard</Button>
                                </FlexRow>
                            </FlexRow>
                            <Divider/>
                        </li>
                    ))}
                </ul>
            </div>
        </ContentNarrow>
    );
};
