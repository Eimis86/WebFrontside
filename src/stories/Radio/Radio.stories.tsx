import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Radio } from '@app/components/Radio';

export default {
    title: 'Example/Radio',
    component: Radio,
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => <Radio {...args} />;

export const FirstSelected = Template.bind({});
FirstSelected.args = {
    name: 'models',
    value: '1',
    items: [
        {value: '1', description: 'description', text: 'item 1'},
        {value: '2', description: 'description', text: 'item 2'},
        {value: '3', description: 'description', text: 'item 3'},
    ], 
    onChange: () => {},
};