import React from 'react';
import styles from './styles.scss';
import classnames from 'classnames';
import {Link} from 'react-router-dom';

export interface BreadcrumbProps {
    readonly path: {
        readonly text: string;
        readonly link: string;
    }[];
    readonly className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
    path,
    className,
    children
}) => {
    return (
        <nav aria-label='breadcrumb'>
            <ul className={classnames(styles.breadcrumb, className)}>
                {path.map((item, id) => (
                    <li key={id} className={styles.breadcrumbItem}>
                        <Link to={item.link}>{item.text}</Link>
                    </li>
                ))}
                <li className={styles.breadcrumbItem}>
                    {children}
                </li>
            </ul>
        </nav>
    );
};
