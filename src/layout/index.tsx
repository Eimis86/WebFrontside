import React, {HTMLAttributes} from 'react';
import styles from './styles.scss';
import classnames from 'classnames';

export const MainContent: React.FC<{className?: string;}> = ({className, children}) => (
    <div className={classnames(styles.mainContent, className)}>
        {children}
    </div>
);


export const ContentNarrow: React.FC<{className?: string;}> = ({className, children}) => (
    <div className={classnames(styles.contentNarrow, className)}>
        {children}
    </div>
);

export const ContentWide: React.FC<{className?: string;}> = ({className, children}) => (
    <div className={classnames(styles.contentWide, className)}>
        {children}
    </div>
);

export const Description: React.FC<{readonly size?: 'small' | 'large';} & HTMLAttributes<HTMLDivElement>> = ({
    size,
    className,
    children,
    ...htmlProps
}) => (
    <div
        className={classnames({
            [styles.description]: true,
            [styles.descriptionSmall]: size === 'small',
            [styles.descriptionLarge]: size === 'large'
        }, className)}
        {...htmlProps}
    >
        {children}
    </div>
);

export const Title: React.FC<HTMLAttributes<HTMLDivElement>> = ({className, children, ...htmlProps}) => (
    <h2 className={classnames(styles.title, className)} {...htmlProps}>
        {children}
    </h2>
);


export const ButtonsBlock: React.FC<HTMLAttributes<HTMLDivElement>> = ({className, children, ...htmlProps}) => (
    <div className={classnames(styles.buttonsBlock, className)} {...htmlProps}>
        {children}
    </div>
);
