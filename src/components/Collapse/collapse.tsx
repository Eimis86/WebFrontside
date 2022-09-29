import React, {useState, useEffect, useRef, useReducer, CSSProperties, ReactNode} from 'react';
import styles from './styles.scss';

import classnames from 'classnames';
import {log} from '@app/utils/debug';
import {useForwardRefs} from '@app/utils/useForwardRef';

type State = 'collapsed' | 'collapsing' | 'expanding' | 'expanded';

export interface CollapseProps {
    isOpen?: boolean;
    className?: string;
    collapseHeight?: string;
    onChange?: (state: string) => void;
    onInit?: (state: string) => void;
    overflowOnExpanded?: boolean;
    renderCollapsed?: boolean;
    transition?: 'noAnim' | 'default' | 'custom';
    children?: ReactNode | ((collapseState: State) => ReactNode);
}

// const DefaultTransition = 'height 280ms cubic-bezier(0.4, 0, 0.2, 1)';

function nextFrame(callback: () => void) {
    requestAnimationFrame(function() {
        requestAnimationFrame(callback);
    });
}

export const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>(
    ({
        children,
        isOpen,
        collapseHeight = '0px',
        onInit,
        onChange,
        className,
        overflowOnExpanded,
        renderCollapsed = true, //Just for testing reason
        transition = 'default'
    }, ref) => {
        const getCollapsedVisibility = () => (collapseHeight === '0px' ? 'hidden' : undefined);
        const [, forceUpdate] = useReducer(_ => _ + 1, 0);

        const elementRef = useForwardRefs<HTMLDivElement>(ref);
        const [callbackTick, setCallbackTick] = useState(0);

        // Avoiding setState to control when stuff are updated.
        // Might not be needed.
        const state = useRef<{collapse: State; style: CSSProperties;}>({
            collapse: isOpen ? 'expanded' : 'collapsed',
            style: {
                height: isOpen ? '' : collapseHeight,
                visibility: isOpen ? undefined : getCollapsedVisibility()
            }
        }).current;

        useEffect(() => {
            onInit && onInit(state.collapse);
        }, [elementRef]);


        useEffect(() => {
            if (callbackTick && onChange) {
                onChange(state.collapse);
            }
        }, [callbackTick]);


        function setCollapsed() {
            if (!elementRef.current) return; // might be redundant

            state.collapse = 'collapsed';

            log.Info('setCollapsed');

            state.style = {
                height: collapseHeight,
                visibility: getCollapsedVisibility()
            };
            forceUpdate();

            setTimeout(() => setCallbackTick(Date.now), 0); // callback and re-render
        }

        function setCollapsing() {
            if (!elementRef.current) return; // might be redundant

            if (transition == 'noAnim') {
                return setCollapsed();
            }

            // Update state
            state.collapse = 'collapsing';

            log.Info('setCollapsing');

            state.style = {
                height: getElementHeight(),
                visibility: undefined
            };
            forceUpdate();

            nextFrame(() => {
                if (!elementRef.current) return;
                if (state.collapse !== 'collapsing') return;

                state.style = {
                    height: collapseHeight,
                    visibility: undefined
                };
                //forceUpdate();
                setCallbackTick(Date.now); // callback and re-render
            });
        }

        function setExpanding() {
            if (!elementRef.current) return; // might be redundant

            if (transition === 'noAnim') {
                return setExpanded();
            }

            // Updatetate
            state.collapse = 'expanding';

            log.Info('setExpanding');

            nextFrame(() => {
                if (!elementRef.current) return; // might be redundant
                if (state.collapse !== 'expanding') return;

                state.style = {
                    height: getElementHeight(),
                    visibility: undefined
                };
                // forceUpdate();

                setCallbackTick(Date.now); // callback and re-render
            });
        }

        function setExpanded() {
            if (!elementRef.current) return; // might be redundant

            // Update state
            state.collapse = 'expanded';

            log.Info('setExpanded');

            state.style = {
                height: '',
                visibility: undefined
            };
            forceUpdate();

            setTimeout(() => setCallbackTick(Date.now), 0); // callback and re-render
        }

        function getElementHeight() {
            return elementRef.current ? `${elementRef.current.scrollHeight}px` : 0;
        }

        function onTransitionEnd({ target, propertyName }: React.TransitionEvent<HTMLDivElement>) {
            log.Info('onTransitionEnd.test', state.collapse, propertyName);
            if (target === elementRef.current && propertyName === 'height') {
                const styleHeight = elementRef.current.style.height;

                log.Info('onTransitionEnd', state.collapse, propertyName, styleHeight);

                switch (state.collapse) {
                    case 'expanding':
                        if (styleHeight === '' || styleHeight === collapseHeight)
                            // This is stale, a newer event has happened before this could execute
                            log.Warn(`onTransitionEnd height unexpected ${styleHeight}`, 'ignore setExpanded');
                        else setExpanded();
                        break;
                    case 'collapsing':
                        if (styleHeight === '' || styleHeight !== collapseHeight)
                            // This is stale, a newer event has happened before this could execute
                            log.Warn(`onTransitionEnd height unexpected ${styleHeight}`, 'ignore setCollapsed');
                        else setCollapsed();
                        break;
                    default:
                        log.Warn('Ignored in onTransitionEnd', state.collapse);
                }
            }
        }

        // getDerivedStateFromProps
        const didOpen = state.collapse === 'expanded' || state.collapse === 'expanding';

        if (!didOpen && isOpen) setExpanding();

        if (didOpen && !isOpen) setCollapsing();
        // END getDerivedStateFromProps

        const overflow =
            state.collapse === 'expanded' && overflowOnExpanded ? '' : 'hidden';

        const computedStyle: React.CSSProperties = {
            overflow: overflow,
            // transition: transition,
            ...state.style
        };

        const renderChildren = () => {
            if (state.collapse === 'collapsed' && !renderCollapsed) {
                return null;
            }

            if (typeof children === 'function') {
                return children(state.collapse);
            }

            return <>{children}</>;
        };

        return (
            <div
                ref={elementRef}
                style={computedStyle}
                onTransitionEnd={(event) => onTransitionEnd(event)}
                className={classnames(className, transition === 'default' && styles.defaultTransition)}
            >
                {renderChildren()}
            </div>
        );
    });
