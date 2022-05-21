import { navigate } from '@app/navigators';
import { setIsLogin } from '@app/screens/Auth/Redux/AuthAction';
import store from '@app/services/redux/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';
const { API_URL } = process.env;
axios.interceptors.request.use(
    (config) => {
        // console.warn('config', config);
        return config;
    },
    (error) => {
        console.warn('error', error);
        return error;
    },
);

const interceptorsHandler = async (
    error: AxiosError,
    _resolve: (value: unknown) => void,
    _reject: (reason?: unknown) => void,
) => {
    if (error) {
        if (error.response?.status === 401) {
            try {
                const refreshToken = await AsyncStorage.getItem('refreshToken');
                console.log('refreshToken', refreshToken);

                const config = { headers: { refreshtoken: refreshToken || '' } };
                const response = await axios.get(API_URL + '/user/refresh', config);
                if (response.data.isSuccess) {
                    console.log('yn', response.data);

                    AsyncStorage.setItem('accessToken', response.data.accessToken);
                    AsyncStorage.setItem('refreshToken', response.data.refreshToken);

                    console.log({ e: error.config });
                    if (error.config && error.config.headers) {
                        error.config.headers.accesstoken = `${response.data.accessToken}`;
                        console.log({ e: error.config });
                        const response1 = await axios.request(error.config);
                        _resolve(response1);
                    } else {
                        _reject(error);
                    }
                } else {
                    AsyncStorage.clear();
                    store.dispatch(setIsLogin(false));
                    store.dispatch({ type: 'RESET_STORE' });
                }
            } catch (er) {
                console.warn('error from interseptor', er);
                AsyncStorage.clear();
                store.dispatch(setIsLogin(false));
                store.dispatch({ type: 'RESET_STORE' });
                navigate('AuthStack');
            }
        } else {
            _reject(error);
        }
    }
};
axios.interceptors.response.use(
    (response) => response,
    async (error) =>
        new Promise((resolve, reject) => {
            interceptorsHandler(error, resolve, reject);
        }),
);
export default axios;
