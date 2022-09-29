import React, {useState} from 'react';
import styles from './styles.scss';

import {Icon} from '@app/components/Icon';
import {ToolButton} from '@app/components/Button';
import classnames from 'classnames';

interface PasswordOwnProps {
    readonly value?: string;
    readonly onChange?: (value: string) => void;
    readonly placeholder?: string;
    readonly className?: string;
    readonly hasError?: boolean;
}

type PasswordProps = PasswordOwnProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

export const Password = React.forwardRef<HTMLInputElement, PasswordProps>(
    (
        {
            value,
            placeholder,
            onChange,
            hasError,
            className,
            ...inputProps
        },
        ref) =>
    {
        const [isVisible, setIsVisible] = useState(false);

        return (
            <div
                className={classnames({
                    [styles.textInput]: true,
                    [styles.textInputError]: hasError
                }, className)}
            >
                <input
                    type={isVisible ? 'text' : 'password'}
                    ref={ref}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    {...inputProps}
                />
                <ToolButton
                    className={styles.switchButton}
                    onClick={() => setIsVisible(!isVisible)}
                >
                    <Icon name='eye'/>
                </ToolButton>
            </div>
        );
    }
);
