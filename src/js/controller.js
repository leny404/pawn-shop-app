import searchItemsView from './views/searchItemsView';
import itemListModal from './views/itemListModal';
import { itemQuantityStepper, profitMarginStepper } from './views/Stepper.js'; //prettier-ignore
import * as model from './model.js';

const searchItemsController = function (value) {
  itemListModal.toggleModal(value.length > 0);

  const similarArr = model.getSimilar(value) || [];
  itemListModal.renderAll(similarArr);
};

const searchDeleteBtnController = function () {
  itemListModal.toggleModal(false);
  searchItemsView.clearInput();
};

const init = function () {
  searchItemsView.clearInput();

  searchItemsView.addSearchHandler(searchItemsController);
  searchItemsView.addDeleteSearchBtnHandler(searchDeleteBtnController);

  itemQuantityStepper.addStepperFunctionality();
  profitMarginStepper.addStepperFunctionality();
};
init();
