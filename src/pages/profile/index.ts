import ArrowButton from '../../components/ArrowButton/index';
import arrowButtonTmpl from '../../components/ArrowButton/index.tmpl';
import Block from '../../utils/Block';
import { router} from '../../index';
import EditFieldPopup from '../../components/popups/EditFieldPopup';
import editFieldPopupTmpl from '../../components/popups/EditFieldPopup/index.tmpl';
import DefaultInput from '../../components/DefaultInput';
import defaultInputTmpl from '../../components/DefaultInput/index.tmpl';
import Button from '../../components/Button';
import buttonTmpl from '../../components/Button/index.tmpl';
import { checkValidationByTemplate } from '../../utils/Validation';

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
          const { path } = target.dataset ;
          router.go(path as string)
        },
      },
    ],
  },
  arrowButtonTmpl,
);

export class Profile extends Block {
  componentDidMount() {
    //like fetch
    setTimeout(() => {
      this.setProps({
        userData: {
          avatar: '',
          email: 'example@email.com',
          login: 'some_login',
          first_name: 'John',
          second_name: 'Doe',
          display_name: 'Johny',
          phone: '+7-123-456-78-90',
        },
      });
    }, 1000);
  }
}

function openPopup(fieldName: string) {
  const inputValue = 'Some value from store';
  const input = new DefaultInput(
    {
      label: fieldName.charAt(0).toUpperCase() + fieldName.slice(1),
      type: 'text',
      placeholder: inputValue,
      name: fieldName,
      errorText: `Wrong ${fieldName}`,
      events: [
        {
          type: 'blur',
          element: 'input',
          callback(event: InputEvent) {
            const target = event.target as HTMLInputElement;
            const isValid = checkValidationByTemplate(fieldName, target.value);
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
  const submitBtn = new Button(
    {
      type: 'submit',
      text: 'confirm edit',
    },
    buttonTmpl,
  );
  const editPopup = new EditFieldPopup(
    {
      title: 'Редактировать поле',
      components: {
        input,
        submitBtn,
      },
      events: [
        {
          type: 'submit',
          element: 'form',
          callback(event: Event) {
            event.preventDefault();
            const formData = new FormData(event.target as HTMLFormElement);
            const formDataObj: Record<string, unknown> = {};
            // eslint-disable-next-line no-restricted-syntax
            for (const [name, value] of formData) {
              formDataObj[name] = value;
            }
            console.log(formDataObj);
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
        openPopup(fieldName);
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
};
