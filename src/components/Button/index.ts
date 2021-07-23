import Block, { Props } from '../../utils/Block';

class Button extends Block {
  constructor(props: Props, tmpl?: string) {
    super('div', props, tmpl);
  }
}

export default Button;
