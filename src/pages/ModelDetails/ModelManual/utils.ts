import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

//ToDo: rework with requestAnimationFrame instead of setTimeout
export function useLocateChapter() {
    const [locatedChapter, setLocatedChapter] = useState(-1);
    const {hash} = useLocation();

    useEffect(() => {
        let delay: number | null = null;
        if (hash) {
            const regex = /#c([0-9]+)s([0-9]+)/;
            const match = hash.match(regex);
            if(match) {
                const [, chp] = match;
                setLocatedChapter(parseInt(chp));
                delay = setTimeout(() => {
                    const element = document.querySelector(hash);
                    if(element) {
                        element.scrollIntoView(true);
                    }
                }, 1) as unknown as number;
            }
        }
        return () => {
            delay && clearTimeout(delay);
        };
    }, [hash]);

    return locatedChapter;
}
