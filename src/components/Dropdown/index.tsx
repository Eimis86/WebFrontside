import React, {useMemo, useRef, useState} from 'react';
import styles from './styles.scss';

import {useFocusOut} from '@app/utils/useFocusOut';
import {useMouseDownOutside} from '@app/utils/useMouseDownOutside';
import {Icon} from '@app/components/Icon';
import {Collapse} from '@app/components/Collapse';
import classnames from 'classnames';

export interface DropdownItem {
    readonly value: string;
    readonly text: string;
}

export interface DropdownProps {
    readonly items: DropdownItem[];
    readonly value?: string;
    readonly onChange?: (value: string) => void;
    readonly placeholder?: string;
    readonly closeOnSelect?: boolean;
    readonly className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
    items,
    value,
    onChange,
    placeholder,
    closeOnSelect,
    className
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useFocusOut(ref, () => setIsOpen(false), [isOpen]);
    useMouseDownOutside(ref, () => setIsOpen(false), [isOpen]);

    const text = useMemo(
        () => items.find(item => item.value === value)?.text,
        [value]
    );

    const toggleDropdown = () => setIsOpen(!isOpen);

    const onKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowUp':
                setIsOpen(true);
                e.preventDefault();
                break;
            case 'ArrowDown':
                setIsOpen(true);
                e.preventDefault();
                break;
            case 'Enter':
                setIsOpen(false);
                e.preventDefault();
                break;
            case 'Escape':
                setIsOpen(false);
                e.preventDefault();
                break;
        }
    };

    return (
        <div className={styles.dropdown} ref={ref}>
            <div
                role='listbox'
                tabIndex={0}
                className={classnames(styles.dropdownInput, className)}
                onClick={toggleDropdown}
                onKeyDown={onKeyDown}
            >
                <span className={styles.dropdownInput__value}>{
                    text || <div className={styles.placeholder}>{placeholder}</div>
                }</span>
                <Icon name='arrowDown' className={classnames(styles.dropdownInput__tickIcon, isOpen && styles.dropdownInput__tickIconExpanded)}/>
            </div>
            <Collapse isOpen={isOpen} className={styles.dropdownSelector}>
                <ul>
                    {items.map((item, idx) =>
                        <li
                            key={idx}
                            onClick={() => {
                                onChange && onChange(item.value);
                                closeOnSelect && setIsOpen(false);
                            }}
                        >{item.text}</li>
                    )}
                </ul>
            </Collapse>
        </div>
    );
};
