import { DEFAULT_API_CONFIG } from '@app/services/data/SDK/api.config';
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import * as Storage from '@app/utils/storage/index';

const baseQuery = fetchBaseQuery({
    baseUrl: DEFAULT_API_CONFIG.baseUrl,
    prepareHeaders: async (headers) => {
        const token = await Storage.loadString('accessToken');

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
    }
    return result;
};
export const favouriteApi = createApi({
    baseQuery: baseQueryWithReauth,

    endpoints: (build) => ({
        getFavourites: build.query({
            query: () => ({
                url: '/favourite/important',
            }),
        }),

        addFavourite: build.mutation({
            query: (chapterId) => ({
                url: '/favourite/add',
                method: 'POST',
                body: { chapterId },
            }),
        }),
    }),

    reducerPath: 'favourite',
    tagTypes: ['Favourite'],
});

export const { useAddFavouriteMutation, useGetFavouritesQuery } = favouriteApi;
