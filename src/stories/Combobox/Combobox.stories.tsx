import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Combobox } from '@app/components/Combobox';
import { Icon } from '@app/components/Icon';
import styles from '@app/components/Combobox/styles.scss';

export default {
    title: 'Example/Combobox',
    component: Combobox,
    subcomponents: {Icon},
} as ComponentMeta<typeof Combobox>;

const Template: ComponentStory<typeof Combobox> = (args) => <Combobox {...args}></Combobox>;

export const Default = Template.bind({});
Default.args = {
    id: '',
    className: styles.combobox,
    value: '',
    onChange: () => {},
    items: [],
    isButtonVisible: true,
    icon: <Icon name='search_m'/>,
    placeholder: 'Search',
    selectOnBlur: true,
    onFocusChanged: () => {},
};
