import DefaultInput from '../../components/DefaultInput/index';
import defaultInputTmpl from '../../components/DefaultInput/index.tmpl';

import Button from '../../components/Button/index';
import buttonTmpl from '../../components/Button/index.tmpl';
import loginTmpl from './index.tmpl';

import Block from '../../utils/Block';

const loginInput = new DefaultInput(
  {
    label: 'Логин',
    type: 'text',
    name: 'login',
    errorText: 'Неверный логин',
  },
  defaultInputTmpl,
).getContent();

const passwordInput = new DefaultInput(
  {
    label: 'Пароль',
    type: 'password',
    name: 'password',
    errorText: 'Неверный логин',
    events: {
      change: (event) => {
        console.log(event.target.value);
      },
    },
  },
  defaultInputTmpl,
).getContent();

const submitButton = new Button(
  {
    type: 'button',
    text: 'Войти',
    events: {
      click: () => {
        console.log(123);
      },
    },
  },
  buttonTmpl,
).getContent();

const propsToEl = {
  components: {
    loginInput,
    passwordInput,
    submitButton,
  },
};

class Login extends Block {
  constructor(props, tmpl) {
    super('div', props, tmpl);
  }
}

const login = new Login(propsToEl, loginTmpl).getContent();
export default login;
