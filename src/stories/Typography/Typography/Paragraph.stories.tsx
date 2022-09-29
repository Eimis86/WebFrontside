import React, {HTMLAttributes} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export const P: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({ children }) => (
    <p>
        {children}
    </p>
);

export default {
    title: 'Example/Typography',
    component: P,
} as ComponentMeta<typeof P>;

const Template: ComponentStory<typeof P> = (args) => <P {...args} />;
export const Paragraph = Template.bind({});
Paragraph.args = {
    children: 'Paragraph text'
};
