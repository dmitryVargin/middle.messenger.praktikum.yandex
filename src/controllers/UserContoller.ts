import {UserFromServer, UserPassword} from './AuthController';
import UserApi from '../api/UserApi';
import store, {StoreUser} from '../store/Store';
import deepEncodeHTML from '../utils/functions/deepEncodeHTML';

class UserContoller {
  static updateProfile(data: UserFromServer): Promise<XMLHttpRequest> {
    return UserApi.updateProfile(JSON.stringify(deepEncodeHTML(data)))
  }

  static updateProfileAvatar(avatar: FormData): Promise<XMLHttpRequest> {
    return UserApi.updateProfileAvatar(avatar)
  }

  static updateUserPassword(oldPassword: UserPassword, newPassword: UserPassword): void {
    UserApi.updateUserPassword(JSON.stringify(deepEncodeHTML({
      oldPassword,
      newPassword
    })))
  }

  static getUserById(id: UserFromServer['id']): void {
    UserApi.getUserById(id)
  }

  static searchUsersByLogin(login: string): void {
    UserApi.searchUsersByLogin(JSON.stringify(deepEncodeHTML({login})))
      .then((xhr) => JSON.parse(xhr.response) as StoreUser[])
      .then((data => {
        store.searchUserList = deepEncodeHTML(data) as StoreUser[]
      }))

  }
}

export default UserContoller
