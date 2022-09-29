import React, {ButtonHTMLAttributes} from 'react';
import styles from './styles.scss';

import classnames from 'classnames';

export interface ToolButtonProps {
    readonly noBorder?: boolean;
    readonly noBackground?: boolean;
}

export const ToolButton: React.FC<ToolButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({
    noBorder,
    noBackground,
    onClick,
    className,
    children,
    ...otherProps
}) => (
    <button
        className={classnames({
            [styles.toolButton]: true,
            [styles.toolButtonBorder]: !noBorder,
            [styles.toolButtonBackground]: !noBackground
        }, className)}
        onClick={onClick}
        type={otherProps.type || 'button'}
        {...otherProps}
    >
        {children}
    </button>
);
