import React from 'react';
import styles from './styles.scss';

import classnames from 'classnames';

import userUnsigned from './svg/avatarUnsigned.png';
import userSigned from './svg/avatarSigned.png';
import logo from './svg/Logo.svg';
import logoXl from './svg/Logo_lg.svg';
import logoSm from './svg/Logo_m.svg';
import logoNavigation from './svg/Logo_nav.svg';
import logoNavigationPng from './svg/Logo_navigation.png';

import viewerMinimize from './svg/viewer/minimize.svg';
import viewerHideUI from './svg/viewer/hideButtons.svg';
import viewerShowUI from './svg/viewer/showButtons.svg';
import viewerMenuActive from './svg/viewer/menu_active.svg';
import viewerMenuPassive from './svg/viewer/menu_passive.svg';
import viewerHighlightPassive from './svg/viewer/highlight_passive.svg';
import viewerHighlightActive from './svg/viewer/highlight_active.svg';
import viewerXRayPassive from './svg/viewer/xRay_passive.svg';
import viewerXRayActive from './svg/viewer/xRay_active.svg';
import viewerCrossSectionPassive from './svg/viewer/crossSection_passive.svg';
import viewerCrossSectionActive from './svg/viewer/crossSection_active.svg';
import viewerExpandPassive from './svg/viewer/expand_passive.svg';
import viewerExpandActive from './svg/viewer/expand_active.svg';

import manualArrowLeft from './svg/manual/arrow_left.svg';
import manualArrowRight from './svg/manual/arrow_right.svg';
import manualPlay from './svg/manual/play.svg';
import manualPause from './svg/manual/pause.svg';
import manualList from './svg/manual/list.svg';
import manualArrowUp from './svg/manual/arrow_up.svg';
import manualArrowDown from './svg/manual/arrow_down.svg';
import manualStepSelected from './svg/manual/step_selected.svg';

import brandFacebook from './svg/brand_facebook.svg';
import brandInstagram from './svg/brand_instagram.svg';
import brandTwitter from './svg/brand_twitter.svg';

import notificationError from './svg/Notification_error.svg';
import notificationDone from './svg/Notification_done.svg';
import notificationInfo from './svg/Notification_info.svg';

import heartActive from './svg/Heart_active.svg';
import heartPassive from './svg/Heart_passive.svg';
import play from './svg/Play-start.svg';
import close from './svg/Close.svg';
import close_xl from './svg/Close_XL.svg';
import close_l from './svg/Close_L.svg';
import close_sm from './svg/Close_S.svg';
import close_m from './svg/Close_M.svg';
import search_m from './svg/Search_m.svg';
import search_l from './svg/Search_l.svg';
import search_notfound from './svg/Search_notfound.svg';
import sessionActive from './svg/Session_active.svg';
import sessionPassive from './svg/Session_passive.svg';
import notification from './svg/Notification.svg';
import steps from './svg/Steps.svg';
import arrowRight from './svg/Arrow_right.svg';
import arrowLeft from './svg/Arrow_left.svg';
import arrowUp from './svg/Arrow_up.svg';
import arrowDown from './svg/Arrow_down.svg';
import arrowRightSteps from './svg/Arrow_right_steps.svg';
import share from './svg/Share.svg';
import eye from './svg/Eye.svg';
import plus from './svg/Plus.svg';
import verticalDots from './svg/dots_v.svg';
import horizontalDots from './svg/dots_h.svg';
import restore from './svg/Restore.svg';
import arrowDownThick from './svg/Arrow_down_thick.svg';
import qrCode from './svg/QRCode.svg';
import copy from './svg/Copy.svg';
import addMember from './svg/AddMember.svg';
import checked from './svg/Checked.svg';
import MeetingStart from './svg/Start_meeting.svg';
import MeetingJoin from './svg/Join_meeting.svg';

import AnimationCircle from './svg/Animation_Circle.svg';

export const Images = {userUnsigned, userSigned, logoNavigationPng};

export const Logos = {logo, logoSm, logoXl, logoNavigation};

export const Icons = {
    MeetingJoin,
    MeetingStart,
    heartActive,
    heartPassive,
    close_xl,
    close_l,
    close_m,
    close_sm,
    close,
    play,
    search_m,
    search_l,
    search_notfound,
    sessionActive,
    sessionPassive,
    notification,
    steps,
    arrowRight,
    arrowLeft,
    arrowUp,
    arrowDown,
    arrowRightSteps,
    arrowDownThick,
    share,
    eye,
    plus,
    verticalDots,
    horizontalDots,
    restore,
    qrCode,
    copy,
    addMember,
    checked,

    viewerMinimize,
    viewerHideUI,
    viewerShowUI,
    viewerMenuPassive,
    viewerMenuActive,
    viewerHighlightActive,
    viewerHighlightPassive,
    viewerXRayActive,
    viewerXRayPassive,
    viewerCrossSectionActive,
    viewerCrossSectionPassive,
    viewerExpandActive,
    viewerExpandPassive,

    manualArrowLeft,
    manualArrowRight,
    manualPlay,
    manualPause,
    manualList,
    manualArrowUp,
    manualArrowDown,
    manualStepSelected,

    brandFacebook,
    brandInstagram,
    brandTwitter,

    notificationError,
    notificationDone,
    notificationInfo,

    AnimationCircle,
};

export type IconName = keyof typeof Icons;
export type IconSize = 'small' | 'medium' | 'large' | 'xl';

const IconSizeStyleMap: Record<IconSize, string> = {
    small: styles.iconSmall,
    medium: styles.iconMedium,
    large: styles.iconLarge,
    xl: styles.iconXl
};

export const Icon: React.FC<{
    name: IconName;
    size?: IconSize;
    className?: string;
}> = ({name, size,className}) => (
    <span
        className={classnames(styles.icon, className, size && IconSizeStyleMap[size])}
        dangerouslySetInnerHTML={{__html: Icons[name]}}
        role={'presentation'}
        data-icon={name}
    />
);

export const Logo: React.FC<{name: keyof typeof Logos; className?: string;}> = ({name, className}) => (
    <span
        className={classnames(styles.icon, className)}
        dangerouslySetInnerHTML={{__html: Logos[name]}}
        data-icon={name}
    />
);

export const Image: React.FC<{name: keyof typeof Images; className?: string; alt: string;}> = ({name, className, alt}) => (
    <img src={Images[name]} alt={alt} className={classnames(styles.image, className)}/>
);
