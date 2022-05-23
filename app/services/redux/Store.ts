/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import ReduxFlipper from 'redux-flipper';
import InitialReducer from './Reducers';

import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authApi } from './api/auth';

const initialState = {};
// const loggerMiddleware = createLogger({
//     predicate: () => __DEV__,
// });
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

const apiMiddleware = [authApi.middleware];
const store = configureStore({
    reducer: rootStore,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            __DEV__ ? [thunk, ReduxFlipper(defaultConfig), ...apiMiddleware] : [thunk, ...apiMiddleware],
        ),
    devTools: __DEV__,
});

setupListeners(store.dispatch); // NOTE this addition

export default store;
