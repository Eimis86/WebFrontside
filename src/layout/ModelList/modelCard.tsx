import React, {useState} from 'react';
import styles from './styles.scss';

import {Model} from '@app/store/models';
import {Link} from 'react-router-dom';
import {Favorite} from '@app/components/Favorite';
import {useModelFavorites} from '@app/store/favourites/actions';

export const ModelCard: React.FC<{model: Model;}> = ({model}) => {
    const [loaded, setLoaded] = useState(false);
    const [isFavorite, setIsFavorite] = useModelFavorites(model.id);

    return (
        <div
            key={model.id}
            className={styles.modelCard}
        >
            <Link to={{pathname: `/models/${model.id}/info`}} className={styles.modelCard__link}/>
            <div className={styles.cardImage}>
                <img
                    style={loaded ? {} : {visibility: 'hidden'}}
                    src={model.image}
                    alt={model.name}
                    onLoad={() => setLoaded(true)}
                />
            </div>
            <div className={styles.cardInfo}>
                <div className={styles.titleRow}>
                    <div className={styles.flagRow}>
                        { model.hasManual && <div className={styles.modelFlags}>Manual</div> }
                        { model.hasModel && <div className={styles.modelFlags}>Model</div> }
                    </div>
                    <Favorite
                        isFavorite={isFavorite}
                        setIsFavorite={setIsFavorite}
                        className={styles.favoriteBtn}
                    />
                </div>
                <div className={styles.modelTitle}>{model.name}</div>
                <div className={styles.descriptionRow}>{model.description}</div>
            </div>
        </div>
    );
};
