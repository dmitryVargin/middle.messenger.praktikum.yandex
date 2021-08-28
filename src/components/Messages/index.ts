import store from '../../store/Store';
import Block from '../../modules/Block/Block';
import Templator from '../../utils/classes/Templator';
import messageTemplator from './index.tmpl'

export type MessageObj = {
  id: string;
  time: Date;
  user_id: string
  content: string
  type: string
  file?: {
    id: number,
    user_id: number,
    path: string,
    filename: string,
    content_type: string,
    content_size: number,
    upload_date: string,
  }
};

class Messages extends Block {
  render(): HTMLCollection {
    const messagesArray = this.props.activeChatMessages as MessageObj[]
    const messages = new Block({}, `<div>${messagesArray.map(message => messageTemplator(message)).join()}</div>`)
    return Templator.getCompiledChildren(this._meta.tmpl, {
      ...this.props,
      components: {
        ...this.props.components,
        messages,
      }
    });
  }
}

const messageTmpl = `<div><div data-component="messages"></div></div>`
const messages = new Messages({activeChatMessages: store.activeChatMessages}, messageTmpl);
export default messages
