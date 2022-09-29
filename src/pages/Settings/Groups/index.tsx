import React, {useState} from 'react';
import styles from './styles.scss';

import {useRecoilValue} from 'recoil';
import {getHubMembers} from '@app/store/hubs';
import {FlexCol, FlexRow} from '@app/layout/Flexbox';
import {MemberCard} from '@app/pages/Settings/Common/member';
import {Button} from '@app/components/Button';
import classnames from 'classnames';
import {Description} from '@app/layout';
import {Maybe} from '@app/utils/maybe';
import {Divider} from '@app/components/Divider';
import {ContentNarrow} from '@app/layout';
import { Icon } from '@app/components/Icon';

export interface GroupProps {
    readonly name: string;
    readonly membersCount: number;
    readonly image: string;
    readonly isSelected?: boolean;
}

export const Group: React.FC<GroupProps> = ({name, membersCount, image, isSelected}) => {
    return (
        <FlexRow
            className={classnames({
                [styles.group]: true,
                [styles.groupSelected]: isSelected
            })}>
            <div className={styles.groupImage}>
                <img src={image} alt={name}/>
            </div>
            <FlexCol className={styles.groupContainer}>
                <b className={styles.groupName}>{name}</b>
                <Description className={styles.memberDescription}>{membersCount} Members</Description>
            </FlexCol>
        </FlexRow>
    );
};

const Groups = [
    {
        id: 0,
        name: 'Group A',
        membersCount: 10,
        image: '/resources/img/group1.png'
    },
    {
        id: 1,
        name: 'Group B',
        membersCount: 150,
        image: '/resources/img/group1.png'
    }
];

export const AccessGroups: React.FC = () => {
    const hubMembers = useRecoilValue(getHubMembers);
    const [selectedGroupId, setSelectedGroupId] = useState<Maybe<number>>(Groups[0].id);

    return (
        <ContentNarrow className={styles.pageContent}>
            <FlexRow className={styles.contentWrapper}>
                <div className={styles.groupsContainer}>
                    <div>
                        <div className={styles.addGroupButton}>
                            <Button kind='primary' size='medium'>Create group</Button>
                        </div>
                        <ul className={styles.groupList}>
                            {Groups.map((group, index) => (
                                <li key={index} onClick={() => setSelectedGroupId(group.id)}>
                                    <Group
                                        key={index}
                                        name={group.name}
                                        membersCount={group.membersCount}
                                        image={group.image}
                                        isSelected={selectedGroupId === group.id}
                                    />
                                    <Divider/>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={styles.membersContainer}>
                    <div className={styles.membersContainerHeader}>
                        <h5 className={styles.membersContainerTitle}>Group members</h5>
                        <div className={styles.membersContainerIcons}>
                            <Icon name='addMember'/>
                            <Icon name='search_l'/>
                        </div>
                    </div>
                    <ul className={styles.memberList}>
                        {hubMembers.filter((member, index) => index >= selectedGroupId).map((member, index) => (
                            <li key={index}>
                                <MemberCard
                                    name={member.name}
                                    email={member.email}
                                    roleId={member.roleId}
                                    image={member.image}
                                />
                                <Divider/>
                            </li>
                        ))}
                    </ul>
                </div>
            </FlexRow>
        </ ContentNarrow>
    );
};
