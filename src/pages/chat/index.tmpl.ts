import settingIcon from 'url:../../../static/img/settings.svg';
import plusIcon from 'url:../../../static/img/plus.svg';
import dotBtn from 'url:../../../static/img/dot-btn.svg';
import attachIcon from 'url:../../../static/img/attach.svg';

export default `
      <div class='chat-wrap'>
        <div class='chat-list-wrap'>
          <div class='controls-wrap'>
            <button class='img-btn'>
              <img data-path='/profile' src='${settingIcon}' alt='' />
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
              <div class='chat-img'></div>
              <div class='chat-name'>{{chatName}}</div>
            </div>
            <button class='settings-btn img-btn'>
              <img src='${dotBtn}' alt='' />
            </button>
          </div>
          <div class='content'>
            <div class='message-date'>19 июня</div>
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
