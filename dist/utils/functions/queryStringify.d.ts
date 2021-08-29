export declare type PlainObject<T = unknown> = {
    [k in string]: T;
};
declare function queryStringify(data: PlainObject): string;
export default queryStringify;
