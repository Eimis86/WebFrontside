import React, {ReactElement, useEffect, useRef} from 'react';
import styles from './styles.scss';

import classnames from 'classnames';
import {useFocusOut} from '@app/utils/useFocusOut';
import {useMouseDownOutside} from '@app/utils/useMouseDownOutside';
import {Collapse} from '@app/components/Collapse';

interface Item<T> {
    readonly value: T;
    readonly display: string;
    readonly image?: string;
}

export type ComboboxItems<T> = readonly Item<T>[];

export interface ComboboxProps<T> {
    readonly id: string;
    readonly className?: string;
    readonly value: string;
    readonly items: ComboboxItems<T>;
    readonly onSelect: (item?: Item<T>) => void;
    readonly onChange: (filter: string) => void;
    readonly isButtonVisible?: boolean;
    readonly icon?: ReactElement;
    readonly placeholder?: string;
    readonly selectOnBlur?: boolean;
    readonly onFocusChanged?: (isFocused: boolean) => void;
}

export function Combobox<T extends string | number>(props: ComboboxProps<T>): ReactElement | null {
    const items = props.items;

    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>(undefined);
    // const [text, setText] = React.useState<string>('');

    const selectedItemRef = useRef<HTMLLIElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const ref = useRef<HTMLDivElement>(null);

    useFocusOut(ref, () => setIsOpen(false), [isOpen]);
    useMouseDownOutside(ref, () => setIsOpen(false), [isOpen]);

    useEffect(() => {
        if (isOpen && selectedItemRef.current) {
            selectedItemRef.current.scrollIntoView({ block: 'nearest'});
        }

        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen, selectedIndex]);

    useEffect(() => {
        if (isOpen && items.length === 0) {
            setSelectedIndex(undefined);
        }
    }, [isOpen, items])

    const selectAndClose = (idx?: number) => {
        const item = ((idx != undefined) && idx >= 0 && idx < items.length)
            ? items[idx]
            : null;

        setIsOpen(false);
        setSelectedIndex(undefined);
        props.onChange(item ? item.display : '');

        props.onSelect(item || undefined);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;

        setIsOpen(true);
        setSelectedIndex(undefined);
        props.onChange(text);
    };

    const onBlur = () => {
        if (isOpen) {
            selectAndClose(props.selectOnBlur ? selectedIndex : -1);
        }

        props.onFocusChanged && props.onFocusChanged(false);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        const scrollOffset = {
            ArrowUp: -1,
            ArrowDown: 1,
            PageUp: -10,
            PageDown: 10
        };

        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();

            const length = items.length;
            if (length) {
                let newIdx = (selectedIndex ?? -1) + scrollOffset[e.key];
                if (newIdx >= length) {
                    newIdx = 0;
                }
                if (newIdx < 0) {
                    newIdx = length - 1;
                }

                setIsOpen(true);
                setSelectedIndex(newIdx);
            }
        }

        if (e.key === 'Enter') {
            e.preventDefault();

            if (isOpen) {
                selectAndClose(selectedIndex);
            }
        }

        if (e.key === 'Escape') {
            if (isOpen) {
                selectAndClose(-1);
                e.preventDefault();
            }
        }
    };

    const renderListItem = (item: Item<T>, idx: number) => {
        const isSelected = idx === selectedIndex;
        const classes = {
            [styles.comboboxListItem]: true,
            [styles.comboboxListItemSelected]: isSelected
        };

        return (
            <li
                className={classnames(classes)}
                key={item.value}
                ref={isSelected ? selectedItemRef : null}
                id={isSelected ? `combobox-list-${props.id}-item-${idx}` : undefined}
                onMouseDown={() => selectAndClose(idx)}
                role='option'
                tabIndex={-1}
                aria-selected='false'

                data-idx={idx}
                data-value={item.value}
            >
                <img src={item.image} alt={item.display} className={styles.comboboxListImage} />
                {item.display}
            </li>
        );
    };

    return (
        <div
            className={classnames(styles.combobox, props.className)}
            data-stable-name={`combobox-${props.id}`}
            id={`combobox-${props.id}`}
            ref={ref}
        >
            <div
                className={styles.comboboxControl}

                role='combobox'
                aria-expanded={isOpen}
                aria-owns={`combobox-list-${props.id}`}
                aria-haspopup='listbox'
                aria-controls={`combobox-list-${props.id}`}
            >
                {props.icon}
                <input
                    ref={inputRef}
                    className={classnames(styles.comboboxInput)}

                    type='text'
                    value={props.value}

                    tabIndex={0}
                    autoComplete='off'
                    placeholder={props.placeholder}

                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    onFocus={() => {props.onFocusChanged && props.onFocusChanged(true);}}
                    onBlur={onBlur}

                    aria-autocomplete='both'
                    aria-controls={`combobox-list-${props.id}`}
                    aria-activedescendant={isOpen && selectedIndex ? `combobox-list-${props.id}-item-${selectedIndex}` : undefined}
                />
            </div>
            <Collapse
                isOpen={isOpen}
                className={styles.comboboxList}
                transition={'custom'}
            >
                <div
                    id={`combobox-list-${props.id}`}
                >
                    {items.length
                        ? <ul
                            tabIndex={-1}
                            role='listbox'
                            aria-hidden='false'
                            aria-live='polite'
                        >
                            {items.map(renderListItem)}
                        </ul>
                        : <div className={styles.comboboxListEmpty}>
                            <span>No result</span>
                        </div>
                    }
                </div>
            </Collapse>
        </div>
    );
}
