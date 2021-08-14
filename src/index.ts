import {Login, loginProps} from './pages/login';
import loginTmpl from './pages/login/index.tmpl';

import {Signup, signupProps} from './pages/signup';
import signupTmpl from './pages/signup/index.tmpl';

import {Profile, profileProps} from './pages/profile';
import profileTmpl from './pages/profile/index.tmpl';

import {Chat, chatProps} from './pages/chat';
import chatTmpl from './pages/chat/index.tmpl';


import ErrorPage from './pages/errorPage';
import errorPageTmpl from './pages/errorPage/index.tmpl';

import './index.scss';
import Block, {Props} from './utils/Block';
import Router from './utils/Router';

const routesToElem: {
  [key: string]: {
    Class: typeof Block;
    props: Props;
    value: Block | null;
    tmpl: string;
  };
} = {
  '/login': {
    Class: Login,
    props: loginProps,
    value: null,
    tmpl: loginTmpl,
  },
  '/sign-up': {
    Class: Signup,
    props: signupProps,
    value: null,
    tmpl: signupTmpl,
  },
  '/messenger': {
    Class: Chat,
    props: chatProps,
    value: null,
    tmpl: chatTmpl,
  },
  '/settings': {
    Class: Profile,
    props: profileProps,
    value: null,
    tmpl: profileTmpl,
  },
};

export function getCurrentPage(): Block {
  const routeExist = routesToElem[window.location.pathname] !== undefined;
  let currentPage;
  if (routeExist) {
    const currentPageObj = routesToElem[window.location.pathname];
    const isComponentInit = !!currentPageObj.value;
    if (!isComponentInit) {
      currentPageObj.value = new currentPageObj.Class(
        currentPageObj.props,
        currentPageObj.tmpl,
      );
    }
    currentPage = currentPageObj.value as Block;
  } else {
    currentPage = new ErrorPage(
      {
        error: {
          code: '404',
          message: 'Страница не существует',
        },
      },
      errorPageTmpl,
    );
  }
  return currentPage;
}

export const router = new Router('#root', new ErrorPage(
  {
    error: {
      code: '404',
      message: 'Страница не существует',
    },
  },
  errorPageTmpl,
));

Object.keys(routesToElem).forEach((routeInfo) => {
  const {Class, props, tmpl} = routesToElem[routeInfo]
  const block = new Class(props, tmpl)
  router.use(routeInfo, block)
})


router.start();


