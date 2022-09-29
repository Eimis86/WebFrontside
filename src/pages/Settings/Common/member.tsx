import React, {useState} from 'react';
import styles from './styles.scss';

import {FlexCol, FlexRow} from '@app/layout/Flexbox';
import classnames from 'classnames';
import {Description} from '@app/layout';

export interface MemberCardProps {
    readonly name: string;
    readonly email: string;
    readonly roleId: number;
    readonly image: string;
    readonly isSelected?: boolean;
}

export const Permissions = ['User', 'Administrator', 'Owner'];

export const MemberCard: React.FC<MemberCardProps> = ({name, email, roleId, image, isSelected}) => {
    return (
        <FlexRow
            gap={'large'}
            className={classnames({
                [styles.memberCard]: true,
                [styles.memberCardSelected]: isSelected
            })}>
            <div className={styles.memberAvatar}>
                <img src={image} alt={name}/>
            </div>
            <FlexCol>
                <b className={styles.memberName}>{name}</b>
                <Description className={styles.memberEmail}>{email}</Description>
                <span className={styles.memberPermission}>{Permissions[roleId]}</span>
            </FlexCol>
        </FlexRow>
    );
};
