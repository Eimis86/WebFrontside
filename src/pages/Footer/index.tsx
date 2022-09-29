import React from 'react';
import styles from './styles.scss';

export const Footer: React.FC = () => {
    return (
        <div className={styles.footer}>
            <p>© 2021, UAB Inlusion Netforms, Inc. All rights reserved.</p>
            <div>
                <a href='/'>Terms of Service</a>
                <span> | </span>
                <a href='/'>Privacy Policy</a>
            </div>
        </div>
    );
};
