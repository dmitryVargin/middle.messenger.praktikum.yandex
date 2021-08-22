import EventBus from '../utils/classes/EventBus';
import cloneDeep from '../utils/functions/cloneDeep';
import isPlainObject from '../utils/functions/isPlainObject';
import {MessageObj} from '../pages/messenger';


export class Store {
  private store = {}

  private static __instance: Store

  constructor() {
    if (Store.__instance) {
      return Store.__instance;
    }
  }

  public getStore() {
    return this.store
  }

}

export type Chat = {
  'id': number,
  'title': string,
  'avatar': string,
  'unread_count': number,
  'last_message': {
    'user': {
      'first_name': string,
      'second_name': string,
      'avatar': string,
      'email': string,
      'login': string,
      'phone': string
    },
    'time': string,
    'content': string
  }
}
export type Chats = Chat[]

export type StoreUser = {
  id: number | null,
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  phone: string
  display_name: string | null,
  avatar: string | null,
  role?: string
}


export type TStore = {
  userData: StoreUser,
  chats: Chat[],
  activeChat: Chat | Record<string, unknown>,
  activeChatUsers: StoreUser[] | [],
  searchUserList: StoreUser[] | [],
  activeChatMessages: MessageObj[]
}
const defaultAvatar = 'https://ya-praktikum.tech/api/v2/resources//a16d7fcd-f5fa-468e-afd6-3f9666999c8b/073c838f-acdb-4d84-8edd-1d5313cd02a7_profile.jpg'

export const storeUserInitial = {
  userData: {
    id: null,
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    phone: '',
    display_name: '',
    avatar: defaultAvatar,
  },
  chats: [],
  activeChat: {},
  activeChatUsers: [],
  searchUserList: [],
  activeChatMessages: []
}


const storeObj: TStore = storeUserInitial

export const storeEventBus = new EventBus()

export type ChatObj = {
  id: number,
  avatar: string,
  title: string,
  created_by: number,
  unread_count: number;
  last_message: string;
};

const store = new Proxy(storeObj, {
  get: (target, prop: string) => {
    const value = target[prop];
    if (typeof value === 'function') {
      return value.bind(target)
    }
    return value
  },
  set: (target, prop: string, value: any) => {
    if (typeof target[prop] === 'object') {
      const innerValue = isPlainObject(value) ? {...value} : value
      target[prop] = innerValue
    } else {
      target[prop] = value;
    }
    console.log(prop,'стор изменился', store);
    storeEventBus.emit(prop, {...store})
    return true;
  },
})

export default store
