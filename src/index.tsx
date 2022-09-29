import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import './main.scss';
import './globals.scss';


import {App} from '@app/App';
import {log} from '@app/utils/debug';

const element = (
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

const container = document.getElementById('app-main');

const mount = () => {
    ReactDOM.render(element, container);
};

if (document.readyState === 'loading') {
    log.Info('loading');
    document.addEventListener('DOMContentLoaded', mount);
} else {
    mount();
}
