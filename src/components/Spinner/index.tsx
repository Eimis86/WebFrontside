import React from 'react';

import {ClipLoader} from 'react-spinners';

export const Spinner: React.FC<{
    size?: 'small' | 'large';
    loading?: boolean;
}> = ({size, loading}) => (
    <ClipLoader
        color='var(--color-primary)'
        // loading={userState.state === 'loading'}
        loading={loading}
        css='position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);'
        size='5rem'
        speedMultiplier={1}
    />
);
