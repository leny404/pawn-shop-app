class SearchItemsView {
  _parentEl = document.querySelector('[data-search-items-container]');
  _inputEl = document.querySelector('[data-search-items-input]');
  _deleteBtn = document.querySelector('[data-delete-search-btn]');

  clearInput() {
    this._inputEl.value = '';
  }

  addSearchHandler(handler) {
    this._inputEl.addEventListener('input', e => {
      const input = this._inputEl;
      handler(input.value);
    });
  }

  addDeleteSearchBtnHandler(handler) {
    this._deleteBtn.addEventListener('click', e => {
      handler();
    });
  }
}

export default new SearchItemsView();
