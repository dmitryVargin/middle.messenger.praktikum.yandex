import login from './pages/login/index';
// import chatTmpl from './pages/chat/index';
// import profileTmpl from './pages/profile/index';
// import signupTmpl from './pages/signup/index';
// import errorPageTmpl from './pages/errorPage/index';
import './index.scss';
// import app from './app/index';

import render from './utils/renderDom';
import Button from './components/Button';
import buttonTmpl from './components/Button/index.tmpl';
import Block1 from './utils/Block1';
import Templator from './utils/Templator';

class Button11 extends Block1 {
  constructor(props) {
    // Создаём враппер DOM-элемент button
    super('button', props);
  }

  render() {
    // В данном случае render возвращает строкой разметку из шаблонизатора
    return Templator.compile(buttonTmpl, this.props);
  }
}
const submitButton = new Button11({
  type: 'button',
  text: 'Войти',
  events: {
    click(event) {
      console.log(event.target.textContent);
      event.target.textContent = 123;
    },
  },
});

const routes: {
  [key: string]: HTMLElement;
} = {
  '/login': login,
  // '/signup': signupTmpl,
  // '/chat': chatTmpl,
  // '/profile': profileTmpl,
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

render('#root', submitButton);

setTimeout(() => {
  submitButton.setProps({ text: '123' });
  console.log(submitButton);
}, 1000);
setTimeout(() => {
  submitButton.setProps({ text: '3333' });
  console.log(submitButton);
}, 2000);
