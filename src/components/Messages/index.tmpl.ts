import store from '../../store/Store';
import {MessageObj} from './index';

export default ({
                  id,
                  time,
                  user_id,
                  content,
                }: MessageObj): string => {
  const messageOwner = +user_id === store.userData.id ? 'own' : 'other';
  const innerTime = new Date(time).toLocaleTimeString().slice(0, -3)
  return `
    <div data-id='${id}' class='message ${messageOwner}'>
      <p class='text'>
        ${content}
      </p>
      <div class='info'>
        <div class='time'>${innerTime}</div>
      </div>
    </div>`;
};
