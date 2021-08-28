import DefaultInput from '../../components/DefaultInput/index';
import defaultInputTmpl from '../../components/DefaultInput/index.tmpl';

import Button from '../../components/Button/index';
import buttonTmpl from '../../components/Button/index.tmpl';

import {Props} from '../../modules/Block/Block';
import Validation from '../../utils/classes/Validation';

import Form from '../../modules/Form';
import {router} from '../../index';
import AuthController, {
  SignInData
} from '../../controllers/AuthController';
import getObjFromFormData from '../../utils/functions/getObjFromFormData';


const loginInput = new DefaultInput(
  {
    label: 'Login',
    type: 'text',
    name: 'login',
    errorText: 'Wrong login',
    events: [
      {
        type: 'blur',
        element: 'input',
        callback(event: InputEvent) {
          const target = event.target as HTMLInputElement;
          const {isValid} = new Validation(target.value).minLength(4);
          if (!isValid) {
            loginInput.setValidError();
          } else {
            loginInput.setValid();
          }
        },
      },
    ],
  },
  defaultInputTmpl,
);

const passwordInput = new DefaultInput(
  {
    label: 'Password',
    type: 'password',
    name: 'password',
    errorText: 'Wrong password',
    events: [
      {
        type: 'blur',
        element: 'input',
        callback(): void {
          const isValid = true
          if (!isValid) {
            passwordInput.setValidError();
          } else {
            passwordInput.setValid();
          }
        },
      },
    ],
  },
  defaultInputTmpl,
);

export const submitButton = new Button(
  {
    attributes: [
      {
        element: 'root',
        disabled: {
          type: 'set',
          value: true,
        },
        className: {
          type: 'add',
          value: 'disabled',
        },
      },
    ],
    type: 'submit',
    text: 'Login',
  },
  buttonTmpl,
);


export class Login extends Form {
}

export const loginProps: Props = {
  events: [
    {
      type: 'submit',
      element: 'form',
      callback(event: Event): void {
        const form = event.target as HTMLFormElement
        event.preventDefault();
        AuthController.signIn(getObjFromFormData(new FormData(form)) as SignInData)
        form.reset()
      },
    },
    {
      type: 'click',
      element: '[data-path]',
      callback(event: Event): void {
        const target = event.target as HTMLElement;
        const {path} = target.dataset;
        router.go(path as string)
      },
    },
  ],
  components: {
    loginInput,
    passwordInput,
    submitButton,
  },
};
