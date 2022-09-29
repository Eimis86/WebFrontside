import React, {useMemo} from 'react';
import styles from './styles.scss';

import {Dropdown} from '@app/components/Dropdown';
import {Icon} from '@app/components/Icon';

export interface MultiselectItem {
    readonly value: string;
    readonly text: string;
}

export interface MultiselectProps {
    readonly items: MultiselectItem[];
    readonly value?: string[];
    readonly onChange?: (value: string[]) => void;
    readonly placeholder?: string;
    readonly className?: string;
}

const MultiselectItem: React.FC<{
    readonly value: string;
    readonly text: string;
    readonly onDelete: (value: string) => void;
}> = ({value, text, onDelete}) => (
    <li className={styles.multiselectItem}>
        {text}
        <button
            type='button'
            className={styles.btnClose}
            onClick={() => onDelete(value)}
        >
            <Icon name='close_m' className={styles.closeIcon}/>
        </button>
    </li>
);


export const Multiselect: React.FC<MultiselectProps> = ({
    items,
    value = [],
    onChange,
    placeholder,
    className
}) => {
    const allowedItems = useMemo(
        () => items.filter(item => value.indexOf(item.value) < 0),
        [items, value]
    );

    const selectedItems = useMemo(
        () => items.filter(item => value.indexOf(item.value) >= 0),
        [items, value]
    );

    const doAddItem = (item: string) => {
        onChange && onChange([...value, item]);
    };

    const doRemoveItem = (item: string) => {
        onChange && onChange(value.filter(v => v !== item));
    };

    return (
        <div>
            <Dropdown
                items={allowedItems}
                placeholder={placeholder}
                onChange={((item: string) => doAddItem(item))}
                className={className}
            />
            <div className={styles.multiselect}>
                <ul className={styles.multiselectList}>
                    {selectedItems.map((item, idx) =>
                        <MultiselectItem
                            key={idx}
                            value={item.value}
                            text={item.text}
                            onDelete={doRemoveItem}
                        />
                    )}
                </ul>
            </div>
        </div>
    );
};
