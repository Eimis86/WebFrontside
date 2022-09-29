import React from 'react';
import styles from './styles.scss';
import classnames from 'classnames';

export interface RoundButtonProps {
    readonly title: string;
    readonly isSelected: boolean;
    readonly onClick: () => void;
}

export const RoundButton: React.FC<RoundButtonProps> = ({title, isSelected, onClick}) => {
    return (
        <button
            className={classnames({
                [styles.roundButton]: true,
                [styles.roundButtonSelected]: isSelected
            })}
            onClick={() => onClick()}
        >
            {title}
        </button>
    );
};
