import React, {AnchorHTMLAttributes} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

const A: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, href}) => (
    <a href={href}>
        {children}
    </a>
);

export default {
    title: 'Example/Typography',
    component: A,
} as ComponentMeta<typeof A>;

const Template: ComponentStory<typeof A> = (args) => <A {...args} />;
export const Link = Template.bind({});
Link.args = {
    children: 'Link text'
};
