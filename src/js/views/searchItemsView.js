class SearchItemsView {
  _parentEl = document.querySelector('[data-search-items-container]');
  _inputEl = document.querySelector('[data-search-items-input]');
  _deleteBtn = document.querySelector('[data-delete-search-btn]');

  clearInput() {
    this._inputEl.value = '';
    this._inputEl.blur();
  }

  addSearchHandler(handler) {
    this._inputEl.addEventListener('input', () => {
      handler(this._inputEl.value);
    });
  }
  addOpenModalHandler(handler) {
    this._inputEl.addEventListener('focus', () => {
      handler(this._inputEl.value);
    });
  }

  addCloseModalHandler(handler) {
    window.addEventListener('click', e => {
      if (
        e.target.closest('[data-search-modal]') ||
        e.target.closest('[data-search-items-container]')
      )
        return;
      handler();
    });
  }

  addDeleteSearchBtnHandler(handler) {
    this._deleteBtn.addEventListener('click', () => {
      this._inputEl.focus();
      handler();
    });
  }
}

export default new SearchItemsView();
