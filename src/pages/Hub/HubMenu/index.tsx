import React from 'react';
import styles from './styles.scss';

import {Link} from 'react-router-dom';
import {Divider} from '@app/components/Divider';
import {ProgressBar} from '@app/components/ProgressBar';
import {Button} from '@app/components/Button';
import {Description} from '@app/layout';
import {FlexCol} from '@app/layout/Flexbox';

export const HubMenu: React.FC = () => {
    return (
        <div className={styles.hubMenu}>
            <ul className={styles.hubMenu__actions}>
                <li className={styles.actionItem}>
                    <Link to='/preferences'>Preferences</Link>
                </li>
                <li className={styles.actionItem}>
                    <Link to='/access/permissions'>Manage Access</Link>
                </li>
                <li className={styles.actionItem}>Share</li>
                <li className={styles.actionItem}>Open hub</li>
                <li className={styles.actionItem}>Delete hub</li>
                <li className={styles.actionItem}><Divider/></li>
                <li className={styles.actionItem}>
                    <FlexCol gap='small' className={styles.storageBlock}>
                        <div className={styles.subTitle}>Storage</div>
                        <ProgressBar max={15} value={9.5}/>
                        <Description size='small'>9.5 GB of 15.0 GB used</Description>
                        <Button kind='secondary' className={styles.buttonBuy}>Buy storage</Button>
                    </FlexCol>
                </li>
            </ul>
        </div>
    );
};


