import React from 'react';
import styles from './styles.scss';
import {Link} from 'react-router-dom';
import classnames from 'classnames';

export const StyledLink: React.FC<{
    readonly to: string;
    readonly className?: string;
}>  = ({to, className, children}) => (
    <Link to={to} className={classnames(styles.button, styles.buttonLink, className)}>
        {children}
    </Link>
);
