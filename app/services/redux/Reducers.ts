import { combineReducers } from 'redux';
import { authApi } from './api/auth';

const reducers = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
});
export default reducers;
