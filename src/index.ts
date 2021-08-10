import { Login, loginProps } from './pages/login';
import loginTmpl from './pages/login/index.tmpl';

import { Signup, signupProps } from './pages/signup';
import signupTmpl from './pages/signup/index.tmpl';

import { Profile, profileProps } from './pages/profile';
import profileTmpl from './pages/profile/index.tmpl';

import { Chat, chatProps } from './pages/chat';
import chatTmpl from './pages/chat/index.tmpl';

import { NavTmp } from './components/navTmp';
import navTmpTmpl from './components/navTmp/index.tmpl';

import { App } from './app';
import appTmpl from './app/index.tmpl';

import ErrorPage from './pages/errorPage';
import errorPageTmpl from './pages/errorPage/index.tmpl';

import './index.scss';
import Block, { Props } from './utils/Block';
import render from './utils/renderDom';
import historyPush from './utils/historyPush';

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
  '/signup': {
    Class: Signup,
    props: signupProps,
    value: null,
    tmpl: signupTmpl,
  },
  '/chat': {
    Class: Chat,
    props: chatProps,
    value: null,
    tmpl: chatTmpl,
  },
  '/profile': {
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

const app = new App(
  {
    components: {
      navTmp: new NavTmp(
        {
          events: [
            {
              type: 'click',
              element: '[data-path]',
              callback(event: MouseEvent) {
                historyPush(event, () => {
                  app.setProps({ components: { page: getCurrentPage() } });
                });
              },
            },
          ],
        },
        navTmpTmpl,
      ),
      page: getCurrentPage(),
    },
  },
  appTmpl,
);
export const appRerender = (): void => {
  app.setProps({ components: { page: getCurrentPage() } });
};

render('#root', app);
