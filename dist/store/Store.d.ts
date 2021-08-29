import EventBus from '../utils/classes/EventBus';
import { MessageObj } from '../components/Messages';
export declare type Chat = {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
        user: {
            first_name: string;
            second_name: string;
            avatar: string;
            email: string;
            login: string;
            phone: string;
            display_name: string;
        };
        time: string;
        content: string;
    };
};
export declare type Chats = Chat[];
export declare type StoreUser = {
    id: number | null;
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
    display_name: string | null;
    avatar: string | null;
    role?: string;
};
export declare type TStore = {
    userData: StoreUser;
    chats: Chat[];
    activeChat: Chat | Record<string, unknown>;
    activeChatUsers: StoreUser[] | [];
    searchUserInput: string;
    searchUserList: StoreUser[] | [];
    activeChatMessages: MessageObj[];
    activeChatAvatar: string;
    updateMessenger: boolean;
};
export declare const storeUserInitial: {
    updateMessenger: boolean;
    userData: {
        id: null;
        first_name: string;
        second_name: string;
        login: string;
        email: string;
        phone: string;
        display_name: string;
        avatar: string;
    };
    chats: never[];
    activeChat: {};
    searchUserInput: string;
    activeChatUsers: never[];
    searchUserList: never[];
    activeChatMessages: never[];
    activeChatAvatar: string;
};
export declare const storeEventBus: EventBus;
export declare type ChatObj = {
    id: number;
    avatar: string;
    title: string;
    created_by: number;
    unread_count: number;
    last_message: string;
};
declare const store: TStore;
export default store;
