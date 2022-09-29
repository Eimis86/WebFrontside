import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CircularProgressBar } from '@app/components/ProgressBar';
import storyStyles from './ProgressBar.scss';

export default {
    title: 'Example/ProgressBar',
    component: CircularProgressBar,
} as ComponentMeta<typeof CircularProgressBar>;

const Template: ComponentStory<typeof CircularProgressBar> = (args) => {
    return (
        <div className={storyStyles.wrapper}>
            <CircularProgressBar {...args} />
        </div>
    );
};

export const SircleEmptyBar = Template.bind({});
SircleEmptyBar.args = {
    progress: 0,
    className: '',
};

export const HalfSircleBar = Template.bind({});
HalfSircleBar.args = {
    progress: 50,
    className: '',
};