import {UserFromServer, UserPassword} from './AuthController';
import UserApi from '../api/UserApi';
import store from '../store/Store';
import deepEncodeHTML from '../utils/functions/deepEncodeHTML';

class UserContoller {
  static updateProfile(data: UserFromServer): Promise<XMLHttpRequest> {
    return UserApi.updateProfile(deepEncodeHTML(JSON.stringify(data)))
  }

  static updateProfileAvatar(avatar: FormData): void {
    UserApi.updateProfileAvatar(avatar)
  }

  static updateUserPassword(oldPassword: UserPassword, newPassword: UserPassword): void {
    UserApi.updateUserPassword(JSON.stringify(deepEncodeHTML({oldPassword, newPassword})))
  }

  static getUserById(id: UserFromServer['id']): void {
    UserApi.getUserById(id)
  }

  static searchUsersByLogin(login: string): void {
     UserApi.searchUsersByLogin(JSON.stringify(deepEncodeHTML({login})))
      .then((xhr)=>JSON.parse(xhr.response))
      .then((data=>{
        store.searchUserList = deepEncodeHTML(data)
      }))

  }
}

export default UserContoller
