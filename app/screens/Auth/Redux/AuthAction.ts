import * as AuthActionConstant from './AuthActionConstant';

export const loginLoader = (payload) => ({
    type: AuthActionConstant.LOGIN_LOADER,
    payload,
});

export const setLoginHash = (payload) => ({
    type: AuthActionConstant.SET_LOGIN_HASH,
    payload,
});

export const setLoginPhone = (payload) => ({
    type: AuthActionConstant.SET_LOGIN_PHONE,
    payload,
});

export const loginWithPhone = (payload) => ({
    type: AuthActionConstant.LOGIN_WITH_PHONE,
    payload,
});

export const verifyOtp = (payload) => ({
    type: AuthActionConstant.VERIFY_OTP,
    payload,
});

export const otpLoader = (payload) => ({
    type: AuthActionConstant.OTP_LOADER,
    payload,
});

export const setUserDetail = (payload) => ({
    type: AuthActionConstant.SET_USER_DETAIL,
    payload,
});

export const completeUserProfile = (payload) => ({
    type: AuthActionConstant.COMPLETE_USER_PROFILE,
    payload,
});

export const infoLoader = (payload) => ({
    type: AuthActionConstant.INFO_LOADER,
    payload,
});

export const setIsLogin = (payload) => ({
    type: AuthActionConstant.SET_IS_LOGIN,
    payload,
});

export const getAuth = () => ({
    type: AuthActionConstant.GET_AUTH,
});

export const setIsAppLoading = (payload) => ({
    type: AuthActionConstant.SET_APP_LOADING,
    payload,
});

export const logOut = () => ({
    type: AuthActionConstant.USER_LOGOUT,
});

export const authReset = () => ({
    type: AuthActionConstant.AUTH_RESET,
});
