import React, {useEffect, useState} from 'react';
import styles from './styles.scss';
import {Chapter, Model, useLoadManual} from '@app/store/models';
import {Link} from 'react-router-dom';
import {Icon} from '@app/components/Icon';
import {Description} from '@app/layout';
import {Button, StyledLink} from '@app/components/Button';
import {Collapse} from '@app/components/Collapse';
import {FlexRow} from '@app/layout/Flexbox';
import classnames from 'classnames';
import {useLocateChapter} from '@app/pages/ModelDetails/ModelManual/utils';

const ManualItem: React.FC<{
    readonly chapter: Chapter;
    readonly isExpanded?: boolean;
    readonly chapterId: number;
    readonly modelId: string;
}> = ({chapter, isExpanded, chapterId, modelId}) => {
    const [isOpen, setIsOpen] = useState(isExpanded);
    const [stepsVisible, setStepsVisible] = useState(isExpanded);

    useEffect(() => {
        if (isExpanded) {
            setIsOpen(true);
            setStepsVisible(true);
        }
    }, [isExpanded]);

    return (
        <div className={classnames(styles.manualChapter)}>
            <FlexRow kind={'wide'} className={styles.header} onClick={() => setIsOpen(!isOpen)}>
                {`${chapterId + 1}. ${chapter.heading}`}
                <Icon name='arrowDown' size={'medium'} className={classnames({
                    [styles.collapseArrowIcon]: true,
                    [styles.collapseArrowIconExpanded]: isOpen
                })}/>
            </FlexRow>
            <Collapse
                isOpen={isOpen}
                overflowOnExpanded={true}
                transition={'noAnim'}
            >
                <div>
                    <Description>{chapter.steps[0]}</Description>
                    <FlexRow kind='left' gap='medium' className={styles.buttonBlock}>
                        <StyledLink
                            to={`/viewer/${modelId}?manual=c${chapterId}s0`}
                            className={styles.playButton}
                        >
                            <Icon name='play'/>
                            View chapter
                        </StyledLink>
                        <Button
                            kind='link'
                            className={classnames({
                                [styles.stepsButton]: true,
                                [styles.stepsButtonSelected]: stepsVisible,
                            })}
                            onClick={() => setStepsVisible(s => !s)}
                        >
                            <Icon name='steps'/>
                            {stepsVisible ? 'Hide steps' : 'Show steps'}
                        </Button>
                    </FlexRow>
                    {stepsVisible &&
                        <div>
                            {chapter.steps.map((s, j) => (
                                <div key={j} className={styles.manualStep}>
                                    <div className={styles.manualStep__header} id={`c${chapterId + 1}s${j+1}`}>
                                        {`${chapterId + 1}.${j+1} - Step`}
                                        <Link to={`/viewer/${modelId}?manual=c${chapterId}s${j}`}>
                                            <Icon name='arrowRight' size={'medium'} className={styles.selectStepArrow}/>
                                        </Link>
                                    </div>
                                    <Description>{s}</Description>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </Collapse>
        </div>
    );
};

export const ModelManual: React.FC<{model: Model;}> = ({model}) => {
    const manual = useLoadManual(model.manual);
    const locatedChapter = useLocateChapter();

    if (!manual) {
        return null;
    }

    const chapters = manual.chapters;

    return (
        <div className={classnames(styles.manual, styles.hiddenScroll)}>
            <div className={styles.manualContent}>
                {chapters.map((item, idx) => (
                    <ManualItem
                        key={idx}
                        chapter={item}
                        chapterId={idx}
                        isExpanded={locatedChapter === (idx + 1)}
                        modelId={model.id}
                    />
                ))}
            </div>
        </div>
    );
};
