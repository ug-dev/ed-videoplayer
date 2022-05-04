import AsyncStorage from '@react-native-async-storage/async-storage';
import { all, put, takeLatest } from 'redux-saga/effects';
import appSdk from '../../../services/data';
import { navigate, navigateAndSimpleReset } from '@app/navigators';
import * as AuthAction from './AuthAction';
import * as AuthActionConstants from '../Redux/AuthActionConstant';

function* loginWithPhoneApi({ payload }) {
    yield put(AuthAction.loginLoader(true));
    const sdk = yield appSdk.init();

    try {
        const response = yield sdk.user.login(payload);
        const data = yield response.data;
        console.log('🚀 ~ file: AuthSaga.js ~ line 13 ~ function*loginWithPhone ~ response', response.data);
        yield put(AuthAction.setLoginHash(data?.hash));
    } catch (error) {
        console.log({ error });
    } finally {
        yield put(AuthAction.loginLoader(false));
    }
}

function* verifyOtpApi({ payload }) {
    yield put(AuthAction.otpLoader(true));
    const sdk = yield appSdk.init();

    try {
        const response = yield sdk.user.verifyOtp(payload);
        const data = yield response.data;
        console.log('🚀 ~ file: AuthSaga.js ~ line 30 ~ function*verifyOtpApi ~ data', data);
        if (data.accessToken) AsyncStorage.setItem('accessToken', data.accessToken);
        if (data.refreshToken) AsyncStorage.setItem('refreshToken', data.refreshToken);
        yield put(AuthAction.setUserDetail(data.user));
    } catch (error) {
        console.log({ error });
    } finally {
        yield put(AuthAction.otpLoader(false));
    }
}

function* completeUserProfileApi({ payload }) {
    yield put(AuthAction.infoLoader(true));
    const sdk = yield appSdk.init();

    try {
        const response = yield sdk.user.completeUserProfile(payload);
        const data = yield response.data;
        yield put(AuthAction.setUserDetail(data.user));
        navigateAndSimpleReset('HomeNavigator');

        console.log('🚀 ~ file: AuthSaga.js ~ line 30 ~ function*verifyOtpApi ~ data', data);
    } catch (error) {
        console.log({ error });
    } finally {
        yield put(AuthAction.infoLoader(false));
    }
}

function* getAuthApi({ payload }) {
    yield put(AuthAction.setIsAppLoading(true));
    const sdk = yield appSdk.init();

    try {
        const response = yield sdk.user.getAuth(payload);
        const data = yield response.data;
        yield put(AuthAction.setUserDetail(data.user));
        yield put(AuthAction.setIsLogin(true));
        console.log('🚀 ~ file: AuthSaga.js ~ line 30 ~ function*verifyOtpApi ~ data', data);
    } catch (error) {
        console.log('🚀 ~ file: AuthSaga.js ~ line 66 ~ function*getAuthApi ~ error', error);
    } finally {
        yield put(AuthAction.setIsAppLoading(false));
    }
}

function* userLogoutApi() {
    const sdk = yield appSdk.init();
    const refreshToken = yield AsyncStorage.getItem('refreshToken');
    try {
        console.log('llllll');
        const response = yield sdk.user.logoutUser({ refreshToken });
        console.log(response);
        yield AsyncStorage.removeItem('accessToken');
        yield put(AuthAction.setIsLogin(false));
        yield put(AuthAction.authReset());
        yield put(AuthAction.setIsAppLoading(false));

        navigate('AuthStack');
    } catch (error) {
        console.log('🚀 ~ file: AuthSaga.js ~ line 86 ~ function*userLogoutApi ~ error', error);
    }
}

export default function* AuthWatcher() {
    yield all([
        yield takeLatest(AuthActionConstants.LOGIN_WITH_PHONE, loginWithPhoneApi),
        yield takeLatest(AuthActionConstants.VERIFY_OTP, verifyOtpApi),
        yield takeLatest(AuthActionConstants.COMPLETE_USER_PROFILE, completeUserProfileApi),
        yield takeLatest(AuthActionConstants.GET_AUTH, getAuthApi),
        yield takeLatest(AuthActionConstants.USER_LOGOUT, userLogoutApi),
    ]);
}
