import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from './reducers';
import {socketMiddleware} from './middleware';
import {compose} from 'redux';
import {WS_URL} from '../utils/data'
import {wsOrderActions} from './actions/feed';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk, socketMiddleware(WS_URL, wsOrderActions))
);

export const store = createStore(rootReducer, enhancer);
