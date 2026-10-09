class Stepper {
  constructor(inputClass, increaseBtnClass, decreaseBtnClass, limit = 100) {
    this._input = document.querySelector(inputClass);
    this._increaseBtn = document.querySelector(increaseBtnClass);
    this._decreaseBtn = document.querySelector(decreaseBtnClass);
    this._limit = limit;
  }

  _changeValue(amount) {
    const changedValue = +this._input.value + amount;
    if (changedValue > this._limit || changedValue < 0) return;
    return (this._input.value = changedValue);
  }

  _inputBoundries() {
    if (this._input.value < 0 || isNaN(+this._input.value))
      this._input.value = 0;
    if (this._input.value > this._limit) this._input.value = this._limit;
  }

  addStepperFunctionality() {
    this._increaseBtn.addEventListener('click', () => this._changeValue(1));
    this._decreaseBtn.addEventListener('click', () => this._changeValue(-1));
    this._input.addEventListener('input', this._inputBoundries.bind(this));
  }
}

export const itemQuantityStepper = new Stepper(
  '[data-item-quantity]',
  '[data-quantity-increase-btn]',
  '[data-quantity-decrease-btn]',
);

export const profitMarginStepper = new Stepper(
  '[data-profit-margin]',
  '[data-profit-margin-increase-btn]',
  '[data-profit-margin-decrease-btn]',
  200,
);
