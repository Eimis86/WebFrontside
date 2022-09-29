import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Textarea } from '@app/components/Textarea';
import styles from '@app/components/Textarea/styles.scss';

export default {
    title: 'Example/Textarea',
    component: Textarea,
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args) => <Textarea {...args} />;

export const Empty = Template.bind({});
Empty.args = {
    value: '',
    placeholder: '',
    onChange: () => {},
    className: styles.textarea,
};

export const Placeholder = Template.bind({});
Placeholder.args = {
    value: '',
    placeholder: 'some text here...',
    onChange: () => {},
    className: styles.textarea,
};

export const Filled = Template.bind({});
Filled.args = {
    value: 'some text here',
    placeholder: 'some text here...',
    onChange: () => {},
    className: styles.textarea,
};