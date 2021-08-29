import Block, { Props } from './Block/Block';
declare class Form extends Block {
    constructor(props: Props, tmpl: string);
    get submitButton(): HTMLButtonElement;
    checkFormValid(): void;
}
export default Form;
