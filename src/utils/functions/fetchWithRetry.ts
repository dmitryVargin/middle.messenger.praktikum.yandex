import { RequestOptions } from '../classes/HTTP';

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

export default fetchWithRetry;
