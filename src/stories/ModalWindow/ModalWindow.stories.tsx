import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModalWindow } from '@app/components/ModalWindow';
import styles from '@app/components/ModalWindow/styles.scss';
import classnames from 'classnames';

export default {
    title: 'Example/ModalWindow',
    component: ModalWindow,
} as ComponentMeta<typeof ModalWindow>;

const Template: ComponentStory<typeof ModalWindow> = (args) => <ModalWindow {...args} />;

export const Modal = Template.bind({});
Modal.args = {
    size: 'window',
    onEnter: () => {},
    onExit: () => {},
    className: classnames(styles.modalWindow, styles.modalWindowWindow),
    titleText: '',
    titleId: '',
};