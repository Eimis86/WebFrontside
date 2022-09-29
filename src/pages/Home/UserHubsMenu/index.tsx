import React, {useMemo, useRef, useState} from 'react';
import styles from './styles.scss';

import { Icon } from '@app/components/Icon';
import { Hubs } from '@app/store/hubs';
import { Link } from 'react-router-dom';
import {Collapse, CollapseContainer} from '@app/components/Collapse';
import { RawImage } from '@app/components/RawImage';
import {log} from '@app/utils/debug';
import {ListItem} from '@app/components/ListItem';

const filterHubs = (hubs: Hubs, filter: string) => {
    const filterUC = filter.toUpperCase();

    return filter
        ? hubs.filter(m => m.name!.toUpperCase().indexOf(filterUC) >= 0)
        : hubs;
};

export const UserHubsMenu: React.FC<{
    readonly hubs: Hubs;
    readonly selected?: string;
    readonly onSelected: (selectedId?: string) => void;
}> = ({ hubs, selected, onSelected }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>('');

    const filtered = useMemo(() =>
        filterHubs(hubs, filter),
    [filter, hubs]
    );

    const selectedHubName = hubs.find(item => item.id === selected)?.name || 'General Hub';

    return (
        <CollapseContainer className={styles.hubsMenu} onClickOutside={() => setIsOpen(false)}>
            <button
                className={styles.hubsMenu__title}
                type='button'
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup={true}
            >
                {selectedHubName}
                <Icon name='arrowDownThick' className={styles.icon} />
            </button>
            <Collapse isOpen={isOpen} className={styles.hubsMenu__list}>
                <ul className={styles.hubsList}>
                    <li className={styles.hubsList__searchField}>
                        <Icon name='search_m' />
                        <input
                            className={styles.inputBox}
                            placeholder='Search'
                            onChange={(e) => (setFilter(e.target.value))}
                        />
                    </li>
                    <ListItem
                        className={styles.hubsList__item}
                        onSelect={() => {
                            onSelected();
                            setIsOpen(false);
                        }}
                    >
                        {/*<RawImage src={h.imagePreview} alt={h.name} />*/}
                        General hub
                    </ListItem>
                    {filtered.map((h, idx) => (
                        <ListItem
                            key={idx}
                            className={styles.hubsList__item}
                            onSelect={() => {
                                onSelected(h.id);
                                setIsOpen(false);
                            }}
                        >
                            <RawImage src={h.imagePreview} alt={h.name} />
                            {h.name}
                        </ListItem>
                    ))}
                </ul>
            </Collapse>
        </CollapseContainer>
    );
};
