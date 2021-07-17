import defaultInput from '../../components/defaultInput';
import button from '../../components/button';
import Templator from '../../../utils/templator';

const content = Templator.compileConcat([
  {
    template: defaultInput,
    context: {
      label: 'Почта',
      type: 'text',
      name: 'email',
      errorText: 'Некорректный email',
    },
  },
  {
    template: defaultInput,
    context: {
      label: 'Логин',
      type: 'text',
      name: 'login',
      errorText: 'Некорректный логин',
    },
  },
  {
    template: defaultInput,
    context: {
      label: 'Имя',
      type: 'text',
      name: 'first_name',
      errorText: 'Обязательное поле',
    },
  },
  {
    template: defaultInput,
    context: {
      label: 'Фамилия',
      type: 'text',
      name: 'second_name',
      errorText: 'Обязательное поле',
    },
  },
  {
    template: defaultInput,
    context: {
      label: 'Телефон',
      type: 'number',
      name: 'phone',
      errorText: 'Некорректный телефон',
    },
  },
  {
    template: defaultInput,
    context: {
      label: 'Пароль',
      type: 'password',
      name: 'password',
      errorText: 'Пароли не совпадают',
    },
  },
  {
    template: defaultInput,
    context: {
      label: 'Пароль (еще раз)',
      type: 'password',
      name: 'password',
      errorText: 'Пароли не совпадают',
    },
  },
  {
    template: button,
    context: {
      type: 'submit',
      text: 'Зарегистрироваться',
    },
  },
]);

export default `
  <div class='form signup-wrap'>
    <h1>Регистрация</h1>
    <form>
      ${content}
    </form>
    <a class='link'>Войти</a>
  </div>`;
