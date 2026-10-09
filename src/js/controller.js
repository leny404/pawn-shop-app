import searchItemsView from './views/searchItemsView';
import itemListModal from './views/itemListModal';

const searchItemsController = function (value) {
  itemListModal.toggleModal(value.length > 0);
  return;
};

const searchDeleteBtnController = function () {
  itemListModal.toggleModal(false);
  searchItemsView.clearInput();
};

const init = function () {
  searchItemsView.clearInput();

  searchItemsView.addSearchHandler(searchItemsController);
  searchItemsView.addDeleteSearchBtnHandler(searchDeleteBtnController);
};
init();
