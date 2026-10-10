import searchItemsView from './views/searchItemsView';
import itemListModalView from './views/itemListModalView';
import itemListView from './views/itemListView.js';
import steppers from './views/Stepper.js'; //prettier-ignore
import * as model from './model.js';

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

const init = function () {
  searchItemsView.clearInput();

  searchItemsView.addSearchHandler(searchItemsController);
  searchItemsView.addDeleteSearchBtnHandler(searchDeleteBtnController);

  // itemQuantityStepper.addStepperFunctionality();
  // profitMarginStepper.addStepperFunctionality();

  itemListModalView.addItemHandler(addItemController);

  steppers.addStepperFunctionality();
};
init();
