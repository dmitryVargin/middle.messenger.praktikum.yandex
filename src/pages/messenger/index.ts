import Block, {Props} from '../../modules/Block/Block';
import ArrowButton from '../../components/ArrowButton';
import arrowButtonTmpl from '../../components/ArrowButton/index.tmpl';
import DefaultInput from '../../components/DefaultInput';
import defaultInputTmpl from '../../components/DefaultInput/index.tmpl';
import searchInputTmpl from '../../components/searchInput/index.tmpl';


import {router} from '../../index';
import ChatController from '../../controllers/ChatsController';
import EditFieldPopup from '../../components/popups/EditFieldPopup';
import getObjFromFormData from '../../utils/functions/getObjFromFormData';
import store, {Chat, Chats} from '../../store/Store';
import editFieldPopupTmpl
  from '../../components/popups/EditFieldPopup/index.tmpl';
import Button from '../../components/Button';
import buttonTmpl from '../../components/Button/index.tmpl';
import ChatItem from '../../components/ChatItem';
import chatItemTmpl from '../../components/ChatItem/index.tmpl'
import Templator from '../../utils/classes/Templator';
import ChatsApi from '../../api/ChatsApi';
import MessageApi from '../../api/MessageApi';
import ConfirmPopup from '../../components/popups/ConfirmPopup';
import confirmPopupTmpl from '../../components/popups/ConfirmPopup/index.tmpl';
import {checkValidationByTemplate} from '../../utils/classes/Validation';
import UserListPopup from '../../components/popups/UserListPopup';
import userListPopupTmpl
  from '../../components/popups/UserListPopup/index.tmpl';
import UserAddPopup from '../../components/popups/UserAddPopup';
import userAddPopupTmpl
  from '../../components/popups/UserAddPopup/index.tmpl';

import {resourcesUrl} from '../../utils/variables';
import PlusCircleButton from '../../components/PlusCircleButton';
import plusCircleButtonTmpl from '../../components/PlusCircleButton/index.tmpl';
import CloseCircleButton from '../../components/CloseCircleButton';
import closeCircleButtonTmpl
  from '../../components/CloseCircleButton/index.tmpl';
import UserContoller from '../../controllers/UserContoller';
//
export type MessageObj = {
  id: string;
  time: Date;
  user_id: string
  content: string
  type: 'message'
};

const messageTemplator = ({
                            id,
                            time,
                            user_id,
                            content,
                            type
                          }: MessageObj): string => {
  const messageOwner = +user_id === store.userData.id ? 'own' : 'other';
  const innerTime = new Date(time).toLocaleTimeString().slice(0, -3)
  return `
  <div data-id='${id}' class='message ${messageOwner}'>
    <p class='text'>
      ${content}
    </p>
    <div class='info'>
      <div class='time'>${innerTime}</div>
    </div>
  </div>`;
};


const searchInput = new DefaultInput({}, searchInputTmpl);

const messageInput = new DefaultInput(
  {
    attributes: [
      {
        element: 'root',
        className: {
          type: 'add',
          value: 'fullwidth',
        },
      },
    ],
  },
  defaultInputTmpl,
);

const arrowBtn = new ArrowButton({}, arrowButtonTmpl);

class Messages extends Block {
  render(): HTMLCollection {
    const messagesArray = this.props.activeChatMessages as MessageObj[]
    const messages = new Block({}, `<div>${messagesArray.map(message => messageTemplator(message)).join()}</div>`)
    const result = Templator.getCompiledChildren(this._meta.tmpl, {
      ...this.props,
      components: {
        ...this.props.components,
        messages,
      }
    });
    return Templator.getCompiledChildren(this._meta.tmpl, {
      ...this.props,
      components: {
        ...this.props.components,
        messages,
      }
    });
    document.querySelector('.empty-chat')?.classList.add('hidden');
    document.querySelector('.chat-content-wrap')?.classList.remove('hidden');
  }
}

const messageTmpl = `<div><div data-component="messages"></div></div>`
export const messages = new Messages({activeChatMessages: store.activeChatMessages}, messageTmpl);


export class Messenger extends Block {
  updateMessages(messages: MessageObj[]) {
    document.querySelector('.empty-chat')?.classList.add('hidden');
    document.querySelector('.chat-content-wrap')?.classList.remove('hidden');
  }

  sendMessage(message: string): void {
    this.props.socket.send(JSON.stringify({
      content: message,
      type: 'message'
    }))
  }


  componentDidMount() {
    ChatController.getChats(0, 20)
  }

