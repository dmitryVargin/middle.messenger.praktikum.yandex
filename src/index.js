import loginTmpl from './pages/login/login.tmpl';
import chatTmpl from './pages/chat/chat.tmpl';
import profileTmpl from './pages/profile/profile.tmpl';
import signupTmpl from './pages/signup/signup.tmpl';
import errorPageTmpl from './pages/errorPage/errorPage.tmpl';
import navTmp from './components/navTmp/';

import Templator from '../utils/templator';
import emptyAvatar from 'url:../static/img/empty-avatar.svg';
import './index.scss';

const routes = {
  '/login': loginTmpl,
  '/signup': signupTmpl,
  '/chat': chatTmpl,
  '/profile': profileTmpl,
};

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

function getCurrentPage() {
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
  return Templator.compile(currentPage, contextMock);
}

const onNavigate = (event) => {
  const path = event.target.dataset.path;
  window.history.pushState({}, path, window.location.origin + path);

  document.querySelector('.page').innerHTML = getCurrentPage();
};

document.getElementById('root').innerHTML = `
  <main class='app'>
    ${navTmp}
    <div class="page">
      ${getCurrentPage()}
    </div>
  </main>`;

window.addEventListener('load', () => {
  const navLinks = document.querySelectorAll('[data-path]');

  navLinks.forEach((link) => {
    link.addEventListener('click', onNavigate);
  });
});
