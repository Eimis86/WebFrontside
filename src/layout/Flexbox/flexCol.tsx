import React, {HTMLAttributes} from 'react';
import styles from './styles.scss';
import classnames from 'classnames';

type FlexColKind = 'up' | 'down' | 'center' | 'wide' | 'dispersed';
type FlexGap = 'small' | 'medium' | 'large';

const flexColKindMap: Record<FlexColKind, string> = {
    up: styles.flexColumnUp,
    down: styles.flexColumnDown,
    center: styles.flexColumnCenter,
    wide: styles.flexColumnWide,
    dispersed: styles.flexColumnDispersed,
};

const flexGapMap: Record<FlexGap, string> = {
    small: styles.flexGapSmall,
    medium: styles.flexGapMedium,
    large: styles.flexGapLarge,
};

export interface FlexColProps extends HTMLAttributes<HTMLDivElement> {
    readonly className?: string;
    readonly kind?: FlexColKind;
    readonly gap?: FlexGap;
    readonly wrap?: boolean;
}

export const FlexCol: React.FC<FlexColProps> = ({
    className,
    kind,
    gap,
    wrap,
    children,
    ...htmlProps
}) => {

    const classes = classnames(
        className,
        styles.flexColumn,
        kind && flexColKindMap[kind],
        gap && flexGapMap[gap],
        wrap && styles.flexWrap
    );

    return (
        <div
            className={classes}
            {...htmlProps}
        >
            {children}
        </div>
    );
};
