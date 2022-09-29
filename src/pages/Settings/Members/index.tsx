import React, {useState} from 'react';
import styles from './styles.scss';

import {FlexRow} from '@app/layout/Flexbox';
import {Description} from '@app/layout';
import {useRecoilValue} from 'recoil';
import {getHubMembers} from '@app/store/hubs';
import classnames from 'classnames';
import {Maybe} from '@app/utils/maybe';
import {getHubMemberById} from '@app/store/hubs';
import {Button} from '@app/components/Button';
import {Icon} from '@app/components/Icon';
import {MemberCard} from '@app/pages/Settings/Common/member';
import {Divider} from '@app/components/Divider';
import {ContentNarrow} from '@app/layout';
import { Dropdown } from '@app/components/Dropdown';

interface MemberPermissionProps {
    readonly hubId: number;
    readonly memberId: number;
}

const MemberPermission: React.FC<MemberPermissionProps> = ({hubId, memberId}) => {
    const hubMember = useRecoilValue(getHubMemberById(memberId));

    if (!hubMember) {
        return null;
    }

    return (
        <div className={styles.permissions}>
            <div>
                <img src={hubMember.image} className={styles.memberAvatar} alt={hubMember.name}/>
            </div>
            <b className={styles.memberName}>{hubMember.name}</b>
            <Description>{hubMember.email}</Description>
            <div className={styles.permissionItem}>
                <Dropdown
                    items={[
                        {text: 'Group 1', value: '0'},
                        {text: 'Group 2', value: '1'},
                        {text: 'Group 3', value: '2'}
                    ]}
                    placeholder='select group'
                    className={styles.dropdown}
                />
                <div className={styles.makeAdmin}>
                    <div className={styles.makeAdminChecked}>
                        <Icon name='checked'/>
                    </div>
                    Make administrator
                </div>
            </div>
            <Button kind='primary' className={styles.ownershipButton}>Give Hub Ownership</Button>
            <Button kind='secondary' className={styles.deleteMemberButton}>Remove member</Button>
        </div>
    );
};

export const AccessMembers: React.FC = () => {
    const hubMembers = useRecoilValue(getHubMembers);
    const [selected, setSelected] = useState<Maybe<number>>();

    return (
        <ContentNarrow className={styles.pageContent}>
            <FlexRow className={styles.contentWrapper}>
                <div className={styles.membersContainer}>
                    <ul>
                        {hubMembers.map((member, index) => (
                            <li key={index} onClick={() => setSelected(member.id)}>
                                <MemberCard
                                    name={member.name}
                                    email={member.email}
                                    roleId={member.roleId}
                                    image={member.image}
                                    isSelected={member.id === selected}
                                />
                                <Divider/>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.permissionContainer}>
                    {selected !== undefined
                        ? (<MemberPermission hubId={0} memberId={selected}/>)
                        : (<Description className={styles.noSelectedDescription}>Please select a member from the list to manage access for him</Description>)}
                </div>
            </FlexRow>
        </ContentNarrow>
    );
};
