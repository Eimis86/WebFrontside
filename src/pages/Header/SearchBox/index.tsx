import React, {useMemo, useState} from 'react';
import styles from './styles.scss';

import {Combobox, ComboboxItems} from '@app/components/Combobox';
import {Icon} from '@app/components/Icon';
import classnames from 'classnames';
import {useNavigate} from 'react-router-dom';
import {useAllModels} from '@app/store/models';
import {useHubsAll} from '@app/store/hubs';


export const SearchBox: React.FC<{ className?: string; }> = ({ className }) => {
    const navigate = useNavigate();

    const allModels = useAllModels() || [];
    const allHubs = useHubsAll() || [];

    const [filter, setFilter] = useState('');

    const items = useMemo(() => {
        const filterUC = filter.toUpperCase();
        const models = allModels
            .filter(item => item.name.toUpperCase().indexOf(filterUC) >= 0)
            .map(item => ({
                value: `/models/${item.id}`,
                display: item.name,
                image: item.image
            }));

        const hubs = allHubs
            .filter(item => item.name.toUpperCase().indexOf(filterUC) >= 0)
            .map(item => ({
                value: `/hub/${item.id}`,
                display: item.name,
                image: `data:image/png;base64,${item.imagePreview}`
            }));

        return [...models, ...hubs].sort((a, b) => a.display.localeCompare(b.display));

    }, [allModels, allHubs, filter])

    return (
        <Combobox
            id='search'
            value={filter}
            onChange={setFilter}
            onSelect={(item) => {
                if (item) {
                    navigate(item.value);
                }
                else navigate(`/search?filter=${filter}`)
                setFilter('')
            }}
            className={styles.searchBox}
            items={items}
            icon={<Icon name='search_m'/>}
            placeholder='Search'
        />
    );
};


