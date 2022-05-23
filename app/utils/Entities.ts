import { Theme } from 'react-native-elements/dist/config/theme';

export interface AppTheme extends Theme {
    colors?: {
        primary?: any;
        secondary?: any;
        white?: any;
        black?: any;
        grey0?: any;
        grey1?: any;
        grey2?: any;
        grey3?: any;
        grey4?: any;
        grey5?: any;
        greyOutline?: any;
        searchBg?: any;
        success?: any;
        error?: any;
        warning?: any;
        divider?: any;
        platform?: {
            ios?: {
                primary?: any;
                secondary?: any;
                grey?: any;
                searchBg?: any;
                success?: any;
                error?: any;
                warning?: any;
            };
            android?: {
                // Same as ios
            };
            web?: {
                // Same as ios
            };
        };
        lightGrey?: string;
        bglight?: string;
    };
}

export interface IForgotPasswordFormData {
    email: string;
}

export interface ILoginFormData {
    email: string;
    password: string;
}

export interface ICreateAccountFormData {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phone: string;
}

export interface IApiResponse<T> {
    data: T;
    errors: any;
}

export interface IUser {
    accessToken: string;
    email: string;
    username: string;
    name: string;
}
