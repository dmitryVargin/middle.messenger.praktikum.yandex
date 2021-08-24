import isPlainObject from './isPlainObject';
import encodeHTML from './encodeHTML';

function deepEncodeHTML(data: string | [] | Record<string, any>): string | [] | Record<string, any> {
  let res = data
  if (typeof data === 'string') {
    res = encodeHTML(data)
  }
  if (Array.isArray(data)) {
    res = data.map(el => deepEncodeHTML(el))
  }
  if (isPlainObject(data)) {
    res = {}
    if (typeof data === 'object') {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (!(data instanceof Array)) {
            res[key] = deepEncodeHTML(data[key])
          }
        }
      }
    }
  }
  return res
}

export default deepEncodeHTML
