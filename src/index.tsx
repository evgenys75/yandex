import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {ProvideAuth} from './services/auth';
import { store } from './services/store';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ProvideAuth>
                    <App/>
                </ProvideAuth>
            </Provider>
        </BrowserRouter>
        </React.StrictMode>
    ,
    document.getElementById('root')
);