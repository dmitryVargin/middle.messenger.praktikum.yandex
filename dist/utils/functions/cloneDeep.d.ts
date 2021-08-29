declare function cloneDeep<T>(obj: T): T | Date | Set<unknown> | Map<unknown, unknown> | Record<string, unknown> | T[];
export default cloneDeep;
