import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Password } from '@app/components/Password';
import styles from '@app/components/Password/styles.scss';
import storyStyles from './Password.scss';

export default {
    title: 'Example/Password',
    component: Password,
} as ComponentMeta<typeof Password>;

const Template: ComponentStory<typeof Password> = (args) => {
    return (
        <div className={storyStyles.wrapper}>
            <Password {...args} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    value: '',
    placeholder: 'Password',
    onChange: () => {},
    hasError: false,
    className: styles.textInput,
};