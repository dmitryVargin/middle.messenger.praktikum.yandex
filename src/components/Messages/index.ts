import store from '../../store/Store';
import Block from '../../modules/Block/Block';
import Templator from '../../utils/classes/Templator';
import messageTemplator from './index.tmpl'

export type MessageObj = {
  id: string;
  time: Date;
  user_id: string
  content: string
  type: 'message'
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
    document.querySelector('.empty-chat')?.classList.add('hidden');
    document.querySelector('.chat-content-wrap')?.classList.remove('hidden');
  }
}

const messageTmpl = `<div><div data-component="messages"></div></div>`
const messages = new Messages({activeChatMessages: store.activeChatMessages}, messageTmpl);
export default messages
