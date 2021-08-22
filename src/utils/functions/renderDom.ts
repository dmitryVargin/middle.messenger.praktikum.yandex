import Block from '../../modules/Block/Block';

function renderDom(query: string, block: Block): void {
  const root = document.querySelector(query) as HTMLElement;
  root.append(block.getContent());
}

export default renderDom;
