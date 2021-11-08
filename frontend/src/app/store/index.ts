import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// import { createLogger } from "redux-logger";
import reducers from './rootReducers';
import { appMiddleware } from './middlewares/app';
import { coreMiddleware } from './middlewares/core';
import thunkMiddleware from 'redux-thunk';

// const loggerMiddleware = createLogger({
//     predicate: () => process.env.NODE_ENV === 'development',
// });

const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
            ...appMiddleware,
            ...coreMiddleware,
        ),
    ),
);

export default store;
