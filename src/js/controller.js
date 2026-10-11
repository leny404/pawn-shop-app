import searchItemsView from './views/searchItemsView';
import itemListModalView from './views/itemListModalView';
import itemListView from './views/itemListView.js';
import initSteppers from './views/Stepper.js'; //prettier-ignore
import * as model from './model.js';
import { itemList } from './items.js';

const renderSimilar = function (value) {
  const similarArr = model.getSimilar(value) || [];
  console.log(value);
  similarArr.length > 0
    ? itemListModalView.renderAll(similarArr)
    : itemListModalView.renderMessage();

  itemListModalView.selectAllItems(model.state.addedItems);
  itemListModalView.showCountOfFoundedItems(similarArr.length);

  return similarArr;
};

const openModalController = function (value) {
  const isModalOpen = itemListModalView.getIsOpen();
  if (isModalOpen) return;

  itemListModalView.toggleModal(true);

  //This shit needs fixation or smth, or maybe its good, idk yet
  if (value.length === 0) {
    itemListModalView.renderAll(model.state.itemList);
    itemListModalView.showCountOfFoundedItems(model.state.itemList.length);
  } else {
    renderSimilar(value);
  }
  itemListModalView.selectAllItems(model.state.addedItems);

  // value.length > 0
  //   ? similarArr
  //   : itemListModalView.renderAll(model.state.itemList);
};
const closeModalController = function () {
  const isModalOpen = itemListModalView.getIsOpen();
  if (!isModalOpen) return;

  itemListModalView.toggleModal(false);
};

const searchItemsController = function (value) {
  renderSimilar(value);
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
