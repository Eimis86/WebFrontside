import React, {useRef} from 'react';
import styles from './styles.scss';

import {Portal} from '@app/components/Portal';
import classnames from 'classnames';
import FocusLock from 'react-focus-lock';
import {RemoveScroll} from 'react-remove-scroll';
import {Icon} from '@app/components/Icon';
import {ToastContainer} from 'react-toastify';


export interface ModalWindowProps {
    readonly onEnter?: () => void;
    readonly onExit: () => void;

    readonly size?: 'window' | 'full';
    readonly className?: string;

    readonly titleText?: string;
    readonly titleId?: string;
}


export const ModalWindow: React.FunctionComponent<ModalWindowProps> = ({
    size= 'window',
    ...props
}) => {
/*    if (!props.titleText && !props.titleId) {
        throw new Error(
            'modal dialog must have have either `titleText` or `titleId`.'
        );
    }*/

    const container = useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const appContainer = document.getElementById('app-main') as HTMLDivElement;

        appContainer.setAttribute('aria-hidden', 'true');
        props.onEnter && props.onEnter();

        if (container.current) {
            container.current.focus();
        }

        return () => {
            appContainer.setAttribute('aria-hidden', 'false');
            // props.onExit();
        };
    }, []);

    return (
        <Portal>
            <div
                className={
                    classnames({
                        [styles.modalWindow]: true,
                        [styles.modalWindowWindow]: size === 'window',
                        [styles.modalWindowFull]: size === 'full',
                    }, props.className)}
                onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === 'Escape') {
                        props.onExit();
                    }
                }}
            >
                <div
                    className={styles.backdrop}
                    onClick={props.onExit}
                    role='presentation'
                />
                <RemoveScroll>
                    <FocusLock>
                        <div
                            className={styles.windowContent}
                            role='dialog'
                            aria-label={props.titleText}
                            aria-labelledby={props.titleId}
                            aria-modal='true'
                            tabIndex={-1}
                            ref={container}
                        >
                            <ToastContainer
                                // className={styles.toast}
                                style={{width: '100%'}}
                                position='top-center'
                                hideProgressBar={false}
                                newestOnTop
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                // draggable
                                pauseOnHover
                                theme={'light'}
                                enableMultiContainer={true}
                                containerId={'modal'}
                            />
                            {props.children}
                            <div
                                role='button'
                                className={styles.closeButton}
                                onClick={props.onExit}
                                aria-label='Close'
                            >
                                <Icon name='close_xl'/>
                            </div>
                        </div>
                    </FocusLock>
                </RemoveScroll>
            </div>
        </Portal>
    );
};
