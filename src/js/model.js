import Fuse from 'fuse.js';
import { itemList } from './items';

export const state = {
  itemList,
  addedItems: [],
};

const findItemById = id => state.itemList.find(item => item.id === id);

export const getSimilar = function (searchValue) {
  if (!searchValue) return;

  // CHANGE THIS TO NOT CALL NEW FUSE EVERY TYPED LETTER
  return new Fuse(state.itemList, {
    keys: ['name', 'category'],
    threshold: 0.5,
  })
    .search(searchValue)
    .map(r => r.item);
};

export const addItem = function (id) {
  const item = findItemById(id);
  console.log(item);
  state.addedItems.push(item);
};
console.log(state);
