function render(query, block) {
  const root = document.querySelector(query);

  // Можно завязаться на реализации вашего класса Block
  root.append(block.getContent());
  return root;
}
export default render;
