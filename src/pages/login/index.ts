import DefaultInput from '../../components/DefaultInput/index';
import defaultInputTmpl from '../../components/DefaultInput/index.tmpl';

import Button from '../../components/Button/index';
import buttonTmpl from '../../components/Button/index.tmpl';

import { Props } from '../../utils/Block';
import Validation from '../../utils/Validation';

import Form from '../../modules/Form';
import {router} from '../../index';


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
          const { isValid } = new Validation(target.value).minLength(4);
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
        callback(event: InputEvent): void {
          const target = event.target as HTMLInputElement;
          const validation = new Validation(target.value);
          const { isValid } = validation.minLength(6).lettersOrNumbers();
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

export class Login extends Form {}

export const loginProps: Props = {
  events: [
    {
      type: 'submit',
      element: 'form',
      callback(event: Event): void {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const formDataObj: Record<string, any> = {};
        // eslint-disable-next-line no-restricted-syntax
        for (const [name, value] of formData) {
          formDataObj[name] = value;
        }
        console.log(formDataObj);
      },
    },
    {
      type: 'click',
      element: '[data-path]',
      callback(event: Event): void {
        const target = event.target as HTMLElement;
        const { path } = target.dataset ;
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
