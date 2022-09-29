import React, {useState} from 'react';
import styles from './styles.scss';

import classnames from 'classnames';

export interface TextareaProps {
    readonly value?: string;
    readonly onChange?: (value: string) => void;
    readonly placeholder?: string;
    readonly className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({value, placeholder, onChange, className}) => {

    return (
        <textarea
            className={classnames(styles.textarea, className)}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
        />
    );
};
