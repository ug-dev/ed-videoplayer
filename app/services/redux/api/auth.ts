import { DEFAULT_API_CONFIG } from '@app/services/data/SDK/api.config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as Storage from '@app/utils/storage/index';
interface registerBodyInterface {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    conformPassword: string;
    phone: string;
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
            query: (registerBody: registerBodyInterface) => ({
                body: {
                    ...registerBody,
                },
                method: 'POST',
                url: '/register',
            }),
        }),
    }),
    reducerPath: 'auth',
    tagTypes: ['Auth'],
});
