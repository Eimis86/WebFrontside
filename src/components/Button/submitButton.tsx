import React, {ButtonHTMLAttributes} from 'react';
import styles from './styles.scss';

import {Button, ButtonProps} from '@app/components/Button/button';

export const SubmitButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps> = ({
    className,
    children,
    ...otherProps
}) => (
    <Button
        type='submit'
        className={className}
        {...otherProps}
    >
        {children}
    </Button>
);
