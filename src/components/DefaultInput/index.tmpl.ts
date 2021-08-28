export default `
  <div class='input-wrap'>
    <span class='label'>{{label}}</span>
    <input data-valid='false' name='{{name}}' class='input' type='{{type}}' value="{{value}}"/>
    <span data-validation-error class='error'>{{errorText}}</span>
  </div>`;
