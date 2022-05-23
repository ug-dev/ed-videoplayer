import { DEFAULT_API_CONFIG } from '@app/services/data/SDK/api.config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as Storage from '@app/utils/storage/index';
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
export const authApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: DEFAULT_API_CONFIG.baseUrl,
        prepareHeaders: async (headers) => {
            const token = await Storage.loadString('token');

            if (token) {
                headers.set('Authorization', `Token ${token}`);
            }

            headers.set('Content-Type', 'application/json');

            return headers;
        },
    }),

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
    }),
    reducerPath: 'auth',
    tagTypes: ['Auth'],
});

export const { useLoginMutation, useRegisterMutation } = authApi;
