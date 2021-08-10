export default `
  <div class='input-wrap'>
    <span class='label'>{{label}}</span>
    <input data-valid='false' placeholder='{{placeholder}}' name='{{name}}' class='input' type='{{type}}'/>
    <span data-validation-error class='error'>{{errorText}}</span>
  </div>`;
