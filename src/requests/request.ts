import {log} from '@app/utils/debug';
import {CONST} from '@app/const';
import {omit} from 'lodash';
import {BaseResponse, CreateRequest, RequestMethod, ResponseFormat} from './types';
import {cacheRequest} from '@app/requests/cache';

export const ApiUrl = (endPoint: string) =>
    endPoint[0] === '/'
        ? `${CONST.API_BASE_URL}${endPoint}`
        : `${CONST.API_BASE_URL}/${endPoint}`;

function getData(resp: Response, format: ResponseFormat) {
    switch (format) {
        case 'json': return resp.json();
        case 'text': return resp.text();
        case 'binary': return resp.blob();
    }
}

function stringToBuffer(data: string) {
    const myArray: BufferSource = new ArrayBuffer(data.length);
    const longInt8View = new Uint8Array(myArray);

    for (let i = 0; i < longInt8View.length; i++) {
        longInt8View[i] = data.charCodeAt(i);
    }

    return myArray;
}

/**
 * @throws {RequestError}
 */
export function request<Resp> (params: {
    readonly method: RequestMethod;
    readonly url: string;
    readonly data?: string | BufferSource;
    readonly format?: ResponseFormat;
    readonly token?: string;
    readonly contentType?: string;
}): Promise<Resp | void> {
    log.Debug('[REQUEST]', params.method, params.url);

    const headers: HeadersInit = {};
    if (params.token) {
        headers['Authorization'] = `Bearer ${params.token}`;
    }
    if (params.method !== 'GET') {
        headers['Content-Type'] = params.contentType || 'application/json; charset=UTF-8';
    }


    const request: RequestInit = {
        headers: headers,
        mode: 'cors',
        method: params.method,
        cache: 'no-store'
    };

    if (params.data) {
        request.body = params.data;
    }

    return fetch(params.url, request)
        .then(response => {
            if (response.ok) {
                return getData(response, params.format || 'json');
            } else {
                return Promise.reject({
                    type: 'server',
                    status: response.status,
                    error: response.statusText
                });
            }
        }, (reason) => {
            //No response
            log.Error('[NETWORK ERROR]', request.method, params.url, reason);
            return Promise.reject({type: 'network'});
        });
}

/**
 * @throws {RequestError}
 */
export function baseRequest<Req, Resp> (params: {
    readonly method: RequestMethod;
    readonly url: string;
    readonly data?: Req;
    readonly format?: ResponseFormat;
    readonly token?: string;
}): Promise<Resp | void> {
    const data = (params.data && Object.keys(params.data).length)
        ? JSON.stringify({data: params.data})
        : undefined;

    return cacheRequest(request, params.url, params.method)<BaseResponse<Resp>>({
        ...params,
        url: ApiUrl(params.url),
        data,
    }).then((response) => {
        if (response && response.code === 200) {
            return response.data;
        }
        return undefined;
    });
}

export function binaryRequest<Resp> (params: {
    readonly method: RequestMethod;
    readonly url: string;
    readonly data: string;
    readonly format?: ResponseFormat;
    readonly token?: string;
    readonly contentType?: string;
}): Promise<Resp | void> {
    return request<BaseResponse<Resp>>({
        ...params,
        url: ApiUrl(params.url),
        data: stringToBuffer(params.data),
        contentType: params.contentType
    }).then((response) => {
        if (response && response.code === 200) {
            return response.data;
        }
        return undefined;
    });
}

export const createRequest: CreateRequest = (url, method) => (token, data) => {
    const exp = /({\w+})/ig;

    //All data keys capitalized with real key as value
    const allKeys = Object.fromEntries(Object.entries(data).map(([key]) => [key.toUpperCase(), key]));

    //keys list to omit form data
    const paths: (keyof typeof data)[] = [];

    //search for placeholders in url
    const urlWithPath = url.replace(exp, value => {
        //found placeholder to replace with value from data hash
        const pathKey = value.substring(1, value.length - 1);

        //placeholder in url and key in data has may be in different register
        //so wi search by capitalized both and then take real key name from all keys list
        const key = allKeys[pathKey.toUpperCase()];

        //replace template with key value and then remember fond key in list doe to omit it from data hash later
        if (key) {
            paths.push(key);
            return data[key] as string;
        }

        log.Error(`Unspecified api path element ${value} in the ${method}:${url} request`);
        return '<unknown>';
    });

    return baseRequest({
        url: urlWithPath,
        method: method as RequestMethod,
        token,
        //data hash without found path items
        data: omit(data, paths),
    });
};

export function mockRequest<Resp> (
    url: string,
    params?: {
        readonly format?: ResponseFormat;
    }
): Promise<Resp | void> {
    return request<Resp>({
        url,
        method: 'GET',
        ...params,
    });
}
