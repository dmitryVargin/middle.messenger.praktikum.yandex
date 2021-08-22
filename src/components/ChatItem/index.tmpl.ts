import {resourcesUrl} from '../../utils/variables';

export default `
  <div data-id="{{id}}" class='chat'>
    <div class='img'>
      <img src="${resourcesUrl}{{avatar}}" alt="">
    </div>
    <div class='content'>
      <div class='name'>{{title}}</div>
      <div class='last-msg'> 
      <span class='own-msg'>{{last_message.user.display_name}}:</span>
       <span>{{last_message.content}}</span>
      </div>
      <div class='unread-msg-count-wrap'>{{unread_count}}</div>
      <div class='last-msg-date'>{{last_message.time}}</div>
    </div>
  </div>`;

