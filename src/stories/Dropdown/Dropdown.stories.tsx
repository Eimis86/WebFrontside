import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Dropdown } from '@app/components/Dropdown';
import styles from '@app/components/Dropdown/styles.scss';
import storyStyles from './Dropdown.scss';

export default {
    title: 'Example/Dropdown',
    component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => {
    return (
        <div className={storyStyles.wrapper}>
            <Dropdown {...args} />
        </div>
    );
};

export const Items = Template.bind({});
Items.args = {
    items: [
        {value: '1', text: 'text 1'},
        {value: '2', text: 'text 2'},
        {value: '3', text: 'text 3'},
    ],
    value: '',
    onChange: () => {},
    placeholder: 'select item',
    closeOnSelect: true,
    className: styles.dropdown,
};

export const NoItems = Template.bind({});
NoItems.args = {
    items: [],
    value: '',
    onChange: () => {},
    placeholder: 'select item',
    closeOnSelect: false,
    className: styles.dropdown,
};