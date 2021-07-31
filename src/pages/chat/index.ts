import Block, { Props } from '../../utils/Block';
import ArrowButton from '../../components/ArrowButton';
import arrowButtonTmpl from '../../components/ArrowButton/index.tmpl';
import DefaultInput from '../../components/DefaultInput';
import defaultInputTmpl from '../../components/DefaultInput/index.tmpl';
import searchInputTmpl from '../../components/searchInput/index.tmpl';

import historyPush from '../../utils/historyPush';
import { appRerender } from '../../index';

class ChatList extends Block {}

type MessageObj = {
  messageId: number;
  message: string;
  time: Date;
  isOwn: boolean;
};
const messageTmpl = ({ messageId, message, time, isOwn }: MessageObj): string => {
  const isOtherClass = !isOwn ? 'other' : 'own';
  return `
  <div data-id='${messageId}' class='message ${isOtherClass}'>
    <p class='text'>
    ${message}
    </p>
    <div class='info'>
      <div class='time'>${time.getHours()}:${time.getMinutes()}</div>
    </div>
  </div>`;
};

const messagesMock: MessageObj[] = [
  {
    messageId: 123451,
    message: 'Some message1',
    time: new Date(),
    isOwn: true,
  },
  {
    messageId: 2341,
    message: 'Some message2',
    time: new Date(),
    isOwn: true,
  },
  {
    messageId: 12355451,
    message: 'Some message3',
    time: new Date(),
    isOwn: true,
  },
];

type ChatObj = {
  logo: string;
  name: string;
  lastMsgDate: Date;
  unreadMsgCount: number;
  isLastMsgOwn: boolean;
  lastMsg: string;
};
const chatTemplate = ({ logo, name, lastMsgDate, unreadMsgCount, isLastMsgOwn, lastMsg }: ChatObj): string => {
  const isLastMsgOwnCaption = isLastMsgOwn ? "<span class='own-msg'>Вы:</span>" : '';
  return `
  <div class='chat'>
    <div class='img'>${logo}</div>
    <div class='content'>
      <div class='name'>${name}</div>
      <div class='last-msg'>
      ${isLastMsgOwnCaption}
      ${lastMsg}
      </div>
      <div class='last-msg-date'>${lastMsgDate.getHours()}:${lastMsgDate.getMinutes()}</div>
      <div class='unread-msg-count-wrap'>${unreadMsgCount}</div>
    </div>
  </div>`;
};

const chatMock: ChatObj[] = [
  {
    logo: '',
    name: 'Андрей',
    lastMsgDate: new Date(),
    unreadMsgCount: 3,
    isLastMsgOwn: true,
    lastMsg: 'Some message',
  },
  {
    logo: '',
    name: 'Андрей2',
    lastMsgDate: new Date(),
    unreadMsgCount: 6,
    isLastMsgOwn: true,
    lastMsg: 'Some message2',
  },
  {
    logo: '',
    name: 'Андрей3',
    lastMsgDate: new Date(),
    unreadMsgCount: 5,
    isLastMsgOwn: true,
    lastMsg: 'Some message3',
  },
];

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

const someDataFromServer = {
  messagesMock,
  chatMock,
};

class Messages extends Block {}

function getMessages(newMessage?: string) {
  const messagesArr = someDataFromServer.messagesMock;
  if (newMessage) {
    messagesArr.push({
      messageId: 9999,
      message: newMessage,
      time: new Date(),
      isOwn: true,
    });
  }
  const messagesTmpl = `<div>${messagesArr.map((message) => messageTmpl(message)).join()}</div>`;
  return new Messages({}, messagesTmpl);
}

const chatListTmpl = `<div>${someDataFromServer.chatMock.map((chat) => chatTemplate(chat)).join()}</div>`;

const chatList = new ChatList({}, chatListTmpl);

export class Chat extends Block {
  sendMessage(message: string): void {
    setTimeout(() => {
      this.setProps({
        components: {
          messages: getMessages(message),
        },
      });
      document.querySelector('.empty-chat')?.classList.add('hidden');
      document.querySelector('.chat-content-wrap')?.classList.remove('hidden');
    }, 100);
  }

  componentDidMount() {
    // like fetch - get chatList
    setTimeout(() => {
      this.setProps({
        components: {
          chatList,
        },
        events: [
          ...this.props.events,
          {
            type: 'click',
            element: '.chat',
            callback() {
              // fetch and get data by  chatId
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call
              // @ts-ignore
              this.setProps({
                chatName: 'Some chat',
                components: {
                  messages: getMessages(),
                },
              });
              document.querySelector('.empty-chat')?.classList.add('hidden');
              document.querySelector('.chat-content-wrap')?.classList.remove('hidden');
            },
          },
        ],
      });
    }, 1000);
  }
}

export const chatProps: Props = {
  events: [
    {
      type: 'click',
      element: '[data-path]',
      callback(event: Event): void {
        historyPush(event, appRerender);
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
  ],
  components: {
    searchInput,
    messageInput,
    arrowBtn,
  },
};
