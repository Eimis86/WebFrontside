import React from 'react';
import styles from './headings.scss';

export default {
    title: 'Example/Heading',
    component: '',
};

export const Headings = () => (
    <div className={styles.headings}>
        <h1>Heading text 1</h1>
        <h2>Heading text 2</h2>
        <h3>Heading text 3</h3>
        <h4>Heading text 4</h4>
        <h5>Heading text 5</h5>
        <h6>Heading text 6</h6>
    </div>
);
