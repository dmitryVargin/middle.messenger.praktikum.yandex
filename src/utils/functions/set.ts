import isObject from './isObject';

type Indexed<T = unknown> = {
  [key in string]: T;
};

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (!isObject(object)) {
    return object
  }
  if (typeof path !== 'string') {
    throw new Error('path must be string')
  }

  const pathArr = path.split('.')
  if (pathArr.length === 1) {
    object[path] = value
  } else {
    let current = object
    for (let i = 0; i < pathArr.length; i++) {
      if (i === pathArr.length -1) {
        current[pathArr[i]] = value
      } else {
        current[pathArr[i]] = {}
        current = current[pathArr[i]]
      }
    }
  }

  return object
}


export default set

