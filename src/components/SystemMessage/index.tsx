import React from 'react';
import {Description} from '@app/layout';
import {toast} from 'react-toastify';

export const SystemMessage: React.FC<{
    readonly title: string;
    readonly description: string;
}> = ({title, description}) => (
    <>
        <Description>{title}</Description>
        <small>{description}</small>
    </>
);

export function displaySystemMessage(
    kind: 'success' | 'error' | 'warning' | 'info',
    title: string,
    description: string,
    container = 'main'
) {
    toast[kind](
        <SystemMessage
            title={title}
            description={description}
        />,
        {autoClose: 5000, containerId: container});
}
