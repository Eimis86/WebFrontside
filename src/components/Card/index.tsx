import React from 'react';
import styles from './styles.scss';

import classnames from 'classnames';

export const Card: React.FC<{hasShadow?: boolean;}> = ({hasShadow, children}) => (
    <div className={classnames({
        [styles.card]: true,
        [styles.cardShadow]: hasShadow
    })}>
        {children}
    </div>
);
