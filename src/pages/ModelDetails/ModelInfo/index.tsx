import React from 'react';
import {Model} from '@app/store/models';
import {Description} from '@app/layout';

export const ModelInfo: React.FC<{model: Model;}> = ({model}) => {
    return (
        <Description>{model?.description}</Description>
    );
};
