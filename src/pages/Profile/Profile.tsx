import React from 'react';
import styles from './styles.scss';
import { Route, Routes } from 'react-router-dom';
import { NavTab, Tabs } from '@app/components/Tabs';
import { Details } from './Details';
import { Preferences } from './Preferences';
import { ContentNarrow } from '@app/layout';
import { FlexCol } from '@app/layout/Flexbox';
import { Title } from '@app/layout';
import {Breadcrumb} from '@app/components/Breadcrumb';


const TABS: { name: string; url: string; }[] = [
    {name: 'My details', url: 'details'},
    {name: 'Preferences', url: 'preferences'},
];

export const Profile: React.FC = () => {
    return (
        <>
            <ContentNarrow>
                <Breadcrumb path={[
                    {text: 'Home', link: '/'}
                ]}>
                    My profile
                </Breadcrumb>
                <FlexCol>
                    <Title className={styles.profileHeader}>My profile</Title>

                    <Tabs className={styles.profileTabList}>
                        {TABS.map((t, idx) => (
                            <NavTab
                                key={idx}
                                to={`${t.url}`}
                            >
                                {t.name}
                            </NavTab>
                        ))}
                    </Tabs>

                    <div className={styles.profileContent}>
                        <Routes>
                            <Route path='details' element={<Details/>}/>
                            <Route path='preferences' element={<Preferences/>}/>
                        </Routes>
                    </div>
                </FlexCol>
            </ContentNarrow>
        </>
    );
};
