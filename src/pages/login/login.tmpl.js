import defaultInput from '../../components/defaultInput';
import button from '../../components/button';
import Templator from '../../../utils/templator';

const content = Templator.compileConcat([
  {
    template: defaultInput,
    context: {
      label: 'Логин',
      type: 'text',
      name: 'login',
      errorText: 'Неверный логин',
    },
  },
  {
    template: defaultInput,
    context: {
      label: 'Пароль',
      type: 'password',
      name: 'password',
      errorText: 'Неверный пароль',
    },
  },
  {
    template: button,
    context: {
      type: 'submit',
      text: 'Авторизоваться',
    },
  },
]);

export default `
  <div class="form login-wrap">
    <h1>Вход</h1>
    <form>
      ${content}
    </form>
    <a class="link">Нет аккаунта?</a>
  </div>`;
