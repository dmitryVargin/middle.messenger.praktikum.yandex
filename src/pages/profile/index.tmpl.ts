export default `
  <div class='profile-wrap'>
    <div class='sidebar'>
      <div data-component='arrowBtn'></div>
    </div>
    <div class='profile'>
      <div class='img-wrap'>
        <img data-field='avatar' src='https://ya-praktikum.tech/api/v2/resources/{{userData.avatar}}' alt='avatar' class='profile-img'>
      </div>
      <h3>{{userData.display_name}}</h3>
      <div class='row'>
        <p data-field='email' class='field-name'>Email</p>
        <p class='field-value'>{{userData.email}}</p>
      </div>
      <div class='row'>
        <p data-field='login' class='field-name'>Login</p>
        <p class='field-value'>{{userData.login}}</p>
      </div>
      <div class='row'>
        <p data-field='password' class='field-name'>Password</p>
        <p class='field-value'>••••••••••••</p>
      </div>
      <div class='row'>
        <p data-field='first_name' class='field-name'>First name</p>
        <p class='field-value'>{{userData.first_name}}</p>
      </div>
      <div class='row'>
        <p data-field='second_name' class='field-name'>Second name</p>
        <p class='field-value'>{{userData.second_name}}</p>
      </div>
      <div class='row'>
        <p data-field='display_name' class='field-name'>Display name</p>
        <p class='field-value'>{{userData.display_name}}</p>
      </div>
      <div class='row'>
        <p data-field='phone' class='field-name'>Phone number</p>
        <p class='field-value'>{{userData.phone}}</p>
      </div>
      <a data-logout class='link warning'>log out</a>
    </div>
  </div>`;
