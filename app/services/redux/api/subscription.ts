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
export const subscriptionApi = createApi({
    baseQuery: baseQueryWithReauth,
    // tagTypes: ['Subscribe'],
    tagTypes: ['Subjects', 'Chapters', 'Media', 'Banners', 'Subscribe'],

    endpoints: (build) => ({
        getBoards: build.query({
            query: () => ({
                url: '/mobile/boards/list',
            }),
        }),
        getStandards: build.mutation({
            query: (boardId) => ({
                url: '/mobile/standards/list/' + boardId,
                method: 'GET',
                params: {
                    board: boardId,
                },
            }),
        }),
        getSubjectPlans: build.mutation({
            query: (standardId) => ({
                url: `/mobile/subjectPlans/list/${standardId}`,
                method: 'GET',
            }),
        }),
        requestOrderId: build.mutation({
            query: (data) => ({
                url: '/subscription/add',
                method: 'POST',
                body: data,
            }),
        }),
        paymentSuccessHandler: build.mutation({
            query: (data) => ({
                url: '/subscription/success',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Subjects', 'Chapters', 'Media'],
        }),
        paymentFailedHandler: build.mutation({
            query: (data) => ({
                url: '/subscription/failed',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Subjects', 'Chapters', 'Media'],
        }),
    }),

    reducerPath: 'subscription',
});

export const {
    useGetBoardsQuery,
    useGetStandardsMutation,
    useGetSubjectPlansMutation,
    useRequestOrderIdMutation,
    usePaymentFailedHandlerMutation,
    usePaymentSuccessHandlerMutation,
} = subscriptionApi;
