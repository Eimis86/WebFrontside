import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Collapse } from '@app/components/Collapse/index';
import { Card } from '@app/components/Card';
import * as CardStories from '../Card/Card.stories';
import { Button } from '@app/components/Button';
import * as ButtonStories from '../Button/Button.stories';
// import styles from '@app/components/Collapse/styles.scss';
import storyStyles from './Collapse.scss';

export default {
    title: 'Example/Collapse',
    component: Collapse,
    subcomponents: { Button, Card }
} as ComponentMeta<typeof Collapse>;

const Template: ComponentStory<typeof Collapse> = (args) => {
    return (
        <div className={storyStyles.wrapper}>
            <Button {...ButtonStories.Primary.args} className={storyStyles.btn}/>
            <Collapse {...args}/>
        </div>
    );
};

export const CollapseOpen = Template.bind({});
CollapseOpen.args = {
    children: <Card {...CardStories.Shadow.args} />,
    isOpen: true,
    collapseHeight: '0px',
    onInit: () => {},
    onChange: () => {},
    // className: transition === 'default' && styles.defaultTransition
    overflowOnExpanded: true,
    renderCollapsed: true,
    transition: 'default',
};

export const CollapseClose = Template.bind({});
CollapseClose.args = {
    children: <Card {...CardStories.Shadow.args} />,
    isOpen: false,
    collapseHeight: '0px',
    onInit: () => {},
    onChange: () => {},
    // className: transition === 'default' && styles.defaultTransition
    overflowOnExpanded: true,
    renderCollapsed: true,
    transition: 'default',
};