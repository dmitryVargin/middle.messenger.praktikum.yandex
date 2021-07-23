const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

// Самая простая версия. Реализовать штучку со всеми проверками им предстоит в конце спринта
// Необязательный метод
function queryStringify(data: Record<string, unknown>) {
  if (typeof data !== 'object') {
    throw new TypeError('Data must be object');
  }

  // Здесь достаточно и [object Object] для объекта
  const keys = Object.keys(data);
  return keys.reduce(
    (result, key, index) =>
      `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`,
    '?',
  );
}

type RequestOptions = {
  method?: string;
  timeout?: number;
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

      xhr.addEventListener('load', () => {
        resolve(xhr);
      });

      xhr.addEventListener('abort', reject);
      xhr.addEventListener('error', reject);

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

const myFetch = new HTTPTransport();

function fetchWithRetry(
  url: string,
  options: RequestOptions = {},
): Promise<any> {
  const { tries = 1 } = options;
  return fetch(url, options).catch((error) => {
    const triesLeft = tries - 1;
    if (!triesLeft) {
      throw error;
    }
    return fetchWithRetry(url, { ...options, tries: triesLeft });
  });
}
