import View from './View';
import { CATEGORY_COLOR, placeholder } from '../config';

class ItemListModal extends View {
  _parentEl = document.querySelector('[data-found-items-container]');
  _modalEl = document.querySelector('[data-search-modal]');
  _foundedItemsEl = document.querySelector('[data-found-items]');
  _data = null;

  _generateMarkup() {
    return `
      <div
          data-id="${this._data.id}"
          class="border border-black-600 hover:border-black-500 rounded-lg p-2 transition-colors group"
        >
        <div class="flex gap-2.5 mb-2">
          <picture class="block rounded-md overflow-hidden shrink-0">
            <img
              src="${this._data.imgPath || placeholder}"
              alt="${this._data.name}"
              class="w-22 rounded-md transition-transform group-hover:scale-105"
            />
          </picture>
          <div class="flex flex-col grow">
            <span
              data-item-category
              class="text-[8px] w-fit font-semibold uppercase inline-flex px-2 py-px tracking-wide rounded-3xl ${CATEGORY_COLOR.get(this._data.category)} mb-1 mt-0.5"
              >${this._data.category}</span
            >
            <p
              data-item-name
              class="font-semibold text-sm/4 uppercase mb-1.5 mt-0.5 max-h-[2lh] line-clamp-2"
            >
              ${this._data.name}
            </p>
            <p class="text-xs/3 text-black-400">
              Est. retail value
              <span
                data-retail-value
                class="text-black-200 font-normal text-xs"
                >$${this._data.estRetailValue}</span
              >
            </p>
          </div>
        </div>
        <button
          data-modal-item-add-btn
          class="bg-green-500 w-full rounded-md text-xs/6 font-bold uppercase transition-colors hover:bg-green-600 active:bg-green-700 cursor-pointer"
        >
          Add item
        </button>
      </div>
    `;
  }

  _show() {
    this._modalEl.removeAttribute('data-hidden');
  }
  _hide() {
    this._modalEl.setAttribute('data-hidden', '');
  }

  toggleModal(show) {
    show ? this._show() : this._hide();
  }

  showCountOfFoundedItems(howMany) {
    this._foundedItemsEl.textContent = howMany;
  }

  addItemHandler(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('[data-modal-item-add-btn]');
      if (!btn) return;

      const id = btn.closest('[data-id]').dataset.id;
      console.log(id);
      handler(id);
    });
  }
}
export default new ItemListModal();
