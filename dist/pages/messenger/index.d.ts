import Block, { Props } from '../../modules/Block/Block';
export declare class Messenger extends Block {
    sendMessage(message: string): void;
    componentDidMount(): void;
    render(): HTMLCollection;
    afterRender(): void;
}
export declare const messengerProps: Props;
