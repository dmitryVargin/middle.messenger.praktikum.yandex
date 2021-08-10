function isObject(val:unknown):boolean{
  return typeof val === 'object' && val !== null && !Array.isArray(val)
}
export default isObject
