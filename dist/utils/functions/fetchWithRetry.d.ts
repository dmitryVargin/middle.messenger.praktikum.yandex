import { RequestOptions } from '../classes/HTTP';
declare function fetchWithRetry(url: string, options?: RequestOptions): Promise<any>;
export default fetchWithRetry;
