import React from 'react';
import styles from './styles.scss';

interface CheckboxOwnProps {
    readonly name: string;
    // readonly checked: boolean;
    readonly value: boolean;
    readonly label?: string;
    readonly onChange?: (value: boolean) => void;
    readonly hasError?: boolean;
}

type CheckboxProps = CheckboxOwnProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>;


export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    (
        {
            name,
            value,
            label,
            onChange,
            hasError,
            children,
            ...inputProps
        },
        ref) =>
    {
        return (
            <label className={styles.checkbox}>
                <input
                    type='checkbox'
                    ref={ref}
                    name={name}
                    checked={value}
                    onChange={() => {onChange && onChange(!value);}}
                    {...inputProps}
                />
                <span className={styles.tick}/>
                { label }
                { children}
            </label>
        );
    }
);
