import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ToolButton } from '@app/components/Button/toolButton';
// import styles from '@app/components/Button/styles.scss';
// import classnames from 'classnames';

export default {
    title: 'Example/ToolButton',
    component: ToolButton,
    parameters: {
        backgrounds: {
            values: [
                { name: 'white', value: 'var(--color-white)' },
                { name: 'background-color', value: 'var(--background-color)' },
                { name: 'background-color-primary', value: 'var(--background-color-primary)' },
            ],
        },
    },
} as ComponentMeta<typeof ToolButton>;

const Template: ComponentStory<typeof ToolButton> = (args) => <ToolButton {...args} />;

export const Default = Template.bind({});
Default.args = {
    noBorder: true,
    noBackground: true,
    children: 'Tool Button',
    onClick: () => {},
    // className: classnames({
    //     [styles.toolButton]: true,
    //     [styles.toolButtonBorder]: !noBorder,
    //     [styles.toolButtonBackground]: !noBackground
    // })
};