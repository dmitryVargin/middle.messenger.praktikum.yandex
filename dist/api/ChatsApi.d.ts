declare class ChatsApi {
    static getChats(data: {
        offset?: number;
        limit?: number;
        title?: string;
    }): Promise<XMLHttpRequest>;
    static createChat(data: string): Promise<XMLHttpRequest>;
    static deleteChat(data: string): Promise<XMLHttpRequest>;
    static getChatUsersById(id: number, data?: {
        offset?: number;
        limit?: number;
        name?: string;
        email?: string;
    }): Promise<XMLHttpRequest>;
    static getNewMessagesCount(id: number): Promise<XMLHttpRequest>;
    static updateChatAvatar(data: FormData): Promise<XMLHttpRequest>;
    static getToken(id: number): Promise<XMLHttpRequest>;
    static addUsersToChatById(data: string): Promise<XMLHttpRequest>;
    static deleteUserFromChat(data: string): Promise<XMLHttpRequest>;
}
export default ChatsApi;
