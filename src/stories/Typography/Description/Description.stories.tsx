import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Description } from '@app/layout';

export default {
    title: 'Example/Description',
    component: Description,
} as ComponentMeta<typeof Description>;

const Template: ComponentStory<typeof Description> = (args) => <Description {...args} />;

export const Small = Template.bind({});
Small.args = {
    size: 'small',
    children: 'Description text',
};

export const Large = Template.bind({});
Large.args = {
    size: 'large',
    children: 'Description text',
};
