import Block from '../../modules/Block/Block';
export default class DefaultInput extends Block {
    get input(): HTMLInputElement;
    setValidError(): void;
    setValid(): void;
}
