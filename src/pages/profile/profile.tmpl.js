import arrowButton from '../../components/arrowButton';
import Templator from '../../../utils/templator';

const arrowBtn = Templator.compile(arrowButton({ direction: 'toLeft' }));

export default `
  <div class='profile-wrap'>
    <div class='sidebar'>
      ${arrowBtn}
    </div>
    <div class='profile'>
      <div class='img-wrap'>
        <img src='{{userData.avatar}}' alt='avatar' class='profile-img'>
      </div>
      <h3>Иван</h3>
      <div class='row'>
        <p class='field-name'>Почта</p>
        <p class='field-value'>{{userData.email}}</p>
      </div>
      <div class="row">
        <p class="field-name">Логин</p>
        <p class="field-value">{{userData.login}}</p>
      </div>
      <div class="row">
        <p class="field-name">Пароль</p>
        <p class="field-value">••••••••••••</p>
      </div>
      <div class="row">
        <p class="field-name">Имя</p>
        <p class="field-value">{{userData.first_name}}</p>
      </div>
      <div class="row">
        <p class="field-name">Фамилия</p>
        <p class="field-value">{{userData.second_name}}</p>
      </div>
      <div class="row">
        <p class="field-name">Имя в чате</p>
        <p class="field-value">{{userData.display_name}}</p>
      </div>
      <div class="row">
        <p class="field-name">Телефон</p>
        <p class="field-value">{{userData.phone}}</p>
      </div>
      <a class="link warning" href="#">Выйти</a>
    </div>
  </div>`;
