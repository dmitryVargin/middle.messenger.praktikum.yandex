declare class MessageApi {
    static startChat(userId: number, chatId: number, token: string): WebSocket;
}
export default MessageApi;
