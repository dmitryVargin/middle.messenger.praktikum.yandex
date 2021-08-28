import HTTP from '../utils/classes/HTTP';

const http = new HTTP('https://ya-praktikum.tech/api/v2/chats')

class ChatsApi {
  static getChats(data: { offset?: number, limit?: number, title?: string }): Promise<XMLHttpRequest> {
    return http.get('?', {data, withCredentials: true})
  }

  static createChat(data: string): Promise<XMLHttpRequest> {
    return http.post('/', {
      data, withCredentials: true, headers: {
        'content-type': 'application/json',
      },
    })
  }

  static deleteChat(data: string): Promise<XMLHttpRequest> {
    return http.delete('/', {
      data, withCredentials: true, headers: {
        'content-type': 'application/json',
      },
    })
  }


  static getChatUsersById(id: number, data?:
    { offset?: number, limit?: number, name?: string, email?: string }): Promise<XMLHttpRequest> {
    return http.get(`/${id}/users`, {data, withCredentials: true})
  }

  static getNewMessagesCount(id: number): Promise<XMLHttpRequest> {
    return http.get(`/new/${id}`, {withCredentials: true})
  }

  static updateChatAvatar(data: FormData): Promise<XMLHttpRequest> {
    return http.put('/avatar', {
      data, withCredentials: true,
    })
  }

  static getToken(id: number): Promise<XMLHttpRequest> {
    return http.post(`/token/${id}`, {
      withCredentials: true,
    })
  }

  static addUsersToChatById(data: string): Promise<XMLHttpRequest> {
    return http.put('/users', {
      data, withCredentials: true, headers: {
        'content-type': 'application/json',
      },
    })
  }

  static deleteUserFromChat(data: string): Promise<XMLHttpRequest> {
    return http.delete('/users', {
      data, withCredentials: true, headers: {
        'content-type': 'application/json',
      },
    })
  }

}

export default ChatsApi
