function encodeHTML(s:string) {
  if(typeof s !== 'string') {
    return s
  }
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}
export default encodeHTML
