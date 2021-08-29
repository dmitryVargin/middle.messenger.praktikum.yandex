declare class ChatController {
    static getChats(offset?: number, limit?: number, title?: string): void;
    static createChat(title: string): void;
    static deleteChat(chatId: number): void;
    static getChatUsersById(id: number, options?: {
        offset?: number;
        limit?: number;
        name?: string;
        email?: string;
    }): void;
    static getNewMessagesCount(id: number): Promise<XMLHttpRequest>;
    static updateChatAvatar(formData: FormData): void;
    static addUsersToChatById(chatId: number, users: number[]): void;
    static deleteUserFromChat(chatId: number, users: number[]): Promise<void>;
}
export default ChatController;
