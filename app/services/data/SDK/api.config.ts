import axios, { CancelTokenSource, CancelTokenStatic } from 'axios';
// Use this import if you want to use "env.js" file
// const { API_URL } = require('../../config/env');
// Or just specify it directly like this:
import { API_URL } from '@env';

const CancelToken: CancelTokenStatic = axios.CancelToken;
export const CANCEL_SOURCE: CancelTokenSource = CancelToken.source();

/**
 * The options used to configure the API.
 */
export interface Config {
    /**
     * The URL of the api.
     */
    baseUrl: string;

    /**
     * Milliseconds before we timeout the request.
     */
    timeout: number;
    /**
     * JWT token provided by the server.
     */
    accessToken: string | null;
    /**
     * token to cancel any requests
     * CancelTokenSrc.cancel()
     */
    CancelTokenSrc: CancelTokenSource;
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: Config = {
    baseUrl: API_URL || '',
    timeout: 10000,
    accessToken: null,
    CancelTokenSrc: CANCEL_SOURCE,
};
