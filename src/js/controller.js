import searchItemsView from './views/searchItemsView';
import itemListModalView from './views/itemListModalView';
import itemListView from './views/itemListView.js';
import initSteppers from './views/Stepper.js'; //prettier-ignore
import * as model from './model.js';
import { itemList } from './items.js';

const searchItemsController = function (value) {
  itemListModalView.toggleModal(value.length > 0);

  const similarArr = model.getSimilar(value) || [];

  similarArr.length > 0
    ? itemListModalView.renderAll(similarArr)
    : itemListModalView.renderMessage();

  itemListModalView.showCountOfFoundedItems(similarArr.length);
};

const searchDeleteBtnController = function () {
  itemListModalView.toggleModal(false);
  searchItemsView.clearInput();
};

const addItemController = function (id) {
  if (!id) return;
  model.addItem(id);
  itemListView.renderAll(model.state.addedItems);
};

const addItemStepperController = function (id, quantity, syncInput) {
  const item = model.changeQuantity(id, quantity);
  if (!item) return;
  itemListView.updateItem(item, { syncInput });
};

const init = function () {
  searchItemsView.clearInput();
  // initSteppers.addStepperFunctionality();

  searchItemsView.addSearchHandler(searchItemsController);
  searchItemsView.addDeleteSearchBtnHandler(searchDeleteBtnController);

  // itemQuantityStepper.addStepperFunctionality();
  // profitMarginStepper.addStepperFunctionality();

  itemListModalView.addItemHandler(addItemController);

  itemListView.addStepperQuantityHandler(addItemStepperController);
};
init();
