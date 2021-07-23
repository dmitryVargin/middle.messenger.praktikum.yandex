import login from './pages/login/index';
import chatTmpl from './pages/chat/chat.tmpl';
import profileTmpl from './pages/profile/profile.tmpl';
import signupTmpl from './pages/signup/signup.tmpl';
import errorPageTmpl from './pages/errorPage/errorPage.tmpl';
import './index.scss';
import app from './app/index';

import render from './utils/renderDom';

const routes: {
  [key: string]: string;
} = {
  '/login': login,
  '/signup': signupTmpl,
  '/chat': chatTmpl,
  '/profile': profileTmpl,
};

const contextMock: {
  userData: {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
  };
  [key: string]: any;
} = {
  // userData: {
  //   id: 0,
  //   first_name: 'Petya',
  //   second_name: 'Pupkin',
  //   display_name: 'Petya Pupkin',
  //   login: 'userLogin',
  //   email: 'my@email.com',
  //   phone: '89223332211',
  //   avatar: emptyAvatar,
  // },
};

function setCurrentPage() {
  const routeExist = routes[window.location.pathname] !== undefined;

  let currentPage;
  if (routeExist) {
    currentPage = routes[window.location.pathname];
  } else {
    currentPage = errorPageTmpl;
    contextMock.error = {
      code: '404',
      message: 'Страница не существует',
    };
  }

  app.setProps({ page: currentPage });
}

const onNavigate = (event: MouseEvent) => {
  if (!(event.target instanceof HTMLAnchorElement)) {
    return;
  }
  const { path } = event.target.dataset;
  if (typeof path === 'string') {
    window.history.pushState({}, path, `${window.location.origin}${path}`);
  }

  setCurrentPage();
};

console.log(app);

render('#root', app);
