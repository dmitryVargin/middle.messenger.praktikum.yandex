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
      errorText: 'Некоректный email',
    },
  },
  {
    template: defaultInput,
    context: {
      label: 'Логин',
      type: 'text',
      name: 'login',
      errorText: 'Некоректный логин',
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
      errorText: 'Некоректный телефон',
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

const signupTmpl = `<div class="form signup-wrap">
        <h1>Регистрация</h1>
        <form>
           ${content}
        </form>
        <a class="link" href="/login">Войти</a>
    </div>`;

export default signupTmpl;
