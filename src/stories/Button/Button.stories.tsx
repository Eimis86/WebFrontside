import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '@app/components/Button/button';
// import styles from '@app/components/Button/styles.scss';
// import classnames from 'classnames';

export default {
    title: 'Example/Button',
    component: Button,
    parameters: {
        backgrounds: {
            values: [
                { name: 'white', value: 'var(--color-white)' },
                { name: 'background-color', value: 'var(--background-color)' },
                { name: 'background-color-primary', value: 'var(--background-color-primary)' },
            ],
        },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    kind: 'primary',
    size: 'medium',
    children: 'Primary',
    onClick: () => {},
    // className: classnames(styles.button, kind && buttonKindStyle[kind], size && buttonSizeStyle[size])
};

export const Secondary = Template.bind({});
Secondary.args = {
    kind: 'secondary',
    size: 'medium',
    children: 'Secondary',
    onClick: () => {},
    // className: classnames(styles.button, kind && buttonKindStyle[kind], size && buttonSizeStyle[size])
};

export const Link = Template.bind({});
Link.args = {
    kind: 'link',
    size: 'medium',
    children: 'Link',
    onClick: () => {},
    // className: classnames(styles.button, kind && buttonKindStyle[kind], size && buttonSizeStyle[size])
};

export const Outlined = Template.bind({});
Outlined.args = {
    kind: 'outlined',
    size: 'medium',
    children: 'Outlined',
    onClick: () => {},
    // className: classnames(styles.button, kind && buttonKindStyle[kind], size && buttonSizeStyle[size])
};

export const Red = Template.bind({});
Red.args = {
    kind: 'red',
    size: 'medium',
    children: 'Red',
    onClick: () => {},
    // className: classnames(styles.button, kind && buttonKindStyle[kind], size && buttonSizeStyle[size])
};
