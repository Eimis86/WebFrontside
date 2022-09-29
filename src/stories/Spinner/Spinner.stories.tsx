import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Spinner } from '@app/components/Spinner';

export default {
    title: 'Example/Spinner',
    component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />;

export const Small = Template.bind({});
Small.args = {
    size: 'small',
    loading: true,
};

export const Large = Template.bind({});
Large.args = {
    size: 'large',
    loading: true,
};