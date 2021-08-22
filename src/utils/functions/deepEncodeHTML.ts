import isPlainObject from './isPlainObject';
import encodeHTML from './encodeHTML';

function deepEncodeHTML(data: string | [] | Record<string, any>) {
  let res = data
  if (typeof data === 'string') {
    res = encodeHTML(data)
  }
  if (Array.isArray(data)) {
    res = data.map(el => deepEncodeHTML(el))
  }
  if (isPlainObject(data)) {
    res = {}
    for (const key in data) {
      res[key] = deepEncodeHTML(data[key])
    }
  }
  return res
}

export default deepEncodeHTML
