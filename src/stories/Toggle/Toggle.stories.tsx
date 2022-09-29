import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Toggle } from '@app/components/Toggle';

export default {
    title: 'Example/Toggle',
    component: Toggle,
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = (args) => <Toggle {...args} />;

export const Off = Template.bind({});
Off.args = {
    name: 'toggle',
    value: false,
    label: 'Some label',
    onChange: () => {},
    children: <></>,
};

export const On = Template.bind({});
On.args = {
    name: 'toggle',
    value: true,
    label: 'Some label',
    onChange: () => {},
    children: <></>,
};