export default function get(obj, path, defaultValue) {
  const pathArr = path.split('.');
  let result = obj[pathArr[0]];
  if (result === undefined) return result;
  for (let i = 1; i < pathArr.length; i++) {
    const current = result[pathArr[i]];
    if (typeof current === 'undefined') {
      result = defaultValue ? defaultValue : undefined;
      break;
    }
    result = result[pathArr[i]];
  }
  return result;
}
