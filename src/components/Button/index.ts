import Block from '../../modules/Block/Block';

class Button extends Block {
  get button(): HTMLButtonElement {
    return this.element.querySelector('button') as HTMLButtonElement;
  }
}

export default Button;
