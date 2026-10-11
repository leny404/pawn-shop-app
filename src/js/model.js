import Fuse from 'fuse.js';
import { itemList } from './items';

export const state = {
  itemList,
  addedItems: [],
};

const findItemById = (arr, id) => arr.find(item => item.id === id);

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

const createAddProductObject = function (itemObj, q) {
  return {
    ...itemObj,
    quantity: 1,
    buyingPrice: itemObj.estRetailValue,
  };
};

const changeBuyingPrice = function (item) {
  item.buyingPrice = item.estRetailValue * item.quantity;
};

export const addItem = function (id) {
  const item = createAddProductObject(findItemById(state.itemList, id));
  const existingItem = findItemById(state.addedItems, item.id);

  if (existingItem) {
    existingItem.quantity++;
    changeBuyingPrice(existingItem);
  } else state.addedItems.push(item);

  persistAddedItems();
};

export const changeQuantity = function (id, quantity) {
  const item = findItemById(state.addedItems, id);
  if (!item || !Number.isInteger(quantity) || quantity < 1) return;

  item.quantity = quantity;
  changeBuyingPrice(item);

  persistAddedItems();
  return item;
};

const persistAddedItems = function () {
  localStorage.setItem('addedItems', JSON.stringify(state.addedItems));
};
