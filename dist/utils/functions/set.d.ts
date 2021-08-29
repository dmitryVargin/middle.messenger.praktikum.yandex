declare type Indexed<T = unknown> = {
    [key in string]: T;
};
declare function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown;
export default set;
