import { AuthReducer } from '@app/screens/Auth/Redux/AuthReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    auth: AuthReducer,
});
export default reducers;
