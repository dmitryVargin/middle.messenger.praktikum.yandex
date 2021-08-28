class MessageApi {
  static startChat(userId: number, chatId: number, token: string): WebSocket {
    return new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
  }
}

export default MessageApi
