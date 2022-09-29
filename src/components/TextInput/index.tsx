import React, {ReactElement} from 'react';
import styles from './styles.scss';

import classnames from 'classnames';

interface TextInputOwnProps {
    readonly value?: string;
    readonly onChange?: (value: string) => void;
    readonly placeholder?: string;
    readonly className?: string;
    readonly hasError?: boolean;

    readonly childrenBefore?: ReactElement;
    readonly childrenAfter?: ReactElement;
}

type TextInputProps = TextInputOwnProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
    (
        {
            value,
            placeholder,
            onChange,
            className,
            hasError,
            childrenBefore,
            childrenAfter,
            ...inputProps
        },
        ref) =>
    {
        return (
            <div
                className={classnames({
                    [styles.textInput]: true,
                    [styles.textInputError]: hasError
                }, className)}
            >
                {childrenBefore && (
                    <div className={styles.inputChildren}>{childrenBefore}</div>
                )}
                <input
                    type='text'
                    ref={ref}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    {...inputProps}
                />
                {childrenAfter && (
                    <div className={styles.inputChildren}>{childrenAfter}</div>
                )}
            </div>
        );
    }
);
