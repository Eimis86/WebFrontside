import { useEffect, DependencyList, RefObject } from 'react';

export function useMouseDownOutside(
    ref: RefObject<HTMLElement | null>,
    handler: (event: MouseEvent) => unknown,
    deps?: DependencyList,
) {
    useEffect(() => {
        function onMousedown(event: MouseEvent) {
            const target = event.target;

            if (ref.current && target instanceof Node && !ref.current.contains(target)) {
                handler(event);
            }
        }

        document.addEventListener('mousedown', onMousedown);

        return () => {
            document.removeEventListener('mousedown', onMousedown);
        };
    }, deps);
}
