/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import ReduxFlipper from 'redux-flipper';
import InitialReducer from './Reducers';

import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

const initialState = {};
const loggerMiddleware = createLogger({
    predicate: () => __DEV__,
});
type Configuration = {
    resolveCyclic: boolean;
};
const defaultConfig: Configuration = { resolveCyclic: true };

const rootStore = (state, action) => {
    if (action.type === 'RESET_STORE') {
        state = initialState;
    }
    return InitialReducer(state, action);
};
const store = configureStore({
    reducer: rootStore,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(__DEV__ ? [thunk, loggerMiddleware, ReduxFlipper(defaultConfig)] : [thunk]),
    devTools: __DEV__,
});

export default store;
