import ArrowButton from '../../components/ArrowButton/index';
import arrowButtonTmpl from '../../components/ArrowButton/index.tmpl';
import Block from '../../modules/Block/Block';
import {router} from '../../index';
import EditFieldPopup from '../../components/popups/EditFieldPopup';
import editFieldPopupTmpl
  from '../../components/popups/EditFieldPopup/index.tmpl';
import editPasswordPopupTmpl
  from '../../components/popups/EditPasswordPopup/index.tmpl';
import DefaultInput from '../../components/DefaultInput';
import defaultInputTmpl from '../../components/DefaultInput/index.tmpl';
import Button from '../../components/Button';
import buttonTmpl from '../../components/Button/index.tmpl';
import {checkValidationByTemplate} from '../../utils/classes/Validation';
import AuthController, {UserFromServer} from '../../controllers/AuthController';
import store, {StoreUser, TStore} from '../../store/Store';
import UserContoller from '../../controllers/UserContoller';
import getObjFromFormData from '../../utils/functions/getObjFromFormData';

const arrowBtn = new ArrowButton(
  {
    attributes: [
      {
        element: 'root',
        className: {
          type: 'add',
          value: 'to-left',
        },
      },
      {
        element: 'root',
        'data-path': {
          type: 'set',
          value: '/messenger',
        },
      },
    ],
    events: [
      {
        type: 'click',
        element: 'root',
        callback(event: Event) {
          const target = event.target as HTMLElement;
          const {path} = target.dataset;
          router.go(path as string)
        },
      },
    ],
  },
  arrowButtonTmpl,
);

export class Profile extends Block {
  componentDidMount() {
    setTimeout(() => {
      AuthController.getUser()
    }, 100)
  }
}

function openEditFieldPopup(fieldName: string) {
  const {userData} = store
  const inputValue = userData[fieldName as keyof TStore['userData']]
  const specificPopup = fieldName === 'password' || fieldName === 'avatar'
  let components = {}
  const submitBtn = new Button(
    {
      type: 'submit',
      text: 'confirm edit',
    },
    buttonTmpl,
  );
  if (specificPopup) {
    if (fieldName === 'password') {
      const oldPasswordInput = new DefaultInput(
        {
          label: 'Old password',
          type: 'password',
          name: 'oldPassword',
          errorText: `Wrong ${fieldName}`,
          events: [
            {
              type: 'blur',
              element: 'input',
              callback(event: InputEvent) {
                const target = event.target as HTMLInputElement;
                const isValid = true
                checkValidationByTemplate(fieldName, target.value);
                if (!isValid) {
                  oldPasswordInput.setValidError();
                } else {
                  oldPasswordInput.setValid();
                }
              },
            },
          ],
        },
        defaultInputTmpl,
      );
      const newPasswordInput = new DefaultInput(
        {
          label: 'New password',
          type: 'password',
          name: 'newPassword',
          errorText: `Wrong ${fieldName}`,
          events: [
            {
              type: 'blur',
              element: 'input',
              callback(event: InputEvent) {
                const target = event.target as HTMLInputElement;
                const isValid = true
                checkValidationByTemplate(fieldName, target.value);
                if (!isValid) {
                  newPasswordInput.setValidError();
                } else {
                  newPasswordInput.setValid();
                }
              },
            },
          ],
        },
        defaultInputTmpl,
      );
      components = {
        input: [oldPasswordInput, newPasswordInput],
        submitBtn,
      }
    } else if (fieldName === 'avatar') {
      // TODO  стилизация input type file
      const input = new DefaultInput(
        {
          label: fieldName.charAt(0).toUpperCase() + fieldName.slice(1),
          type: 'file',
          name: fieldName,
          errorText: `Wrong ${fieldName}`,
          events: [
            {
              type: 'blur',
              element: 'input',
              callback(event: InputEvent) {
                const target = event.target as HTMLInputElement;
                const isValid = true
                checkValidationByTemplate(fieldName, target.value);
                if (!isValid) {
                  input.setValidError();
                } else {
                  input.setValid();
                }
              },
            },
          ],
        },
        defaultInputTmpl,
      );
      components = {
        input,
        submitBtn,
      }
    }

  } else {
    const input = new DefaultInput(
      {
        label: fieldName.charAt(0).toUpperCase() + fieldName.slice(1),
        type: 'text',
        value: inputValue,
        name: fieldName,
        errorText: `Wrong ${fieldName}`,
        events: [
          {
            type: 'blur',
            element: 'input',
            callback(event: InputEvent) {
              const target = event.target as HTMLInputElement;
              const isValid = true
              checkValidationByTemplate(fieldName, target.value);
              if (!isValid) {
                input.setValidError();
              } else {
                input.setValid();
              }
            },
          },
        ],
      },
      defaultInputTmpl,
    );
    components = {
      input,
      submitBtn,
    }
  }


  const editPopup = new EditFieldPopup(
    {
      title: 'Редактировать поле',
      components,
      events: [
        {
          type: 'submit',
          element: 'form',
          callback(event: Event) {
            event.preventDefault();
            if (specificPopup) {
              if (fieldName === 'password') {
                const {
                  oldPassword,
                  newPassword
                } = getObjFromFormData(new FormData(event.target as HTMLFormElement))
                UserContoller.updateUserPassword(oldPassword, newPassword)
              } else if (fieldName === 'avatar') {
                UserContoller.updateProfileAvatar(new FormData(event.target as HTMLFormElement))
              }
            } else {
              const userData = {
                ...store.userData as UserFromServer,
                ...getObjFromFormData(new FormData(event.target as HTMLFormElement)),
              }
              UserContoller.updateProfile(userData)
                .then(() => {
                  AuthController.getUser()
                })
                .catch(() => {
                  //TODO ошибка апдейта поля
                })
            }
            // @ts-ignore
            this.destroy();
          },
        },
        {
          type: 'click',
          element: '.close-popup',
          callback() {
            // @ts-ignore
            this.destroy();
          },
        },
      ],
    },
    editFieldPopupTmpl,
  );
  document.body.append(editPopup.getContent());
}

export const profileProps = {
  components: {
    arrowBtn,
  },
  events: [
    {
      type: 'click',
      element: '[data-field]',
      callback(event: Event): void {
        const field = event.target as HTMLFormElement;
        const fieldName = field.dataset.field as string;
        openEditFieldPopup(fieldName);
      },
    },
    {
      type: 'click',
      element: '[data-logout]',
      callback(): void {
        AuthController.logout()
      },
    },
  ],
};
