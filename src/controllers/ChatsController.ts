import ChatsApi from '../api/ChatsApi';
import store, {Chats, StoreUser} from '../store/Store';


class ChatController {
  static getChats(offset?: number, limit?: number, title?: string): void {
    const data: {
      offset?: number
      limit?: number
      title?: string
    } = {}
    if (offset) {
      data.offset = offset
    }
    if (offset) {
      data.limit = limit
    }
    if (offset) {
      data.title = title
    }
    ChatsApi.getChats(data)
      .then(xhr => {
        store.chats = JSON.parse(xhr.response) as Chats
      })
      .catch(() => {
      })
  }

  static createChat(title: string): void {
    ChatsApi.createChat(JSON.stringify({title}))
      .then(() => {
        ChatController.getChats()
      })
      .catch(() => {
      })
  }

  static deleteChat(chatId: number): void {
    ChatsApi.deleteChat(JSON.stringify({chatId}))
      .then(() => {
        ChatController.getChats()
      })
      .catch(() => {
      })
  }


  static getChatUsersById(id: number, options?:
    { offset?: number, limit?: number, name?: string, email?: string }): void {
    ChatsApi.getChatUsersById(id, options)
      .then(xhr => {
        store.activeChatUsers = JSON.parse(xhr.response) as StoreUser[]
      })
  }

  static getNewMessagesCount(id: number): Promise<XMLHttpRequest> {
    return ChatsApi.getNewMessagesCount(id)
  }

  static updateChatAvatar(formData: FormData): void {
    ChatsApi.updateChatAvatar(formData)
  }

  static addUsersToChatById(chatId: number, users: number[]): void {
    ChatsApi.addUsersToChatById(JSON.stringify({chatId, users}))
  }

  static deleteUserFromChat(chatId: number, users: number[]): void {
    ChatsApi.deleteUserFromChat(JSON.stringify({chatId, users}))
  }
}

export default ChatController
