import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Title } from '@app/layout';

export default {
    title: 'Example/Typography',
    component: Title,
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;
export const TitleText = Template.bind({});
TitleText.args = {
    children: 'Title text'
};
TitleText.storyName = 'Title';