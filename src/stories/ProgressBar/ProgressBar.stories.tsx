import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProgressBar } from '@app/components/ProgressBar';
import styles from '@app/components/ProgressBar/styles.scss';
import storyStyles from './ProgressBar.scss';

export default {
    title: 'Example/ProgressBar',
    component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = (args) => {
    return (
        <div className={storyStyles.wrapper}>
            <ProgressBar {...args} />
        </div>
    );
};

export const EmptyBar = Template.bind({});
EmptyBar.args = {
    value: 0,
    max: 100,
    className: styles.progressBar,
};

export const HalfBar = Template.bind({});
HalfBar.args = {
    value: 50,
    max: 100,
    className: styles.progressBar,
};