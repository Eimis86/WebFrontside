import React, {ReactElement} from 'react';
import styles from './styles.scss';

import {Description} from '@app/layout';
import {FieldType} from '@app/utils/useFromData';

export interface RadioItem<T extends FieldType> {
    readonly text: string;
    readonly value: T;
    readonly description?: string;
}

export interface RadioProps<T extends FieldType> {
    readonly value?: T;
    readonly name: string;
    readonly items: RadioItem<T>[];
    readonly onChange?: (value: T) => void;
}

type RadioComponent = <T extends FieldType>(props: RadioProps<T>, context?: any) => ReactElement<any, any> | null;

export const Radio: RadioComponent = ({name, value, items, onChange}) => {
    return (
        <div className={styles.radioGroup}>
            {items.map((item, idx) => (
                <label key={idx} className={styles.radio}>
                    <input
                        type='radio'
                        name={name}
                        checked={value === item.value}
                        onChange={() => onChange && onChange(item.value)}
                    />
                    <div>
                        {item.text}
                        <Description>{item.description}</Description>
                    </div>
                </label>
            ))}
        </div>
    );
};

