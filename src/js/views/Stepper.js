class Stepper {
  // document.querySelector('[data-stepper-parent]');
  _changeValue(input, amount) {
    const changedValue = +input.value + amount;
    if (changedValue > this._limit || changedValue < 0) return;
    return (input.value = changedValue);
  }

  _clamp() {
    if (this._input.value < 0 || isNaN(+this._input.value))
      this._input.value = 0;
    if (this._input.value > this._limit) this._input.value = this._limit;
  }

  addStepperFunctionality() {
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-stepper-btn]');
      if (!btn) return;
      const parent = btn.closest('[data-stepper-parent]');
      const input = parent.querySelector('[data-stepper-input]');

      this._changeValue(input, Number(btn.dataset.stepperBtn));
    });
  }
}
export default new Stepper();
