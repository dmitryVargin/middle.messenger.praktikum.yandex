import ChatsApi from '../api/ChatsApi';
import store, {Chat, Chats, StoreUser} from '../store/Store';
import deepEncodeHTML from '../utils/functions/deepEncodeHTML';


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
    if (limit) {
      data.limit = limit
    }
    if (title) {
      data.title = title
    }
    ChatsApi.getChats(data)
      .then(xhr => {
        const chats = deepEncodeHTML(JSON.parse(xhr.response)) as Chats
        store.chats = chats
        if (store.activeChat?.id) {
          store.activeChat = chats.find(chat => chat.id === store.activeChat.id) as Chat
        }
      })
  }

  static createChat(title: string): void {
    ChatsApi.createChat(JSON.stringify(deepEncodeHTML({title})))
      .then(() => {
        ChatController.getChats()
      })
  }

  static deleteChat(chatId: number): void {
     ChatsApi.deleteChat(JSON.stringify(deepEncodeHTML({chatId})))
      .then(() => {
        store.activeChat = {}
        ChatController.getChats()
      })
  }


  static getChatUsersById(id: number, options?:
    { offset?: number, limit?: number, name?: string, email?: string }): void {
    ChatsApi.getChatUsersById(id, options)
      .then(xhr => {
        store.activeChatUsers = deepEncodeHTML(JSON.parse(xhr.response)) as StoreUser[]
      })
  }

  static getNewMessagesCount(id: number): Promise<XMLHttpRequest> {
    return ChatsApi.getNewMessagesCount(id)
  }

  static updateChatAvatar(formData: FormData): void {
    ChatsApi.updateChatAvatar(formData)
      .then(() => {
        store.updateMessenger = !store.updateMessenger
        ChatController.getChats()
      })
  }

  static addUsersToChatById(chatId: number, users: number[]): void {
    ChatsApi.addUsersToChatById(JSON.stringify(deepEncodeHTML({chatId, users})))
      .then(() => {
        alert('Пользователь добавлен')
        ChatController.getChats()
        ChatController.getChatUsersById(chatId)
      })
  }

  static deleteUserFromChat(chatId: number, users: number[]): Promise<void> {
    return ChatsApi.deleteUserFromChat(JSON.stringify(deepEncodeHTML({
      chatId,
      users
    })))
      .then(() => {
        ChatController.getChats()
        ChatController.getChatUsersById(chatId)
      })
  }
}

export default ChatController

