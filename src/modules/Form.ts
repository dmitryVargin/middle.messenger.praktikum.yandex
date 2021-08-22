import Block, {Props} from './Block/Block';

class Form extends Block {
  constructor(props: Props, tmpl: string) {
    super(props, tmpl);
    if (this.props.components) {
      Object.keys(this.props.components).forEach((key) => {
        if (this.props.components !== undefined) {
          const component = this.props.components[key] ;
          if (Array.isArray(component)) {
            component.forEach(comp => {
              comp.setProps({
                checkFormValid: this.checkFormValid.bind(this),
              });
            })
          } else {
            component.setProps({
              checkFormValid: this.checkFormValid.bind(this),
            });
          }
        }
      });
    }
  }

  get submitButton(): HTMLButtonElement {
    return this.element.querySelector('button') as HTMLButtonElement;
  }

  checkFormValid(): void {
    const inputs = this.element.querySelectorAll('input');
    let formValid = true;
    inputs.forEach((input) => {
      formValid = input.dataset.valid === 'true' && formValid;
    });
    if (formValid) {
      this.submitButton.classList.remove('disabled');
      this.submitButton.removeAttribute('disabled');
    } else {
      this.submitButton.classList.add('disabled');
      this.submitButton.setAttribute('disabled', 'true');
    }
  }
}

export default Form;
