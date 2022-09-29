import React, {useEffect, useRef} from 'react';
import styles from './styles.scss';

import classnames from 'classnames';
import {useHref, useLocation, useNavigate, useResolvedPath} from 'react-router-dom';
import {SimpleEventObserver} from '@app/utils/eventObserver';
import {log} from '@app/utils/debug';

const storageEventObserver = new SimpleEventObserver();

export interface TabsProps {
    readonly className?: string;
}

export const Tabs: React.FC<TabsProps> = ({className, children}) => {
    const tabsRef = useRef<HTMLDivElement>(null);

    const [indicatorStyle, setIndicatorStyle] = React.useState({left: 0, width: 0,});

    const updateIndicator = () => {
        if (tabsRef.current) {
            const $selectedTab = (tabsRef.current.querySelector('button[role=tab][data-selected=true]')) as HTMLButtonElement;

            if ($selectedTab && $selectedTab) {
                if (($selectedTab.offsetLeft !== indicatorStyle.left) || ($selectedTab.offsetWidth !== indicatorStyle.width)) {
                    log.Info('[selected tab]', $selectedTab.innerText);
                    setIndicatorStyle({ left: $selectedTab.offsetLeft, width: $selectedTab.offsetWidth });
                }
            }
        }
    };

    // useEffect(() => {
    //     updateIndicator();
    // }, );

    useEffect(() => {
        storageEventObserver.subscribe(updateIndicator);

        return () => {
            storageEventObserver.unsubscribe(updateIndicator);
        };
    }, []);

    return (
        <div
            className={classnames(styles.tabList, className)}
            ref={tabsRef}
        >
            {children}
            <div className={styles.tabIndicator} style={{...indicatorStyle}}/>
        </div>
    );
};

export interface TabItemProps {
    readonly isSelected: boolean;
    readonly onSelect: () => void;
}

export const Tab: React.FC<TabItemProps> = ({onSelect, isSelected, children, ...args}) => {
    return (
        <button
            className={classnames({
                [styles.tabItem]: true,   
                [styles.tabItemSelected]: isSelected
            })}
            type='button'
            onClick={() => onSelect()}
            role='tab'
            aria-selected={isSelected}
            data-selected={isSelected}
            {...args}
        >{children}</button>
    );
};

export interface NavTabProps {
    to: string;
    end?: boolean;
    onSelect?: () => void;
}

export const NavTab: React.FC<NavTabProps> = ({to, end, onSelect, children}) => {
    const {pathname: toPathname} = useResolvedPath(to);
    const {pathname: locationPathname} = useLocation();
    const navigate = useNavigate();

    const isSelected = (toPathname === locationPathname) || !end && locationPathname.startsWith(toPathname)/* && pathname.charAt(toPathname.length) === '/'*/;

    if (isSelected) {
        //todo: rework!!!
        window.setTimeout(() => storageEventObserver.dispatch(), 100);
    }

    const link = useHref(to);

    return (
        <button
            className={classnames({
                [styles.tabItem]: true,
                [styles.tabItemSelected]: isSelected
            })}
            type='button'
            onClick={() => {
                onSelect && onSelect();
                navigate(link);
            }}
            role='tab'
            aria-selected={isSelected}
            data-selected={isSelected}
        >{children}</button>
    );
};
