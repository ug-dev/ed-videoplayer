import AsyncStorage from '@react-native-async-storage/async-storage';
import SDK from './SDK';
import { Config, DEFAULT_API_CONFIG } from './SDK/api.config';

const ApiSDK = {
    async init() {
        const accessToken: string = (await AsyncStorage.getItem('accessToken')) || '';
        console.log('🚀 ~ file: index.ts ~ line 8 ~ init ~ accessToken', accessToken);

        const config: Config = {
            ...DEFAULT_API_CONFIG,
            accessToken,
        };
        return SDK.init(config);
    },
};

export default ApiSDK;