  render(): HTMLCollection {
    // TODO лишние рендеры
    const chats = this.props.chats as Chats
    const chatList = chats.map(chat => new ChatItem(chat, chatItemTmpl))
    return Templator.getCompiledChildren(this._meta.tmpl, {
      ...this.props,
      components: {
        ...this.props.components,
        chatList,
      }
    });
  }
}

function openChangeChatAvatarPopup(activeChatId: number) {
  const submitBtn = new Button(
    {
      type: 'submit',
      text: 'update',
    },
    buttonTmpl,
  );

  const chatIdInput = new DefaultInput(
    {
      type: 'hidden',
      name: 'chatId',
      value: activeChatId
    },
    defaultInputTmpl,
  );

  const fileInput = new DefaultInput(
    {
      label: '',
      type: 'file',
      name: 'avatar',
    },
    defaultInputTmpl,
  );
  const editPopup = new EditFieldPopup(
    {
      title: 'Update chat avatar',
      components: {
        input: [chatIdInput, fileInput],
        submitBtn,
      },
      events: [
        {
          type: 'submit',
          element: 'form',
          callback(event: Event) {
            event.preventDefault();
            ChatController.updateChatAvatar(new FormData(event.target as HTMLFormElement))
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


function deleteChatPopupOpen(chat: Chat) {
  const submitBtn = new Button(
    {
      type: 'submit',
      text: 'delete',
    },
    buttonTmpl,
  );
  const deletePopup = new ConfirmPopup(
    {
      title: `Confirm deleting chat ${chat.title}`,
      components: {
        submitBtn,
      },
      events: [
        {
          type: 'submit',
          element: 'form',
          callback(event: Event) {
            event.preventDefault();
            ChatController.deleteChat(chat.id)
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
    confirmPopupTmpl,
  );
  document.body.append(deletePopup.getContent());
}

function openAddChatPopup() {
  const submitBtn = new Button(
    {
      type: 'submit',
      text: 'create',
    },
    buttonTmpl,
  );
  const input = new DefaultInput(
    {
      label: 'Chat name',
      type: 'text',
      name: 'title',
      errorText: `Wrong chat name`,
      events: [
        {
          type: 'blur',
          element: 'input',
          callback() {
            //TODO
            // event: InputEvent
            // const target = event.target as HTMLInputElement;
            const isValid = true
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
  const editPopup = new EditFieldPopup(
    {
      title: 'Create chat',
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
            ChatController.createChat(getObjFromFormData(new FormData(event.target as HTMLFormElement)).title)
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

function openAddUserToChatPopup() {
  const searchInput = new DefaultInput({
    type: 'text',
    name: 'search',
    label: 'Поиск пользователей',
    events: [
      {
        type: 'input',
        element: 'input',
        callback(event: Event) {
          const target = event.target as HTMLInputElement
          UserContoller.searchUsersByLogin(target.value)
            .then(xhr => {
              store.searchUserList = xhr.response
              console.log(xhr.response);
            })
        },
      },
    ]
  }, searchInputTmpl);
  const userItemTmpl = `<div class="user-item">
                          <div class="user-info">
                            <div class="user-avatar"><img src="${resourcesUrl}{{avatar}}" alt=""></div>
                            <div>{{first_name}} {{second_name}}</div>
                          </div>
                          <input name="user" value="{{id}}" type="checkbox">
                          <button>добавить выбранных</button>
                        </div>`

  function getUserList() {
    return store.searchUserList.map((user) => new Block(user, userItemTmpl))
  }

  const userList = getUserList()

  const addUserPopup = new UserAddPopup(
    {
      title: `Добавить пользователей`,
      components: {
        searchInput,
        userList,
      },
      events: [
        {
          type: 'submit',
          element: 'form',
          callback(event: Event) {
            event.preventDefault();
            const target = event.target as HTMLFormElement;
            const formData = new FormData(target)
            console.log(getObjFromFormData(formData));
            //TODO
            // ChatController.addUsersToChatById(store.activeChat.id, [117188])
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
        {
          type: 'click',
          element: '.add-user-btn',
          callback() {
            // @ts-ignore
            this.destroy();
          },
        },
      ],
    },
    userAddPopupTmpl,
  );
  document.body.append(addUserPopup.getContent());
}

function openChatUserListPopup() {
  const searchInput = new DefaultInput({}, searchInputTmpl);
  const userItemTmpl = `<div class="user-item">
                          <div class="user-info">
                            <div class="user-avatar"><img src="${resourcesUrl}{{avatar}}" alt=""></div>
                            <div>{{first_name}} {{second_name}}</div>
                          </div>
                          <div data-component="closeCircleButton"></div>
                        </div>`

  const closeCircleButton = new CloseCircleButton({}, closeCircleButtonTmpl)

  const userList = store.activeChatUsers.map((user) => new Block({
    ...user,
    components: {closeCircleButton},
  }, userItemTmpl))

  const plusBtn = new PlusCircleButton({}, plusCircleButtonTmpl)

  const userListPopup = new UserListPopup(
    {
      title: `Список пользователей`,
      components: {
        searchInput,
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
          callback(event: Event) {
            event.preventDefault();
            const target = event.target as HTMLFormElement;
            const formData = new FormData(target)
            console.log(getObjFromFormData(formData));
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
        {
          type: 'click',
          element: '.circle-button',
          callback() {
            // @ts-ignore
            openAddUserToChatPopup()
            this.destroy();
          }
        },
      ],
    },
    userListPopupTmpl,
  );
  document.body.append(userListPopup.getContent());

}

export const messengerProps: Props = {
  chats: [],
  events: [
    {
      type: 'click',
      element: '[data-path]',
      callback(event: Event): void {
        const target = event.target as HTMLElement;
        const {path} = target.dataset;
        router.go(path as string)
      },
    },
    {
      type: 'click',
      element: '.settings-btn',
      callback(): void {
        document.querySelector('.settings-popup')!.classList.toggle('hidden')
        // const {path} = target.dataset;
        // router.go(path as string)
      },
    },
    {
      type: 'click',
      element: '.add-chat-btn',
      callback(): void {
        openAddChatPopup()
      },
    },
    {
      type: 'click',
      element: '.controls .arrow-button',
      callback(): void {
        // @ts-ignore
        this.sendMessage(this.element.querySelector('.controls input').value);
        // @ts-ignore
        this.element.querySelector('.controls input').value = '';
      },
    },
    {
      type: 'click',
      element: '[data-action]',
      callback(event: Event) {
        const target = event.currentTarget as HTMLElement;
        //'deleteChat'| 'chatAvatarUpdate' | 'chatUserList'
        const {action} = target.dataset
        if (action === 'deleteChat') {
          deleteChatPopupOpen(store.activeChat as Chat)
        } else if (action === 'chatAvatarUpdate') {
          openChangeChatAvatarPopup(store.activeChat.id)
        } else if (action === 'chatUserList') {
          openChatUserListPopup()
        }

        console.log(action);
      },
    },
    {
      type: 'click',
      element: '.chat',
      callback(event: Event) {
        const target = event.currentTarget as HTMLElement;
        const {id} = target.dataset;
        if (id === undefined) return
        if (+id !== store.activeChat.id) {
          store.activeChat = store.chats.find(chat => chat.id === +id) as Chat
          ChatController.getChatUsersById(+id)
          ChatsApi.getToken(+id).then(xhr => {
            const {token} = JSON.parse(xhr.response)
            const socket = MessageApi.startChat(store.userData.id as number, +id, token)
            let i
            socket.addEventListener('open', () => {
              console.log('Соединение установлено');
              i = setInterval(() => {
                socket.send(JSON.stringify({
                  type: 'ping'
                }))
              }, 2000)
              ChatController.getNewMessagesCount(store.activeChat.id)
                .then((xhr) => JSON.parse(xhr.response))
                .then(data => {
                    socket.send(JSON.stringify({
                      content: data.unread_count,
                      type: 'get old'
                    }))
                  }
                )
              ;
            });
            socket.onmessage = (event) => {
              const messages = JSON.parse(event.data) as MessageObj[] | MessageObj
              if (messages.type === 'pong') return
              let activeChatMessages
              if (Array.isArray(messages)) {
                activeChatMessages = store.activeChatMessages = [...store.activeChatMessages, ...messages]
              } else {
                activeChatMessages = store.activeChatMessages = [...store.activeChatMessages, messages]
              }
              activeChatMessages.sort((a, b) => +new Date(a.time) - +new Date(b.time))
              store.activeChatMessages = activeChatMessages
            };
            socket.addEventListener('close', event => {
              if (event.wasClean) {
                console.log('Соединение закрыто чисто');
              } else {
                console.log('Обрыв соединения');
              }
              clearInterval(i)
              console.log(`Код: ${event.code} | Причина: ${event.reason}`);
            });
            this.setProps({socket})
          })
          this.setProps({
            attributes: [
              {
                element: '.empty-chat',
                className: {
                  type: 'add',
                  value: 'hidden',
                },
              },
              {
                element: '.chat-content-wrap',
                className: {
                  type: 'remove',
                  value: 'hidden',
                },
              }
            ]
          })
        }
      },
    },
  ],
  components: {
    messages,
    searchInput,
    messageInput,
    arrowBtn,
  },
};


