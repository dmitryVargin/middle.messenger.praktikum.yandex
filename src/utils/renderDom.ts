import IBlock from './block';

function render(query: string, block: IBlock): void {
  const root = document.querySelector(query);
  root?.append(block);
}

export default render;
