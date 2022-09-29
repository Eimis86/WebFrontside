import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextInput } from '@app/components/TextInput';
// import styles from '@app/components/TextInput/styles.scss';
import storyStyles from './TextInput.scss';
// import classnames from 'classnames';

export default {
    title: 'Example/TextInput',
    component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => {
    return (
        <div className={storyStyles.wrapper}>
            <TextInput {...args} />
        </div>
    );
};

export const Empty = Template.bind({});
Empty.args = {
    value: '',
    onChange: () => {},
    placeholder: 'some text here...',
    // className: classnames(styles.textInput, hasError && styles.textInputError),
    hasError: false,
    childrenBefore: <></>,
    childrenAfter: <></>,
};