import React from 'react';
import styles from './styles.scss';
import {Model} from '@app/store/models';
import {ModelCard} from '@app/layout/ModelList/modelCard';
import classnames from 'classnames';

export interface ModelListProps {
    readonly items: Model[];
    readonly className?: string;
}

export const ModelList: React.FC<ModelListProps> = ({items, className}) => {
    return (
        <div className={classnames(className, styles.modelList)}>
            {items.map((item, idx) => (
                <ModelCard key={item.id} model={item}/>
            ))}
        </div>
    );
};
