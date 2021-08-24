import {resourcesUrl} from '../../constants/urls';
import {Chat} from '../../store/Store';


const chatItemTemplator = ({
                             id,
                             avatar,
                             title,
                             unread_count,
                             last_message
                           }: Chat):string => {
  let innerLastMessage
  if (last_message?.user?.display_name) {
    innerLastMessage = `<span class='own-msg'>${last_message?.user?.display_name} :</span><span>${last_message.content}</span>`
  } else {
    innerLastMessage = `<span class='own-msg'>Нет сообщений</span>`
  }
  const lastMessageTime = last_message?.time ? new Date(last_message.time).toLocaleTimeString().slice(0, -3) : ''
  return `
  <div data-id="${id}" class='chat'>
    <div class='img ${avatar || 'empty'}'>
      <img src="${resourcesUrl}${avatar}" alt="">
    </div>
    <div class='content'>
      <div class='name'>${title}</div>
      <div class='last-msg'> 
        ${innerLastMessage}
      </div>
      <div class='unread-msg-count-wrap'>${unread_count}</div>
      <div class='last-msg-date'>${lastMessageTime}</div>
    </div>
  </div>`
}
export default chatItemTemplator

