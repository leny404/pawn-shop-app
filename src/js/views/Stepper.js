class Stepper {
  _changeValue(input, amount) {
    const changedValue = +input.value + amount;
    if (changedValue < 0) return;

    input.value = changedValue;
  }

  _clamp(input) {
    if (input.value < 0 || isNaN(+input.value)) input.value = 0;
  }

  addStepperFunctionality() {
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-stepper-btn]');
      if (!btn) return;
      const parent = btn.closest('[data-stepper-parent]');
      const input = parent.querySelector('[data-stepper-input]');

      this._changeValue(input, Number(btn.dataset.stepperBtn));
    });

    document.addEventListener('input', e => {
      const input = e.target.closest('[data-stepper-input]');
      if (!input) return;

      input.value = Number(input.value);
      this._clamp(input);
    });
  }
}
export default new Stepper();
