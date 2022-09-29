import React, {HTMLAttributes} from 'react';
import styles from './styles.scss';
import classnames from 'classnames';

type FlexRowKind = 'left' | 'right' | 'center' | 'wide' | 'dispersed';
type FlexGap = 'small' | 'medium' | 'large';

const flexRowKindMap: Record<FlexRowKind, string> = {
    left: styles.flexRowLeft,
    right: styles.flexRowRight,
    center: styles.flexRowCenter,
    wide: styles.flexRowWide,
    dispersed: styles.flexRowDispersed,
};

const flexGapMap: Record<FlexGap, string> = {
    small: styles.flexGapSmall,
    medium: styles.flexGapMedium,
    large: styles.flexGapLarge,
};

export interface FlexRowProps extends HTMLAttributes<HTMLDivElement> {
    readonly className?: string;
    readonly kind?: FlexRowKind;
    readonly gap?: FlexGap;
    readonly wrap?: boolean;
}

export const FlexRow: React.FC<FlexRowProps> = ({
    className,
    kind,
    gap,
    wrap,
    children,
    ...htmlProps
}) => {

    const classes = classnames(
        className,
        styles.flexRow,
        kind && flexRowKindMap[kind],
        gap && flexGapMap[gap],
        wrap && styles.flexWrap);

    return (
        <div
            className={classes}
            {...htmlProps}
        >
            {children}
        </div>
    );
};
