import Form from '../../../modules/Form';
import DefaultInput from '../../DefaultInput';
import UserContoller from '../../../controllers/UserContoller';
import store, {StoreUser, TStore} from '../../../store/Store';
import searchInputTmpl from '../../searchInput/index.tmpl';
import {resourcesUrl} from '../../../constants/urls';
import Block from '../../../modules/Block/Block';
import getObjFromFormData from '../../../utils/functions/getObjFromFormData';
import chatUserAddPopupTmpl from './index.tmpl';
import Templator from '../../../utils/classes/Templator';
import Button from '../../Button';
import buttonTmpl from '../../Button/index.tmpl';
import ChatController from '../../../controllers/ChatsController';


const searchInput = new DefaultInput({
  type: 'text',
  name: 'search',
  label: 'Поиск пользователей',
  events: [
    {
      value: store.searchUserInput,
      type: 'input',
      element: 'input',
      callback(event: Event) {
        const target = event.target as HTMLInputElement
        UserContoller.searchUsersByLogin(target.value)
      },
    },
  ]
}, searchInputTmpl);

const submitBtn = new Button(
  {
    type: 'submit',
    text: 'добавить выбранных',
  },
  buttonTmpl,
);

const userItemTemplator = ({
                             id,
                             first_name,
                             second_name,
                             avatar
                           }: StoreUser) => `<div class="user-item">
            <div class="user-info">
              <div class="user-avatar"><img src="${resourcesUrl}${avatar || ''}" alt=""></div>
              <div>${first_name} ${second_name}</div>
            </div>
            <input name="user-${id as number}" type="checkbox">
          </div>`

const userList = store.searchUserList.map((user) => new Block({}, userItemTemplator(user)))

class ChatUserAddPopup extends Form {
  render(): HTMLCollection {
    const users = this.props.searchUserList as TStore['searchUserList']
    const userList = users.map((user) => new Block({}, userItemTemplator(user)))
    return Templator.getCompiledChildren(this._meta.tmpl, {
      ...this.props,
      components: {
        ...this.props.components,
        userList,
      }
    });
  }

  afterRender() {
    this.element.querySelector('input')?.focus()
  }
}

const chatUserAddPopup = new ChatUserAddPopup({
  searchUserList: [],
  title: `Добавить пользователей`,
  components: {
    searchInput,
    userList,
    submitBtn,
  },
  events: [
    {
      type: 'submit',
      element: 'form',
      callback(event: Event) {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
        const formData = new FormData(target)
        const userIds: number[] = []
        Object.keys(getObjFromFormData(formData)).forEach((key) => {
          if (key.includes('user-')) {
            userIds.push(+key.slice(5))
          }
        })
        ChatController.addUsersToChatById(store.activeChat.id as number, userIds)
      },
    },
    {
      type: 'click',
      element: '.close-popup',
      callback(this: ChatUserAddPopup) {
        store.searchUserList = []
        store.searchUserInput = ''
        this.destroy();
      },
    },
  ],
}, chatUserAddPopupTmpl)

export default chatUserAddPopup;
