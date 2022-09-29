import React, {ButtonHTMLAttributes} from 'react';
import styles from './styles.scss';

import classnames from 'classnames';

export type ButtonKind = 'primary' | 'secondary' | 'link' | 'outlined' | 'red';
export type ButtonSize = 'medium';

const buttonKindStyle: Record<ButtonKind, string> = {
    primary: styles.buttonPrimary,
    secondary: styles.buttonSecondary,
    link: styles.buttonLink,
    outlined: styles.buttonOutlined,
    red: styles.buttonRed
};

const buttonSizeStyle: Record<ButtonSize, string> = {
    medium: styles.buttonSizeMedium,
};

export interface ButtonProps {
    readonly kind?: ButtonKind;
    readonly size?: ButtonSize;
}

export const Button: React.FC<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({
    kind,
    onClick,
    className,
    children,
    size,
    ...otherProps
}) => (
    <button
        type={otherProps.type || 'button'}
        className={classnames(styles.button, kind && buttonKindStyle[kind], size && buttonSizeStyle[size], className)}
        onClick={onClick}
        {...otherProps}
    >
        {children}
    </button>
);
