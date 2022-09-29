import React, {useState} from 'react';
import styles from './styles.scss';

import classnames from 'classnames';

export interface ThemeSelectorProps {
    readonly value?: number;
    readonly onChange?: (value: number) => void;
    readonly colors: string[];
    readonly className?: string;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({value, colors, onChange, className}) => {

    return (
        <div
            className={classnames(styles.themeSelector, className)}
        >
            {colors.map((color, index) => (
                <div
                    key={index}
                    style={{backgroundColor: color}}
                    className={classnames({
                        [styles.themeColor]: true,
                        [styles.themeColorSelected]: index === value
                    })}
                    onClick={() => onChange && onChange(index)}
                />
            ))}
        </div>
    );
};
