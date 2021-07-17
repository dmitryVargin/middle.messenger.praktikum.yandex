import arrowImg from 'url:../../../static/img/arrow.svg';

export default ({ direction }) => {
  return `
    <div class='arrow-button ${direction || ''}'>
      <img src='${arrowImg}' alt=''/>
    </div>`;
};
