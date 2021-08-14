import queryStringify from './queryStringify';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};


export type RequestOptions = {
  method?: string;
  timeout?: number;
  data?: Record<string, unknown>;
  [key: string]: any;
};

class HTTP {
  private url: string;

  constructor(url: string) {
    this.url = url
  }

  get = (url: string, options: RequestOptions = {}) =>
    this.request(
      this.url + url,
      {
        ...options,
        method: METHODS.GET,
      },
      options.timeout,
    );

  post = (url: string, options: RequestOptions = {}) =>
    this.request(
      this.url + url,
      {
        ...options,
        method: METHODS.POST,
      },
      options.timeout,
    );

  put = (url: string, options: RequestOptions = {}) =>
    this.request(
      this.url + url,
      {
        ...options,
        method: METHODS.PUT,
      },
      options.timeout,
    );

  delete = (url: string, options: RequestOptions = {}) =>
    this.request(
      this.url + url,
      {
        ...options,
        method: METHODS.DELETE,
      },
      options.timeout,
    );

  request = (url: string, options: RequestOptions = {}, timeout = 5000) => {
    const {headers = {}, method, data} = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${this.url + url}${queryStringify(data)}` : this.url + url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr);
        } else if (xhr.status >= 400 && xhr.status < 500) {
          reject(xhr);
        } else {
          // something else
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}


export default HTTP
