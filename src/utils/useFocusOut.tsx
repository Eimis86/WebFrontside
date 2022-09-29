import {useEffect, DependencyList, RefObject} from 'react';

export function useFocusOut(
    ref: RefObject<HTMLElement | null>,
    handler: (event: Event) => unknown,
    deps?: DependencyList,
) {
    useEffect(() => {
        function onFocusOut(event: Event) {
            handler(event);
        }

        if (ref.current) {
            ref.current.addEventListener('focusout', onFocusOut);
        }

        return () => {
            if (ref.current) {
                ref.current.removeEventListener('focusout', onFocusOut);
            }
        };
    }, [deps]);
}
