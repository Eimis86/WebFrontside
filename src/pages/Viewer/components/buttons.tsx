import React from 'react';
import {Icon, IconName} from '@app/components/Icon';
import classnames from 'classnames';
import {UnityFeatures, useUnityFeature} from '@app/pages/Viewer/unity';

export const UnityToggleFeatureButton: React.FC<{
    readonly className?: string;
    readonly iconPassive: IconName;
    readonly iconActive: IconName;
    readonly featureName: UnityFeatures;
}> = ({className, iconPassive, iconActive, featureName}) => {
    const [isActive, setIsActive] = useUnityFeature(featureName);

    return (
        <button
            type='button'
            className={classnames('button', className)}
            onClick={() => {setIsActive(!isActive);}}
        >
            <Icon name={isActive ? iconActive : iconPassive}/>
        </button>
    );
};

export const UnityXRayButton: React.FC<{className?: string;}> = ({className}) => (
    <UnityToggleFeatureButton
        className={className}
        iconActive={'viewerXRayActive'}
        iconPassive={'viewerXRayPassive'}
        featureName={UnityFeatures.xRay}
    />
);

export const UnityHighlightButton: React.FC<{className?: string;}> = ({className}) => (
    <UnityToggleFeatureButton
        className={className}
        iconActive={'viewerHighlightActive'}
        iconPassive={'viewerHighlightPassive'}
        featureName={UnityFeatures.highlight}
    />
);

export const UnityExpandButton: React.FC<{className?: string;}> = ({className}) => (
    <UnityToggleFeatureButton
        className={className}
        iconActive={'viewerExpandActive'}
        iconPassive={'viewerExpandPassive'}
        featureName={UnityFeatures.expand}
    />
);

export const UnityCrossSectionButton: React.FC<{className?: string;}> = ({className}) => (
    <UnityToggleFeatureButton
        className={className}
        iconActive={'viewerCrossSectionActive'}
        iconPassive={'viewerCrossSectionPassive'}
        featureName={UnityFeatures.crossSection}
    />
);
