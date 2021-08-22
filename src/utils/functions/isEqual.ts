import isObject from './isObject';

function isObject(val: unknown): boolean {
  return typeof val === 'object' && val !== null && !Array.isArray(val)
}

type Indexed<T = unknown> = {
  [key in string]: T;
};


function isEqual(a: Indexed, b: Indexed): boolean {
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
    return a === b
  }

  function compareArrays(a: Indexed, b: Indexed): boolean {
    let res = false
    if (Array.isArray(a) || Array.isArray(b)) {
      if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length === b.length) {
          if (a.length === 0) {
            res = true;
          } else {
            for (let i = 0; i < a.length; i++) {
              const el = a[i];
              if (!b.includes(el)) {
                res = false;
                break;
              } else {
                res = true;
              }
            }
          }
        }
      }

    }
    return res;
  }

  if (Array.isArray(a) || Array.isArray(b)) {
    return compareArrays(a, b)
  }

  function compareClassicalObject(a: Indexed, b: Indexed): boolean {
    const objectsNotEmpty = Object.keys(a).length && Object.keys(b).length
    if (!objectsNotEmpty) return true
    let res = false
    for (const key in a) {
      if (!a.hasOwnProperty(key)) {
        continue;
      }
      if (isObject(a[key])) {
        res = compareClassicalObject(a[key] as Indexed, b[key] as Indexed)
      } else if (Array.isArray(a[key]) || Array.isArray(b[key])) {
        res = compareArrays(a[key] as Indexed, b[key] as Indexed)
      } else {
        res = a[key] === b[key];
      }
      if (!res) break
    }
    return res
  }

  return compareClassicalObject(a, b)
}


type PlainObject<T = any> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

function isEqual(lhs: PlainObject, rhs: PlainObject) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export default isEqual
