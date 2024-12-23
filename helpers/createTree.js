let count = 0;
function createTree(arr, parent_id = "") {
  const tree = [];
  arr.forEach((item) => {
    if (item.parent_id === parent_id) {
      count++;
      const newItem = item;
      newItem.index = count;
      const children = createTree(arr, item.id);
      if (children.length > 0) {
        newItem.children = children;
      }
      tree.push(newItem);
    }
  });
  return tree;
}

module.exports.tree = (arr, parent_id = "") => {
  count = 0;
  const tree = createTree(arr, (parent_id = ""));
  return tree;
};
