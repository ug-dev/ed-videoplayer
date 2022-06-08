import { DEFAULT_API_CONFIG } from '@app/services/data/SDK/api.config';
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import * as Storage from '@app/utils/storage/index';
import { navigate } from '@app/navigators';
interface RegisterBodyInterface {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    confirmPassword: string;
    phone: string;
}
interface LoginBodyInterface {
    email: string;
    password: string;
    device_id: string;
}

const baseQuery = fetchBaseQuery({
    baseUrl: DEFAULT_API_CONFIG.baseUrl,
    prepareHeaders: async (headers) => {
        const token = await Storage.loadString('accessToken');
        console.log({ token });

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        return headers;
    },
});
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error) {
        // try to get a new token
        console.log('error', { result });
        if (result.error.status === 401) {
            console.log('hi');

            navigate('AuthStack');
        }
    }
    return result;
};

export const authApi = createApi({
    baseQuery: baseQueryWithReauth,

    endpoints: (build) => ({
        register: build.mutation({
            query: (registerBody: RegisterBodyInterface) => ({
                body: {
                    ...registerBody,
                },
                method: 'POST',
                url: '/mobile/register',
            }),
        }),
        login: build.mutation({
            query: (loginBody: LoginBodyInterface) => ({
                body: {
                    ...loginBody,
                },

                method: 'POST',
                url: '/mobile/login',
            }),
        }),
        getUser: build.mutation({
            query: () => ({
                method: 'GET',
                url: '/user',
            }),
        }),
        resendEmail: build.mutation({
            query: () => ({
                url: '/email/resend',
                method: 'GET',
            }),
        }),
        isEmailVerified: build.mutation({
            query: () => ({
                url: '/email/verify/check',
                method: 'GET',
            }),
        }),
    }),

    reducerPath: 'auth',
    tagTypes: ['Auth'],
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetUserMutation,
    useIsEmailVerifiedMutation,
    useResendEmailMutation,
} = authApi;
