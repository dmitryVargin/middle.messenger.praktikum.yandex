import Block from '../../modules/Block/Block';
import Form from '../../modules/Form';

export default class DefaultInput extends Block {
  get input(): HTMLInputElement {
    return this.element.querySelector('input') as HTMLInputElement;
  }

  setValidError(): void {
    this.input.dataset.valid = 'false';
    this.element.querySelector('[data-validation-error]')?.classList.add('visible');
    (this.props as Form).checkFormValid();
  }

  setValid(): void {
    this.input.dataset.valid = 'true';
    this.element.querySelector('[data-validation-error]')?.classList.remove('visible');
    (this.props as Form).checkFormValid();
  }
}
