const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

function queryStringify(data: Record<string, unknown>) {
  if (typeof data !== 'object') {
    throw new TypeError('Data must be object');
  }
  const innerData = data as Record<string, string>;
  const keys = Object.keys(data);
  return keys.reduce(
    (result, key, index) => `${result}${key}=${innerData[key]}${index < keys.length - 1 ? '&' : ''}`,
    '?',
  );
}

type RequestOptions = {
  method?: string;
  timeout?: number;
  data?: Record<string, unknown>;
  [key: string]: any;
};

class HTTPTransport {
  get = (url: string, options: RequestOptions = {}) =>
    this.request(
      url,
      {
        ...options,
        method: METHODS.GET,
      },
      options.timeout,
    );

  post = (url: string, options: RequestOptions = {}) =>
    this.request(
      url,
      {
        ...options,
        method: METHODS.POST,
      },
      options.timeout,
    );

  put = (url: string, options: RequestOptions = {}) =>
    this.request(
      url,
      {
        ...options,
        method: METHODS.PUT,
      },
      options.timeout,
    );

  delete = (url: string, options: RequestOptions = {}) =>
    this.request(
      url,
      {
        ...options,
        method: METHODS.DELETE,
      },
      options.timeout,
    );

  request = (url: string, options: RequestOptions = {}, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
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

function fetchWithRetry(url: string, options: RequestOptions = {}): Promise<any> {
  const { tries = 1 } = options;
  return fetch(url, options).catch((error) => {
    const triesLeft = tries - 1;
    if (!triesLeft) {
      throw error;
    }
    return fetchWithRetry(url, { ...options, tries: triesLeft });
  });
}
