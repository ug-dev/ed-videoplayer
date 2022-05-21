import Immutable from 'immutable';
import * as AuthActionConstant from './AuthActionConstant';

interface AuthReducerInterface {
    loginLoader: boolean;
    loginHash: null | object;
    loginPhone: null | number;
    otpLoader: boolean;
    infoLoader: boolean;
    user: object | null;
    isLogin: boolean;
    isAppLoading: boolean;
}

const initialStateRaw: AuthReducerInterface = {
    loginLoader: false,
    loginHash: null,
    loginPhone: null,
    otpLoader: false,
    user: null,
    infoLoader: false,
    isLogin: false,
    isAppLoading: true,
};

const initialState = Immutable.Map(initialStateRaw);

export const AuthReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case AuthActionConstant.LOGIN_LOADER: {
            return state.set('loginLoader', payload);
        }
        case AuthActionConstant.SET_LOGIN_HASH: {
            return state.set('loginHash', payload);
        }
        case AuthActionConstant.SET_LOGIN_PHONE: {
            return state.set('loginPhone', payload);
        }
        case AuthActionConstant.OTP_LOADER: {
            return state.set('otpLoader', payload);
        }
        case AuthActionConstant.SET_USER_DETAIL: {
            return state.set('user', payload);
        }
        case AuthActionConstant.INFO_LOADER: {
            return state.set('infoLoader', payload);
        }
        case AuthActionConstant.SET_IS_LOGIN: {
            return state.set('isLogin', payload);
        }
        case AuthActionConstant.SET_APP_LOADING: {
            return state.set('isAppLoading', payload);
        }
        case AuthActionConstant.AUTH_RESET: {
            return initialState;
        }

        default:
            return state;
    }
};
