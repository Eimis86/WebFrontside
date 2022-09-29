import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Divider } from '@app/components/Divider';
import { Card } from '@app/components/Card';
import * as CardStories from '../Card/Card.stories';
import { P, Paragraph } from '../Typography/Typography/Paragraph.stories';
import storyStyles from './Divider.scss';

export default {
    title: 'Example/Divider',
    component: Divider,
    subcomponents: {Card,Paragraph}
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = (args) => {
    return (
        <Card {...CardStories.NoShadow.args}>
            <div className={storyStyles.cardContainer}>
                <P {...Paragraph.args}/>
                <Divider {...args} />
                <P {...Paragraph.args}/>
            </div>
        </Card>
    );
};

export const NoText = Template.bind({});
NoText.args = {
    text: ''
};

export const Text = Template.bind({});
Text.args = {
    text: 'Text'
};