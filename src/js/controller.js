import searchItemsView from './views/searchItemsView';
import itemListModalView from './views/itemListModalView';
import itemListView from './views/itemListView.js';
import initSteppers from './views/Stepper.js'; //prettier-ignore
import * as model from './model.js';
import { itemList } from './items.js';

const renderSimilar = function (value) {
  const similarArr = model.getSimilar(value) || [];

  similarArr.length > 0
    ? itemListModalView.renderAll(similarArr)
    : itemListModalView.renderMessage();

  return similarArr;
};

const openModalController = function (value) {
  itemListModalView.toggleModal(true);

  if (value.length > 0) {
    renderSimilar(value);
  } else itemListModalView.renderAll(model.state.itemList);

  itemListModalView.showCountOfFoundedItems(model.state.itemList.length);
  itemListModalView.selectAllItems(model.state.addedItems);
};
const closeModalController = function () {
  const isModalOpen = itemListModalView.getIsOpen();
  if (!isModalOpen) return;

  itemListModalView.toggleModal(false);
};

const searchItemsController = function (value) {
  const similarArr = renderSimilar(value);

  itemListModalView.showCountOfFoundedItems(similarArr.length);
  itemListModalView.selectAllItems(model.state.addedItems);
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
  searchItemsView.clearInput();
  // initSteppers.addStepperFunctionality();

  searchItemsView.addOpenModalHandler(openModalController);
  searchItemsView.addCloseModalHandler(closeModalController);

  searchItemsView.addSearchHandler(searchItemsController);
  searchItemsView.addDeleteSearchBtnHandler(searchDeleteBtnController);

  // itemQuantityStepper.addStepperFunctionality();
  // profitMarginStepper.addStepperFunctionality();

  itemListModalView.addItemHandler(addItemController);

  itemListView.addStepperQuantityHandler(addItemStepperController);
};
init();
