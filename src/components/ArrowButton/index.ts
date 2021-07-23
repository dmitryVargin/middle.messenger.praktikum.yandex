import arrowButtonTmpl from './index.tmpl';
import Block, { Props } from '../../utils/block';
import Templator from '../../utils/Templator';

class ArrowButton extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render(): string {
    return Templator.compile(arrowButtonTmpl, this.props);
  }
}

export default ArrowButton;
