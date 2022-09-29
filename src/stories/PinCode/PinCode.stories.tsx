import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PinCode } from '@app/components/PinCode';

export default {
    title: 'Example/PinCode',
    component: PinCode,
} as ComponentMeta<typeof PinCode>;

const Template: ComponentStory<typeof PinCode> = (args) => <PinCode {...args} />;

export const SixNumbers = Template.bind({});
SixNumbers.args = {
    size: 6,
    value: '123456',
    onChange: () => {},
};

export const Empty = Template.bind({});
Empty.args = {
    size: 6,
    value: '',
    onChange: () => {},
};