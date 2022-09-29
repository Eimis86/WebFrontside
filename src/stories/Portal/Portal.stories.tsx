import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Portal } from '@app/components/Portal';

export default {
    title: 'Example/Portal',
    component: Portal,
} as ComponentMeta<typeof Portal>;

const Template: ComponentStory<typeof Portal> = (args) => <Portal {...args} />;

export const Port = Template.bind({});
Port.args = {};