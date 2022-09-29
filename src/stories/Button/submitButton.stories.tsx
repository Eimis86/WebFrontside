import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SubmitButton } from '@app/components/Button/submitButton';

export default {
    title: 'Example/SubmitButton',
    component: SubmitButton,
    parameters: {
        backgrounds: {
            values: [
                { name: 'white', value: 'var(--color-white)' },
                { name: 'background-color', value: 'var(--background-color)' },
                { name: 'background-color-primary', value: 'var(--background-color-primary)' },
            ],
        },
    },
} as ComponentMeta<typeof SubmitButton>;

const Template: ComponentStory<typeof SubmitButton> = (args) => <SubmitButton {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Submit Button',
    className: '',
};

export const Primary = Template.bind({});
Primary.args = {
    type: 'submit',
    kind: 'primary',
    size: 'medium',
    children: 'Submit Button',
    className: '',
};