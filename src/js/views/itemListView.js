import { CATEGORY_COLOR, placeholder } from '../config';
import View from './View';

class ItemListView extends View {
  _parentEl = document.querySelector('[data-item-list]');
  _data = null;

  _generateMarkup() {
    return `
      <div
        data-id="${this._data.id}"
        data-item
        class="border border-black-700 rounded-xl px-3 py-3 flex flex-row gap-4 items-center transition-colors hover:border-black-600"
      >
        <img
          src="${this._data.imgPath || placeholder}"
          alt="${this._data.name}"
          class="w-22 rounded-lg"
        />
        <div class="flex flex-col grow">
          <span
            data-item-category
            class="text-[10px] w-fit font-semibold uppercase inline-flex px-3 py-0 tracking-wide rounded-3xl ${CATEGORY_COLOR.get(this._data.category)} mb-1"
            >${this._data.category}</span
          >
          <p
            data-item-name
            class="font-semibold text-lg/5 uppercase mb-2 mt-0.5"
          >
            ${this._data.name}
          </p>
          <p class="text-sm text-black-400">
          Est. retail value
            <span data-retail-value class="text-black-200 font-normal"
              >$${this._data.estRetailValue}</span
            >
          </p>
        </div>
        <div class="flex flex-col gap-1" title="Value after margin">
          <div>
            <p
              class="text-sm uppercase text-black-400 font-semibold text-right"
            >
              Buying price:
            </p>
            <p
              data-buying-price
              class="text-xl/5 text-right font-semibold text-green-500 mb-1"
            >
              $${this._data.buyingPrice}
            </p>
          </div>
          <p
            class="text-sm uppercase text-black-400 font-semibold text-right"
          >
            Total value:
            <span data-item-total-value class="text-black-200 font-semibold"
              >$280</span
            >
          </p>
        </div>
        <div data-stepper-parent class="flex flex-col items-center gap-1">
          <button
            data-stepper-btn="1"
            data-quantity-increase-btn
            class="border border-black-600 rounded-md px-3 text-black-200 bg-black-900 transition-colors hover:bg-black-800 active:bg-black-700 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-chevron-up preview-icon"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
          <input
            data-stepper-input
            data-item-quantity
            type="text"
            class="w-14 outline-none border border-black-600 rounded-md text-center text-sm py-0.5 bg-black-800 transition-colors focus-visible:bg-black-700"
            name="item-quantity"
            value="${this._data.quantity}"
          />
          <button
            data-stepper-btn="-1"
            data-quantity-decrease-btn
            class="border border-black-600 rounded-md px-3 text-black-200 bg-black-900 transition-colors hover:bg-black-800 active:bg-black-700 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-chevron-down preview-icon"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  updateItem(item, { syncInput = true } = {}) {
    const el = this._parentEl.querySelector(`[data-id="${item.id}"]`);
    if (!el) return;

    if (syncInput)
      el.querySelector('[data-item-quantity]').value = item.quantity;
    el.querySelector('[data-buying-price]').textContent =
      `$${item.buyingPrice}`;
  }

  addStepperQuantityHandler(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('[data-stepper-btn]');
      if (!btn) return;
      const id = btn.closest('[data-id]').dataset.id;
      const input = btn
        .closest('[data-stepper-parent]')
        .querySelector('[data-stepper-input]');

      const current = parseInt(input.value, 10) || 0;
      const quantity = Math.max(1, current + +btn.dataset.stepperBtn);

      handler(id, quantity, true);
    });

    this._parentEl.addEventListener('input', e => {
      const input = e.target.closest('[data-item-quantity]');
      if (!input) return;

      const digits = input.value.replace(/\D/g, '');
      if (digits !== input.value) input.value = digits;

      const quantity = parseInt(digits, 10);
      if (!quantity) return;

      const id = input.closest('[data-id]').dataset.id;
      handler(id, quantity, false);
    });

    this._parentEl.addEventListener('change', e => {
      const input = e.target.closest('[data-item-quantity]');
      if (!input) return;

      const id = input.closest('[data-id]').dataset.id;
      const quantity = Math.max(1, parseInt(input.value, 10) || 1);

      handler(id, quantity, true);
    });
  }
}

export default new ItemListView();
