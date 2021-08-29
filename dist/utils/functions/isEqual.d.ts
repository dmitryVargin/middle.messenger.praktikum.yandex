declare type PlainObject<T = any> = {
    [k in string]: T;
};
declare function isEqual(lhs: PlainObject, rhs: PlainObject): boolean;
export default isEqual;
