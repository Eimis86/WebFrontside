import React, { Fragment } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Card } from '@app/components/Card';
import { Button } from '@app/components/Button';
import * as ButtonStories from '../Button/Button.stories';
import { Title } from '@app/layout';
import * as TitleStories from '../Typography/Typography/Title.stories';
import { Description } from '@app/layout';
import * as DescriptionStories from '../Typography/Description/Description.stories';
import { Paragraph } from '../Typography/Typography/Paragraph.stories';

export default {
    title: 'Example/Card',
    component: Card,
    subcomponents: { Title, Description, Button, Paragraph }
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Shadow = Template.bind({});
Shadow.args = {
    hasShadow: true,
    children: 
    <>
        <Title {...TitleStories.TitleText.args} />
        <Description {...DescriptionStories.Small.args} />
        <Paragraph {...Paragraph.args}/>
        <Button {...ButtonStories.Primary.args} />
    </>
};

export const NoShadow = Template.bind({});
NoShadow.args = {
    hasShadow: false,
    children: 
    <>
        <Title {...TitleStories.TitleText.args} />
        <Description {...DescriptionStories.Small.args} />
        <Paragraph {...Paragraph.args}/>
        <Button {...ButtonStories.Primary.args} />
    </>
};