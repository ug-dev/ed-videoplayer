import { combineReducers } from 'redux';
import { authApi } from './api/auth';
import { favouriteApi } from './api/favourite';
import { homeApi } from './api/home';
import { subscriptionApi } from './api/subscription';

const reducers = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [favouriteApi.reducerPath]: favouriteApi.reducer,
});
export default reducers;
