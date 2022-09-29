import React from 'react';
import styles from './styles.scss';

interface ToggleOwnProps {
    readonly name: string;
    readonly value: boolean;
    readonly label?: string;
    readonly onChange?: (value: boolean) => void;
    readonly hasError?: boolean;
}

type ToggleProps = ToggleOwnProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>;

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
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
            <label className={styles.toggle}>
                <input
                    type='checkbox'
                    ref={ref}
                    name={name}
                    checked={value}
                    onChange={() => {onChange && onChange(!value);}}
                    {...inputProps}
                />
                <span className={styles.button}/>
                { label }
                { children}
            </label>
        );
    }
);
