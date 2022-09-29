import React, {ReactElement, ReactNode, useCallback, useContext, useRef, useState} from 'react';
import styles from './styles.scss';

import {Model} from '@app/store/models';
import {Route, Routes, useNavigate, useParams} from 'react-router-dom';
import {ModelManual} from '@app/pages/ModelDetails/ModelManual';
import {Icon} from '@app/components/Icon';
import {Tabs, NavTab} from '@app/components/Tabs';
import {Button} from '@app/components/Button';
import {ButtonsBlock, ContentNarrow, Title} from '@app/layout';
import {ShareModelWindow} from '@app/pages/ModelDetails/ShareModel';
import {isUndefined} from '@app/utils/maybe';
import {Breadcrumb} from '@app/components/Breadcrumb';
import {useModel} from '@app/store/models';
import {useModelFavorites} from '@app/store/favourites/actions';
import {ModelIndex} from '@app/pages/ModelDetails/ModelIndex';
import {ModelInfo} from '@app/pages/ModelDetails/ModelInfo';
import {Hub, useHub} from '@app/store/hubs';

const Hub: React.FC<{
    hubId: string;
    children: (hub: Hub) => ReactElement;
}> = ({hubId, children}) => {
    const hub = useHub(hubId);

    return hub ? children(hub) : null;
};

export const ModelDetails: React.FC<{
    readonly modelId: string;
}> = ({modelId}) => {
    const navigate = useNavigate();

    const model = useModel(modelId);

    const [isFavorite, setIsFavorite] = useModelFavorites(modelId);

    const renderButtons = useCallback((model: Model) => (
        <ButtonsBlock>
            {model.hasModel && (
                <Button
                    kind='primary'
                    size='medium'
                    onClick={() => navigate(`/viewer/${model.id}`)}
                >
                    View model
                </Button>
            )}
            <ShareModelWindow
                modelId={modelId}
                renderButton={(doOpen) => (
                    <Button
                        kind='link'
                        onClick={() => doOpen()}
                    >
                        <Icon name='share'/>
                        Share
                    </Button>
                )}
            />
            <Button
                kind='link'
                onClick={() => setIsFavorite(!isFavorite)}
            >
                <Icon name={isFavorite ? 'heartActive' : 'heartPassive'}/>
                Favorites
            </Button>
        </ButtonsBlock>
    ), [isFavorite]);

    if (!model) {
        return null;
    }

    return (
        <>
            <ContentNarrow>
                <Hub hubId={model.hubId}>
                    {(hub) => (
                        <Breadcrumb path={[
                            {text: 'Home', link: '/'},
                            {text: hub.name, link: `/hub/${hub.id}`}
                        ]}>
                            {model.name}
                        </Breadcrumb>
                    )}
                </Hub>

                <Title>{model.name}</Title>

                {model.hasManual && (
                    <div className={styles.tabContainer}>
                        <Tabs>
                            <NavTab to='info'>Info</NavTab>
                            <NavTab to='manuals'>Manuals</NavTab>
                            <NavTab to='index'>Index</NavTab>
                        </Tabs>
                    </div>
                )}
                <div className={styles.modelCard}>
                    <div className={styles.modelCard__preview}>
                        <div className={styles.modelImage}>
                            <img src={model.image} alt=''/>
                        </div>
                        <div className={styles.modelButtons}>
                            {renderButtons(model)}
                        </div>
                    </div>
                    <div className={styles.modelCard__content}>
                        <Routes>
                            <Route path='info' element={<ModelInfo model={model}/>}/>
                            <Route path='manuals' element={<ModelManual model={model}/>}/>
                            <Route path='index' element={<ModelIndex model={model}/>}/>
                        </Routes>
                    </div>
                </div>
            </ContentNarrow>
        </>
    );
};

export const ModelDetailsRouted: React.FC = () => {
    const {id} = useParams();
    const modelId = id  ?? '';

    if (isUndefined(modelId)) {
        return null;
    }

    return (
        <ModelDetails modelId={modelId}/>
    );
};
