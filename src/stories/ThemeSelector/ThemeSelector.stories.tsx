import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeSelector } from '@app/components/ThemeSelector';
import styles from '@app/components/ThemeSelector/styles.scss';

export default {
    title: 'Example/ThemeSelector',
    component: ThemeSelector,
} as ComponentMeta<typeof ThemeSelector>;

const Template: ComponentStory<typeof ThemeSelector> = (args) => <ThemeSelector {...args} />;

export const FirstSelected = Template.bind({});
FirstSelected.args = {
    value: 0,
    onChange: () => {},
    colors: ['white', '#E8E9EC', '#1D2D44', '#0E7C7B'],
    className: styles.themeSelector,
};