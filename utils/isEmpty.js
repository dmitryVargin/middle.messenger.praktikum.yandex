export default function isEmpty(value) {
  if (value === null) {
    return true;
  }
  if (typeof value === 'string') {
    return !value.length;
  }
  if (typeof value === 'object') {
    if (value.size !== undefined) {
      return !value.size;
    }
    if (Array.isArray(value)) {
      return !value.length;
    }
    return !Object.keys(value).length;
  }
  return true;
}
