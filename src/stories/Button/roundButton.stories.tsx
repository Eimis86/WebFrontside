import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RoundButton } from '@app/components/Button/roundButton';

export default {
    title: 'Example/RoundButton',
    component: RoundButton,
    parameters: {
        backgrounds: {
            values: [
                { name: 'white', value: 'var(--color-white)' },
                { name: 'background-color', value: 'var(--background-color)' },
                { name: 'background-color-primary', value: 'var(--background-color-primary)' },
            ],
        },
    },
} as ComponentMeta<typeof RoundButton>;

const Template: ComponentStory<typeof RoundButton> = (args) => <RoundButton {...args} />;

export const Selected = Template.bind({});
Selected.args = {
    title: 'Round Button',
    isSelected: true,
    onClick: () => {},
};

export const NotSelected = Template.bind({});
NotSelected.args = {
    title: 'Round Button',
    isSelected: false,
    onClick: () => {},
};
