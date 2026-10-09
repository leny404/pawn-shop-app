import { itemList } from './items';
import Fuse from 'fuse.js';

export const getSimilar = function (searchValue) {
  if (!searchValue) return;

  return new Fuse(itemList, {
    keys: ['name'],
    threshold: 0.5,
  })
    .search(searchValue)
    .map(r => r.item);
};
