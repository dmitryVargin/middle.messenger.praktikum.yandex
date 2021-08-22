import AuthApi from '../api/AuthApi';
import {router} from '../index';
import store, {storeUserInitial} from '../store/Store';


export type SignUpData = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

export type SignInData = {
  login: string,
  password: string,
}

export type UserFromServer = {
  id: number,
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  phone: string
  display_name: string | null,
  avatar: string | null,
}
export type UserPassword = string

//TODO тут еще 500 и 401 коды кроме logout там только 500
class AuthController {
  static signUp(data: SignUpData): void {
    AuthApi.signUp(JSON.stringify(data))
      .then(xhr => {
        const {id} = JSON.parse(xhr.response) as { id: number }
        console.log('зарегался пользователь с id:', id);
        AuthController.getUser(() => {
          router.go('/messenger')
        })
      })
      .catch(_xhr => {
        // TODO пользователь уже существует обработка
        const xhr = _xhr as XMLHttpRequest
        const {reason} = JSON.parse(xhr.response) as { reason: string }
        console.log(reason);
      })

  }


  static getUser(successCallback?: () => void): void {
    AuthApi.getUser()
      .then(xhr => {
        const user = JSON.parse(xhr.response) as UserFromServer
        // console.log(1, store.user);
        // const user11 = {...store.user}
        store.userData = {...user}
        // console.log(2, store.user, user11, store.user === user11);
        if (successCallback === undefined) {
          return
        }
        successCallback()
      })
      .catch(_xhr => {
        const xhr = _xhr as XMLHttpRequest
        store.userData = {...storeUserInitial}
        console.log('юзер не получился', xhr);
        router.go('/login')
      })
  }

  static checkUserLoggedIn(): Promise<XMLHttpRequest> {
    return AuthApi.getUser()
  }


  static signIn(data: SignInData): void {
    // jsonData  = ISignInData to json
    AuthApi.signIn(JSON.stringify(data))
      .then(xhr => {
        if (xhr.response === 'OK') {
          AuthController.getUser(() => {
            router.go('/messenger')
          })
          console.log('юзер залогинился');
        }
      })
      .catch(_xhr => {
        const xhr = _xhr as XMLHttpRequest
        const {reason} = JSON.parse(xhr.response) as { reason: string }
        if (reason === 'User already in system') {
          AuthController.getUser(() => {
            router.go('/messenger')
          })
        } else if (reason === 'Login or password is incorrect') {
          //  TODO выкидывать ошибки в форму
        }
      })
  }

  static logout(): void {
    AuthApi.logout()
      .then(xhr => {
        console.log('юзер разлогинился', xhr);
        router.go('/login')
      })
      .catch(_xhr => {
        const xhr = _xhr as XMLHttpRequest
        console.log('юзер не разлогинился', xhr);
      })
  }

}

export default AuthController
