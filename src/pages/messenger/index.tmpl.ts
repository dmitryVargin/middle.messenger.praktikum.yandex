import plusIcon from '../../../static/img/plus.svg';
import dotBtn from '../../../static/img/dot-btn.svg';
import attachIcon from '../../../static/img/attach.svg';
import userIcon from '../../../static/img/user-icon.svg';
import camera from '../../../static/img/camera.svg';
import trash from '../../../static/img/trash.svg';
import settingIcon from '../../../static/img/settings.svg';
import { resourcesUrl } from '../../constants/urls';

export default `
  <div class='chat-wrap'>
    <div class='chat-list-wrap'>
      <div class='controls-wrap'>
        <button class='img-btn'>
          <img data-path='/settings' src='${settingIcon}' alt='' />
        </button>
        <div class='search-input-wrap'>
          <div data-component='searchInput'></div>
        </div>
        <button class='add-chat-btn img-btn'>
          <img src='${plusIcon}' alt='' />
        </button>
      </div>
      <div class='chat-list'>
        <div data-component='chatList'></div>
      </div>
    </div>
    <div class='chat-content-wrap hidden'>
      <div class='header'>
        <div class='chat-header'>
          <div class='chat-img {{activeChatAvatar}}'><img src="${resourcesUrl}{{activeChat.avatar}}" alt=""></div>
          <div class='chat-name'>{{activeChat.title}}</div>
        </div>
        <button class='settings-btn img-btn'>
          <div class="settings-popup hidden">
             <div data-action="chatUserList" class="item">
               <div class="img-btn"><img src=${userIcon} alt=""></div>
               <div>Список пользователей</div>
            </div>
             <div data-action="chatAvatarUpdate" class="item">
               <div class="img-btn"><img src=${camera} alt=""></div>
               <div>Изменить аватар чата</div>
            </div>
             <div data-action="deleteChat" class="item">
               <div class="img-btn"><img src=${trash} alt=""></div>
               <div>Удалить чат</div>
            </div>
          </div>
          <img src='${dotBtn}' alt='' />
        </button>
      </div>
      <div class='content'>
        <div class='messages'>
          <div data-component='messages'></div>
        </div>
      </div>
      <div class='controls'>
        <button class='attach-btn img-btn'>
          <img src='${attachIcon}' alt='' />
        </button>
        <div data-component='messageInput'></div>
        <div data-component='arrowBtn'></div>
      </div>
    </div>
    <div class='empty-chat'>Select chat to start messaging</div>
  </div>`;
