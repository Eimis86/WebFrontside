import React, {useState} from 'react';
import styles from './styles.scss';

import classnames from 'classnames';
import {Model, Models} from '@app/store/models';
import {useNavigate} from 'react-router-dom';
import {Button} from '@app/components/Button';

const SlideShowItem: React.FC<{model: Model; isSelected: boolean;}> = ({model, isSelected}) => {
    const navigate = useNavigate();
    return (
        <div className={classnames({
            [styles.previewItem]: true,
            [styles.previewItemSelected]: isSelected
        })}>
            <div className={styles.previewItem__info}>
                <div className={styles.previewItem__title}>
                    {model.name}
                </div>
                <div className={styles.previewItem__description}>
                    {model.description}
                </div>
                <div className={styles.previewItem__buttons}>
                    <Button
                        kind='primary'
                        size='medium'
                        onClick={() => navigate(`/models/${model.id}/info`)}
                    >
                        View Model
                    </Button>
                </div>
            </div>
            <div className={styles.previewItem__image}>
                <img src={model.image} alt='{}'/>
            </div>
        </div>
    );
};

export const Slideshow: React.FC<{models: Models;}> = ({models}) => {
    const [selected, setSelected] = useState(0);

    return (<div className={styles.highlight}>
        <div className={styles.highlight__preview}>
            <div className={styles.circle}/>
            {models.map((model, idx) =>
                <SlideShowItem key={idx} model={model} isSelected={idx === selected}/>
            )}
        </div>
        <div className={styles.highlight__gallery}>
            {models.map((model, idx) => (
                <div
                    role='presentation'
                    key={idx}
                    className={classnames({
                        [styles.galleryItem]: true,
                        [styles.galleryItemSelected]: idx === selected
                    })}
                    onClick={() => {setSelected(idx);}}
                >
                    <img className={styles.galleryItem__image} src={model.image} alt='model'/>
                    <div className={styles.galleryItem__name}>
                        {model.name}
                    </div>
                </div>
            ))}
        </div>
    </div>);
};
