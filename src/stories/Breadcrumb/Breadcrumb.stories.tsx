import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Breadcrumb } from '@app/components/Breadcrumb';
import { BrowserRouter } from 'react-router-dom';
import styles from '@app/components/Breadcrumb/styles.scss';

export default {
    title: 'Example/Breadcrumb',
    component: Breadcrumb,
} as ComponentMeta<typeof Breadcrumb>;

const Template: ComponentStory<typeof Breadcrumb> = (args) => (
    <BrowserRouter>
        <Breadcrumb {...args} />
    </BrowserRouter>
);

export const ShortPath = Template.bind({});
ShortPath.args = {
    path: [
        {text: 'Home', link: '/'}
    ],
    children: 'My Page',
    className: styles.breadcrumb,
};