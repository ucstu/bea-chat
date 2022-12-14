/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
type ApiRequestOptions = {
    readonly method: "GET" | "PUT" | "POST" | "DELETE" | "OPTIONS" | "HEAD" | "PATCH";
    readonly url: string;
    readonly path?: Record<string, any>;
    readonly cookies?: Record<string, any>;
    readonly headers?: Record<string, any>;
    readonly query?: Record<string, any>;
    readonly formData?: Record<string, any>;
    readonly body?: any;
    readonly mediaType?: string;
    readonly responseHeader?: string;
    readonly errors?: Record<number, string>;
};
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
declare class CancelError extends Error {
    constructor(message: string);
    get isCancelled(): boolean;
}
interface OnCancel {
    readonly isResolved: boolean;
    readonly isRejected: boolean;
    readonly isCancelled: boolean;
    (cancelHandler: () => void): void;
}
declare class CancelablePromise<T> implements Promise<T> {
    readonly [Symbol.toStringTag]: string;
    private _isResolved;
    private _isRejected;
    private _isCancelled;
    private readonly _cancelHandlers;
    private readonly _promise;
    private _resolve?;
    private _reject?;
    constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void, onCancel: OnCancel) => void);
    then<TResult1 = T, TResult2 = never>(onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null, onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null): Promise<T | TResult>;
    finally(onFinally?: (() => void) | null): Promise<T>;
    cancel(): void;
    get isCancelled(): boolean;
}
type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;
type OpenAPIConfig = {
    BASE: string;
    VERSION: string;
    WITH_CREDENTIALS: boolean;
    CREDENTIALS: "include" | "omit" | "same-origin";
    TOKEN?: string | Resolver<string>;
    USERNAME?: string | Resolver<string>;
    PASSWORD?: string | Resolver<string>;
    HEADERS?: Headers | Resolver<Headers>;
    ENCODE_PATH?: (path: string) => string;
};
declare const OpenAPI: OpenAPIConfig;
declare abstract class BaseHttpRequest {
    readonly config: OpenAPIConfig;
    constructor(config: OpenAPIConfig);
    abstract request<T>(options: ApiRequestOptions): CancelablePromise<T>;
}
/**
 * ????????????
 */
type UserInfo = {
    /**
     * ??????ID
     */
    userID: string;
    /**
     * ????????????
     */
    name: string;
    /**
     * ????????????
     */
    avatar: string;
};
declare class Service {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * ???????????????
     * @returns any ??????
     * @throws ApiError
     */
    addContacts({ requestBody }: {
        requestBody?: {
            /**
             * ??????ID
             */
            userID: string;
            /**
             * ????????????
             */
            name: string;
            /**
             * ????????????
             */
            avatar: string;
        };
    }): CancelablePromise<{
        /**
         * ????????????
         */
        code: number;
        /**
         * ????????????
         */
        msg: string;
    }>;
    /**
     * ?????????????????????
     * @returns UserInfo ??????
     * @throws ApiError
     */
    queryContacts({ size, page, current, where, fields, sort }: {
        /**
         * ????????????
         */
        size?: number;
        /**
         * ????????????
         */
        page?: number;
        /**
         * ?????????ID
         */
        current?: string;
        /**
         * ????????????
         */
        where?: Array<string>;
        /**
         * ????????????
         */
        fields?: Array<string>;
        /**
         * ????????????
         */
        sort?: Array<string>;
    }): CancelablePromise<Array<UserInfo>>;
    /**
     * ???????????????
     * @returns any ??????
     * @throws ApiError
     */
    deleteContacts({ contactId }: {
        /**
         * ?????????ID
         */
        contactId: string;
    }): CancelablePromise<{
        /**
         * ????????????
         */
        code: number;
        /**
         * ????????????
         */
        msg: string;
    }>;
    /**
     * ???????????????
     * @returns any ??????
     * @throws ApiError
     */
    updateContact({ contactId, requestBody }: {
        /**
         * ?????????ID
         */
        contactId: string;
        requestBody?: {
            /**
             * ????????????
             */
            name: string;
            /**
             * ????????????
             */
            avatar: string;
        };
    }): CancelablePromise<{
        /**
         * ????????????
         */
        code: number;
        /**
         * ????????????
         */
        msg: string;
    }>;
    /**
     * ???????????????
     * @returns UserInfo ??????
     * @throws ApiError
     */
    queryContact({ contactId, fields }: {
        contactId: string;
        /**
         * ?????????????????????
         */
        fields?: Array<string>;
    }): CancelablePromise<UserInfo>;
}
declare class DefaultService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * ????????????
     * @returns any ??????
     * @throws ApiError
     */
    userLogin({ requestBody }: {
        requestBody?: {
            /**
             * ????????????
             */
            username: string;
            /**
             * ????????????
             */
            password: string;
        };
    }): CancelablePromise<{
        /**
         * ????????????
         */
        token: string;
        /**
         * ????????????
         */
        userInfo: UserInfo;
    }>;
    /**
     * ????????????
     * @returns any ??????
     * @throws ApiError
     */
    userRegister({ requestBody }: {
        requestBody?: {
            /**
             * ????????????
             */
            username: string;
            /**
             * ????????????
             */
            password: string;
        };
    }): CancelablePromise<{
        /**
         * ????????????
         */
        token: string;
        /**
         * ????????????
         */
        userInfo: UserInfo;
    }>;
    /**
     * ????????????
     * @returns UserInfo ??????
     * @throws ApiError
     */
    userSearch({ username }: {
        /**
         * ????????????eg?????????
         */
        username: string;
    }): CancelablePromise<Array<UserInfo>>;
}
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
declare class BeaApiClient {
    readonly service: Service;
    readonly default: DefaultService;
    readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest?: HttpRequestConstructor);
}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
type ApiResult = {
    readonly url: string;
    readonly ok: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly body: any;
};
declare class ApiError extends Error {
    readonly url: string;
    readonly status: number;
    readonly statusText: string;
    readonly body: any;
    readonly request: ApiRequestOptions;
    constructor(request: ApiRequestOptions, response: ApiResult, message: string);
}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * ????????????
 */
