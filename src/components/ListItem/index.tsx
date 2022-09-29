import React from 'react';
import styles from './styles.scss';
import classnames from 'classnames';

export interface ListItemProps {
    readonly isSelected?: boolean;
    readonly isDisabled?: boolean;
    readonly onSelect?: () => void;
}

export const ListItem: React.FC<ListItemProps & React.LiHTMLAttributes<HTMLLIElement>> = ({
    isSelected,
    isDisabled,
    onSelect,
    className,
    children,
    ...props
}) => {
    const handleClick = () => {
        onSelect && onSelect();
    };

    return (
        <li
            className={classnames(className, styles.listItem)}
            tabIndex={isDisabled ? undefined : 0}
            onClick={handleClick}
            onKeyUp={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleClick();
                }
            }}
            role='listitem'
            aria-disabled={isDisabled}
            aria-selected={isSelected}
            {...props}
        >
            {children}
        </li>
    );
};
