import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import reducers from './rootReducers';
import { appMiddleware } from './middlewares/app';
import { coreMiddleware } from './middlewares/core';
import thunkMiddleware from 'redux-thunk';

const loggerMiddleware = createLogger({
    predicate: () => true,
});

const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware,
            ...appMiddleware,
            ...coreMiddleware,
        ),
    ),
);

export default store;
