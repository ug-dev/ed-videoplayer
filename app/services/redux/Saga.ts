import { all, fork } from 'redux-saga/effects';
import AuthWatcher from '../../screens/Auth/Redux/AuthSaga';

export default function* rootSaga() {
    yield all([fork(AuthWatcher)]);
}
