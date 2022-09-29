import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FileUpload } from '@app/components/FileUpload';
import { Button } from '@app/components/Button';
import * as ButtonStories from '../Button/Button.stories';
import styles from '@app/components/FileUpload/styles.scss';

export default {
    title: 'Example/FileUpload',
    component: FileUpload,
    subcomponents: {Button},
} as ComponentMeta<typeof FileUpload>;

const Template: ComponentStory<typeof FileUpload> = (args) => <FileUpload {...args} />;


export const Upload = Template.bind({});
Upload.args = {
    accept: ['image/jpeg', 'image/gif', 'image/png'],
    isMultiple: false,
    className: styles.fileUpload,
    onChange: () => {},
    children: <Button {...ButtonStories.Primary.args} />,
};