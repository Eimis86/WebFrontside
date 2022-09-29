import {components, paths} from '@app/requests/schema';
import {components as componentsLogin, paths as pathsLogin} from '@app/requests/schema_login';

/* Basic requests types*/

export type ResponseFormat = 'json' | 'text' | 'binary';
export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export type BaseRequest<T> = {
    readonly data: T;
}

export type BaseResponse<T> = {
    readonly code: number;
    readonly message: string;
    readonly messageTitle: string;
    readonly data: T;
}

export type RequestError = {
    readonly type: 'server' | 'network';
    readonly status?: number;
    readonly error?: string | string[];
}


/* Swagger generated API calls types*/

export type Paths = paths & pathsLogin;
export type EndPoint = keyof Paths;
export type Method<E extends EndPoint> = keyof Paths[E] extends string ? keyof Paths[E] : never;

export type ApiTypes = components['schemas'] & componentsLogin['schemas'];

export type ApiRequest<OP> = OP extends {
        parameters?: {
            path?: infer RP;
        };
        requestBody?: {
            content: {
                'application/json': {
                    data?: infer RB;
                };
            };
        };
    } ? (RB extends Record<string, unknown> ? RB : Record<string, unknown>) & (RP extends Record<string, unknown> ? RP : Record<string, unknown>)
    : Record<string, never>

export type ApiRequestBody<OP> = OP extends {
    requestBody?: {
        content: {
            'application/json': {
                data?: infer R;
            };
        };
    };
} ? { data: R; } : never;

export type ApiRequestPath<OP> = OP extends {
    parameters?: {
        path?: infer P;
    };
} ? { path: P; } : never;

export type ApiResponse<OP> = OP extends {
    responses?: {
        200?: {
            content: {
                'application/json': {
                    data?: infer R;
                };
            };
        };
    };
} ? R : never;

export type CreateRequest = <
    P extends keyof Paths,
    M extends Method<P>,
    Req extends ApiRequest<Paths[P][M]>,
    Resp extends ApiResponse<Paths[P][M]>
    >(url: P, method: M) => (token: string, data: Req) => Promise<Resp | void>;
