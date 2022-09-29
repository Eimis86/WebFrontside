import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tabs } from '@app/components/Tabs';
import { NavTab } from '@app/components/Tabs';
import { BrowserRouter } from 'react-router-dom';
import styles from '@app/components/Tabs/styles.scss';
import classnames from 'classnames';

export default {
    title: 'Example/Tabs',
    component: Tabs,
    subcomponents: {NavTab},
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Menu = Template.bind({});
Menu.args = {
    className: classnames(styles.tabItem,styles.tabItemSelected),
    children: 
        <BrowserRouter>
            <NavTab to='/tab1' end={true}>Tab 1</NavTab>
            <NavTab to='/tab2'>Tab 2</NavTab>
        </BrowserRouter>,
};