type Message = {
    /**
     * ?????????ID
     */
    senderID: string;
    /**
     * ?????????ID
     */
    receiverID: string;
    /**
     * ????????????
     */
    dateTime: string;
    /**
     * ????????????
     */
    msgType: Message.msgType;
    /**
     * ????????????
     */
    content: string;
    /**
     * ????????????
     */
    readied: boolean;
};
declare namespace Message {
    /**
     * ????????????
     */
    enum msgType {
        Text = 1,
        Image = 2,
        Audio = 3,
        Video = 4,
        SIGNAL = 5,
        File = 6
    }
}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
declare const $Message: {
    readonly description: "\u7528\u6237\u6D88\u606F";
    readonly properties: {
        readonly senderID: {
            readonly type: "string";
            readonly description: "\u53D1\u8D77\u8005ID";
            readonly isRequired: true;
        };
        readonly receiverID: {
            readonly type: "string";
            readonly description: "\u63A5\u6536\u8005ID";
            readonly isRequired: true;
        };
        readonly dateTime: {
            readonly type: "string";
            readonly description: "\u53D1\u9001\u65F6\u95F4";
            readonly isRequired: true;
        };
        readonly msgType: {
            readonly type: "Enum";
            readonly isRequired: true;
        };
        readonly content: {
            readonly type: "string";
            readonly description: "\u6D88\u606F\u5185\u5BB9";
            readonly isRequired: true;
        };
        readonly readied: {
            readonly type: "boolean";
            readonly description: "\u5DF2\u8BFB\u72B6\u6001";
            readonly isRequired: true;
        };
    };
};
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
declare const $UserInfo: {
    readonly description: "\u7528\u6237\u4FE1\u606F";
    readonly properties: {
        readonly userID: {
            readonly type: "string";
            readonly description: "\u7528\u6237ID";
            readonly isRequired: true;
        };
        readonly name: {
            readonly type: "string";
            readonly description: "\u7528\u6237\u540D\u79F0";
            readonly isRequired: true;
        };
        readonly avatar: {
            readonly type: "string";
            readonly description: "\u5934\u50CF\u5730\u5740";
            readonly isRequired: true;
        };
    };
};
export { BeaApiClient, ApiError, BaseHttpRequest, CancelablePromise, CancelError, OpenAPI, Message, $Message, $UserInfo, Service, DefaultService };
export type { OpenAPIConfig, UserInfo };
