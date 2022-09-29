import React from 'react';
import styles from './styles.scss';
import {Route, Routes} from 'react-router-dom';
import {NavTab, Tabs} from '@app/components/Tabs';
import {AccessPermissions} from './Permissions';
import {AccessMembers} from './Members';
import {AccessGroups} from './Groups';
import {AccessRequests} from './Requests';
import { ContentNarrow, Description, Title} from '@app/layout';
import {FlexCol} from '@app/layout/Flexbox';
import {Breadcrumb} from '@app/components/Breadcrumb';

const TABS: { name: string; url: string; }[] = [
    {name: 'Permissions', url: 'permissions'},
    {name: 'Member list', url: 'members'},
    {name: 'Groups', url: 'groups'},
    {name: 'Requests', url: 'requests'}
];

export const AccessManagement: React.FC = () => {
    return (
        <>
            <ContentNarrow className={styles.accessPage}>
                <Breadcrumb path={[{text: 'Home', link: '/'}]}>
                    Manage access
                </Breadcrumb>

                <FlexCol>
                    <div className={styles.accessHeader}>
                        <Title>Manage access</Title>
                        <Description>Manage your settings and preferences here.</Description>
                    </div>

                    <Tabs className={styles.accessTabList}>
                        {TABS.map((t, idx) => (
                            <NavTab
                                key={idx}
                                to={`${t.url}`}
                            >
                                {t.name}
                            </NavTab>
                        ))}
                    </Tabs>
                </FlexCol>
            </ContentNarrow>
            <div className={styles.accessContent}>
                <Routes>
                    <Route path='permissions' element={<AccessPermissions/>}/>
                    <Route path='members' element={<AccessMembers/>}/>
                    <Route path='groups' element={<AccessGroups/>}/>
                    <Route path='requests' element={<AccessRequests/>}/>
                </Routes>
            </div>
        </>
    );
};
