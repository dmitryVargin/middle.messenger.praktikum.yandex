import Block from '../../modules/Block/Block';

export default class DefaultInput extends Block {
  get input(): HTMLInputElement {
    return this.element.querySelector('input') as HTMLInputElement;
  }

  setValidError(): void {
    this.input.dataset.valid = 'false';
    this.element.querySelector('[data-validation-error]')?.classList.add('visible');
    this.props.checkFormValid();
  }

  setValid(): void {
    this.input.dataset.valid = 'true';
    this.element.querySelector('[data-validation-error]')?.classList.remove('visible');
    this.props.checkFormValid();
  }
}
