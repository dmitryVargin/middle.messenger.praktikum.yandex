// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function isEmpty(value: any): boolean {
  if (value === null) {
    return true;
  }
  if (typeof value === 'string') {
    return value.length === 0;
  }
  if (typeof value === 'object') {
    if (value instanceof Set || value instanceof Map) {
      return value.size === 0;
    }
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return Object.keys(value).length === 0;
  }
  return true;
}

export default isEmpty;
