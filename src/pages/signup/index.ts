import { Props } from '../../modules/Block/Block';
import DefaultInput from '../../components/DefaultInput';
import Button from '../../components/Button';
import buttonTmpl from '../../components/Button/index.tmpl';
import defaultInputTmpl from '../../components/DefaultInput/index.tmpl';
import Validation from '../../utils/classes/Validation';
import { router } from '../../index';
import Form from '../../modules/Form';
import AuthController, { SignUpData } from '../../controllers/AuthController';
import getObjFromFormData from '../../utils/functions/getObjFromFormData';

const emailInput = new DefaultInput(
  {
    label: 'Email',
    type: 'text',
    name: 'email',
    errorText: 'Wrong email',
    events: [
      {
        type: 'blur',
        element: 'input',
        callback(event: InputEvent) {
          const target = event.target as HTMLInputElement;
          const validation = new Validation(target.value);
          const { isValid } = validation.email();
          if (!isValid) {
            emailInput.setValidError();
          } else {
            emailInput.setValid();
          }
        },
      },
    ],
  },
  defaultInputTmpl,
);

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
          const validation = new Validation(target.value);
          const { isValid } = validation.minLength(4).lettersOrNumbers();
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
const firstNameInput = new DefaultInput(
  {
    label: 'First name',
    type: 'text',
    name: 'first_name',
    errorText: 'Wrong first name',
    events: [
      {
        type: 'blur',
        element: 'input',
        callback(event: InputEvent) {
          const target = event.target as HTMLInputElement;
          const validation = new Validation(target.value);
          const { isValid } = validation.minLength(2).onlyLetters();
          if (!isValid) {
            firstNameInput.setValidError();
          } else {
            firstNameInput.setValid();
          }
        },
      },
    ],
  },
  defaultInputTmpl,
);
const secondNameInput = new DefaultInput(
  {
    label: 'Second name',
    type: 'text',
    name: 'second_name',
    errorText: 'Wrong second name',
    events: [
      {
        type: 'blur',
        element: 'input',
        callback(event: InputEvent) {
          const target = event.target as HTMLInputElement;
          const validation = new Validation(target.value);
          const { isValid } = validation.minLength(2).onlyLetters();
          if (!isValid) {
            secondNameInput.setValidError();
          } else {
            secondNameInput.setValid();
          }
        },
      },
    ],
  },
  defaultInputTmpl,
);
const phoneInput = new DefaultInput(
  {
    label: 'Phone number',
    type: 'number',
    name: 'phone',
    errorText: 'Wrong phone number',
    events: [
      {
        type: 'blur',
        element: 'input',
        callback(event: InputEvent) {
          const target = event.target as HTMLInputElement;
          const validation = new Validation(target.value);
          const { isValid } = validation.phone();
          if (!isValid) {
            phoneInput.setValidError();
          } else {
            phoneInput.setValid();
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
        callback(event: InputEvent) {
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
const passwordAgainInput = new DefaultInput(
  {
    label: 'Password (again)',
    type: 'password',
    name: 'passwordAgain',
    errorText: 'Password mismatch',
    events: [
      {
        type: 'blur',
        element: 'input',
        callback(event: InputEvent) {
          const target = event.target as HTMLInputElement;
          const validation = new Validation(target.value);
          let { isValid } = validation.minLength(6).lettersOrNumbers();
          const anotherPasswordField = document.querySelector('[name=password]') as HTMLInputElement;
          if (anotherPasswordField !== null) {
            isValid = isValid && anotherPasswordField.value === target.value;
          }
          if (!isValid) {
            passwordAgainInput.setValidError();
          } else {
            passwordAgainInput.setValid();
          }
        },
      },
    ],
  },
  defaultInputTmpl,
);
const submitBtn = new Button(
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
    text: 'Sign up',
  },
  buttonTmpl,
);

export class Signup extends Form {}

export const signupProps: Props = {
  events: [
    {
      type: 'submit',
      element: 'form',
      callback(event: Event): void {
        event.preventDefault();
        AuthController.signUp(getObjFromFormData(new FormData(event.target as HTMLFormElement)) as SignUpData);
      },
    },
    {
      type: 'click',
      element: '[data-path]',
      callback(event: Event): void {
        const target = event.target as HTMLElement;
        const { path } = target.dataset;
        router.go(path as string);
      },
    },
  ],
  components: {
    emailInput,
    loginInput,
    firstNameInput,
    secondNameInput,
    phoneInput,
    passwordInput,
    passwordAgainInput,
    submitBtn,
  },
};
