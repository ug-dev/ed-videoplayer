/* eslint no-console: 0 */
import { AxiosRequestConfig } from 'axios';
import { Config } from './api.config';
import axios from './intercepter';

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';
export default {
    init(opts: Config) {
        let baseUrl = '';
        let accessToken = '';
        const cancelToken = opts.CancelTokenSrc.token;
        // console.log({ cancelToken });
        if (Object.hasOwnProperty.call(opts, 'baseUrl')) {
            ({ baseUrl } = opts);
        }

        if (Object.hasOwnProperty.call(opts, 'accessToken')) {
            ({ accessToken } = opts);
        }

        const defaultConfig: AxiosRequestConfig = {
            cancelToken,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                accesstoken: accessToken,
                'User-Agent': 'PointCallifyApp',
            },
        };

        return {
            request(url: string, method: Methods, queryParams = {}, data = {}, contentType = 'application/json') {
                if (!url) {
                    throw new Error('Request - URL not defined');
                }

                if (!contentType) {
                    contentType = 'application/json';
                }

                if (!queryParams) {
                    queryParams = {};
                }

                if (!data) {
                    data = {};
                }

                url = baseUrl + url;

                switch (method) {
                    case 'GET':
                        return this.get(url, queryParams, contentType);

                    case 'POST': {
                        return this.post(url, queryParams, data, contentType);
                    }

                    case 'PUT':
                        return this.put(url, queryParams, data, contentType);

                    case 'DELETE':
                        return this.del(url, queryParams, contentType);

                    default:
                        throw new Error('Request method not defined');
                }
            },
            get(url: string, queryParams: any, contentType: string) {
                const config = {
                    ...defaultConfig,
                    params: queryParams,
                };

                return axios.get(url, config).catch((error) => {
                    if (axios.isCancel(error)) {
                        console.log(error.message);
                    } else {
                        throw error;
                    }
                });
            },
            post(url: string, queryParams: any, data: any, contentType: string) {
                const config = {
                    ...defaultConfig,
                    params: queryParams,
                };

                return axios.post(url, data, config).catch((error) => {
                    if (axios.isCancel(error)) {
                        console.log(error.message);
                    } else {
                        throw error;
                    }
                });
            },

            put(url: string, queryParams: any, data: any, contentType: string) {
                const config = {
                    ...defaultConfig,
                    params: queryParams,
                };

                return axios.put(url, data, config).catch((error) => {
                    if (axios.isCancel(error)) {
                        console.log(error.message);
                    } else {
                        throw error;
                    }
                });
            },

            del(url: string, queryParams: any, contentType: string) {
                const config = {
                    ...defaultConfig,
                    params: queryParams,
                };

                return axios.delete(url, config).catch((error) => {
                    if (axios.isCancel(error)) {
                        console.log(error.message);
                    } else {
                        throw error;
                    }
                });
            },

            url() {
                return baseUrl;
            },
        };
    },
};
