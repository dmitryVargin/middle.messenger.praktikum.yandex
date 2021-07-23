import Block, { Props } from '../utils/Block';
import NavTmp from '../components/navTmp/index';
import appTmpl from './index.tmpl';
import login from '../pages/login/index';

import navTmpTmpl from '../components/navTmp/index.tmpl';

class App extends Block {
  constructor(props: Props, tmpl?: string) {
    super('div', props, tmpl);
  }
}

const navTmp = new NavTmp({
  events: {
    click: () => {
      console.log(333);
    },
  },
  navTmpTmpl,
}).getContent();

const app = new App(
  {
    components: {
      navTmp,
      page: login,
    },
  },
  appTmpl,
).getContent();

console.log('app', app);

export default app;
