import searchItemsView from './views/searchItemsView';
import itemListModalView from './views/itemListModalView';
import itemListView from './views/itemListView.js';
import * as model from './model.js';
import { itemList } from './items.js';

const renderFoundModalItems = function (value) {
  const foundItemsArr = model.getSimilar(value) || [];

  foundItemsArr.length > 0
    ? renderModalItems(foundItemsArr, model.state.addedItems)
    : itemListModalView.renderMessage();

  return foundItemsArr;
};

// Default is to render all existing items
const renderModalItems = function (
  itemsToRender = model.state.itemList,
  itemsToSelect = model.state.addedItems,
) {
  itemListModalView.renderAll(itemsToRender);
  itemListModalView.showCountOfFoundedItems(itemsToRender.length);
  itemListModalView.selectAllItems(itemsToSelect);
};

const showModalItems = function (value) {
  if (Number.isFinite(value)) return;
  value.length === 0 ? renderModalItems() : renderFoundModalItems(value);
};

const openModalController = function (value) {
  const isModalOpen = itemListModalView.getIsOpen();
  if (isModalOpen) return;

  itemListModalView.toggleModal(true);

  showModalItems(value);
};

const closeModalController = function () {
  const isModalOpen = itemListModalView.getIsOpen();
  if (!isModalOpen) return;

  itemListModalView.toggleModal(false);
};

const searchItemsController = function (value) {
  showModalItems(value);
};

const searchDeleteBtnController = function () {
  itemListModalView.toggleModal(false);
  searchItemsView.clearInput();
};

const addItemController = function (id) {
  if (!id) return;
  model.addItem(id);
  itemListView.renderAll(model.state.addedItems);

  itemListModalView.selectAllItems(model.state.addedItems);
};

const addItemStepperController = function (id, quantity, syncInput) {
  const item = model.changeQuantity(id, quantity);
  if (!item) return;
  itemListView.updateItem(item, { syncInput });
  itemListModalView.selectAllItems(model.state.addedItems);
};

const init = function () {
  itemListView.renderAll(model.state.addedItems);

  searchItemsView.clearInput();

  searchItemsView.addOpenModalHandler(openModalController);
  searchItemsView.addCloseModalHandler(closeModalController);

  searchItemsView.addSearchHandler(searchItemsController);
  searchItemsView.addDeleteSearchBtnHandler(searchDeleteBtnController);

  itemListModalView.addItemHandler(addItemController);

  itemListView.addStepperQuantityHandler(addItemStepperController);
};
init();
