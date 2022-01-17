import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import Config from '../config/config';
import { detectIE } from '../utilities/util';

class HttpRequest {

    public static async request(options: AxiosRequestConfig): Promise<AxiosResponse> {
        if (!options.url) {
            throw new Error('url is required');
        }

        options.baseURL = Config.api.baseUrl;
        options.method = options.method || 'get';

        options.headers = options.headers || {};

        if (options.method === 'post' || options.method === 'put') {
            options.headers['Content-Type'] = 'application/json';
        }

        options.withCredentials = true;
        if (detectIE() && options.method === 'get') {
            options.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
            options.headers.Pragma = 'no-cache';
            options.headers.Expires = '0';
        }
        try {
            const response: AxiosResponse = await axios(options);
            return response.data;
        } catch (error) {
            console.log(error);
            let err = {
                message: 'Server unavailable!',
                status: 500,
                meta: {},
            };
            // @ts-ignore
            const response = error.response;
            if (response && response.data) {
                err = response.data;
            }
            throw err;
        }
    }

}

export default HttpRequest;
