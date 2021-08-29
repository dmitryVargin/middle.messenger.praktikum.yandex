import { Chat } from '../../store/Store';
declare const chatItemTemplator: ({ id, avatar, title, unread_count, last_message }: Chat) => string;
export default chatItemTemplator;
