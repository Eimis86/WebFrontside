import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SystemMessage } from '@app/components/SystemMessage';

export default {
    title: 'Example/SystemMessage',
    component: SystemMessage,
} as ComponentMeta<typeof SystemMessage>;

const Template: ComponentStory<typeof SystemMessage> = (args) => <SystemMessage {...args} />;

export const Message = Template.bind({});
Message.args = {
    title: 'System Message',
    description: 'description',
};
