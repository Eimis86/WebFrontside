import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.scss';
import classnames from 'classnames';
import {Collapse} from '@app/components/Collapse';
import {useMouseDownOutside} from '@app/utils/useMouseDownOutside';
import {useLoadManual, Chapters} from '@app/store/models';
import {useUnityPlayer, PlayerPosition} from '@app/pages/Viewer/unity';
import {Icon} from '@app/components/Icon';


const ManualContentItem: React.FC<{
    readonly isSelected: boolean;
    readonly onClick: () => void;
    readonly title: string;
}> = ({isSelected, onClick, title}) => (
    <li
        className={classnames(styles.stepItem, isSelected && styles.stepItemSelected)}
        onClick={() => onClick()}
    >
        {isSelected &&
            <button
                type='button'
                className={classnames(styles.button, styles.buttonSm)}
            >
                <Icon name={'manualStepSelected'} className={styles.iconSm}/>
            </button>
        }
        {title}
    </li>
);

const ManualContents: React.FC<{
    readonly chapters: Chapters;
    readonly selected: PlayerPosition;
    readonly onSelected: (chapterId: number, stepId: number) => void;
}> = ({chapters, selected, onSelected}) => {
    const chapter = chapters[selected.chapter];

    return (
        <ul className={styles.stepsList}>
            {chapter.steps.map((step, stepId) => (
                <ManualContentItem
                    key={stepId}
                    isSelected={stepId === selected.step}
                    onClick={() => onSelected(selected.chapter, stepId)}
                    title={`Step ${selected.chapter + 1}.${stepId + 1}`}
                />
            ))}
        </ul>
    );
};

export const UnityManual: React.FC<{
    readonly manualUrl: string;
    readonly className: string;
}> = ({manualUrl, className}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [contentsVisible, setContentsVisible] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    // useFocusOut(ref, () => setListExpanded(false), [listExpanded]);
    useMouseDownOutside(ref, () => setContentsVisible(false), [contentsVisible]);

    const manual = useLoadManual(manualUrl);
    const {state: {isPlaying, position}, ...player} = useUnityPlayer();

    useEffect(() => {
        player.enable();
    }, []);


    if (!manual || !position) {
        return null;
    }

    const chapters = manual.chapters;

    const doPrev = () => {
        if (position.step > 0) {
            player.setPosition({
                chapter: position.chapter,
                step: position.step - 1
            });
        }
        else if (position.chapter > 0) {
            player.setPosition({
                chapter: position.chapter - 1,
                step: chapters[position.chapter - 1].steps.length - 1
            });
        }
    };

    const doNext = () => {
        if (position.step < chapters[position.chapter].steps.length - 1) {
            player.setPosition({
                chapter: position.chapter,
                step: position.step + 1
            });
        } else if (position.chapter < chapters.length - 1) {
            player.setPosition({
                chapter: position.chapter + 1,
                step: 0
            });
        }
    };

    const doPlayPause = () => {
        isPlaying ? player.pause() : player.play();
    };

    const doHideShowIndex = () => {
        setContentsVisible(!contentsVisible);
    };

    const doExpandCollapse = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={classnames(styles.manual, className, isExpanded && styles.manualExpanded)} ref={ref}>
            <button
                type='button'
                className={styles.button}
                onClick={doPrev}
            >
                <Icon name={'manualArrowLeft'} className={styles.icon}/>
            </button>
            <button
                type='button'
                className={classnames(styles.button, styles.buttonLg)}
                onClick={doPlayPause}
            >
                <Icon name={isPlaying ? 'manualPause' : 'manualPlay'} className={styles.iconLg}/>
            </button>
            <button
                type='button'
                className={styles.button}
                onClick={doNext}
            >
                <Icon name={'manualArrowRight'} className={styles.icon}/>
            </button>
            <button
                type='button'
                className={styles.button}
                onClick={doHideShowIndex}
            >
                <Icon name={'manualList'} className={styles.icon}/>
            </button>

            <div className={styles.step}>
                {`Step ${position.chapter + 1}.${position.step + 1}: `}{chapters[position.chapter].steps[position.step]}
            </div>

            <button
                type='button'
                className={styles.button}
                onClick={doExpandCollapse}
            >
                <Icon name={isExpanded ? 'manualArrowDown' : 'manualArrowUp'} className={styles.icon}/>
            </button>

            <Collapse
                isOpen={contentsVisible}
                overflowOnExpanded={true}
                transition={'noAnim'}
            >
                <div className={styles.stepContents}>
                    <ManualContents
                        chapters={chapters}
                        selected={position}
                        onSelected={(chapter, step) => {
                            player.setPosition({chapter, step});
                            setContentsVisible(false);
                        }}
                    />
                </div>
            </Collapse>

        </div>
    );
};

