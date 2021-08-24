import Block, {Props} from '../../modules/Block/Block';
import ArrowButton from '../../components/ArrowButton';
import arrowButtonTmpl from '../../components/ArrowButton/index.tmpl';
import DefaultInput from '../../components/DefaultInput';
import defaultInputTmpl from '../../components/DefaultInput/index.tmpl';
import searchInputTmpl from '../../components/searchInput/index.tmpl';
import {router} from '../../index';
import ChatController from '../../controllers/ChatsController';
import FormPopup from '../../components/popups/FormPopup';
import formPopupTmpl from '../../components/popups/FormPopup/index.tmpl';
import getObjFromFormData from '../../utils/functions/getObjFromFormData';
import store, {Chat, Chats} from '../../store/Store';
import Button from '../../components/Button';
import buttonTmpl from '../../components/Button/index.tmpl';
import ChatItem from '../../components/ChatItem';
import chatItemTmpl from '../../components/ChatItem/index.tmpl'
import Templator from '../../utils/classes/Templator';
import ChatsApi from '../../api/ChatsApi';
import MessageApi from '../../api/MessageApi';
import messages, {MessageObj} from '../../components/Messages';
import userListPopup from '../../components/popups/ChatUserListPopup';
import encodeHTML from '../../utils/functions/encodeHTML';
import deepEncodeHTML from '../../utils/functions/deepEncodeHTML';


const arrowBtn = new ArrowButton({}, arrowButtonTmpl);


export class Messenger extends Block {
  sendMessage(message: string): void {
    (this.props.socket as WebSocket).send(JSON.stringify({
      content: encodeHTML(message),
      type: 'message'
    }))
  }


  componentDidMount(): void {
    ChatController.getChats(0, 20)
  }

  render(): HTMLCollection {
    const chats = this.props.chats as Chats
    const chatList = chats.map(chat => new ChatItem({}, chatItemTmpl(chat)))
    return Templator.getCompiledChildren(this._meta.tmpl, {
      ...this.props,
      activeChatAvatar: store.activeChat.avatar ? '' : 'empty',
      components: {
        ...this.props.components,
        chatList,
      }
    });
  }

  afterRender(): void {
    if (!store.activeChat?.id) {
      this.element.querySelector('.empty-chat')?.classList.remove('hidden')
      this.element.querySelector('.chat-content-wrap')?.classList.add('hidden')
    }
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
  const editPopup = new FormPopup(
    {
      title: 'Update chat avatar',
      components: {
        formElements: [chatIdInput, fileInput, submitBtn]
      },
      events: [
        {
          type: 'submit',
          element: 'form',
          callback(this: FormPopup, event: Event) {
            event.preventDefault();
            ChatController.updateChatAvatar(new FormData(event.target as HTMLFormElement))
            this.destroy();
          },
        },
        {
          type: 'click',
          element: '.close-popup',
          callback(this: FormPopup) {
            this.destroy();
          },
        },
      ],
    },
    formPopupTmpl,
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
  const deletePopup = new FormPopup(
    {
      title: `Confirm deleting chat ${chat.title}`,
      components: {
        formElements: [submitBtn]
      },
      events: [
        {
          type: 'submit',
          element: 'form',
          callback(this: FormPopup, event: Event) {
            event.preventDefault();
            ChatController.deleteChat(chat.id)
            this.destroy();
          },
        },
        {
          type: 'click',
          element: '.close-popup',
          callback(this: FormPopup) {
            this.destroy();
          },
        },
      ],
    },
    formPopupTmpl,
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
  const editPopup = new FormPopup(
    {
      title: 'Create chat',
      components: {
        formElements: [input, submitBtn]
      },
      events: [
        {
          type: 'submit',
          element: 'form',
          callback(this: FormPopup, event: Event) {
            event.preventDefault();
            ChatController.createChat(getObjFromFormData(new FormData(event.target as HTMLFormElement)).title)
            this.destroy();
          },
        },
        {
          type: 'click',
          element: '.close-popup',
          callback(this: FormPopup) {
            this.destroy();
          },
        },
      ],
    },
    formPopupTmpl,
  );
  document.body.append(editPopup.getContent());
}

function openChatUserListPopup() {
  document.body.append(userListPopup.getContent());
}


export const messengerProps: Props = {
  chats: [],
  chatAvatarClass: 'empty',
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
        document.querySelector('.settings-popup')?.classList.toggle('hidden')
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
      callback(this: Messenger): void {
        this.sendMessage((this.element.querySelector('.controls input') as HTMLInputElement).value);
        (this.element.querySelector('.controls input') as HTMLInputElement).value = '';
        ChatController.getChats()
      },
    },
    {
      type: 'click',
      element: '[data-action]',
      callback(this: Messenger, event: Event): void {
        const target = event.currentTarget as HTMLElement;
        const {action} = target.dataset
        if (action === 'deleteChat') {
          deleteChatPopupOpen(store.activeChat as Chat)
        } else if (action === 'chatAvatarUpdate') {
          openChangeChatAvatarPopup((store.activeChat as Chat).id)
        } else if (action === 'chatUserList') {
          openChatUserListPopup()
        }
      },
    },
    {
      type: 'click',
      element: '.chat',
      callback(this: Messenger, event: Event): void {
        const target = event.currentTarget as HTMLElement;
        const {id} = target.dataset;
        if (id === undefined) return
        if (+id !== store.activeChat.id) {
          if (this.props.socket) {
            (this.props.socket as WebSocket).close()
            store.activeChatMessages = []
          }
          store.activeChat = store.chats.find(chat => chat.id === +id) as Chat
          ChatController.getChatUsersById(+id)
          ChatsApi.getToken(+id).then(xhr => {
            console.log(JSON.parse(xhr.response));
            const {token} = JSON.parse(xhr.response) as { token: string }
            const socket = MessageApi.startChat(store.userData.id as number, +id, token)
            let i: number
            socket.addEventListener('open', () => {
              i = window.setInterval(() => {
                socket.send(JSON.stringify({
                  type: 'ping'
                }))
              }, 2000)
              ChatController.getNewMessagesCount((store.activeChat as Chat).id)
                .then((xhr) => JSON.parse(xhr.response) as { unread_count: number })
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
              const messages = deepEncodeHTML(JSON.parse(event.data)) as { type: string } | MessageObj[] | MessageObj
              if ((messages as { type: string }).type === 'pong') {
                return
              }
              const activeChatMessages = store.activeChatMessages.concat(messages as MessageObj | MessageObj [])
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
            activeChatAvatar: store.activeChat.avatar ? '' : 'empty',
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
    searchInput: new DefaultInput({}, searchInputTmpl),
    messageInput: new DefaultInput(
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
    ),
    arrowBtn,
  },
};


