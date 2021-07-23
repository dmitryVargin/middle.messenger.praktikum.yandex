import navTmpTmpl from './index.tmpl';
import Block, { Props } from '../../utils/Block';

export default class NavTmp extends Block {
  constructor(props: Props, tmpl: string = navTmpTmpl) {
    super('div', props, tmpl);
  }
}
