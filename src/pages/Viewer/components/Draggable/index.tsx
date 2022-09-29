import React, {useState} from 'react';
import styles from './styles.scss';

import classnames from 'classnames';


export const Draggable: React.FC<{
    readonly onMoveStart: (x: number, y: number) => void;
    readonly onMove: (x: number, y: number) => void;
    readonly onMoveEnd: (x: number, y: number) => void;
}> = ({onMoveStart, onMove, onMoveEnd}) => {
    const [isDragging, setDragging] = useState(false);

    return (
        <div
            className={classnames({
                [styles.draggable]: true,
                [styles.draggableDragging]: isDragging
            })}
            // onDragStart={onDragStart}
            // onDrag={onDrag}
            // onDragEnd={onDragEnd}

            onMouseDown={(e) => {
                onMoveStart(e.pageX, e.pageY);
                setDragging(true);
                e.preventDefault();
            }}
            onMouseMove={(e) => {
                if (isDragging) {
                    onMove(e.pageX, e.pageY);
                    e.preventDefault();
                }
            }}
            onMouseUp={(e) => {
                onMoveEnd(e.pageX, e.pageY);
                setDragging(false);
                e.preventDefault();
            }}

            onTouchStart={(e: React.TouchEvent) => {
                onMoveStart(e.touches[0].pageX, e.touches[0].pageY);
                setDragging(true);
                e.preventDefault();
            }}
            onTouchMove={(e: React.TouchEvent) => {
                if (isDragging) {
                    onMove(e.touches[0].pageX, e.touches[0].pageY);
                    e.preventDefault();
                }
            }}
            onTouchEnd={(e: React.TouchEvent) => {
                onMoveEnd(e.touches[0].pageX, e.touches[0].pageY);
                setDragging(false);
                e.preventDefault();
            }}

            role='application'
            aria-grabbed={isDragging}
        />
    );
};
