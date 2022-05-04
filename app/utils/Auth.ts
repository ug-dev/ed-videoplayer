import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUser } from './Entities';

export default class Auth {
    static async isLoggedIn() {
        return !!(await Auth.getUser());
    }

    static async getToken() {
        const authUser = await Auth.getUser();
        if (!authUser) {
            return null;
        }
        const user = authUser;
        return user ? user.accessToken : null;
    }

    static async getUser(): Promise<IUser | null> {
        const user = await Auth.getItemFromStorage('rk-user');
        if (!user) {
            return null;
        }
        return JSON.parse(user) || null;
    }

    static async getDeviceToken() {
        const token = await Auth.getItemFromStorage('rk-device-token');
        return token ? token : null;
    }

    static async setUser(user: IUser) {
        return Auth.setItemToStorage('rk-user', JSON.stringify(user));
    }

    static async setDeviceToken(token: string) {
        return Auth.setItemToStorage('rk-device-token', token);
    }

    static async logout() {
        return AsyncStorage.removeItem('rk-user');
    }

    static async getItemFromStorage(key: string) {
        return AsyncStorage.getItem(key);
    }

    static async setItemToStorage(key: string, value: any) {
        AsyncStorage.setItem(key, value);
    }
}
