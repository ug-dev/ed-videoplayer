/* eslint-disable import/no-extraneous-dependencies */
import { AxiosResponse } from 'axios';
import assign from 'lodash/assign';
import { Config } from './api.config';
import Base from './base';
export interface BaseInterface {
    list(url: string, filters?: string, page?: number, pageSize?: number): Promise<void | AxiosResponse<any, any>>;
    detail(url: string, filters?: any, contentType?: string): Promise<void | AxiosResponse<any, any>>;
    create(url: string, data: any, queryParams?: any, contentType?: string): Promise<void | AxiosResponse<any, any>>;
    edit(url: string, data: any, queryParams?: any, contentType?: string): Promise<void | AxiosResponse<any, any>>;
    remove(url: string, queryParams: any, contentType?: string): Promise<void | AxiosResponse<any, any>>;
}
export default {
    init(opts: Config): BaseInterface {
        const base = Base.init(opts);
        return {
            list(url, filters, page, pageSize) {
                if (!page) {
                    page = 1;
                }

                if (!pageSize) {
                    pageSize = 10;
                }

                const queryParams: { filters: string | null; page: number; pageSize: number } = {
                    filters: null,
                    page: 0,
                    pageSize: 12,
                };
                if (filters) {
                    queryParams.filters = filters;
                }

                queryParams.page = page;
                queryParams.pageSize = pageSize;
                console.log('query param', queryParams);
                return base.request(url, 'GET', queryParams);
            },

            detail(url, filters, contentType) {
                if (!filters) {
                    filters = {};
                }
                let queryParams = {};
                queryParams = assign(queryParams, filters);
                return base.request(url, 'GET', queryParams, {}, contentType);
            },

            create(url, data, queryParams, contentType) {
                return base.request(url, 'POST', queryParams, data, contentType);
            },

            edit(url, data, queryParams, contentType) {
                return base.request(url, 'PUT', queryParams, data, contentType);
            },

            remove(url, queryParams, contentType) {
                return base.request(url, 'DELETE', queryParams, contentType);
            },

            // customRequest(url, queryParams, contentType) {
            //   return base.customRequest(url, queryParams, contentType)
            // },
        };
    },
};
