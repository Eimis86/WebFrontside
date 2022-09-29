import React, {useMemo} from 'react';
import styles from './styles.scss';

import {useSearchParams} from 'react-router-dom';
import {Breadcrumb} from '@app/components/Breadcrumb';
import {ContentNarrow, Description, Title} from '@app/layout';
import {SearchData} from './SearchData';
import {SearchEmpty} from './SearchEmpty';
import {useAllModels} from '@app/store/models';
import {useUserHubs} from '@app/store/hubs/actions';

function filterByName<T extends {readonly name: string;}>(filter: string, data: T[]) {
    if (!filter) {
        return data;
    }

    const filterLC = filter.toLocaleLowerCase();
    return data.filter(item => item.name.toLocaleLowerCase().indexOf(filterLC) >= 0);
}

export const SearchResults: React.FC = () => {
    const [searchParams] = useSearchParams();
    const filter = searchParams.get('filter') || '';

    const models = useAllModels();
    const hubs = useUserHubs();

    const filterHubs = useMemo(() => filterByName(filter, hubs || []), [filter, hubs]);
    const filterModels = useMemo(() => filterByName(filter, models || []), [filter, models]);

    return (
        <ContentNarrow>
            <Breadcrumb path={[{ text: 'Home', link: '/' }]}>Search result</Breadcrumb>
            <Title>Search results</Title>
            <Description className={styles.border}>Showing results of <span className={styles.searchResult}>{filter}</span></Description>
            {(filterHubs.length || filterModels.length)
                ? <SearchData hubs={filterHubs} models={filterModels}/>
                : <SearchEmpty/>
            }
        </ContentNarrow>
    );
};
