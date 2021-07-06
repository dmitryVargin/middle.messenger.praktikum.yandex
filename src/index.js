import loginTmpl from './pages/login/login.tmpl';
import chatTmpl from './pages/chat/chat.tmpl';
import profileTmpl from './pages/profile/profile.tmpl';
import signupTmpl from './pages/signup/signup.tmpl';
import errorPageTmpl from './pages/errorPage/errorPage.tmpl';
import navTmp from './components/navTmp/';
import Templator from '../utils/templator';
import emptyAvatar from 'url:../static/img/empty-avatar.svg';
import './index.scss';

function appCreator() {
  const routes = {
    '/login': loginTmpl,
    '/signup': signupTmpl,
    '/chat': chatTmpl,
    '/profile': profileTmpl,
  };

  const routeExist = routes[window.location.pathname] !== undefined;

  let currentPage;
  const contextMock = {
    userData: {
      id: 0,
      first_name: 'Petya',
      second_name: 'Pupkin',
      display_name: 'Petya Pupkin',
      login: 'userLogin',
      email: 'my@email.com',
      phone: '89223332211',
      avatar: emptyAvatar,
    },
  };

  if (routeExist) {
    currentPage = routes[window.location.pathname];
  } else {
    currentPage = errorPageTmpl;
    contextMock.error = {
      code: '404',
      message: 'Страница не существует',
    };
  }

  const appTmpl = `<main class="app">
                ${navTmp}
                ${currentPage}
                </main>`;

  return Templator.compile(appTmpl, contextMock);
}

const onNavigate = (pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  rootDiv.innerHTML = appCreator();
  const navLinks = document.querySelectorAll('.nav-list .link');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      onNavigate(link.dataset.path);
    });
  });
};

window.addEventListener('load', () => {
  const navLinks = document.querySelectorAll('.nav-list .link');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      onNavigate(link.dataset.path);
    });
  });
});

const rootDiv = document.getElementById('root');
rootDiv.innerHTML = appCreator();
