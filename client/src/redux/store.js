import { createBrowserHistory } from 'history'
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import config from '../config/config';
import createRootReducer from './rootReducer';

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
    const store = createStore(
        createRootReducer(history),
        preloadedState,
        config.env === 'dev' ? composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk)) :
            compose(applyMiddleware(routerMiddleware(history), thunk))
    )

    return store;
};

