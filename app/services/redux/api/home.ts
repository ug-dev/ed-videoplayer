import { DEFAULT_API_CONFIG } from '@app/services/data/SDK/api.config';
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import * as Storage from '@app/utils/storage/index';

const baseQuery = fetchBaseQuery({
    baseUrl: DEFAULT_API_CONFIG.baseUrl,
    prepareHeaders: async (headers) => {
        console.log('hello');

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
        console.log('error', result.error);
    }
    return result;
};
export const homeApi = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Subjects', 'Chapters', 'Media', 'Banners'],

    endpoints: (build) => ({
        getSubcribedSubjects: build.query({
            query: () => ({
                url: '/mobile/subcribedSubjects',
            }),
            providesTags: ['Subjects'],
        }),
        getChapters: build.mutation({
            query: ({ subjectId, languageId }) => ({
                url: '/mobile/getChapters',
                params: {
                    subjectId,
                    languageId,
                },
            }),
        }),
        getMedia: build.query({
            query: (id) => ({
                url: '/mobile/media/' + id,
            }),
            providesTags: ['Media'],
        }),

        getBanners: build.query({
            query: () => ({
                url: '/mobile/banners/list',
            }),
            providesTags: ['Banners'],
        }),
        getLanguages: build.query({
            query: () => ({
                url: '/mobile/languages/list',
            }),
        }),
    }),

    reducerPath: 'home',
    // tagTypes: ['Home'],
});

export const {
    useGetSubcribedSubjectsQuery,
    useGetChaptersMutation,
    useGetMediaQuery,
    useGetBannersQuery,
    useGetLanguagesQuery,
} = homeApi;
