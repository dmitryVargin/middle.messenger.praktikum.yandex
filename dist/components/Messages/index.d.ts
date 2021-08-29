import Block from '../../modules/Block/Block';
export declare type MessageObj = {
    id: string;
    time: Date;
    user_id: string;
    content: string;
    type: string;
    file?: {
        id: number;
        user_id: number;
        path: string;
        filename: string;
        content_type: string;
        content_size: number;
        upload_date: string;
    };
};
declare class Messages extends Block {
    render(): HTMLCollection;
}
declare const messages: Messages;
export default messages;
