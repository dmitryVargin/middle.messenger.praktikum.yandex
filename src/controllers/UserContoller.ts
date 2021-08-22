import {UserFromServer, UserPassword} from './AuthController';
import UserApi from '../api/UserApi';

class UserContoller {
  static updateProfile(data: UserFromServer): Promise<XMLHttpRequest> {
    return UserApi.updateProfile(JSON.stringify(data))
  }

  static updateProfileAvatar(avatar: FormData): void {
    UserApi.updateProfileAvatar(avatar)
      .catch(() => {
      })
  }

  static updateUserPassword(oldPassword: UserPassword, newPassword: UserPassword): void {
    UserApi.updateUserPassword(JSON.stringify({oldPassword, newPassword}))
      .catch(() => {
      })
  }

  static getUserById(id: UserFromServer['id']): void {
    UserApi.getUserById(id)
      .catch(() => {
      })
  }

  static searchUsersByLogin(login: string): Promise<XMLHttpRequest> {
    return UserApi.searchUsersByLogin(JSON.stringify({login}))
  }
}

export default UserContoller
