import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Multiselect } from '@app/components/Multiselect';
import styles from '@app/components/Multiselect/styles.scss';
import storyStyles from './Multiselect.scss';

export default {
    title: 'Example/Multiselect',
    component: Multiselect,
} as ComponentMeta<typeof Multiselect>;

const Template: ComponentStory<typeof Multiselect> = (args) => {
    return (
        <div className={storyStyles.wrapper}>
            <Multiselect {...args} />
        </div>
    );
};

export const FirstSelected = Template.bind({});
FirstSelected.args = {
    items: [
        {value: '1', text: 'text 1'},
        {value: '2', text: 'text 2'},
        {value: '3', text: 'text 3'},
    ],
    value: ['1'],
    onChange: () => {},
    placeholder: 'select item',
    className: styles.multiselect,
};