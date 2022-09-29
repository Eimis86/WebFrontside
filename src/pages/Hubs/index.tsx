import React from 'react';
import styles from './styles.scss';
import {Route, Routes} from 'react-router-dom';
import {NavTab, Tabs} from '@app/components/Tabs';
import { FollowedHubs } from './FollowedHubs';
import {ContentNarrow, Description, Title } from '@app/layout';
import {OwnHubs} from '@app/pages/Hubs/OwnHubs';
import {Breadcrumb} from '@app/components/Breadcrumb';

const TABS: { title: string; url: string; description?: string }[] = [
    {title: 'My Hubs', url: '', description: 'Something about my hubs.'},
    {title: 'Followed Hubs', url: 'follows', description: 'Something about followed hubs.'},
];

export const Hubs: React.FC = () => {

    const renderTabDescription = () => (
        <Routes>
            {TABS.map((item, idx) => (
                <Route key={idx} path={item.url} element={
                    <>
                        <Breadcrumb path={[{text: 'Home', link: '/'}]}>{item.title}</Breadcrumb>
                        <Title>{item.title}</Title>
                        <Description>{item.description}</Description>
                    </>
                } />
            ))}
        </Routes>
    );

    const renderTabContent = () => (
        <Routes>
            <Route path='' element={<OwnHubs/>}/>
            <Route path='follows' element={<FollowedHubs/>}/>
        </Routes>
    );

    return (
        <ContentNarrow className={styles.container}>
            <div className={styles.hubsHeader}>
                {renderTabDescription()}
            </div>

            <Tabs className={styles.hubsTabList}>
                {TABS.map((t, idx) => (
                    <NavTab
                        key={idx}
                        to={`${t.url}`}
                        end={true}
                    >
                        {t.title}
                    </NavTab>
                ))}
            </Tabs>

            <div className={styles.hubsContent}>
                {renderTabContent()}
            </div>
        </ContentNarrow>
    );
};
