import searchIcon from 'url:../../../static/img/search.svg';

export default `
  <div class='input-wrap'>
  <img class='search-icon' src='${searchIcon}' alt=''>
    <span class='label'>{{label}}</span>
    <input data-valid='false' name='{{name}}' class='input search' type='{{type}}'/>
    <span data-validation-error class='error'>{{errorText}}</span>
  </div>`;
