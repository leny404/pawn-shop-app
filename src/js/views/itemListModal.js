class ItemListModal {
  _modalEl = document.querySelector('[data-search-modal]');

  _show() {
    this._modalEl.removeAttribute('data-hidden');
  }
  _hide() {
    this._modalEl.setAttribute('data-hidden', '');
  }

  toggleModal(show) {
    show ? this._show() : this._hide();
  }
}
export default new ItemListModal();
