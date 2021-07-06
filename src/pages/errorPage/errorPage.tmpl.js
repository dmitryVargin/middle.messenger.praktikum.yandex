const errorPageTmpl = `<div class="error-page-wrap">
    <h1 class="title">{{error.code}}</h1>
    <h3 class="message">{{error.message}}</h3>
    <a class="link" href="/chat">Назад к чатам</a>
  </div>`;
export default errorPageTmpl;
