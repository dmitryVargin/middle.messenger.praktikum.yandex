declare type Indexed<T = unknown> = {
    [key in string]: T;
};
declare function merge(lhs: Indexed, rhs: Indexed): Indexed;
export default merge;
