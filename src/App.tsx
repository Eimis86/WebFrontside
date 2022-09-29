import React, {Suspense, useEffect, useState} from 'react';
import { injectStyle } from 'react-toastify/dist/inject-style';

import {AppLoading} from '@app/AppLoading';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';
import {RecoilRoot} from 'recoil';
import {Home} from '@app/pages/Home';
import {Header} from '@app/pages/Header';
import {Viewer} from '@app/pages/Viewer';
import {Footer} from '@app/pages/Footer';
import {ModelDetailsRouted} from '@app/pages/ModelDetails';
import {ApplicationContext, ApplicationContextProps} from '@app/AppContext';
import {AccessManagement} from '@app/pages/Settings';
import {Profile} from '@app/pages/Profile';
import {MainContent} from '@app/layout';
import {Loading} from '@app/layout/Loading';
import {useUserAuthState} from '@app/store/user';
import {Hubs} from '@app/pages/Hubs';
import {HubContentRouted} from '@app/pages/Hub';
import {Preferences} from '@app/pages/Settings';
import {ToastContainer} from 'react-toastify';
import {log} from '@app/utils/debug';
import {AuthenticatePage} from '@app/pages/Login';
import {SearchResults} from './pages/SearchResults';
import {NotificationList} from '@app/pages/NotificationList';
import {MobileRedirect} from '@app/pages/MobileRedirect';

injectStyle();

function getIsMobile ()  {
    return window && (window.screen.width <= 900 || window.innerWidth <= 800);
}

const AppError: React.FC<{ error: Error; }> = ({ error }) => (
    <>
        {JSON.stringify(error.message)}
    </>
);

const ToastContainerMain: React.FC = () => (
    <ToastContainer
        // className={styles.toast}
        style={{width: '80vw'}}
        position='top-center'
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={'light'}
        enableMultiContainer={true}
        containerId={'main'}
    />
);

export const MainLayout: React.FC = () => {
    const {isSigned} = useUserAuthState();

    if (!isSigned) {
        return (
            <AuthenticatePage/>
        );
    }

    return (<>
        <Header/>
        <MainContent>
            <Viewer/>

            <Routes>
                {/*hide all other in view mode*/}
                <Route path='/headless/*' element={null} />
                <Route path='/viewer/:id' element={null} />
                <Route path='/models/:id/*' element={<ModelDetailsRouted/>} />
                <Route path='/access/*' element={<AccessManagement/>} />
                <Route path='/profile/*' element={<Profile/>} />
                <Route path='/preferences' element={<Preferences/>} />
                <Route path='/hubs/*' element={<Hubs/>} />
                <Route path='/hub/:id' element={<HubContentRouted/>} />
                <Route path='/*' element={<Home/>} />
                <Route path='/search' element={<SearchResults/>} />
                <Route path='/notifications' element={<NotificationList/>}/>
            </Routes>
        </MainContent>
        <Footer/>
    </>);
};

export const App: React.FC = () => {
    log.Info('[environment]', process.env.NODE_ENV);
    const [contextInfo, setContextInfo] = useState<ApplicationContextProps>({isMobile: getIsMobile()});

    const onResize = () => {
        setContextInfo({...contextInfo, isMobile: getIsMobile()});
    };

    useEffect(() => {
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <RecoilRoot>
            <ErrorBoundary FallbackComponent={AppError}>
                <Suspense fallback={<AppLoading/>}>
                    <BrowserRouter>
                        <ApplicationContext.Provider value={contextInfo}>
                            <ToastContainerMain/>
                            <Routes>
                                <Route path='/headless-viewer/*' element={<Viewer/>} />
                                <Route path='/*' element={<MainLayout/>} />
                            </Routes>

                            <MobileRedirect/>
                        </ApplicationContext.Provider>
                    </BrowserRouter>
                </Suspense>
                <Loading/>
            </ErrorBoundary>
        </RecoilRoot>
    );
};
