import React, {useEffect, useState} from 'react';
import styles from './styles.scss';
import {AllHubCategories, HubCategories} from './Categories';
import {UserHubsMenu} from './UserHubsMenu';
import {Slideshow} from './Slideshow';
import {useHubTags, useUserHubs} from '@app/store/hubs/actions';
import {ContentWide} from '@app/layout';
import {ModelsCatalog} from '@app/pages/Home/Catalog';
import {useSearchParams} from 'react-router-dom';
import {useHighlightedModels} from '@app/store/models';


export const Home: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const hubIdFromUrl = searchParams.get('hubId') || undefined;

    const highlights = useHighlightedModels();
    const hubs = useUserHubs();

    const [selectedHub, setSelectedHub] = useState<string | undefined>(hubIdFromUrl);
    const [selectedCategories, setSelectedCategories] = useState(['all']);

    useEffect(() => {
        setSelectedHub(hubIdFromUrl)
        setSelectedCategories(['all'])
    }, [hubIdFromUrl])

    if (!hubs) {
        return null;
    }

    return (
        <ContentWide className={styles.home}>
            <div className={styles.subMenu}>
                <UserHubsMenu
                    hubs={hubs}
                    selected={selectedHub}
                    onSelected={(selectedId) => {
                        if (selectedId) {
                            searchParams.set('hubId', selectedId);
                        }
                        else {
                            searchParams.delete('hubId');
                        }
                        setSearchParams(searchParams);
                    }}
                />
                {selectedHub
                    ? (<HubCategories hubId={selectedHub} selected={selectedCategories} onSelect={setSelectedCategories}/>)
                    : (<AllHubCategories selected={selectedCategories} onSelect={setSelectedCategories}/>)
                }
            </div>
            {!selectedHub && highlights && (
                <Slideshow models={highlights}/>
            )}
            <ModelsCatalog hubId={selectedHub} categories={selectedCategories}></ModelsCatalog>
        </ContentWide>
    );
};
