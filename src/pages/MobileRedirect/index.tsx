import React from 'react';
import {Route, Routes, useParams} from 'react-router-dom';
import {isUndefined} from '@app/utils/maybe';
import {redirectToMobileApp} from '@app/utils/usePlatfromDetector';

export const ShareModelMobileAppRedirection: React.FC = () => {
    const {id} = useParams();
    const modelId = parseInt(id ?? '');

    if (!isUndefined(modelId)) {
        redirectToMobileApp(`${modelId}`);
    }

    return null;
};

export const MobileRedirect: React.FC = () => (
    <Routes>
        <Route path='/models/:id/*' element={<ShareModelMobileAppRedirection/>} />
    </Routes>
);
