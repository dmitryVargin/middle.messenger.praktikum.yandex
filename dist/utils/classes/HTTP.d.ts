declare type Data = FormData | Record<string, unknown> | string;
export declare type RequestOptions = {
    method?: string;
    timeout?: number;
    withCredentials?: boolean;
    data?: Data;
    headers?: Record<string, any>;
    [key: string]: any;
};
declare class HTTP {
    private url;
    constructor(url: string);
    get: (url: string, options?: RequestOptions) => Promise<XMLHttpRequest>;
    post: (url: string, options?: RequestOptions) => Promise<XMLHttpRequest>;
    put: (url: string, options?: RequestOptions) => Promise<XMLHttpRequest>;
    delete: (url: string, options?: RequestOptions) => Promise<XMLHttpRequest>;
    request: (url: string, options?: RequestOptions, timeout?: number) => Promise<XMLHttpRequest>;
}
export default HTTP;
