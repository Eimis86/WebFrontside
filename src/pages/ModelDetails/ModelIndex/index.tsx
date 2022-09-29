import React from 'react';
import styles from './styles.scss';

import classnames from 'classnames';
import {Model, IndexTerms, useLoadManual} from '@app/store/models';
import {Link} from 'react-router-dom';


const Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function getTerms(index: IndexTerms) {
    const items = [...index];
    const sortedTerms = items.sort((a, b) => a.name.localeCompare(b.name));
    const letters = [...new Set(sortedTerms.map(t => t.name.charAt(0)))];
    const data = letters.map(l => ({
        letter: l,
        terms: sortedTerms.filter(t => t.name.charAt(0) === l)
    }));

    return {data, letters};
}

export const ModelIndex: React.FC<{model: Model;}> = ({model}) => {
    const manual = useLoadManual(model.manual);

    if (!manual) {
        return null;
    }

    const index = manual.index;

    const {data, letters} = getTerms(index);

    return (
        <div className={styles.modelIndex}>
            <div className={classnames(styles.modelIndex__content, styles.hiddenScroll)}>
                {data.map((d, i) => (
                    <div key={i}>
                        <div className={styles.indexLetter} id={d.letter}>{d.letter}</div>
                        {d.terms.map((t, j) => (
                            <div key={j}>
                                <div className={styles.indexText}>{t.name}</div>
                                <div className={styles.indexLinks}>
                                    {t.chapters.map((c, k) => (
                                        <Link key={k} to={`/models/${model.id}/manuals#c${c.replace('.','s')}`}>{c}</Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className={styles.modelIndex__alphabet}>
                {Alphabet.map(l => (
                    <div key={l}>
                        {letters.includes(l)
                            ? <a href={`/models/${model.id}/index#${l}`}>{l}<span>{l}</span></a>
                            : l
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};
