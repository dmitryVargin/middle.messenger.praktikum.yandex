import HTTP from '../utils/classes/HTTP';

const http = new HTTP('https://ya-praktikum.tech/api/v2/chats')

class ChatsApi {
  static async getChats(data: { offset?: number, limit?: number, title?: string }): Promise<XMLHttpRequest> {
    return http.get('/', {data, withCredentials: true})
  }

  static async createChat(data: string): Promise<XMLHttpRequest> {
    return http.post('/', {
      data, withCredentials: true, headers: {
        'content-type': 'application/json',
      },
    })
  }

  static async deleteChat(data: string): Promise<XMLHttpRequest> {
    return http.delete('/', {
      data, withCredentials: true, headers: {
        'content-type': 'application/json',
      },
    })
  }


  static async getChatUsersById(id: number, data:
    { offset?: number, limit?: number, name?: string, email?: string }): Promise<XMLHttpRequest> {
    return http.get(`/${id}/users`, {data, withCredentials: true})
  }

  static async getNewMessagesCount(id: number): Promise<XMLHttpRequest> {
    return http.get(`/new/${id}`, {withCredentials: true})
  }

  static async updateChatAvatar(data: FormData): Promise<XMLHttpRequest> {
    return http.put('/avatar', {
      data, withCredentials: true,
    })
  }

  static async getToken(id: number): Promise<XMLHttpRequest> {
    return http.post(`/token/${id}`, {
      withCredentials: true,
    })
  }

  static async addUsersToChatById(data: string): Promise<XMLHttpRequest> {
    return http.put('/users', {
      data, withCredentials: true, headers: {
        'content-type': 'application/json',
      },
    })
  }

  static async deleteUserFromChat(data: string): Promise<XMLHttpRequest> {
    return http.delete('/users', {data, withCredentials: true})
  }

}

export default ChatsApi
