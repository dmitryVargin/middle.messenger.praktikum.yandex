import HTTP from '../utils/classes/HTTP';
import {UserFromServer} from '../controllers/AuthController';

const http = new HTTP('https://ya-praktikum.tech/api/v2/user')

class UserApi {
  static updateProfile(data: string): Promise<XMLHttpRequest> {
    return http.put('/profile', {
      data, withCredentials: true, headers: {
        'content-type': 'application/json',
      },
    })
  }

  static updateProfileAvatar(data: FormData): Promise<XMLHttpRequest> {
    return http.put('/profile/avatar', {
      data, withCredentials: true,
    })
  }

  static updateUserPassword(data: string): Promise<XMLHttpRequest> {
    return http.put('/password', {
      data,
      withCredentials: true, headers: {
        'content-type': 'application/json',
      },
    })
  }

  static getUserById(id: UserFromServer['id']): Promise<XMLHttpRequest> {
    return http.get(`/${id}`, {withCredentials: true})
  }

  static searchUsersByLogin(login: string): Promise<XMLHttpRequest> {
    return http.post('/search', {
      data: login, withCredentials: true, headers: {
        'content-type': 'application/json',
      },
    })
  }
}

export default UserApi

