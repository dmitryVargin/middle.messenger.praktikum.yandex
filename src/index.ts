import { Login, loginProps } from './pages/login';
import loginTmpl from './pages/login/index.tmpl';

import { Signup, signupProps } from './pages/signup';
import signupTmpl from './pages/signup/index.tmpl';

import { Profile, profileProps } from './pages/profile';
import profileTmpl from './pages/profile/index.tmpl';

import { Messenger, messengerProps } from './pages/messenger';
import chatTmpl from './pages/messenger/index.tmpl';

import ErrorPage from './pages/errorPage';
import errorPageTmpl from './pages/errorPage/index.tmpl';

import './index.scss';
import Block, { Props } from './modules/Block/Block';
import Router from './utils/classes/Router';

import { storeEventBus } from './store/Store';
import messages from './components/Messages';
import userListPopup from './components/popups/ChatUserListPopup';
import chatUserAddPopup from './components/popups/ChatUserAddPopup';

const routesToElem: {
  [key: string]: {
    Class: typeof Block;
    props: Props;
    value: Block | null;
    tmpl: string;
    isProtected: boolean;
    listenedStoreField: string[];
  };
} = {
  '/': {
    Class: Messenger,
    props: messengerProps,
    value: null,
    tmpl: chatTmpl,
    isProtected: true,
    listenedStoreField: ['chats', 'activeChat', 'updateMessenger'],
  },
  '/login': {
    Class: Login,
    props: loginProps,
    value: null,
    tmpl: loginTmpl,
    isProtected: false,
    listenedStoreField: [],
  },
  '/sign-up': {
    Class: Signup,
    props: signupProps,
    value: null,
    tmpl: signupTmpl,
    isProtected: false,
    listenedStoreField: [],
  },
  '/settings': {
    Class: Profile,
    props: profileProps,
    value: null,
    tmpl: profileTmpl,
    isProtected: true,
    listenedStoreField: ['userData'],
  },
};

export const router = new Router('#root');

Object.keys(routesToElem).forEach((routeInfo) => {
  const { Class, props, tmpl, isProtected, listenedStoreField } = routesToElem[routeInfo];

  const block = new Class(props, tmpl);
  router.use(routeInfo, block, isProtected);
  listenedStoreField.forEach((field) => {
    const callback = block.setProps.bind(block);
    storeEventBus.on(field, callback);
  });
});
storeEventBus.on('activeChatMessages', messages.setProps.bind(messages));
storeEventBus.on('activeChatUsers', userListPopup.setProps.bind(userListPopup));
storeEventBus.on('searchUserList', chatUserAddPopup.setProps.bind(chatUserAddPopup));
//
router.use(
  'errorPage',
  new ErrorPage(
    {
      error: {
        code: '404',
        message: 'Страница не существует',
      },
      events: [
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
    },
    errorPageTmpl,
  ),
  false,
);

router.start();
