/* eslint-disable import/no-extraneous-dependencies */
import Immutable, { isImmutable } from 'immutable';
import { NativeModules, Platform } from 'react-native';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import InitialReducer from './Reducers';
import ReduxFlipper from 'redux-flipper';
// Sagas
import RootSaga from './Saga';

import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
// Initialise Sagas
const sagaMiddleware = createSagaMiddleware();

const initialState = Immutable.Map();
const stateTransformer = (state: any) => {
    if (isImmutable(state)) return state.toJS();
    return state;
};
const loggerMiddleware = createLogger({
    stateTransformer,
    predicate: () => process.env.NODE_ENV === 'development',
});
type Configuration = {
    resolveCyclic: boolean;
};
const defaultConfig: Configuration = { resolveCyclic: true };

const middleware = () => {
    if (__DEV__) {
        const createDebugger = ReduxFlipper(defaultConfig);
        const enhancer = compose(applyMiddleware(createDebugger, sagaMiddleware, loggerMiddleware));
        return enhancer;
    }
    return compose(applyMiddleware(sagaMiddleware));
};

const rootStore = (state, action) => {
    if (action.type === 'RESET_STORE') {
        state = initialState;
    }
    return InitialReducer(state, action);
};
const store = createStore(rootStore, middleware());
sagaMiddleware.run(RootSaga);

export default store;
