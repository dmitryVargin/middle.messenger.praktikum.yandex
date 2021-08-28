import Form from '../../../modules/Form';
import {resourcesUrl} from '../../../constants/urls';
import CloseCircleButton from '../../CloseCircleButton';
import closeCircleButtonTmpl from '../../CloseCircleButton/index.tmpl';
import store, {StoreUser, TStore} from '../../../store/Store';
import Block from '../../../modules/Block/Block';
import PlusCircleButton from '../../PlusCircleButton';
import plusCircleButtonTmpl from '../../PlusCircleButton/index.tmpl';
import getObjFromFormData from '../../../utils/functions/getObjFromFormData';
import userListPopupTmpl from './index.tmpl'
import Templator from '../../../utils/classes/Templator';
import ChatController from '../../../controllers/ChatsController';
import chatUserAddPopup from '../ChatUserAddPopup';


const userItemTemplator = ({
                             id,
                             first_name,
                             second_name,
                             avatar
                           }: StoreUser) => `<div data-id="${id as number}" class="user-item">
                          <div  class="user-info">
                            <div class="user-avatar ${avatar || 'empty'}"><img src="${resourcesUrl}${avatar || ''}" alt=""></div>
                            <div>${first_name} ${second_name}</div>
                          </div>
                          <div data-component="closeCircleButton"></div>
                        </div>`


const userList = store.activeChatUsers.map((user) => new Block({
  components: {
    closeCircleButton: new CloseCircleButton({
      events: [{
        type: 'click',
        element: 'root',
        callback(event: Event) {
          const target = event.currentTarget as HTMLElement;
          const parent = target.parentNode as HTMLElement;
          const id = parent.dataset.id as string
          ChatController.deleteUserFromChat(store.activeChat.id as number, [+id])
        }
      }],
      attributes: [
        {
          element: 'root',
          className: {
            type: 'add',
            value: 'delete-user-btn',
          },
        }
      ]
    }, closeCircleButtonTmpl)
  },
}, userItemTemplator(user)))

const plusBtn = new PlusCircleButton({
  attributes: [
    {
      element: 'root',
      className: {
        type: 'add',
        value: 'add-user-btn',
      },
    }
  ]
}, plusCircleButtonTmpl)

class UserListPopup extends Form {
  render(): HTMLCollection {
    const users = this.props.activeChatUsers as TStore['activeChatUsers']
    const userList = users.map((user) => new Block({
      components: {
        closeCircleButton: new CloseCircleButton({
          events: [{
            type: 'click',
            element: 'root',
            callback(event: Event) {
              const target = event.currentTarget as HTMLElement;
              const parent = target.parentNode as HTMLElement;
              const id = parent.dataset.id as string
              ChatController.deleteUserFromChat(store.activeChat.id as number, [+id])
            }
          }],
          attributes: [
            {
              element: 'root',
              className: {
                type: 'add',
                value: 'delete-user-btn',
              },
            }
          ]
        }, closeCircleButtonTmpl)
      }
    }, userItemTemplator(user)))
    return Templator.getCompiledChildren(this._meta.tmpl, {
      ...this.props,
      components: {
        ...this.props.components,
        userList,
      }
    });
  }
}


const userListPopup = new UserListPopup(
  {
    activeChatUsers: store.activeChatUsers,
    title: `Список пользователей`,
    components: {
      userList,
      plusBtn,
    },
    attributes: [
      {
        element: 'root',
        className: {
          type: 'add',
          value: 'user-list-popup',
        },
      },
    ],
    events: [
      {
        type: 'submit',
        element: 'form',
        callback(this: UserListPopup, event: Event) {
          event.preventDefault();
          const target = event.target as HTMLFormElement;
          const formData = new FormData(target)
          console.log(getObjFromFormData(formData));
          this.destroy();
        },
      },
      {
        type: 'click',
        element: '.close-popup',
        callback(this: UserListPopup) {
          this.destroy();
        },
      },
      {
        type: 'click',
        element: '.add-user-btn',
        callback(this: UserListPopup) {
          document.body.append(chatUserAddPopup.getContent());
          this.destroy();
        }
      },
    ],
  },
  userListPopupTmpl,
);

export default userListPopup;
