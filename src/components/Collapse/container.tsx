import React, {useRef} from 'react';
import {useMouseDownOutside} from '@app/utils/useMouseDownOutside';

export const CollapseContainer: React.FC<{
    readonly onClickOutside: () => void;
    readonly className?: string;
}> = ({onClickOutside, className, children}) => {
    const ref = useRef<HTMLDivElement>(null);

    // useFocusOut(ref, () => onFocusOut && onFocusOut());
    useMouseDownOutside(ref, () => onClickOutside());

    return (
        <div className={className} ref={ref}>
            {children}
        </div>
    );
};
